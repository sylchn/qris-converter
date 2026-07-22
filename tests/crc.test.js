import test from 'node:test';
import assert from 'node:assert';
import { calculateCRC16, validateCRC16 } from '../src/lib/qris/crc.js';

test('Kalkulasi CRC16 - Standard CRC-16/CCITT-FALSE', () => {
  // Nilai uji standar untuk CRC-16/CCITT-FALSE dengan input "123456789" adalah 0x29B1
  const testStr = '123456789';
  const expectedCRC = '29B1';
  
  const result = calculateCRC16(testStr);
  assert.strictEqual(result, expectedCRC, `CRC untuk "${testStr}" haruslah "${expectedCRC}"`);
});

test('Kalkulasi CRC16 - String Payload QRIS Pendek', () => {
  // Kita coba payload QRIS sangat pendek untuk inisiasi:
  // "0002010102116304"
  // Mari kita hitung CRC-nya secara terprogram dan memvalidasinya.
  const payloadWithoutCRC = '0002010102116304';
  const calculated = calculateCRC16(payloadWithoutCRC);
  
  // Buat payload penuh
  const fullPayload = payloadWithoutCRC + calculated;
  
  // Validasi payload penuh tersebut
  assert.strictEqual(validateCRC16(fullPayload), true, 'Payload dengan CRC yang baru dihitung harus valid');
});

test('Validasi CRC16 - Kasus Valid & Invalid', () => {
  // Contoh payload QRIS statis valid (dibuat buatan tetapi CRC-nya valid)
  const basePayload = '0002010102115911TEST MERCHANT6007JAKARTA5802ID5303360';
  const dataForCRC = basePayload + '6304';
  const crc = calculateCRC16(dataForCRC);
  const validPayload = dataForCRC + crc;
  
  assert.strictEqual(validateCRC16(validPayload), true, 'Harus sukses memvalidasi payload QRIS yang CRC-nya benar');
  
  // Modifikasi karakter terakhir untuk merusak CRC
  const invalidPayload1 = validPayload.substring(0, validPayload.length - 1) + (validPayload.slice(-1) === '0' ? '1' : '0');
  assert.strictEqual(validateCRC16(invalidPayload1), false, 'Harus gagal memvalidasi jika salah satu karakter CRC salah');

  // Modifikasi data di tengah payload
  const invalidPayload2 = validPayload.replace('TEST MERCHANT', 'TEST MERCHANX');
  assert.strictEqual(validateCRC16(invalidPayload2), false, 'Harus gagal memvalidasi jika data di dalam payload diubah');
});
