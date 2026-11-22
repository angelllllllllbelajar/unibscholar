<div align="center">

# 🎓 UNIB Scholar

**Satu pintu untuk menemukan riset, peneliti, dan karya ilmiah Universitas Bengkulu.**

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/status-dalam%20pengembangan-yellow)

</div>

---

## ✨ Apa itu UNIB Scholar?

Setiap tahun, dosen Universitas Bengkulu menghasilkan banyak jurnal, prosiding, buku, dan proyek riset. Sayangnya, karya-karya itu tersebar di mana-mana: repository kampus, jurnal internal prodi, profil SINTA, hingga halaman Google Scholar milik masing-masing dosen. Kalau Anda ingin tahu *siapa meneliti apa di UNIB*, Anda harus membuka banyak tempat satu per satu.

**UNIB Scholar** hadir untuk mengubah itu. Ini adalah portal web yang menghimpun profil peneliti, publikasi ilmiah, pusat studi, dan proyek riset UNIB dalam satu tempat yang bisa dicari, disaring, dan dijelajahi oleh siapa saja, tanpa perlu login.

Bayangkan sebuah "etalase riset" universitas: mahasiswa bisa mencari calon pembimbing, peneliti bisa menemukan mitra kolaborasi, pemerintah daerah atau pihak industri bisa menemukan pakar dan hasil riset yang relevan, dan pihak kampus bisa melihat gambaran kinerja riset secara utuh.

---

## 🎯 Untuk Siapa?

| Pengguna | Yang bisa dilakukan |
|---|---|
| **Mahasiswa** | Mencari dosen berdasarkan bidang keahlian, menemukan referensi dari karya dosen UNIB |
| **Dosen dan peneliti** | Melihat rekam jejak publikasi, menemukan kolega dengan topik serupa, membuka peluang kolaborasi |
| **Masyarakat, pemerintah daerah, dan industri** | Menemukan pakar dan hasil riset yang relevan dengan kebutuhan mereka |
| **Pimpinan dan pengelola kampus** | Memantau ringkasan kinerja riset institusi untuk keperluan pelaporan |
| **Admin** | Mengelola dan memverifikasi data yang tampil di portal |

---

## 🚀 Fitur

### 🔎 Pencarian dan Penyaringan

Satu kolom pencarian untuk menemukan peneliti, publikasi, pusat studi, maupun proyek riset sekaligus. Hasilnya bisa disaring berdasarkan **fakultas, program studi, topik riset, tujuan pembangunan berkelanjutan (SDG), dan rentang tahun**, lalu diurutkan sesuai kebutuhan.

### 👩‍🔬 Profil Peneliti

Setiap dosen punya halaman profil yang memuat:

- Biodata, jabatan akademik, fakultas, dan afiliasi
- Tautan ke profil eksternal (SINTA, Google Scholar, Scopus, ORCID)
- Grafik perkembangan jumlah publikasi dan proyek
- Skor dan indikator kinerja riset dari SINTA
- Topik riset utama dan keterkaitannya dengan SDG
- Rekomendasi peneliti dengan topik yang beririsan
- **Jejaring kolaborasi** yang menampilkan siapa saja yang sering berkarya bersama

### 📚 Katalog Publikasi

Daftar karya ilmiah yang bisa ditampilkan dalam tampilan kartu, lengkap dengan judul, penulis, tahun, nama jurnal atau venue, serta jumlah sitasi. Setiap publikasi memiliki halaman detail dan **tautan langsung ke sumber aslinya** (SINTA, DOI, atau Google Scholar), sehingga pengunjung selalu bisa menelusuri ke dokumen aslinya.

### 🏛️ Pusat Studi dan Unit Riset

Profil setiap pusat studi: kepala unit, kontak, anggota dan topik risetnya, jumlah publikasi dan proyek, serta SDG yang menjadi fokusnya.

### 🧪 Proyek Riset

Daftar proyek riset berikut tim peneliti, skema pendanaan, kata kunci, abstrak, dan SDG terkait. Tersedia juga rekomendasi proyek yang mirip untuk membantu eksplorasi.

### 📊 Dashboard Statistik

Ringkasan kinerja riset universitas dalam satu layar: total publikasi, sebaran dosen per fakultas, dan tren riset dari tahun ke tahun.

### 🛠️ Panel Admin

Area khusus pengelola portal untuk:

- Login dan ganti password dengan aman
- Memperbarui data peneliti dan publikasi dari SINTA
- Menambah, mengubah, dan menghapus data peneliti, publikasi, pusat studi (beserta anggotanya), dan proyek riset
- Memverifikasi publikasi: menyetujui atau menolak data yang masuk
- Import dan export daftar data dalam format CSV

---

## 🗺️ Halaman di Portal

| Halaman | Isi |
|---|---|
| **Home** | Pencarian utama, ringkasan jumlah karya terindeks, dan pintasan ke seluruh bagian portal |
| **Researchers** | Direktori peneliti dengan filter fakultas, topik, dan SDG, serta halaman detail tiap peneliti |
| **Publications** | Katalog karya ilmiah dengan filter, pengurutan, dan halaman detail |
| **Study Center** | Direktori pusat studi dan unit riset beserta profilnya |
| **Projects** | Direktori proyek riset dengan filter tahun, pusat studi, dan peneliti utama |
| **Admin** | Dashboard verifikasi dan manajemen seluruh data |

<!-- Opsional: tambahkan screenshot di sini, misalnya ![Halaman Home](docs/home.png) -->

---

## 🧩 Dari Mana Datanya?

- **Peneliti dan publikasi** diambil dari **SINTA**, pangkalan data resmi Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi, sehingga data yang tampil bersumber dari rujukan nasional.
- **Pusat studi dan proyek riset** tidak tersedia di SINTA, jadi data ini dikelola langsung oleh admin portal.

---

## 🛠️ Dibangun Dengan

- [React](https://react.dev/) untuk antarmuka
- [Vite](https://vite.dev/) sebagai build tool dan server pengembangan
- [Oxlint](https://oxc.rs/) untuk menjaga kualitas kode

Tampilan dirancang responsif sehingga nyaman dibuka di desktop, tablet, maupun ponsel.

---

## ▶️ Menjalankan di Komputer Anda

Pastikan [Node.js](https://nodejs.org/) sudah terpasang, lalu:

```bash
# Unduh proyek
git clone https://github.com/angelllllllllbelajar/unibscholar.git
cd unibscholar

# Pasang dependensi
npm install

# Jalankan mode pengembangan
npm run dev
```

Buka `http://localhost:5173` di browser, dan portal siap dijelajahi.

Untuk membuat versi produksi:

```bash
npm run build
```

---

## 📌 Cakupan Saat Ini

Agar ekspektasi jelas, versi saat ini:

- Mengandalkan SINTA sebagai satu-satunya sumber data peneliti dan publikasi
- Belum mencakup data HKI, kegiatan pengabdian kepada masyarakat, dan tesis
- Belum menyediakan akun personal bagi dosen; pengelolaan data dilakukan melalui akun admin

---

<div align="center">

Dikembangkan untuk Universitas Bengkulu 🇮🇩

</div>
