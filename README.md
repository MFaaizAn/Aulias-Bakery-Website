# Aulias-Bakery-Website

# 🍞 Aulia's Bakery - Order Management System

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

**Live Demo:** [https://mfaaizan.github.io/Aulias-Bakery-Website/]

## 📖 Deskripsi Proyek
Aulia's Bakery adalah prototipe aplikasi *Front-End* berbasis web untuk manajemen pemesanan toko roti. Proyek ini dibangun sepenuhnya menggunakan **Vanilla JavaScript (Tanpa Framework)** untuk mendemonstrasikan pemahaman fundamental mengenai manipulasi DOM, manajemen *state* lintas halaman, dan integrasi API *asynchronous*.

Aplikasi ini memecahkan masalah pencatatan pesanan manual dengan menyediakan dua antarmuka terpisah: 
1. **Halaman Etalase (Client-side):** Memungkinkan pelanggan memilih menu dan melakukan *checkout* interaktif.
2. **Dashboard Admin:** Memungkinkan pemilik toko melihat rekapitulasi pesanan masuk secara *real-time*.

## ✨ Fitur Utama
* **Dynamic Menu Rendering:** Daftar menu dirender secara dinamis dari server (berbasis JSON) menggunakan `Fetch API`.
* **Interactive Shopping Cart:** Sistem keranjang belanja yang menghitung total harga secara *real-time* dan mencegah *checkout* kosong.
* **Persistent State Management:** Menggunakan `Browser LocalStorage` agar data keranjang dan riwayat pesanan tidak hilang saat halaman di-*refresh* atau saat berpindah ke halaman Admin.
* **Separation of Concerns:** Arsitektur antarmuka yang dipisah antara pengguna umum (`index.html`) dan area terkelola (`admin.html`).
* **Responsive Design:** Tata letak disesuaikan dengan CSS Flexbox dan Grid agar tampil rapi di perangkat *mobile* maupun *desktop*.

## 🧠 Tantangan & Pembelajaran
Tantangan terbesar dalam pengembangan aplikasi ini terjadi pada fase integrasi API. Saat merombak sistem *hardcoded* HTML menjadi data dinamis dari file JSON, tombol "Tambah ke Keranjang" sempat tidak merespons klik dari pengguna.

**Solusi:** Melalui proses *debugging*, saya mengidentifikasi masalah pada siklus hidup elemen DOM (*DOM Lifecycle*). Tombol-tombol baru yang di-*spawn* oleh JavaScript tidak mewarisi *Event Listener* bawaan. Saya berhasil menyelesaikan masalah ini dengan mengimplementasikan teknik **Event Delegation**—menempatkan satu *listener* pada level `document` untuk menangkap aksi klik dari elemen target secara dinamis.

## 🛠️ Cara Menjalankan Proyek Secara Lokal
Karena proyek ini menggunakan `Fetch API` untuk mengambil file eksternal, browser akan memblokir *request* jika dibuka langsung dari direktori (*CORS Policy*).
1. *Clone repository* ini.
2. Buka proyek menggunakan *code editor* (seperti VS Code).
3. Jalankan menggunakan ekstensi **Live Server** (atau server lokal Node/Python).

## 👨‍💻 Penulis
**Muhammad Faaiz Anugrah**
* Hubungi saya via [www.linkedin.com/in/muhammad-faaiz-anugrah-132253313]
