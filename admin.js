function muatPesananAdmin() {
    // 1. Cari elemen tubuh tabel di HTML
    const tabelBody = document.getElementById('body-tabel-pesanan');
    if (!tabelBody) return; // Jaga-jaga kalau elemen tidak ditemukan

    // 2. Ambil data riwayat pesanan dari brankas LocalStorage
    let riwayatPesanan = localStorage.getItem('pesananMasukAdmin');
    let daftarPesanan = riwayatPesanan ? JSON.parse(riwayatPesanan) : [];

    // 3. Kosongkan tabel dari data palsu (dummy) buatan kita di Sprint 1
    tabelBody.innerHTML = "";

    // 4. Jika belum ada pesanan masuk sama sekali
    if (daftarPesanan.length === 0) {
        tabelBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px;">Belum ada pesanan masuk hari ini. 😴</td></tr>`;
        return;
    }

    // 5. Looping data pesanan asli dan buat baris tabel (<tr>)
    daftarPesanan.forEach(function(pesanan) {
        
        // Teknik menggabungkan isi array items (roti) menjadi satu teks berjejer
        let detailRoti = pesanan.items.map(function(item) {
            return item.jumlah + "x " + item.nama;
        }).join('<br>'); // Pakai <br> agar nama roti baris-berbaris ke bawah

        // Menentukan warna tombol status
        let classStatus = pesanan.status === "Menunggu" ? "menunggu" : "selesai";

        // Menyusun elemen HTML untuk satu baris tabel
        let barisHTML = `
            <tr>
                <td><strong>${pesanan.id}</strong></td>
                <td>${pesanan.namaPelanggan}</td>
                <td>${detailRoti}</td>
                <td>${pesanan.total}</td>
                <td><span class="status ${classStatus}">${pesanan.status}</span></td>
            </tr>
        `;

        // Masukkan baris tersebut ke dalam tabel HTML
        tabelBody.innerHTML += barisHTML;
    });
}

// Langsung eksekusi fungsinya saat halaman admin dibuka
muatPesananAdmin();