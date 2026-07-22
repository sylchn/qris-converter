import { calculateCRC16 } from './crc.js';
import { parseTLVString } from './parser.js';

/**
 * Membuat payload QRIS dinamis (nominal tetap) dari payload QRIS statis.
 * Proses ini mengubah Tag 01 menjadi '12' (Dinamis), memasukkan Tag 54 (Nominal),
 * dan menghitung ulang CRC16 di Tag 63.
 * 
 * @param {string} staticPayload - Payload QRIS statis mentah.
 * @param {number|string} nominal - Nominal pembayaran yang ingin diinjeksi.
 * @returns {string} Payload QRIS dinamis yang siap digunakan.
 */
export function generateDynamicQRIS(staticPayload, nominal) {
  if (!staticPayload) {
    throw new Error('Payload QRIS statis tidak boleh kosong');
  }

  // Parsing payload statis terlebih dahulu
  const parsed = parseTLVString(staticPayload);
  if (!parsed) {
    throw new Error('Gagal mengurai payload QRIS. Format tidak valid.');
  }

  // Validasi nominal
  const amount = parseFloat(nominal);
  if (isNaN(amount) || amount < 500) {
    throw new Error('Nominal pembayaran minimal adalah Rp 500');
  }

  // Bulatkan nominal untuk Rupiah (IDR) karena tidak menggunakan pecahan sen
  const amountStr = Math.round(amount).toString();

  // Dapatkan daftar tag asli sesuai urutan kemunculannya
  const originalTags = [];
  let idx = 0;
  while (idx < staticPayload.length) {
    if (idx + 4 > staticPayload.length) break;
    const tag = staticPayload.substring(idx, idx + 2);
    const len = parseInt(staticPayload.substring(idx + 2, idx + 4), 10);
    if (isNaN(len) || idx + 4 + len > staticPayload.length) break;
    originalTags.push(tag);
    idx += 4 + len;
  }

  // Hilangkan CRC asli (Tag 63) dari daftar konstruksi ulang
  const tagsToProcess = originalTags.filter(tag => tag !== '63');

  // Pastikan Tag 01 (Point of Initiation Method) ada dalam daftar
  if (!tagsToProcess.includes('01')) {
    // Sisipkan Tag 01 setelah Tag 00 jika ada, jika tidak taruh di awal
    const index00 = tagsToProcess.indexOf('00');
    if (index00 !== -1) {
      tagsToProcess.splice(index00 + 1, 0, '01');
    } else {
      tagsToProcess.unshift('01');
    }
  }

  // Pastikan Tag 54 (Transaction Amount) dimasukkan
  if (!tagsToProcess.includes('54')) {
    // Sisipkan Tag 54 setelah Tag 53 (Currency) jika ada, jika tidak setelah Tag 52, jika tidak di akhir
    const index53 = tagsToProcess.indexOf('53');
    if (index53 !== -1) {
      tagsToProcess.splice(index53 + 1, 0, '54');
    } else {
      const index52 = tagsToProcess.indexOf('52');
      if (index52 !== -1) {
        tagsToProcess.splice(index52 + 1, 0, '54');
      } else {
        tagsToProcess.push('54');
      }
    }
  }

  // Rekonstruksi string QRIS baru
  let rebuiltPayload = '';
  for (const tag of tagsToProcess) {
    let value = '';
    if (tag === '01') {
      value = '12'; // Ubah ke '12' (Dinamis/Amount-fixed)
    } else if (tag === '54') {
      value = amountStr; // Injeksi nilai nominal yang baru
    } else {
      // Ambil nilai asli dari parsed static payload
      value = parsed[tag]?.value || '';
    }

    const lengthStr = value.length.toString().padStart(2, '0');
    rebuiltPayload += `${tag}${lengthStr}${value}`;
  }

  // Tambahkan Tag 63 di bagian paling akhir
  rebuiltPayload += '6304';
  const newCRC = calculateCRC16(rebuiltPayload);
  rebuiltPayload += newCRC;

  return rebuiltPayload;
}
