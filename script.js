// ==========================================
// AMBIL DATA DARI SERVER (FETCH API)
// ==========================================

// Ubah fungsi menjadi 'async' karena kita harus menunggu proses pengambilan data dari server
async function ambilDanRenderMenu() {
    const containerMenu = document.getElementById('daftar-menu-dinamis');
    if (!containerMenu) return;

    try {
        // 1. Mengambil file json (simulasi request ke API Server)
        const respon = await fetch('menu.json');
        
        // 2. Mengubah format respon mentah menjadi Array JavaScript
        const databaseMenuDinamis = await respon.json();

        // 3. Bersihkan wadah HTML
        containerMenu.innerHTML = "";

        // 4. Looping data yang berhasil diambil dari server
        databaseMenuDinamis.forEach(function(item) {
            const menuHTML = `
                <div class="menu-item">
                    <div class="menu-info">
                        <h4>${item.nama}</h4> 
                        <span>Rp ${item.harga.toLocaleString('id-ID')}</span> 
                    </div>
                    <button class="btn btn-small">Tambah 🛒</button>
                </div>
            `;
            containerMenu.innerHTML += menuHTML;
        });

    } catch (error) {
        // Jika file json hilang atau server error, tangkap error-nya di sini
        console.error("Gagal mengambil data menu:", error);
        containerMenu.innerHTML = "<p>Gagal memuat menu. Silakan coba lagi nanti.</p>";
    }
}

// Jalankan fungsinya
ambilDanRenderMenu();






// (LOCAL STORAGE)
let memoriTersimpan = localStorage.getItem('keranjangAulia');

let keranjangBelanja = memoriTersimpan ? JSON.parse(memoriTersimpan) : [];

updateTampilanKeranjang();

const tombolTambah = document.querySelectorAll('.menu-item .btn-small');

// ==========================================
// 2. LOGIKA TOMBOL "TAMBAH KE KERANJANG" (VERSI EVENT DELEGATION)
// ==========================================

// Menempelkan sensor klik pada seluruh dokumen halaman web
document.addEventListener('click', function(event) {
    
    // Mengecek apakah benda yang diklik memiliki class 'btn-small'
    if (event.target.classList.contains('btn-small') && event.target.closest('.menu-item')) {
        
        event.preventDefault(); 

        // Prosesnya sama persis seperti sebelumnya
        const menuItem = event.target.closest('.menu-item');
        const namaRoti = menuItem.querySelector('h4').innerText;
        const hargaTeks = menuItem.querySelector('span').innerText;

        const hargaAngka = Number(hargaTeks.replace(/[^0-9]/g, ''));

        let itemDitemukan = keranjangBelanja.find(function(item) {
            return item.nama === namaRoti; 
        });

        if (itemDitemukan) {
            itemDitemukan.jumlah += 1;
        } else {
            keranjangBelanja.push({
                nama: namaRoti,
                harga: hargaAngka,
                jumlah: 1
            });
        }

        updateTampilanKeranjang();
    }
});

// FUNGSI RENDER TAMPILAN KERANJANG

function updateTampilanKeranjang() {
    const cartListElement = document.querySelector('.cart-list');
    const totalHargaElement = document.getElementById('total-harga');
    
    // Jika elemen keranjang tidak ada di halaman ini, abaikan fungsi ini (agar tidak error di halaman admin)
    if (!cartListElement || !totalHargaElement) return;

    // Bersihkan area keranjang dari data lama
    cartListElement.innerHTML = "";
    
    let totalBelanja = 0;

    // Looping data keranjang untuk dibuatkan HTML-nya
    keranjangBelanja.forEach(function(item) {
        let totalHargaItem = item.harga * item.jumlah;
        totalBelanja += totalHargaItem;

        const itemHTML = `
            <div class="cart-item">
                <span>${item.jumlah}x ${item.nama}</span>
                <span>Rp ${totalHargaItem.toLocaleString('id-ID')}</span>
            </div>
        `;
        
        cartListElement.innerHTML += itemHTML;
    });

    // Update teks total harga
    totalHargaElement.innerText = "Rp " + totalBelanja.toLocaleString('id-ID');

    // Simpan data terbaru ke brankas setiap kali ada perubahan
    localStorage.setItem('keranjangAulia', JSON.stringify(keranjangBelanja));
}

// LOGIKA TOMBOL CHECKOUT

const tombolCheckout = document.querySelector('.checkout-btn');

// Pengecekan agar tidak error jika tombol checkout tidak ada di halaman
if (tombolCheckout) {
    tombolCheckout.addEventListener('click', function() {
        // Validasi: Cek apakah keranjang kosong
        if (keranjangBelanja.length === 0) {
            alert("Keranjang belanjamu masih kosong! Silakan pilih roti dulu ya 🍞");
            return; // Hentikan proses di sini
        }
        
        // Ambil riwayat pesanan admin dari LocalStorage (jika ada)
        let riwayatPesanan = localStorage.getItem('pesananMasukAdmin');
        let daftarPesananAdmin = riwayatPesanan ? JSON.parse(riwayatPesanan) : [];
        
        // Buat struk pesanan baru
        let pesananBaru = {
            id: "ORD-" + Math.floor(Math.random() * 1000), // Bikin ID acak
            namaPelanggan: "Tamu", // Nanti bisa dikembangkan pakai input form jika mau
            items: keranjangBelanja,
            total: document.getElementById('total-harga').innerText,
            status: "Menunggu"
        };

        // Masukkan pesanan ke daftar admin dan simpan ke LocalStorage
        daftarPesananAdmin.push(pesananBaru);
        localStorage.setItem('pesananMasukAdmin', JSON.stringify(daftarPesananAdmin));

        // Beri tahu pembeli
        alert("Berhasil! Pesanan " + pesananBaru.id + " sedang diproses.");

        // Kosongkan keranjang setelah checkout sukses
        keranjangBelanja = [];
        updateTampilanKeranjang();
    });
}