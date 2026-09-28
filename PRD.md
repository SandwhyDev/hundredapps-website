# PRD — Website Portofolio Hundredapps

## Ringkasan

Website satu halaman untuk memperkenalkan Hundredapps sebagai naungan berbagai aplikasi dan game mobile. Halaman menonjolkan identitas visual logo, menjelaskan nilai perusahaan, dan menampilkan seluruh produk yang tampak pada referensi pengguna.

## Tujuan

- Pengunjung memahami Hundredapps dan ragam produknya dalam satu kunjungan singkat.
- Pengunjung dapat menelusuri produk berdasarkan aplikasi atau game dan melihat platformnya.
- Calon mitra dapat menemukan kanal kontak resmi setelah alamatnya dikonfirmasi.

## Pengguna utama

- Calon pengguna yang ingin mengetahui aplikasi dan game Hundredapps.
- Calon mitra atau klien yang ingin melihat cakupan portofolio.

## Cakupan versi pertama

1. **Hero** dengan slogan “Small dots. Big ideas.”, identitas logo, animasi orbit, dan tautan ke karya.
2. **Tentang Hundredapps** berisi narasi singkat dan angka ringkasan portofolio.
3. **Cerita saat scroll** menahan satu panggung visual di layar dan membawa pengunjung melalui tiga bab: satu ide, beragam produk, lalu satu naungan Hundredapps. Gerak dan pergantian bab mengikuti posisi scroll; pengunjung dapat menggulir maju atau mundur.
4. **Portofolio** berisi 12 produk unik yang disimpulkan dari 16 listing pada referensi. Setiap kartu menunjukkan nama, jenis umum, dan platform. Filter Semua, Aplikasi, dan Game bekerja tanpa memuat ulang halaman.
5. **Pendekatan** menjelaskan cara Hundredapps melihat peluang, membuat, dan mengembangkan produk.
6. **Kontak** dengan area ajakan kolaborasi. Tautan email ditambahkan setelah alamat resmi dikonfirmasi.
7. **Pilihan bahasa** ID / EN di header untuk mengganti teks navigasi, narasi, filter, kategori produk, dan label aksesibilitas tanpa memuat ulang halaman. Bahasa awal adalah Indonesia; pilihan terakhir disimpan di browser. Nama produk serta slogan merek tetap seperti aslinya.

## Daftar produk dan platform

| Produk | Platform pada referensi |
| --- | --- |
| GoodJob / Good Job - Task Management | Google Play, App Store |
| Get Rich / GetRich - Spending Manager | Google Play, App Store |
| Mobin / Mobin - Inventory Manager | Google Play, App Store |
| Amuba | Google Play, App Store |
| Smart Shopper | Google Play |
| Stack Up - Stacking Game | App Store |
| Mind Stack - Stacking game | App Store |
| Furple | App Store |
| SMOP! Grocery Shopping List | App Store |
| MoodBuddy! | App Store |
| #SpeakUp | App Store |
| Trumecs | App Store |

Nama yang berbeda antar store digabung sebagai satu produk apabila terlihat merujuk pada produk yang sama. Kategori produk yang tidak jelas dari namanya diberi label umum. Visual kartu merupakan ilustrasi; tautan store dan aset aplikasi asli dapat ditambahkan setelah URL serta file resminya tersedia.

## Identitas dan pengalaman

- Palet: navy gelap, cyan, biru elektrik, dan ungu sesuai logo yang diberikan.
- Tipografi: Space Grotesk untuk judul dan DM Sans untuk isi, dengan fallback sistem.
- Gerak: Anime.js untuk kemunculan hero, rotasi orbit, dan respons filter. Bagian cerita memakai panggung sticky, transisi tiga bab, skala dan rotasi visual, serta garis progres yang dikendalikan posisi scroll. Efek kedalaman lain tetap halus. Pada preferensi reduced motion, ketiga bab tampil berurutan tanpa panggung sticky atau transformasi scroll.
- Desain responsif untuk desktop, tablet, dan ponsel.
- Bahasa awal halaman: Indonesia, dengan pilihan Inggris yang bisa diubah kapan saja.
- Pratinjau saat tautan dibagikan menggunakan metadata Open Graph dan Twitter dengan simbol Hundredapps tanpa wordmark sebagai gambar.

## Kriteria penerimaan

- Halaman bisa dibuka langsung sebagai situs statis tanpa proses build.
- Kedua belas produk tampil pada filter Semua; filter Aplikasi dan Game menampilkan kategori yang sesuai.
- Navigasi jangkar dan menu ponsel berfungsi dengan keyboard dan pointer.
- Pilihan ID / EN dapat dipakai di desktop dan ponsel, memperbarui atribut bahasa halaman, dan tetap terpilih setelah halaman dimuat ulang.
- Narasi tiga bab terlihat saat scroll ke bawah maupun ke atas; konten tetap terbaca pada layar kecil dan saat reduced motion aktif.
- Konten tetap terlihat apabila Anime.js atau font eksternal gagal dimuat.
- Tidak ada klaim URL store, testimoni, metrik unduhan, atau detail produk yang tidak tersedia dalam referensi.

## Di luar cakupan versi pertama

- Halaman detail tiap produk, CMS, formulir kontak backend, analitik, dan integrasi store.
- Aset ikon resolusi tinggi serta deskripsi resmi tiap produk yang belum disediakan.

## Kebutuhan sebelum peluncuran publik

- Konfirmasi alamat email resmi untuk mengaktifkan tombol kontak.
- Sediakan URL store resmi dan ikon produk jika kartu perlu menjadi tautan keluar.
- Tinjau kembali kategori serta penamaan produk sesuai katalog resmi.
