function muatPesananAdmin() {
    const tabelBody = document.getElementById('body-tabel-pesanan');
    if (!tabelBody) return; // Jaga-jaga kalau elemen tidak ditemukan

    let riwayatPesanan = localStorage.getItem('pesananMasukAdmin');
    let daftarPesanan = riwayatPesanan ? JSON.parse(riwayatPesanan) : [];

    tabelBody.innerHTML = "";

    if (daftarPesanan.length === 0) {
        tabelBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px;">Belum ada pesanan masuk hari ini. 😴</td></tr>`;
        return;
    }
    daftarPesanan.forEach(function(pesanan) {
        
        let detailRoti = pesanan.items.map(function(item) {
            return item.jumlah + "x " + item.nama;
        }).join('<br>'); // Pakai <br> agar nama roti baris-berbaris ke bawah

        let classStatus = pesanan.status === "Menunggu" ? "menunggu" : "selesai";

        let barisHTML = `
            <tr>
                <td><strong>${pesanan.id}</strong></td>
                <td>${pesanan.namaPelanggan}</td>
                <td>${detailRoti}</td>
                <td>${pesanan.total}</td>
                <td><span class="status ${classStatus}">${pesanan.status}</span></td>
            </tr>
        `;

    
        tabelBody.innerHTML += barisHTML;
    });
}

muatPesananAdmin();