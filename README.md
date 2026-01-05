# CO&T - Coffee and Tea Ordering System

<div align="center">

# **Sistem Pemesanan Digital untuk Kedai Kopi & Teh**

Aplikasi web modern untuk memudahkan pelanggan memesan minuman dan membantu kasir memverifikasi pesanan menggunakan QR Code.

[🌐 Live Demo](#) • [📖 Dokumentasi](#dokumentasi) • [🚀 Instalasi](#instalasi)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Flowchart Alur Aplikasi](#-flowchart-alur-aplikasi)
- [Struktur Database](#-struktur-database)
- [Struktur Folder](#-struktur-folder)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Screenshot](#-screenshot)
- [Kontributor](#-kontributor)

---

## 📖 Tentang Proyek

**CO&T (Coffee and Tea)** adalah aplikasi web pemesanan minuman yang dikembangkan sebagai **Tugas Akhir Program Diploma 3**. Aplikasi ini memungkinkan pelanggan untuk:

- Melihat menu minuman dengan kategori
- Menambahkan item ke keranjang belanja
- Membuat pesanan dan mendapatkan QR Code
- Melakukan pembayaran via QRIS atau Cash di kasir

Untuk pihak kedai/kasir:

- Memverifikasi pesanan dengan scan QR Code
- Mengelola menu dan produk
- Melihat statistik dan laporan pesanan

### 🎯 Tujuan Pengembangan

1. Mempercepat proses pemesanan tanpa antrian panjang
2. Mengurangi kesalahan dalam pencatatan pesanan manual
3. Memberikan pengalaman digital yang modern kepada pelanggan
4. Memudahkan pengelolaan data pesanan dan menu

---

## ✨ Fitur Utama

### 👤 Fitur Pelanggan (Customer)

| Fitur                     | Deskripsi                                                                  |
| ------------------------- | -------------------------------------------------------------------------- |
| 🏠 **Landing Page**       | Halaman utama dengan hero section, featured products, dan informasi lokasi |
| 🔍 **Pencarian & Filter** | Cari menu berdasarkan nama dan filter berdasarkan kategori                 |
| 🛒 **Keranjang Belanja**  | Tambah, hapus, dan atur jumlah item pesanan                                |
| 📱 **QR Code Checkout**   | Generate QR Code untuk verifikasi pesanan di kasir                         |
| 💳 **Info Pembayaran**    | Instruksi pembayaran via QR Code atau Cash                                    |
| 📍 **Lokasi Toko**        | Google Maps embed untuk navigasi ke lokasi                                 |

### 👨‍💼 Fitur Admin/Kasir

| Fitur                       | Deskripsi                                |
| --------------------------- | ---------------------------------------- |
| 🔐 **Login Admin**          | Autentikasi untuk akses dashboard admin  |
| 📊 **Dashboard**            | Statistik produk, pesanan, dan kategori  |
| 🍽️ **Kelola Menu**          | CRUD produk (tambah, edit, hapus menu)   |
| 📋 **Kelola Pesanan**       | Lihat, filter, dan kelola semua pesanan  |
| 📷 **Scan QR Code**         | Verifikasi pesanan dengan scanner kamera |
| ✏️ **Input Manual**         | Input kode pesanan secara manual         |
| ✅ **Verifikasi & Selesai** | Update status pesanan                    |

---

## 🛠 Tech Stack

### Frontend

| Teknologi        | Versi  | Kegunaan                                    |
| ---------------- | ------ | ------------------------------------------- |
| **Vue.js 3**     | 3.5.22 | JavaScript framework dengan Composition API |
| **Vite**         | 7.1.7  | Build tool dan dev server yang cepat        |
| **Vue Router**   | 4.5.1  | Client-side routing                         |
| **Pinia**        | 3.0.3  | State management                            |
| **Tailwind CSS** | 3.4.18 | Utility-first CSS framework                 |

### Backend & Database

| Teknologi    | Kegunaan                                                                     |
| ------------ | ---------------------------------------------------------------------------- |
| **Supabase** | Backend-as-a-Service (BaaS) - Database PostgreSQL, Authentication, Real-time |

### Library Tambahan

| Library               | Kegunaan                           |
| --------------------- | ---------------------------------- |
| **qrcode**            | Generate QR Code untuk pesanan     |
| **vue-qrcode-reader** | Scanner QR Code menggunakan kamera |

### Deployment

| Platform   | Kegunaan                        |
| ---------- | ------------------------------- |
| **Vercel** | Hosting dan deployment aplikasi |

---

## 🏗 Arsitektur Sistem

```mermaid
graph TB
    subgraph Client["CLIENT (Browser)"]
        A1[Vue.js 3<br/>Components]
        A2[Vue Router<br/>Routing]
        A3[Pinia<br/>State Management]
        A4[Tailwind CSS<br/>Styling]
    end
    
    subgraph Supabase["SUPABASE (Backend)"]
        B1[PostgreSQL<br/>Database]
        B2[Auth<br/>Service]
        B3[Row Level<br/>Security]
        B4[(Tables:<br/>products, cart_items, orders)]
    end
    
    subgraph Vercel["VERCEL (Deployment)"]
        C1[Static Site Hosting<br/>CDN + HTTPS]
    end
    
    Vercel -->|Serves| Client
    Client -->|HTTPS/REST API| Supabase
    
    style Client fill:#e3f2fd
    style Supabase fill:#f3e5f5
    style Vercel fill:#e8f5e9
```

---

## 📊 Flowchart Alur Aplikasi

### 1. Alur Pemesanan (Customer Flow)

```mermaid
flowchart TD
    Start([Mulai]) --> Landing[Buka Website<br/>Landing Page]
    Landing --> Menu[Lihat Menu &<br/>Pilih Kategori]
    Menu --> AddCart{Tambah ke<br/>Keranjang?}
    
    AddCart -->|Tidak| Menu
    AddCart -->|Ya| Variant[Pilih Varian<br/>Hot/Cold]
    Variant --> InCart[Item Masuk<br/>Keranjang]
    
    InCart --> MoreItems{Pesan Lagi?}
    MoreItems -->|Ya| Menu
    MoreItems -->|Tidak| Checkout[Klik Checkout]
    
    Checkout --> InputName[Input Nama<br/>Opsional]
    InputName --> CreateOrder[Buat Pesanan]
    CreateOrder --> GenerateQR[Generate<br/>QR Code & Kode]
    
    GenerateQR --> Download[Download/Screenshot<br/>QR Code]
    Download --> Kasir[Tunjukkan QR<br/>ke Kasir]
    Kasir --> Payment[Bayar via<br/>QRIS/Cash]
    
    Payment --> Wait[Tunggu Pesanan<br/>Disiapkan]
    Wait --> Receive[Terima Pesanan]
    Receive --> End([Selesai])
    
    style Start fill:#4caf50,color:#fff
    style End fill:#4caf50,color:#fff
    style AddCart fill:#ff9800,color:#fff
    style MoreItems fill:#ff9800,color:#fff
    style GenerateQR fill:#2196f3,color:#fff
```
---
### 2. Alur Verifikasi Pesanan (Admin/Kasir Flow)

```mermaid
flowchart TD
    Start([Mulai]) --> Login[Login Admin]
    Login --> Dashboard[Buka Dashboard]
    Dashboard --> ClickVerify[Klik Menu<br/>Verifikasi Pesanan]
    
    ClickVerify --> SelectMode{Pilih Mode<br/>Verifikasi}
    SelectMode -->|Scan QR| ScanQR[Aktifkan Kamera<br/>Scan QR Code]
    SelectMode -->|Manual| InputCode[Input Kode<br/>Pesanan Manual]
    
    ScanQR --> FindOrder{Pesanan<br/>Ditemukan?}
    InputCode --> FindOrder
    
    FindOrder -->|Tidak| ErrorMsg[Tampilkan Pesan<br/>Pesanan Tidak Valid]
    ErrorMsg --> SelectMode
    
    FindOrder -->|Ya| ShowDetail[Tampilkan Detail<br/>Pesanan]
    ShowDetail --> CheckStatus{Status =<br/>Pending?}
    
    CheckStatus -->|Tidak| AlreadyDone[Pesanan Sudah<br/>Diverifikasi/Selesai]
    AlreadyDone --> SelectMode
    
    CheckStatus -->|Ya| ClickVerify2[Klik Tombol<br/>Verifikasi]
    ClickVerify2 --> UpdateVerified[Update Status<br/>→ Verified]
    
    UpdateVerified --> ProcessOrder[Proses Pesanan<br/>Siapkan Minuman]
    ProcessOrder --> ClickComplete[Klik Tombol<br/>Selesaikan]
    
    ClickComplete --> UpdateComplete[Update Status<br/>→ Completed]
    UpdateComplete --> DeliverOrder[Serahkan Pesanan<br/>ke Customer]
    DeliverOrder --> End([Selesai])
    
    style Start fill:#4caf50,color:#fff
    style End fill:#4caf50,color:#fff
    style SelectMode fill:#ff9800,color:#fff
    style FindOrder fill:#ff9800,color:#fff
    style CheckStatus fill:#ff9800,color:#fff
    style UpdateVerified fill:#2196f3,color:#fff
    style UpdateComplete fill:#2196f3,color:#fff
```

---
## DATA FLOW DIAGRAM (DFD)

### DFD Level 0 (Diagram Konteks)
```mermaid
graph TD
    %% Entitas Eksternal
    P[Pelanggan]
    A[Admin / Kasir]

    %% Sistem
    S((Sistem Informasi<br>Penjualan Co & Tea))

    %% Aliran Data Pelanggan -> Sistem
    P -->|Data Pesanan<br>Menu & Varian| S
    P -->|Info Checkout<br>Nama Pelanggan| S

    %% Aliran Data Sistem -> Pelanggan
    S -->|Info Menu & Harga| P
    S -->|QR Code &<br>Bukti Pesanan| P

    %% Aliran Data Admin/Kasir -> Sistem
    A -->|Data Produk Baru/Update<br>Manajemen Menu| S
    A -->|Data Verifikasi Scan QR| S
    A -->|Update Status Pesanan| S

    %% Aliran Data Sistem -> Admin/Kasir
    S -->|Laporan Penjualan| A
    S -->|Detail Pesanan| A
```

### DFD Level 1 (Diagram Proses)
```mermaid
graph TD
    %% Entitas
    P[Pelanggan]
    A[Admin / Kasir]

    %% Data Stores (Database Supabase)
    DS_Prod[(DS: Products)]
    DS_Cart[(DS: Cart Items)]
    DS_Order[(DS: Orders)]

    %% Proses 1.0: Kelola Menu
    subgraph P1 [1.0 Kelola Menu]
        Proc1((1.0 Kelola Menu))
    end
    A -->|Input Data Menu| Proc1
    Proc1 -->|Simpan/Update| DS_Prod
    DS_Prod -->|Info Menu| Proc1

    %% Proses 2.0: Pemesanan
    subgraph P2 [2.0 Pemesanan]
        Proc2((2.0 Pilih Menu<br>& Cart))
    end
    DS_Prod -->|List Menu| Proc2
    P -->|Pilih Item & Varian| Proc2
    Proc2 -->|Simpan Item| DS_Cart

    %% Proses 3.0: Checkout
    subgraph P3 [3.0 Checkout]
        Proc3((3.0 Checkout &<br>Generate QR))
    end
    DS_Cart -->|Ambil Item Cart| Proc3
    P -->|Input Nama| Proc3
    Proc3 -->|Create Order| DS_Order
    DS_Order -->|Return QR Code| Proc3
    Proc3 -->|Tampil QR| P

    %% Proses 4.0: Verifikasi
    subgraph P4 [4.0 Verifikasi]
        Proc4((4.0 Verifikasi<br>Pesanan))
    end
    A -->|Scan QR / Input Kode| Proc4
    DS_Order -->|Cek Data Order| Proc4
    Proc4 -->|Update Status: Verified| DS_Order
    Proc4 -->|Tampil Detail| A

    %% Proses 5.0: Laporan
    subgraph P5 [5.0 Laporan]
        Proc5((5.0 Laporan<br>Penjualan))
    end
    DS_Order -->|Data Transaksi| Proc5
    Proc5 -->|Statistik Harian| A

    %% Styling sederhana agar rapi
    classDef process fill:#f9f,stroke:#333,stroke-width:2px;
    classDef store fill:#ff9,stroke:#333,stroke-width:2px;
    class Proc1,Proc2,Proc3,Proc4,Proc5 process;
    class DS_Prod,DS_Cart,DS_Order store;
```
## 🗃 Struktur Database

### Tabel: `products`

| Kolom         | Tipe        | Deskripsi                           |
| ------------- | ----------- | ----------------------------------- |
| `id`          | UUID        | Primary Key                         |
| `name`        | VARCHAR     | Nama produk                         |
| `category`    | VARCHAR     | Kategori (Espresso Based, Tea, dll) |
| `price_hot`   | INTEGER     | Harga variant hot (dalam ribuan)    |
| `price_cold`  | INTEGER     | Harga variant cold (dalam ribuan)   |
| `image`       | TEXT        | URL gambar produk                   |
| `description` | TEXT        | Deskripsi produk                    |
| `is_favorite` | BOOLEAN     | Tampil di featured products         |
| `created_at`  | TIMESTAMPTZ | Waktu dibuat                        |

### Tabel: `cart_items`

| Kolom        | Tipe        | Deskripsi               |
| ------------ | ----------- | ----------------------- |
| `id`         | UUID        | Primary Key             |
| `session_id` | VARCHAR     | ID sesi browser (guest) |
| `product_id` | UUID        | Foreign Key ke products |
| `name`       | VARCHAR     | Nama produk             |
| `price`      | INTEGER     | Harga item              |
| `image`      | TEXT        | URL gambar              |
| `variant`    | VARCHAR     | Hot / Cold              |
| `quantity`   | INTEGER     | Jumlah item             |
| `created_at` | TIMESTAMPTZ | Waktu dibuat            |

### Tabel: `orders`

| Kolom           | Tipe        | Deskripsi                      |
| --------------- | ----------- | ------------------------------ |
| `id`            | UUID        | Primary Key                    |
| `order_code`    | VARCHAR(10) | Kode unik pesanan (6 karakter) |
| `customer_name` | VARCHAR     | Nama pelanggan                 |
| `items`         | JSONB       | Detail item pesanan            |
| `total_price`   | INTEGER     | Total harga (Rupiah)           |
| `status`        | VARCHAR     | pending / verified / completed |
| `created_at`    | TIMESTAMPTZ | Waktu pesanan dibuat           |
| `verified_at`   | TIMESTAMPTZ | Waktu diverifikasi             |
| `completed_at`  | TIMESTAMPTZ | Waktu selesai                  |

### Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    products ||--o{ cart_items : "has"
    cart_items }o--|| orders : "checkout creates"
    
    products {
        uuid id PK
        varchar name
        varchar category
        integer price_hot
        integer price_cold
        text image
        text description
        boolean is_favorite
        timestamptz created_at
    }
    
    cart_items {
        uuid id PK
        varchar session_id
        uuid product_id FK
        varchar name
        integer price
        text image
        varchar variant
        integer quantity
        timestamptz created_at
    }
    
    orders {
        uuid id PK
        varchar order_code UK
        varchar customer_name
        jsonb items
        integer total_price
        varchar status
        timestamptz created_at
        timestamptz verified_at
        timestamptz completed_at
    }
```

---

## 📁 Struktur Folder

```
project-co-and-tea/
├── public/                    # Static assets
│   └── favicon.ico
├── src/
│   ├── assets/               # Images, fonts, etc
│   │   └── main.css          # Global styles
│   ├── components/           # Reusable Vue components
│   │   ├── admin/            # Admin-related components
│   │   │   ├── AdminHeader.vue
│   │   │   ├── AdminStats.vue
│   │   │   ├── ProductForm.vue
│   │   │   └── ProductTable.vue
│   │   ├── cart/             # Cart components
│   │   │   └── CartItem.vue
│   │   ├── checkout/         # Checkout components
│   │   │   └── CheckoutModal.vue
│   │   ├── common/           # Common/shared components
│   │   │   ├── SkeletonCard.vue
│   │   │   ├── SuccessAnimation.vue
│   │   │   └── ToastNotification.vue
│   │   ├── landing/          # Landing page components
│   │   │   ├── HeroSection.vue
│   │   │   ├── FeaturedProducts.vue
│   │   │   ├── MenuSection.vue
│   │   │   └── LocationSection.vue
│   │   ├── layout/           # Layout components
│   │   │   ├── Navbar.vue
│   │   │   └── Footer.vue
│   │   └── product/          # Product components
│   │       ├── ProductCard.vue
│   │       └── ProductVariantModal.vue
│   ├── config/               # Configuration files
│   │   └── constants.js      # App constants & helpers
│   ├── router/               # Vue Router configuration
│   │   └── index.js
│   ├── stores/               # Pinia state management
│   │   ├── cartStore.js      # Cart state
│   │   ├── orderStore.js     # Order state
│   │   └── productStore.js   # Product state
│   ├── composables/          # Vue composables (reusable logic)
│   │   └── useFeedback.js    # Toast/notification helpers
│   ├── views/                # Page components
│   │   ├── admin/
│   │   │   ├── DashboardView.vue
│   │   │   └── LoginView.vue
│   │   ├── CartView.vue
│   │   ├── HomeView.vue
│   │   └── VerifyOrderView.vue
│   ├── App.vue               # Root component
│   ├── main.js               # App entry point
│   └── supabase.js           # Supabase client config
├── supabase/
│   └── migrations/           # Database migrations
│       └── create_orders_table.sql
├── .env                      # Environment variables
├── index.html                # HTML template
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite configuration
├── vercel.json               # Vercel deployment config
└── README.md                 # Documentation
```

---

## 🚀 Instalasi

### Prasyarat

- **Node.js** v20.19.0+ atau v22.12.0+
- **npm** v10+
- **Git**
- Akun **Supabase** (gratis)

### Langkah-langkah

1. **Clone repository**

   ```bash
   git clone https://github.com/username/project-co-and-tea.git
   cd project-co-and-tea
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**

   Buat file `.env` di root folder:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Setup Database**

   Jalankan migration SQL di Supabase SQL Editor:

   - Buka file `supabase/migrations/create_orders_table.sql`
   - Copy dan jalankan di Supabase Dashboard > SQL Editor

5. **Run Development Server**

   ```bash
   npm run dev
   ```

6. **Buka di Browser**
   ```
   http://localhost:5173
   ```

---

## ⚙ Konfigurasi

### Environment Variables

| Variable                 | Deskripsi                      |
| ------------------------ | ------------------------------ |
| `VITE_SUPABASE_URL`      | URL project Supabase           |
| `VITE_SUPABASE_ANON_KEY` | Anon/Public key Supabase       |
| `VITE_WHATSAPP_NUMBER`   | (Opsional) Nomor WhatsApp toko |

### Supabase Setup

1. Buat project baru di [Supabase](https://supabase.com)
2. Buat tabel `products`, `cart_items`, dan `orders`
3. Enable Row Level Security (RLS)
4. Setup authentication untuk admin

---

## 📸 Screenshot

### Landing Page (Customer)

- Hero section dengan branding
  ![alt text](image.png)

- Featured products
  ![alt text](image-1.png)

- Menu dengan kategori filter
  ![alt text](image-2.png)

- Lokasi toko dengan Google Maps
  ![alt text](image-3.png)

### Cart & Checkout

- Keranjang belanja
  ![alt text](image-4.png)

- Modal checkout dengan QR Code

  <img src="image-5.png" alt="alt text" height="400" width="300">

- Instruksi pembayaran QRIS/Cash<table>
  <tr>
    <td align="center">
      <img src="image-9.png" alt="QRIS Payment" width="250"/>
      <br><em>Modal bagian atas</em>
    </td>
    <td align="center">
      <img src="image-8.png" alt="Cash Payment" width="250" height="340"/>
      <br><em>Modal bagian bawah</em>
    </td>
  </tr>
</table>

### Admin Dashboard

- Statistik overview
  ![alt text](image-10.png)

- Kelola menu (CRUD)
  ![alt text](image-11.png)
- Kelola pesanan
  ![alt text](image-13.png)

- Verifikasi QR Code
  ![alt text](image-12.png)

---

## 🔧 Scripts

| Command           | Deskripsi                   |
| ----------------- | --------------------------- |
| `npm run dev`     | Jalankan development server |
| `npm run build`   | Build untuk production      |
| `npm run preview` | Preview production build    |

<div align="center">

**Dibuat dengan ❤️ menggunakan Vue.js & Supabase**

© 2024-2025 CO&T - Coffee and Tea Ordering System

</div>
