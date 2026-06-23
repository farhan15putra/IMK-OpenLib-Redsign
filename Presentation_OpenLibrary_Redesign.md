---
marp: true
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
  
  section {
    font-family: 'Outfit', sans-serif;
    background-color: #FDFBF3;
    color: #252422;
    padding: 60px 80px;
  }
  
  h1, h2, h3 {
    color: #8B0000;
  }
  
  h1 {
    font-size: 3.5em;
    font-weight: 700;
    margin-bottom: 0.2em;
    border-bottom: 4px solid #8B0000;
    display: inline-block;
    padding-bottom: 10px;
  }
  
  h2 {
    font-size: 2.5em;
    color: #c0392b;
    margin-top: 0;
  }

  p {
    font-size: 1.4em;
    line-height: 1.6;
  }
  
  ul, ol {
    font-size: 1.3em;
    line-height: 1.6;
  }
  
  .card {
    background: #ffffff;
    border: 2px solid #E8E6D9;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .title-slide h1 {
    font-size: 4.5em;
    border: none;
    text-align: center;
    display: block;
    margin-top: 15%;
  }
  
  .title-slide p {
    text-align: center;
    font-size: 1.8em;
    color: #555;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .highlight {
    color: #8B0000;
    font-weight: bold;
  }

  .badge {
    background-color: #8B0000;
    color: white;
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 0.9em;
    display: inline-block;
    margin-bottom: 15px;
    font-weight: bold;
  }
---

<!-- _class: title-slide -->

# Open Library Redesign
<p>Meningkatkan Pengalaman Pengguna dengan Desain Intuitif</p>
<br>
<p style="font-size: 1.2em; color: #8B0000; font-weight: bold;">Kelompok Wondr</p>

---

# Anggota Kelompok Wondr

<div class="card grid">
  <div>
    <ul>
      <li><span class="highlight">Anggota 1</span> - [NIM]</li>
      <li><span class="highlight">Anggota 2</span> - [NIM]</li>
      <li><span class="highlight">Anggota 3</span> - [NIM]</li>
      <li><span class="highlight">Anggota 4</span> - [NIM]</li>
    </ul>
  </div>
  <div>
    <ul>
      <li><span class="highlight">Anggota 5</span> - [NIM]</li>
      <li><span class="highlight">Anggota 6</span> - [NIM]</li>
      <li><span class="highlight">Anggota 7</span> - [NIM]</li>
    </ul>
  </div>
</div>

---

# Latar Belakang & Tujuan Redesign

<div class="grid">
  <div class="card">
    <h2>Latar Belakang</h2>
    <p>Kebutuhan akses literatur (buku, jurnal, skripsi) yang lebih <b>cepat, terstruktur,</b> dan <b>responsif</b> untuk mahasiswa Telkom University.</p>
  </div>
  <div class="card">
    <h2>Tujuan Utama</h2>
    <ul>
      <li>Antarmuka lebih modern & <i>user-friendly</i>.</li>
      <li>Pencarian & pemfilteran literatur yang simpel.</li>
      <li>Aksesibilitas maksimal (Dark Mode & Responsif).</li>
    </ul>
  </div>
</div>

---

# Fitur Unggulan Redesign

<div class="card">
  <ol>
    <li><span class="highlight">Dashboard Personal:</span> Statistik membaca, riwayat peminjaman.</li>
    <li><span class="highlight">Katalog & Filter:</span> Kombinasi filter (Tahun, Prodi, Format) <i>real-time</i>.</li>
    <li><span class="highlight">Reader & Download:</span> Membaca e-book tanpa pindah tab.</li>
    <li><span class="highlight">Manajemen Bookmark:</span> Simpan karya tulis favorit.</li>
    <li><span class="highlight">Dukungan Tema:</span> Light Mode (Cream) & Dark Mode (Dark Gray).</li>
  </ol>
</div>

---

# Wireframe: Login & Home Dashboard

<div class="grid">
  <div class="card">
    <div class="badge">Halaman Login</div>
    <ul>
      <li>Layout <i>split-screen</i> elegan.</li>
      <li>Branding Telkom University yang kuat.</li>
      <li>Menonjolkan kesan <i>"Official eLibrary Hub"</i>.</li>
    </ul>
  </div>
  
  <div class="card">
    <div class="badge">Home Dashboard</div>
    <ul>
      <li>Akses cepat ke koleksi <i>E-Books/Journals</i>.</li>
      <li>Carousel dinamis: <b>New Arrivals</b> & <b>Top Picks</b>.</li>
      <li>Navigasi sidebar yang rapi (Home, Katalog, Riwayat, Bookmark).</li>
    </ul>
  </div>
</div>

---

# Wireframe: Katalog & Profil

<div class="grid">
  <div class="card">
    <div class="badge">Halaman Katalog</div>
    <ul>
      <li>Sidebar filter komprehensif.</li>
      <li>Card hasil pencarian: cover, badge, ketersediaan.</li>
      <li>Action buttons yang jelas untuk tiap buku.</li>
    </ul>
  </div>
  
  <div class="card">
    <div class="badge">Profil Mahasiswa</div>
    <ul>
      <li>Digital ID Card + QR code terintegrasi.</li>
      <li>Grid statistik perpustakaan personal.</li>
      <li>Status <i>Reader Rank</i> mahasiswa.</li>
    </ul>
  </div>
</div>

---

# Desain Responsif (Mobile View)

<div class="card">
  <h2>Adaptasi Mobile</h2>
  <ul>
    <li>Sidebar navigasi berubah menjadi <b>Bottom Navigation Bar</b> untuk aksesibilitas satu tangan.</li>
    <li>Header dirancang ringkas (Search, Notifikasi, Avatar).</li>
    <li>Card dan carousel dioptimalkan menjadi <i>full-width</i> & <i>swipeable</i> untuk pengalaman sentuh terbaik.</li>
  </ul>
</div>

---

# Rencana Usability Testing (UT)

<div class="card">
  <p><b>Tujuan:</b> Memvalidasi desain melalui <i>Task Completion Rate</i>, <i>Time on Task</i>, dan <i>System Usability Scale (SUS)</i>.</p>
  <br>
  <h3>Skenario Pengujian:</h3>
  <ol>
    <li>Pencarian sederhana ("Machine Learning").</li>
    <li>Membuka <i>reader</i> jurnal dan <i>download</i>.</li>
    <li>Menggunakan kombinasi filter (Tahun, Prodi, Format).</li>
    <li>Mengubah bahasa antarmuka.</li>
    <li>Menyimpan dan mengakses jurnal dari Bookmark.</li>
  </ol>
</div>

---

# Logistik & Target Pengujian

<div class="grid">
  <div class="card">
    <div class="badge">Metode & Platform</div>
    <ul>
      <li><b>Metode:</b> <i>Think-Aloud Protocol</i></li>
      <li><b>Platform:</b> Interactive React Prototype (Desktop & Mobile)</li>
    </ul>
  </div>
  <div class="card">
    <div class="badge">Pelaksanaan</div>
    <ul>
      <li><b>Durasi:</b> ~30-45 Menit/Responden</li>
      <li><b>Dokumentasi:</b> Rekaman layar, audio, observasi UX, error rate.</li>
    </ul>
  </div>
</div>

---

<!-- _class: title-slide -->

# Terima Kasih!
<p>Ada Pertanyaan?</p>
<br>
<p style="font-size: 1.2em; color: #8B0000; font-weight: bold;">Open Library Redesign - Kelompok Wondr</p>
