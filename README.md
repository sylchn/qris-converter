# 💳 QRIS Converter — Generator QRIS Dinamis & Pengurai TLV EMVCo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![EMVCo Standard](https://img.shields.io/badge/EMVCo-1.0-blue.svg)](https://www.emvco.com/)
[![Bank Indonesia GPN](https://img.shields.io/badge/Bank_Indonesia-GPN-red.svg)](https://www.bi.go.id/)
[![Client-Side Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side-emerald.svg)]()
[![Build & Test](https://img.shields.io/badge/Tests-8%2F8_Passed-brightgreen.svg)]()

> **Aplikasi Web Pengubah QRIS Statis Merchant Menjadi QRIS Dinamis dengan Nominal Pembayaran Otomatis.**  
> 100% Berjalan di Browser Pengguna (*Client-Side Engine*), Tanpa Backend Server, Tanpa Database Cloud, Tanpa EDC, dan Bebas Biaya MDR / API. Sesuai Standar EMVCo & Bank Indonesia (GPN).

---

## 📑 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Arsitektur Keamanan & Zero-Trust Privacy](#-arsitektur-keamanan--zero-trust-privacy)
- [Spesifikasi Teknis EMVCo & CRC-16](#-spesifikasi-teknis-emvco--crc-16)
- [Teknologi yang Terlibatkan (Tech Stack)](#-teknologi-yang-terlibatkan-tech-stack)
- [Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [Panduan Memulai (Quick Start)](#-panduan-memulai-quick-start)
- [Pengujian Unit (Automated Unit Tests)](#-pengujian-unit-automated-unit-tests)
- [Panduan Deployment](#-panduan-deployment)
- [Lisensi](#-lisensi)

---

## ✨ Fitur Utama

- ⚡ **Konversi QRIS Statis ke Dinamis Instan**: Mengubah kode QRIS Statis toko (Point of Initiation Method `01` ➔ `12`) serta menginjeksi nominal rupiah (Tag `54`) secara otomatis.
- 🎯 **Hitung Ulang Checksum CRC-16 CCITT-FALSE**: Otomatis memperbarui checksum 4-karakter heksadesimal di akhir string QRIS (Tag `6304xxxx`) agar valid dipindai oleh semua aplikasi m-Banking (BCA, Mandiri, BRI, BNI, dll.) dan E-Wallet (GoPay, OVO, DANA, ShopeePay).
- 🔍 **Decoder & Parser TLV EMVCo**: Pengurai tag data mentah QRIS (Tag `00` sampai `63`) secara visual beserta sub-tag Merchant Account Information (GPN) & Additional Data.
- 🖼️ **Ekspor Gambar QR Code PNG**: Mengunduh QRIS dinamis berkualitas tinggi secara gratis untuk dicetak atau ditampilkan di layar kasir.
- 📱 **Desain UI/UX Responsive Modern**: Dilengkapi mode gelap (*Dark Mode*), navigasi bilah samping (*sidebar*), menu drawer seluler, dan optimasi baca rapat seluler (*minimal padding*).

---

## 🛡️ Arsitektur Keamanan & Zero-Trust Privacy

Aplikasi ini menerapkan standar keamanan **Zero-Backend Storage**:

1. **Pemrosesan Memori Lokal (100% Client-Side)**: Dekode piksel QRIS (`jsQR`) dan generasi QR Code (`qrcode.js`) dieksekusi murni di memori browser lokal (`window.memory`).
2. **Tanpa Database & Server External**: Tidak ada gambar kode QR, nama merchant, NMID, atau nominal transaksi yang diunggah ke server eksternal mana pun (*zero data leak*).
3. **Isolasi Sesi**: Seluruh data merchant hanya tersimpan pada `localStorage` / `sessionStorage` perangkat pengguna dan langsung terhapus saat menekan tombol Keluar / Reset.

---

## 📐 Spesifikasi Teknis EMVCo & CRC-16

Format payload QRIS mengacu pada spesifikasi **EMVCo QR Code Specification for Payment Systems**:

| Tag EMVCo | Nama Bidang | Deskripsi / Nilai |
| :---: | :--- | :--- |
| **`00`** | Payload Format Indicator | Nilai tetap: `01` |
| **`01`** | Point of Initiation Method | `11` = Statis, `12` = Dinamis (Nominal Tetap) |
| **`26`–`45` / `51`** | Merchant Account Info | Struktur TLV bersarang (NMID & Kriteria UMI/UKE/UBE) |
| **`52`** | Merchant Category Code (MCC) | Kode kategori usaha (contoh: `5411` untuk Kelontong) |
| **`53`** | Transaction Currency | ISO 4217 Currency Code (`360` untuk IDR) |
| **`54`** | Transaction Amount | Nominal transaksi rupiah tanpa sen (diinjeksi otomatis) |
| **`58`** | Country Code | `ID` (Indonesia) |
| **`59`** | Merchant Name | Nama toko / merchant |
| **`60`** | Merchant City | Kota domisili toko |
| **`63`** | Checksum CRC-16 | Standard CRC-16/CCITT-FALSE (Polynomial `0x1021`, Initial `0xFFFF`) |

---

## 🛠️ Teknologi yang Terlibatkan (Tech Stack)

- **Frontend Core**: HTML5 & JavaScript (ES6+ Modules)
- **State Management**: [Alpine.js v3](https://alpinejs.dev/)
- **Styling & CSS**: [Tailwind CSS v4](https://tailwindcss.com/)
- **JS Bundler**: [Esbuild](https://esbuild.github.io/)
- **QR Code Decoder**: [jsQR](https://github.com/cozmo/jsQR)
- **QR Code Renderer**: [QRCode.js](https://davidshimjs.github.io/qrcodejs/)
- **Iconography**: [FontAwesome 6 Free](https://fontawesome.com/)
- **Testing**: Node.js Native Test Runner (`node --test`)

---

## 📂 Struktur Direktori Proyek

```text
qris-converter/
├── .htaccess             # Rules Rewrite Apache
├── _redirects            # Rules Routing Cloudflare / Netlify
├── index.html            # Halaman Landing & Fitur Utama
├── docs.html             # Halaman Dokumentasi Teknis
├── login.html            # Halaman Masuk Merchant / Unggah QRIS
├── dashboard.html        # Halaman Dashboard Pengelola QRIS Dinamis
├── app.js                # Logika Utama Dashboard Merchant (Alpine.js)
├── login.js              # Logika Pembaca Gambar QRIS (Alpine.js)
├── input.css             # Desain System Tokens & Tailwind v4 Custom CSS
├── style.css             # Output CSS Terkompresi
├── app.bundle.js         # Bundel JS Aplikasi Terkompresi
├── login.bundle.js       # Bundel JS Login Terkompresi
├── package.json          # Konfigurasi Dependensi & Npm Scripts
├── robots.txt            # Konfigurasi Bot Search Engine
├── sitemap.xml           # Sitemap Indeksasi SEO
├── vercel.json           # Konfigurasi Routing Vercel
├── lib/                  # Library Lokal Self-Contained (Offline Ready)
│   ├── alpine.esm.js
│   ├── font-awesome/
│   ├── jsQR.min.js
│   ├── qrcode.min.js
│   └── qris/            # Engine Pengolah Payload QRIS (Pure JS)
│       ├── amount.js     # Pembuat Payload QRIS Dinamis
│       ├── crc.js        # Algoritma Checksum CRC-16 CCITT-FALSE
│       └── parser.js     # Pengurai Struktur Data TLV
└── tests/                # Pengujian Unit Otomatis
    └── qris.test.js
```

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Prasyarat Sistem
- Node.js versi 18.x atau lebih baru.
- Npm versi 9.x atau lebih baru.

### 2. Kloning Repositori
```bash
git clone https://github.com/username/qris-converter.git
cd qris-converter
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Menjalankan Server Lokal (Development)
```bash
npm run dev
```
Akses di browser pada alamat: `http://localhost:3000`

### 5. Membangun Berkas Production (Build)
```bash
npm run build
```

---

## 🧪 Pengujian Unit (Automated Unit Tests)

Jalankan suite pengujian unit bawaan Node.js untuk memverifikasi kalkulasi CRC-16 dan penguraian TLV EMVCo:

```bash
npm test
```

**Hasil Pengujian:**
```bash
TAP version 13
ok 1 - Kalkulasi CRC16 - Standard CRC-16/CCITT-FALSE
ok 2 - Kalkulasi CRC16 - String Payload QRIS Pendek
ok 3 - Validasi CRC16 - Kasus Valid & Invalid
ok 4 - Pengurai TLV Dasar (parseTLVString)
ok 5 - Pengurai QRIS Lengkap - QRIS Statis Valid
ok 6 - Pengurai QRIS - Struktur Bersarang (Nested TLV)
ok 7 - Pembuat QRIS Dinamis (generateDynamicQRIS)
ok 8 - Pembuat QRIS Dinamis (generateDynamicQRIS) - Nominal di bawah 500 melempar error
# tests 8 | pass 8 | fail 0 | duration 105ms
```

---

## ☁️ Panduan Deployment

### Cloudflare Pages (*Direkomendasikan*)
1. Hubungkan repositori GitHub ini ke dashboard Cloudflare Pages.
2. Atur **Build Command**: `npm run build`
3. Atur **Build Output Directory**: `./`

### Netlify / Vercel
1. Atur **Build Command**: `npm run build`
2. Atur **Publish Directory**: `./` (sudah dilengkapi file `_redirects` & `vercel.json`).

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi terbuka **[MIT License](LICENSE)**. Bebas digunakan, dimodifikasi, dan didistribusikan untuk keperluan komersial maupun non-komersial.
