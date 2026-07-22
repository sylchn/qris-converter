import Alpine from '../lib/alpine.esm.js';
window.Alpine = Alpine;

// Check Cloudflare Variables & Secrets (SITE_URL, Google, Bing, Yandex Search Console Verifications)
if (typeof process !== 'undefined' && process.env) {
  if (process.env.SITE_URL || process.env.PUBLIC_SITE_URL) {
    window.CLOUDFLARE_SITE_URL = process.env.SITE_URL || process.env.PUBLIC_SITE_URL;
  }
  if (process.env.GOOGLE_SITE_VERIFICATION) window.GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;
  if (process.env.BING_SITE_VERIFICATION || process.env.MSVALIDATE_01) window.MSVALIDATE_01 = process.env.BING_SITE_VERIFICATION || process.env.MSVALIDATE_01;
  if (process.env.YANDEX_SITE_VERIFICATION) window.YANDEX_SITE_VERIFICATION = process.env.YANDEX_SITE_VERIFICATION;
}

import { parseQRIS } from '../lib/qris/parser.js';

const sampleQRIS = "00020101021126680016ID10202118319690118936000020000025740214400000257400020303UMI51440014ID10202118319690215400000257400020303UMI5204000053033605802ID5921Toko Kelontong Berkah6009Tangerang61051513062070703A0163045E65";

Alpine.data('loginApp', () => ({
  tab: 'upload',
  fileName: '',
  loading: false,
  loadingText: 'Menganalisis Payload QRIS...',
  errorMessage: '',
  textPayload: '',
  staticQRLocal: null,
  isDragging: false,

  init() {
    document.documentElement.classList.add('dark');

    // Clean .html from address bar
    if (window.location.pathname.endsWith('.html')) {
      const cleanPath = window.location.pathname.replace(/\.html$/, '');
      window.history.replaceState(null, '', cleanPath + window.location.search);
    }

    // Cek apakah pengguna sudah memiliki sesi login aktif (di localStorage atau sessionStorage)
    const activeSession = localStorage.getItem('qrisStaticData') || sessionStorage.getItem('qrisStaticData');
    if (activeSession) {
      try {
        const parsedData = JSON.parse(activeSession);
        if (parsedData && parsedData.payload && typeof parsedData.payload === 'string' && parsedData.payload.length > 20) {
          const check = parseQRIS(parsedData.payload);
          if (check && check.isValid) {
            const currentPath = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '');
            if (!currentPath.endsWith('dashboard')) {
              const dest = window.location.protocol === 'file:' ? 'dashboard.html' : '/dashboard';
              window.location.href = dest;
              return;
            }
          } else {
            localStorage.removeItem('qrisStaticData');
            sessionStorage.removeItem('qrisStaticData');
          }
        } else {
          localStorage.removeItem('qrisStaticData');
          sessionStorage.removeItem('qrisStaticData');
        }
      } catch (e) {
        localStorage.removeItem('qrisStaticData');
        sessionStorage.removeItem('qrisStaticData');
      }
    }
  },

  clearFile() {
    this.fileName = '';
    this.staticQRLocal = null;
    this.errorMessage = '';
  },

  handleFileSelect(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      this.processFile(file);
      e.target.value = '';
    }
  },

  handleDrop(e) {
    this.isDragging = false;
    const file = e.dataTransfer && e.dataTransfer.files[0];
    if (file) this.processFile(file);
  },

  processFile(file) {
    this.errorMessage = '';
    this.staticQRLocal = null;
    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Format berkas tidak didukung. Silakan unggah gambar (PNG, JPG, atau JPEG).';
      return;
    }
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        try {
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          if (typeof window.jsQR !== 'undefined') {
            const code = window.jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });
            if (code && code.data) {
              this.parseQRText(code.data);
            } else {
              this.errorMessage = 'Gagal mendeteksi QR Code dari gambar. Pastikan QRIS terlihat jelas.';
              this.fileName = '';
            }
          } else {
            this.errorMessage = 'Library jsQR tidak dimuat. Pastikan koneksi/file jsQR tersedia.';
          }
        } catch (err) {
          this.errorMessage = 'Kesalahan saat memproses gambar: ' + err.message;
          this.fileName = '';
        }
      };
      img.onerror = () => { this.errorMessage = 'Gagal memuat file gambar.'; this.fileName = ''; };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  },

  handleTextInput() {
    this.errorMessage = '';
    this.staticQRLocal = null;
    if (this.textPayload.trim().length > 10) {
      this.parseQRText(this.textPayload.trim());
    }
  },

  loadSample() {
    this.tab = 'text';
    this.textPayload = sampleQRIS;
    this.parseQRText(sampleQRIS);
  },

  loadSampleAndLogin() {
    this.textPayload = sampleQRIS;
    this.parseQRText(sampleQRIS);
    setTimeout(() => {
      this.processLogin();
    }, 100);
  },

  parseQRText(text) {
    const parsed = parseQRIS(text);
    if (parsed.isValid) {
      this.staticQRLocal = { payload: text, parsed: parsed, summary: parsed.summary };
      this.errorMessage = '';
    } else {
      this.errorMessage = parsed.error || 'Struktur QRIS tidak valid.';
      this.staticQRLocal = null;
    }
  },

  processLogin() {
    if (!this.staticQRLocal) return;
    this.loading = true;
    this.loadingText = 'Mengurai Payload QRIS...';

    setTimeout(() => {
      this.loadingText = 'Memverifikasi Tanda Tangan CRC16...';
      setTimeout(() => {
        this.loadingText = 'Membuka Dashboard Merchant...';
        try {
          const jsonStr = JSON.stringify(this.staticQRLocal);
          localStorage.setItem('qrisStaticData', jsonStr);
          sessionStorage.setItem('qrisStaticData', jsonStr);
        } catch(e) {
          console.error('Gagal menyimpan sesi login:', e);
        }
        setTimeout(() => {
          const dest = window.location.protocol === 'file:' ? 'dashboard.html' : '/dashboard';
          window.location.href = dest;
        }, 300);
      }, 400);
    }, 400);
  }
}));

Alpine.start();
