# Proyek Backend Developer Menggunakan ExpressJS dan MySQL

## Gambaran Umum

Proyek ini adalah aplikasi backend sederhana yang dibangun dengan **ExpressJS** dan **MySQL**. Tujuan utama proyek ini adalah untuk menyediakan sistem CRUD (Create, Read, Update, Delete) untuk mengelola data dalam database MySQL.

Untuk menyederhanakan interaksi dengan database dan mempercepat pengembangan, proyek ini menggunakan **Prisma** sebagai alat ORM (Object-Relational Mapping). Prisma memudahkan manipulasi data dalam database dengan cara yang lebih efisien dan terstruktur, sehingga memudahkan pengelolaan data dan pembuatan query yang kompleks.

## Fitur Utama

- **Create**: Menambahkan data baru ke dalam database.
- **Read**: Mengambil dan menampilkan data yang ada dari database.
- **Update**: Memperbarui data yang sudah ada di database.
- **Delete**: Menghapus data dari database.

## Alat dan Teknologi yang Digunakan

- **ExpressJS**: Framework Node.js untuk membangun server backend dan API.
- **MySQL**: Sistem manajemen basis data relasional untuk menyimpan data.
- **Prisma**: ORM untuk memudahkan operasi database dengan tipe data yang aman dan query yang efisien.

Dengan menggunakan Prisma, proses pengembangan menjadi lebih cepat dan lebih mudah, karena Prisma menangani banyak aspek teknis dari interaksi database, memungkinkan pengembang untuk fokus pada logika bisnis dan fitur aplikasi.

## Cara Penggunaan

Ikuti langkah-langkah berikut untuk mengatur dan menjalankan proyek:

1. **Clone Repository**

   ```bash
   git clone https://github.com/jellanarta/asaplombok.git
  ```

2. **Pindah ke Direktori Proyek**
    Pindah ke direktori proyek (misalnya, jika nama foldernya adalah asaplombok):
    ```
    cd asaplombok
    ```
3. **Instal Dependensi**
    Instal paket yang diperlukan sesuai dengan yang terdaftar di package.json:
    ```
    npm install
    # atau
    yarn install
    ```
4. **Konfigurasi Koneksi Database**
    Atur koneksi database di file .env. File ini harus berisi baris berikut:
    ```
    DATABASE_URL="mysql://username:password@localhost:3306/databasename"
    ```
    Sebagai contoh, jika menggunakan MySQL dengan password kosong, URL koneksi mungkin terlihat seperti ini:
    ```
    DATABASE_URL="mysql://root:@localhost:3306/asaplombok"
    ```
5. **Buat Database MySQL**
    Pastikan database MySQL sudah ada. Anda dapat membuatnya menggunakan klien MySQL atau alat baris perintah:
    ```
    CREATE DATABASE asaplombok;
    ```
6. **Jalankan Prisma Migrations**
    Hasilkan klien Prisma dan terapkan migrasi untuk membuat tabel yang diperlukan (misalnya, tabel bernama task sesuai dengan model di prisma/schema.prisma). Pastikan database yang ditentukan di file .env sudah ada.
    ```
    npx prisma migrate dev
    ```
    Perintah ini akan membuat tabel berdasarkan skema Prisma Anda dan menerapkan migrasi yang tertunda.


## API Endpoints