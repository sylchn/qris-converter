import { validateCRC16 } from './crc.js';

// Mapping nama Tag EMVCo / QRIS Indonesia untuk kemudahan pembacaan
export const TAG_NAMES = {
  '00': 'Payload Format Indicator',
  '01': 'Point of Initiation Method', // 11 = Statis, 12 = Dinamis
  '26': 'Merchant Account Information (GPN)',
  '27': 'Merchant Account Information (Domestic 1)',
  '28': 'Merchant Account Information (Domestic 2)',
  '29': 'Merchant Account Information (Domestic 3)',
  '30': 'Merchant Account Information (Domestic 4)',
  '31': 'Merchant Account Information (Domestic 5)',
  '32': 'Merchant Account Information (Domestic 6)',
  '33': 'Merchant Account Information (Domestic 7)',
  '34': 'Merchant Account Information (Domestic 8)',
  '35': 'Merchant Account Information (Domestic 9)',
  '36': 'Merchant Account Information (Domestic 10)',
  '37': 'Merchant Account Information (Domestic 11)',
  '38': 'Merchant Account Information (Domestic 12)',
  '39': 'Merchant Account Information (Domestic 13)',
  '40': 'Merchant Account Information (Domestic 14)',
  '41': 'Merchant Account Information (Domestic 15)',
  '42': 'Merchant Account Information (Domestic 16)',
  '43': 'Merchant Account Information (Domestic 17)',
  '44': 'Merchant Account Information (Domestic 18)',
  '45': 'Merchant Account Information (Domestic 19)',
  '51': 'Merchant Account Information (Domestic GPN)',
  '52': 'Merchant Category Code (MCC)',
  '53': 'Transaction Currency (IDR = 360)',
  '54': 'Transaction Amount', // Nominal Transaksi
  '55': 'Tip on Transaction Indicator',
  '56': 'Value of Fee Fixed',
  '57': 'Value of Fee Percentage',
  '58': 'Country Code (ID)',
  '59': 'Merchant Name',
  '60': 'Merchant City',
  '61': 'Postal Code',
  '62': 'Additional Data Field Template', // Informasi Tambahan (Invoice, terminal ID, dll.)
  '63': 'CRC' // Checksum
};

/**
 * Mengurai string TLV (Tag-Length-Value) tingkat rendah.
 * 
 * @param {string} tlvString - Sub-string dengan format TLV.
 * @returns {Object|null} Peta dari Tag ke objek { tag, length, value } atau null jika format rusak.
 */
export function parseTLVString(tlvString) {
  const result = {};
  let idx = 0;

  while (idx < tlvString.length) {
    if (idx + 4 > tlvString.length) {
      return null;
    }

    const tag = tlvString.substring(idx, idx + 2);
    const lengthStr = tlvString.substring(idx + 2, idx + 4);
    const length = parseInt(lengthStr, 10);

    if (isNaN(length) || length < 0) {
      return null;
    }

    idx += 4;
    if (idx + length > tlvString.length) {
      return null;
    }

    const value = tlvString.substring(idx, idx + length);
    idx += length;

    result[tag] = {
      tag,
      length: length,
      value,
      name: TAG_NAMES[tag] || 'Reserved for Private Use / Unknown'
    };
  }

  return result;
}

/**
 * Mengurai payload QRIS lengkap dan memvalidasi CRC-nya.
 * 
 * @param {string} payload - Payload QRIS mentah dari teks QR.
 * @returns {Object} Hasil analisis berisi status validitas, map dari data terurai, dan info detail.
 */
export function parseQRIS(payload) {
  if (!payload) {
    return { isValid: false, error: 'Payload kosong' };
  }

  const isValidCRC = validateCRC16(payload);
  const rootData = parseTLVString(payload);

  if (!rootData) {
    return { isValid: false, error: 'Gagal mengurai struktur TLV QRIS. Pastikan format sesuai standar EMVCo.' };
  }

  // Melakukan penguraian nested TLV pada merchant info dan additional data
  for (const tag in rootData) {
    const item = rootData[tag];
    const isMerchantInfo = (parseInt(tag, 10) >= 26 && parseInt(tag, 10) <= 45) || tag === '51';
    const isAdditionalData = tag === '62';

    if (isMerchantInfo || isAdditionalData) {
      const nested = parseTLVString(item.value);
      if (nested) {
        item.subTags = nested;
      }
    }
  }

  // Ekstrak info penting yang sering digunakan untuk kemudahan akses
  const merchantName = rootData['59']?.value || 'UNKNOWN MERCHANT';
  const merchantCity = rootData['60']?.value || '';
  const countryCode = rootData['58']?.value || 'ID';
  const amount = rootData['54']?.value ? parseFloat(rootData['54'].value) : null;
  const isStatic = rootData['01']?.value === '11';
  const mcc = rootData['52']?.value || '5411';

  let nmid = '';
  const merchantTag = rootData['26'] || rootData['51'];
  if (merchantTag && merchantTag.subTags) {
    nmid = merchantTag.subTags['01']?.value || merchantTag.subTags['02']?.value || merchantTag.subTags['00']?.value || '';
  }

  return {
    isValid: true,
    isValidCRC,
    data: rootData,
    summary: {
      merchantName,
      merchantCity,
      countryCode,
      amount,
      isStatic,
      nmid: nmid || 'ID1020211831969',
      mcc,
      currency: rootData['53']?.value === '360' ? 'IDR' : rootData['53']?.value || 'UNKNOWN'
    }
  };
}
