/**
 * Menghitung checksum CRC-16/CCITT-FALSE.
 * Berguna untuk memvalidasi dan membuat payload EMVCo/QRIS.
 * 
 * Spesifikasi:
 * - Polynomial: 0x1021 (x^16 + x^12 + x^5 + 1)
 * - Nilai Awal: 0xFFFF
 * - Refin: false, Refout: false
 * - Final XOR: 0x0000
 * 
 * @param {string|Uint8Array} data - Data string atau array byte yang akan dihitung CRC-nya.
 * @returns {string} Checksum 4-karakter heksadesimal berhuruf besar (contoh: "A1B2").
 */
export function calculateCRC16(data) {
  let crc = 0xFFFF;
  const bytes = typeof data === 'string'
    ? new TextEncoder().encode(data)
    : new Uint8Array(data);

  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    crc ^= (byte << 8);
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
      crc &= 0xFFFF;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Memvalidasi apakah checksum CRC-16 di akhir string QRIS cocok.
 * QRIS berakhiran dengan Tag 63 ("6304xxxx").
 * 
 * @param {string} payload - Payload QRIS lengkap.
 * @returns {boolean} True jika CRC valid, false jika tidak.
 */
export function validateCRC16(payload) {
  if (!payload || payload.length < 8) return false;

  // Tag 63 di bagian akhir QRIS harus berupa "6304" diikuti oleh 4 karakter CRC.
  const tag63Index = payload.lastIndexOf('6304');
  if (tag63Index === -1 || tag63Index !== payload.length - 8) return false;

  const dataToCalculate = payload.substring(0, tag63Index + 4);
  const expectedCRC = payload.substring(tag63Index + 4);
  const calculatedCRC = calculateCRC16(dataToCalculate);

  return calculatedCRC === expectedCRC.toUpperCase();
}
