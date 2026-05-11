import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      profile: {
        title: "Student Profile",
        memberStatus: "Active Library Member",
        editProfile: "Edit Profile",
        contactInfo: "Contact Info",
        email: "Email Address",
        phone: "Phone Number",
        location: "Campus Location",
        booksRead: "Books Read",
        borrowed: "Currently Borrowed",
        overdue: "Overdue Status",
        rank: "Reader Rank",
        activityTitle: "Recent Library Activity",
        viewHistory: "View Full History",
        major: "Informatics Engineering",
      },
      actions: {
        Borrowed: "Borrowed",
        Returned: "Returned",
        Reserved: "Reserved",
        PaidFine: "Paid Fine"
      }
    }
  },
  id: {
    translation: {
      profile: {
        title: "Profil Mahasiswa",
        memberStatus: "Anggota Perpustakaan Aktif",
        editProfile: "Edit Profil",
        contactInfo: "Info Kontak",
        email: "Alamat Email",
        phone: "Nomor Telepon",
        location: "Lokasi Kampus",
        booksRead: "Buku Dibaca",
        borrowed: "Sedang Dipinjam",
        overdue: "Status Terlambat",
        rank: "Peringkat Pembaca",
        activityTitle: "Aktivitas Perpustakaan Terbaru",
        viewHistory: "Lihat Riwayat Lengkap",
        major: "Teknik Informatika",
      },
      actions: {
        Borrowed: "Dipinjam",
        Returned: "Dikembalikan",
        Reserved: "Direservasi",
        PaidFine: "Denda Dibayar"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
