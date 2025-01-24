# Sistem Manajemen Buku Perpustakaan 📚

Sistem Manajemen Buku Perpustakaan adalah aplikasi berbasis web yang dirancang untuk mempermudah pengelolaan buku di perpustakaan. Sistem ini mendukung fitur seperti peminjaman, pengembalian, pengelolaan baik buku dan user.

## ✨ Fitur Utama
- Manajemen buku: Tambah, edit, hapus, dan daftar buku isertai gambar.
- Fitur Peminjaman dan Pengembalian buku.
- Filter dan pencarian berdasarkan kategori dan status buku.
- Sistem autentikasi berbasis token (Sanctum) menggunakan **Laravel-Breeze**.
- Responsif dengan desain modern menggunakan menggunakan **Next.JS**.

---

## 🚀 Instalasi

### **Backend**
1. Clone repository backend:
   ```bash
   git clone https://github.com/madebyhas/SMBP.git
   cd SMBP
   cd backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Salin file `.env.example` ke `.env`:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Atur konfigurasi database di file `.env`
   Atur .env untuk koneksi frontend dan backend pada aplikasi Anda :
    ```env
    APP_URL=http://localhost:8000
    FRONTEND_URL=http://localhost:3000
   ```
   Dan .env untuk mengatur DB yang anda gunakan :
   ```env
   DB_CONNECTION=your_database_driver
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_passwordd
   ```

6. Migrasi database:
   ```bash
   php artisan migrate --seed
   ```

7. Jalankan server backend:
   ```bash
   php artisan serve
   ```

---

### **Frontend**
1. Clone repository frontend:
   Jika posisi masih berada di folder backend, lakukan :
   ```bash
   cd ..
   cd frontend
   ```
   Jika sudah terletak pada folder utama SMBP, lakukan :
    ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Salin file `.env.local.example` ke `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

4. Konfigurasikan URL backend API di file `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

5. Jalankan aplikasi frontend:
   ```bash
   npm run dev
   ```

---

## 🛠️ Teknologi yang Digunakan
- **Backend**: Laravel, Sanctum, MySQL
- **Frontend**: Next.js, Tailwind CSS
- **Autentikasi**: Token-based (Sanctum)

---

## 📂 Struktur Folder
```
SMBP/
├── backend/        # Backend aplikasi berbasis Laravel
├── frontend/       # Frontend aplikasi berbasis Next.js
├── README.md       # Dokumentasi proyek
```

---

## 💡 Kontribusi
Kami menyambut kontribusi dari siapa pun! Silakan buat pull request atau buka issue jika menemukan masalah.

---

## Live Preview
Anda dapat melihat pratinjau langsung proyek ini melalui link berikut:

👉 Live Preview

- **Backend**: Supabase
- **Frontend**: Netlify

---

## 📜 Lisensi
Proyek ini menggunakan lisensi [MIT](LICENSE).

---

Jika ada pertanyaan lebih lanjut, silakan hubungi kami melalui [GitHub Issues](https://github.com/madebyhas/SMBP/issues). 😊

--- 

