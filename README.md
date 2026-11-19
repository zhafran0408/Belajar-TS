# 📖 The Quiet Space

> *"Breathe. Reflect. Grow."* — A minimalist, editorial-style quote application.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

## 📌 Tentang Project
**The Quiet Space** adalah aplikasi web yang menampilkan kumpulan kata-kata mutiara (quotes) dengan desain antarmuka ala majalah editorial. Project ini dibangun untuk mendalami implementasi *TypeScript* yang aman (*type-safe*) di dalam ekosistem *React*.

## ✨ Fitur Utama
- 🌗 **Light & Dark Mode**: Transisi tema yang mulus dan nyaman di mata.
- 🎲 **Mode Filter & Sort**: Mengurutkan quote berdasarkan teks (Z-A), penulis (A-Z), atau memfilter quote dari penulis spesifik.
- 💾 **Local Database Simulation**: Menggunakan `json-server` sebagai backend lokal (simulasi REST API).
- ⏳ **Loading & Error States**: Penanganan *state* saat data sedang dimuat atau koneksi terputus.
- 🛡️ **Strict Typing**: Menggunakan `Enum`, `Interface`, dan `Type Alias` untuk validasi data dari API.

## 🚀 Cara Menjalankan di Komputer Lokal

Karena project ini menggunakan database lokal, kamu perlu menjalankan **dua terminal** secara bersamaan.

**1. Jalankan Database (Terminal 1)**
Pastikan kamu sudah menginstall `json-server` secara global.
```bash
npm install -g json-server@0.17.4
json-server --watch db.json --port 3000
