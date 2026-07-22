import Alpine from './lib/alpine.esm.js';
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

import { generateDynamicQRIS } from './lib/qris/amount.js';
import { parseQRIS, parseTLVString, TAG_NAMES } from './lib/qris/parser.js';
import { calculateCRC16 } from './lib/qris/crc.js';

const sampleQRIS = "00020101021126680016ID10202118319690118936000020000025740214400000257400020303UMI51440014ID10202118319690215400000257400020303UMI5204000053033605802ID5921Toko Kelontong Berkah6009Tangerang61051513062070703A0163045E65";

Alpine.data('qrisApp', () => ({
  // Tab Aktif: 'home' | 'generator' | 'parser' | 'history'
  activeTab: 'home',
  searchQuery: '',
  mobileMenuOpen: false,

  // Merchant details parsed dynamically from QRIS
  parsedMerchantName: 'Merchant QRIS',
  parsedMerchantCity: 'Indonesia',
  nmid: 'ID1020211831969',
  mccCode: '5411',

  // Form states
  staticPayload: '',
  amount: 50000,

  // Output states (Kosong di awal sampai pengguna klik tombol Proses)
  generatedPayload: '',
  newCrc: '',

  // Parser input
  parseInputPayload: '',
  parsedDataList: [],

  // Notification States
  notificationsOpen: false,
  hasUnreadNotifications: true,
  notifications: [
    {
      id: 1,
      title: 'Sesi QRIS Merchant Aktif',
      desc: 'Payload QRIS statis berhasil dimuat dan diverifikasi oleh engine lokal.',
      timestamp: Date.now(),
      icon: 'fa-solid fa-circle-check text-emerald-400'
    },
    {
      id: 2,
      title: 'Keamanan Sesi Lokal',
      desc: 'Seluruh proses konversi dilakukan 100% di browser perangkat Anda.',
      timestamp: Date.now() - 60000,
      icon: 'fa-solid fa-shield-halved text-brand-accent'
    },
    {
      id: 3,
      title: 'Standar EMVCo CRC-16 Valid',
      desc: 'Format QRIS sesuai spesifikasi Bank Indonesia (GPN ID).',
      timestamp: Date.now() - 300000,
      icon: 'fa-solid fa-qrcode text-blue-400'
    }
  ],

  timeAgo(timestamp) {
    if (!timestamp) return 'Baru saja';
    const diff = Math.floor((Date.now() - Number(timestamp)) / 1000);
    if (diff < 10) return 'Baru saja';
    if (diff < 60) return `${diff}s lalu`;
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes}m lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}j lalu`;
    const days = Math.floor(hours / 24);
    return `${days}hr lalu`;
  },

  toggleNotifications() {
    this.notificationsOpen = !this.notificationsOpen;
    if (this.notificationsOpen) {
      this.hasUnreadNotifications = false;
    }
  },

  clearNotifications() {
    this.notifications = [];
    this.hasUnreadNotifications = false;
  },

  // Riwayat Transaksi (LocalStorage)
  transactionLogs: JSON.parse(localStorage.getItem('qrisLogs') || '[]'),

  get merchantInitials() {
    try {
      if (!this.parsedMerchantName || typeof this.parsedMerchantName !== 'string') return 'QC';
      const clean = this.parsedMerchantName.trim();
      if (!clean) return 'QC';
      const words = clean.split(/\s+/).filter(Boolean);
      if (words.length >= 2 && words[0] && words[1]) {
        return (words[0][0] + words[1][0]).toUpperCase();
      }
      return clean.substring(0, Math.min(2, clean.length)).toUpperCase();
    } catch (e) {
      return 'QC';
    }
  },

  get filteredTransactionLogs() {
    if (!Array.isArray(this.transactionLogs)) return [];
    if (!this.searchQuery || !this.searchQuery.trim()) {
      return this.transactionLogs;
    }
    const q = this.searchQuery.toLowerCase().trim();
    return this.transactionLogs.filter(log => {
      return (
        (log.merchant && log.merchant.toLowerCase().includes(q)) ||
        (log.amount && log.amount.toString().includes(q)) ||
        (log.time && log.time.toLowerCase().includes(q)) ||
        (log.id && log.id.toLowerCase().includes(q))
      );
    });
  },

  get filteredParsedDataList() {
    if (!Array.isArray(this.parsedDataList)) return [];
    if (!this.searchQuery || !this.searchQuery.trim()) {
      return this.parsedDataList;
    }
    const q = this.searchQuery.toLowerCase().trim();
    return this.parsedDataList.filter(item => {
      return (
        (item.tag && item.tag.toLowerCase().includes(q)) ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.value && item.value.toLowerCase().includes(q))
      );
    });
  },

  init() {
    document.documentElement.classList.add('dark');

    // Clean .html from address bar
    if (window.location.pathname.endsWith('.html')) {
      const cleanPath = window.location.pathname.replace(/\.html$/, '');
      window.history.replaceState(null, '', cleanPath + window.location.search);
    }

    // Cek autentikasi sesi merchant
    const savedQR = localStorage.getItem('qrisStaticData') || sessionStorage.getItem('qrisStaticData');
    if (savedQR) {
      try {
        const data = JSON.parse(savedQR);
        if (data && data.payload) {
          this.setStaticData(data.payload, data.parsed);
        } else if (typeof data === 'string' && data.length > 10) {
          this.setStaticData(data);
        } else {
          this.clearSessionAndRedirectLogin();
          return;
        }
      } catch (e) {
        console.error('Gagal membaca data sesi:', e);
        this.clearSessionAndRedirectLogin();
        return;
      }
    } else {
      // TIDAK ADA SESI LOGIN -> LEMPAR KE LOGIN
      const dest = window.location.protocol === 'file:' ? 'login.html' : '/login';
      window.location.href = dest;
      return;
    }

    if (!Array.isArray(this.transactionLogs)) {
      this.transactionLogs = [];
    }

    this.$watch('transactionLogs', val => {
      try {
        localStorage.setItem('qrisLogs', JSON.stringify(val));
      } catch(e) {}
    }, { deep: true });

    this.$watch('parseInputPayload', () => {
      this.decodeQRIS();
    });

    this.decodeQRIS();
  },

  clearSessionAndRedirectLogin() {
    try {
      localStorage.removeItem('qrisStaticData');
      sessionStorage.removeItem('qrisStaticData');
    } catch(e) {}
    const dest = window.location.protocol === 'file:' ? 'login.html' : '/login';
    window.location.href = dest;
  },

  setStaticData(payload, parsedObj = null) {
    if (!payload || typeof payload !== 'string') {
      this.clearSessionAndRedirectLogin();
      return;
    }

    this.staticPayload = payload.trim();
    this.parseInputPayload = payload.trim();
    this.generatedPayload = '';
    this.newCrc = '';
    
    try {
      const parsed = parsedObj || parseQRIS(this.staticPayload);
      if (parsed && parsed.summary) {
        this.parsedMerchantName = parsed.summary.merchantName || 'Merchant QRIS';
        this.parsedMerchantCity = parsed.summary.merchantCity || 'Indonesia';
        this.nmid = parsed.summary.nmid || 'ID1020211831969';
        this.mccCode = parsed.summary.mcc || '5411';
      } else {
        this.parsedMerchantName = 'Merchant QRIS';
        this.parsedMerchantCity = 'Indonesia';
        this.nmid = 'ID1020211831969';
        this.mccCode = '5411';
      }
    } catch(err) {
      console.error('Error parsing static QRIS:', err);
      this.parsedMerchantName = 'Merchant QRIS';
      this.parsedMerchantCity = 'Indonesia';
      this.nmid = 'ID1020211831969';
      this.mccCode = '5411';
    }

    this.decodeQRIS();
  },

  logout() {
    this.clearSessionAndRedirectLogin();
  },

  activeTabTitle() {
    switch (this.activeTab) {
      case 'home': return 'Dashboard Merchant';
      case 'generator': return 'Dynamic QRIS Generator';
      case 'parser': return 'QRIS Decoder & Parser';
      case 'history': return 'Riwayat Konversi QRIS';
      default: return 'QRIS Converter';
    }
  },

  copyText(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      alert('Teks berhasil disalin ke clipboard!');
    }).catch(err => {
      console.error('Gagal menyalin:', err);
    });
  },

  generateDynamic() {
    if (!this.staticPayload) {
      alert('Payload QRIS statis kosong!');
      return;
    }

    if (!this.amount || this.amount < 500) {
      alert('Nominal minimal transaksi QRIS adalah Rp 500!');
      return;
    }

    try {
      const dynamicPayload = generateDynamicQRIS(this.staticPayload, this.amount);
      this.generatedPayload = dynamicPayload;
      this.newCrc = dynamicPayload.slice(-4);

      try {
        const parsed = parseQRIS(this.staticPayload);
        if (parsed && parsed.summary) {
          this.parsedMerchantName = parsed.summary.merchantName || this.parsedMerchantName;
          this.parsedMerchantCity = parsed.summary.merchantCity || this.parsedMerchantCity;
          this.mccCode = parsed.summary.mcc || this.mccCode;
        }
      } catch(e) {}

      this.transactionLogs.unshift({
        id: Date.now().toString(),
        merchant: this.parsedMerchantName || 'Merchant QRIS',
        amount: Number(this.amount),
        time: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      });

      this.$nextTick(() => {
        this.renderQRCode();
      });
    } catch (err) {
      alert('Gagal menghasilkan QRIS Dinamis: ' + err.message);
    }
  },

  renderQRCode() {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer) return;
    qrContainer.innerHTML = "";
    if (typeof window.QRCode !== 'undefined') {
      try {
        new window.QRCode(qrContainer, {
          text: this.generatedPayload,
          width: 180,
          height: 180,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: window.QRCode.CorrectLevel.M
        });
      } catch (e) {
        console.error("QRCode render exception:", e);
      }
    }
  },

  downloadQR() {
    const qrImg = document.querySelector("#qrcode img");
    const qrCanvas = document.querySelector("#qrcode canvas");

    let dataUrl = '';
    if (qrImg && qrImg.src) {
      dataUrl = qrImg.src;
    } else if (qrCanvas) {
      dataUrl = qrCanvas.toDataURL("image/png");
    }

    if (dataUrl) {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `qris_dinamis_${(this.parsedMerchantName || 'merchant').replace(/\s+/g, '_')}_${this.amount}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Gagal mendownload gambar QR Code. Coba klik kanan pada gambar untuk menyimpannya.');
    }
  },

  decodeQRIS() {
    if (!this.parseInputPayload) {
      this.parsedDataList = [];
      return;
    }

    try {
      const parsed = parseTLVString(this.parseInputPayload);
      if (!parsed) {
        this.parsedDataList = [];
        return;
      }

      this.parsedDataList = Object.keys(parsed).map(tag => ({
        tag,
        length: parsed[tag].length,
        value: parsed[tag].value,
        name: TAG_NAMES[tag] || 'Reserved/Private Tag'
      }));
    } catch(err) {
      this.parsedDataList = [];
    }
  },

  clearHistory() {
    this.transactionLogs = [];
  }
}));

Alpine.start();
