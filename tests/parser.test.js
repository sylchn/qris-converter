import test from 'node:test';
import assert from 'node:assert';
import { parseQRIS, parseTLVString } from '../src/lib/qris/parser.js';
import { generateDynamicQRIS } from '../src/lib/qris/amount.js';
import { calculateCRC16 } from '../src/lib/qris/crc.js';

test('Pengurai TLV Dasar (parseTLVString)', () => {
  const tlv = '000201010211';
  const parsed = parseTLVString(tlv);
  
  assert.ok(parsed, 'Hasil parsing tidak boleh null');
  assert.ok(parsed['00'], 'Tag 00 harus ada');
  assert.strictEqual(parsed['00'].value, '01');
  assert.strictEqual(parsed['00'].length, 2);
  assert.ok(parsed['01'], 'Tag 01 harus ada');
  assert.strictEqual(parsed['01'].value, '11');
  assert.strictEqual(parsed['01'].length, 2);
});

test('Pengurai QRIS Lengkap - QRIS Statis Valid', () => {
  const staticPayloadWithoutCRC = '0002010102115913BUDI UTOMO QR6007JAKARTA5802ID5303360';
  const crc = calculateCRC16(staticPayloadWithoutCRC + '6304');
  const fullPayload = staticPayloadWithoutCRC + '6304' + crc;

  const result = parseQRIS(fullPayload);
  
  assert.strictEqual(result.isValid, true, 'QRIS harus dianggap valid');
  assert.strictEqual(result.isValidCRC, true, 'CRC harus valid');
  assert.strictEqual(result.summary.merchantName, 'BUDI UTOMO QR');
  assert.strictEqual(result.summary.merchantCity, 'JAKARTA');
  assert.strictEqual(result.summary.isStatic, true, 'Point of Initiation Method 11 adalah Statis');
  assert.strictEqual(result.summary.amount, null, 'QRIS statis tidak memiliki nominal bawaan');
});

test('Pengurai QRIS - Struktur Bersarang (Nested TLV)', () => {
  // Tag 26 berisi info merchant:
  // Subtag 00: id.co.qr.qris (panjang 13) -> 0013id.co.qr.qris
  // Subtag 01: ID102030405060 (panjang 14) -> 0114ID102030405060
  // Gabungan value Tag 26: 0013id.co.qr.qris0114ID102030405060 (panjang 35)
  // Tag 26 lengkap: 26350013id.co.qr.qris0114ID102030405060
  
  const nestedValue = '0013id.co.qr.qris0114ID102030405060';
  const tag26 = '2635' + nestedValue;
  const payloadWithoutCRC = '000201010211' + tag26 + '5913BUDI UTOMO QR6007JAKARTA5802ID5303360';
  const crc = calculateCRC16(payloadWithoutCRC + '6304');
  const fullPayload = payloadWithoutCRC + '6304' + crc;

  const result = parseQRIS(fullPayload);
  assert.strictEqual(result.isValid, true);
  
  const item26 = result.data['26'];
  assert.ok(item26.subTags, 'Sub-tags untuk Tag 26 harus berhasil diurai');
  assert.strictEqual(item26.subTags['00'].value, 'id.co.qr.qris');
  assert.strictEqual(item26.subTags['01'].value, 'ID102030405060');
});

test('Pembuat QRIS Dinamis (generateDynamicQRIS)', () => {
  const staticPayloadWithoutCRC = '0002010102115913BUDI UTOMO QR6007JAKARTA5802ID5303360';
  const crc = calculateCRC16(staticPayloadWithoutCRC + '6304');
  const fullStaticPayload = staticPayloadWithoutCRC + '6304' + crc;

  const nominal = 125000;
  const dynamicPayload = generateDynamicQRIS(fullStaticPayload, nominal);

  // Urai kembali hasil generate untuk pembuktian
  const result = parseQRIS(dynamicPayload);
  
  assert.strictEqual(result.isValid, true, 'Hasil convert harus berupa QRIS valid');
  assert.strictEqual(result.isValidCRC, true, 'CRC hasil konversi harus valid');
  assert.strictEqual(result.summary.isStatic, false, 'Tag 01 harus berubah menjadi 12 (Dinamis)');
  assert.strictEqual(result.summary.amount, 125000, 'Nominal harus sesuai dengan input (125000)');
  assert.strictEqual(result.data['01'].value, '12', 'Tag 01 bernilai 12');
  assert.strictEqual(result.data['54'].value, '125000', 'Tag 54 berisi string 125000');
});

test('Pembuat QRIS Dinamis (generateDynamicQRIS) - Nominal di bawah 500 melempar error', () => {
  const staticPayloadWithoutCRC = '0002010102115913BUDI UTOMO QR6007JAKARTA5802ID5303360';
  const crc = calculateCRC16(staticPayloadWithoutCRC + '6304');
  const fullStaticPayload = staticPayloadWithoutCRC + '6304' + crc;

  assert.throws(() => {
    generateDynamicQRIS(fullStaticPayload, 499);
  }, /Nominal pembayaran minimal adalah Rp 500/);

  assert.throws(() => {
    generateDynamicQRIS(fullStaticPayload, 0);
  }, /Nominal pembayaran minimal adalah Rp 500/);
});
