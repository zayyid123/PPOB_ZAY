# SIMS PPOB - Zayyid

Sebuah aplikasi web PPOB (Payment Point Online Bank) yang dibangun menggunakan React, TypeScript, dan Vite.

## Cara Install

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda:

### 1. Prasyarat
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- NPM (termasuk saat menginstal Node.js)

### 2. Instalasi Dependensi
Jalankan perintah berikut di terminal untuk menginstal semua package yang diperlukan:
```bash
npm install
```

### 3. Konfigurasi Environment (ENV)
Proyek ini memerlukan konfigurasi URL API. Ikuti langkah berikut:
1. Salin file `.env.example` dan ubah namanya menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
2. Buka file `.env` dan sesuaikan nilai `VITE_API_URL` dengan URL API yang valid:
   ```env
   VITE_API_URL='ISI_DENGAN_URL_API_ANDA'
   ```

### 4. Menjalankan Proyek (Development)
Untuk menjalankan server pengembangan lokal, gunakan perintah:
```bash
npm run dev
```
Setelah dijalankan, buka browser dan akses alamat yang tertera di terminal (biasanya `http://localhost:5173`).

### 5. Build untuk Produksi
Jika ingin melakukan build proyek untuk deployment:
```bash
npm run build
```
Hasil build akan tersedia di folder `/dist`.

## Fitur Utama
- Authentication (Login & Register)
- Dashboard dengan Banner & Services
- Top Up Saldo
- Pembayaran Layanan (Dynamic Routing)
- Riwayat Transaksi (Pagination)
- Manajemen Profil (Edit Data & Foto Profil)

## Account Percobaan

Email: [zay@gmail.com]
Password: [12345678]

---
