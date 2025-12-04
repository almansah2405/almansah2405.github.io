// Tampilkan konten undangan langsung saat halaman dimuat
window.addEventListener("DOMContentLoaded", function () {
  invitationContent.style.display = "block";

  // Mulai musik otomatis (opsional)
  setTimeout(() => {
    if (isMusicPlaying) {
      weddingAudio.play();
    }
  }, 1000);

  // Inisialisasi lainnya
  createGallery();
  displayComments();
  updateCountdown();
});
// Elemen DOM
const weddingAudio = document.getElementById("weddingAudio");
const invitationContent = document.getElementById("invitationContent");
const countdown = document.getElementById("countdown");
const galleryContainer = document.getElementById("galleryContainer");
const galleryModal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");
const giftCard = document.getElementById("giftCard");
const qrisModal = document.getElementById("qrisModal");
const closeQris = document.getElementById("closeQris");
const emojiBtns = document.querySelectorAll(".emoji-btn");
const responseAlert = document.getElementById("responseAlert");
const submitComment = document.getElementById("submitComment");
const commentList = document.getElementById("commentList");
const musicToggle = document.getElementById("musicToggle");

// Data untuk galeri
// SIMPLE GALLERY SOLUTION
const galleryImages = [
  "assets/images/0.jpg",
  "assets/images/1.jpg",
  "assets/images/2.jpg",
  "assets/images/3.jpg",
  "assets/images/4.jpg",
  "assets/images/5.jpg",
  "assets/images/6.jpg",
  "assets/images/7.jpg",
  "assets/images/8.jpg",
  "assets/images/9.jpg",
  "assets/images/10.jpg",
  "assets/images/11.jpg",
  "assets/images/12.jpg",
  "assets/images/13.jpg",
];

// Inisialisasi saat halaman siap
window.onload = function () {
  const container = document.getElementById("galleryContainer");

  // Kosongkan dulu
  container.innerHTML = "";

  // Tambahkan satu per satu
  galleryImages.forEach((imgSrc, index) => {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.innerHTML = `<img src="${imgSrc}" alt="Foto ${index + 1}" class="gallery-img">`;
    div.onclick = () => {
      document.getElementById("modalImg").src = imgSrc;
      document.getElementById("galleryModal").style.display = "flex";
    };
    container.appendChild(div);
  });

  console.log("Galeri diinisialisasi: " + galleryImages.length + " gambar");
};

// Fungsi alternatif yang mencegah duplikasi
function initGalleryOnce() {
  // Hapus semua event listener lama jika ada
  window.removeEventListener("DOMContentLoaded", initGalleryOnce);
  window.removeEventListener("load", initGalleryOnce);

  // Kosongkan container
  galleryContainer.innerHTML = "";

  // Tambahkan gambar
  galleryImages.forEach((image, index) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";

    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = `Gallery ${index + 1}`;
    imgElement.className = "gallery-img";

    galleryItem.appendChild(imgElement);
    galleryItem.addEventListener("click", () => openGalleryModal(index));
    galleryContainer.appendChild(galleryItem);
  });

  console.log("Galeri diinisialisasi dengan sukses");
}

// Panggil hanya sekali
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGalleryOnce);
} else {
  initGalleryOnce();
}

// Fungsi hitung mundur
function updateCountdown() {
  const weddingDate = new Date("May 15, 2023 17:00:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  // Jika sudah lewat tanggal pernikahan
  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "<h3>Acara Pernikahan Telah Berlangsung!</h3>";
    return;
  }

  // Hitung hari, jam, menit, detik
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update elemen countdown
  document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
  document.getElementById("hours").innerHTML = hours.toString().padStart(2, "0");
  document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, "0");
}

// Inisialisasi countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// Fungsi untuk menambahkan ke kalender
function addToCalendar(title, date, location) {
  const eventDate = new Date(date);
  const formattedDate = eventDate.toISOString().replace(/-|:|\.\d+/g, "");

  // Buat URL untuk kalender Google
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formattedDate}/${formattedDate}&details=${encodeURIComponent(
    "Acara pernikahan Donna & Harper"
  )}&location=${encodeURIComponent(location)}&trp=false`;

  // Buka kalender Google di tab baru
  window.open(googleCalendarUrl, "_blank");

  // Tampilkan notifikasi
  alert("Acara telah ditambahkan ke kalender Google. Anda akan diarahkan ke halaman kalender.");
}

// Fungsi untuk membuat galeri
function createGallery() {
  galleryImages.forEach((image, index) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.innerHTML = `<img src="${image}" alt="Gallery ${index + 1}" class="gallery-img">`;
    galleryItem.addEventListener("click", () => openGalleryModal(index));
    galleryContainer.appendChild(galleryItem);
  });
}

// Fungsi untuk membuka modal galeri
function openGalleryModal(index) {
  currentImageIndex = index;
  modalImg.src = galleryImages[currentImageIndex];
  galleryModal.style.display = "flex";
}

// Fungsi untuk menutup modal galeri
function closeGalleryModal() {
  galleryModal.style.display = "none";
}

// Fungsi untuk navigasi galeri
function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentImageIndex];
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentImageIndex];
}

// Event listener untuk modal galeri
modalClose.addEventListener("click", closeGalleryModal);
modalPrev.addEventListener("click", prevImage);
modalNext.addEventListener("click", nextImage);

// Tutup modal galeri saat klik di luar gambar
galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    closeGalleryModal();
  }
});

// Event listener untuk kartu hadiah
giftCard.addEventListener("click", () => {
  qrisModal.style.display = "flex";
});

closeQris.addEventListener("click", () => {
  qrisModal.style.display = "none";
});

// Tutup modal QRIS saat klik di luar gambar
qrisModal.addEventListener("click", (e) => {
  if (e.target === qrisModal) {
    qrisModal.style.display = "none";
  }
});

// Event listener untuk emoji RSVP
emojiBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const response = btn.getAttribute("data-response");
    responseAlert.textContent = `Terima kasih atas tanggapan "${response}" Anda!`;
    responseAlert.style.display = "block";

    // Sembunyikan alert setelah 3 detik
    setTimeout(() => {
      responseAlert.style.display = "none";
    }, 3000);

    // Simpan respons ke localStorage
    saveResponse(response);
  });
});

// Fungsi untuk menyimpan respons RSVP
function saveResponse(response) {
  let responses = JSON.parse(localStorage.getItem("weddingResponses")) || [];
  responses.push({
    response: response,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem("weddingResponses", JSON.stringify(responses));
}

// Fungsi untuk menyimpan komentar
function saveComment(name, message) {
  let comments = JSON.parse(localStorage.getItem("weddingComments")) || [];
  comments.push({
    name: name,
    message: message,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem("weddingComments", JSON.stringify(comments));

  // Tampilkan komentar
  displayComments();
}

// Fungsi untuk menampilkan komentar
function displayComments() {
  const comments = JSON.parse(localStorage.getItem("weddingComments")) || [];
  commentList.innerHTML = "";

  if (comments.length === 0) {
    commentList.innerHTML = '<p class="text-center">Belum ada ucapan. Jadilah yang pertama!</p>';
    return;
  }

  // Tampilkan komentar terbaru pertama
  comments
    .slice()
    .reverse()
    .forEach((comment) => {
      const commentItem = document.createElement("div");
      commentItem.className = "comment-item";
      commentItem.innerHTML = `
                    <h6><strong>${comment.name}</strong></h6>
                    <p>${comment.message}</p>
                    <small class="text-muted">${new Date(comment.timestamp).toLocaleDateString("id-ID")}</small>
                `;
      commentList.appendChild(commentItem);
    });
}

// Event listener untuk submit komentar
submitComment.addEventListener("click", () => {
  const name = document.getElementById("commentName").value.trim();
  const message = document.getElementById("commentMessage").value.trim();

  if (!name || !message) {
    alert("Harap isi nama dan pesan Anda.");
    return;
  }

  saveComment(name, message);

  // Reset form
  document.getElementById("commentName").value = "";
  document.getElementById("commentMessage").value = "";

  // Tampilkan notifikasi
  alert("Terima kasih atas ucapan dan doa Anda!");
});

// Fungsi untuk mengontrol musik
function toggleMusic() {
  if (isMusicPlaying) {
    weddingAudio.pause();
    musicToggle.innerHTML = '<i class="fas fa-music me-1"></i> Musik: OFF';
    isMusicPlaying = false;
  } else {
    weddingAudio.play();
    musicToggle.innerHTML = '<i class="fas fa-music me-1"></i> Musik: ON';
    isMusicPlaying = true;
  }
}

// Fungsi untuk scroll ke atas
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Inisialisasi galeri saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
  // Tampilkan konten undangan langsung
  invitationContent.style.display = "block";

  createGallery();
  displayComments();
  updateCountdown();

  // Auto-play musik setelah 1 detik
  setTimeout(() => {
    if (isMusicPlaying) {
      weddingAudio.play();
    }
  }, 1000);
});

// Fungsi untuk menangani keyboard navigation
document.addEventListener("keydown", (e) => {
  if (galleryModal.style.display === "flex") {
    if (e.key === "Escape") {
      closeGalleryModal();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    } else if (e.key === "ArrowRight") {
      nextImage();
    }
  }

  if (qrisModal.style.display === "flex" && e.key === "Escape") {
    qrisModal.style.display = "none";
  }
});

const splashScreen = document.getElementById("splashScreen");
const enterButton = document.getElementById("enterButton");

enterButton.addEventListener("click", function () {
  // Mulai musik
  weddingAudio
    .play()
    .then(() => {
      console.log("Musik dimulai setelah interaksi splash screen");
      // Sembunyikan splash screen
      splashScreen.style.display = "none";
      // Tampilkan konten undangan
      invitationContent.style.display = "block";
    })
    .catch((error) => {
      console.log("Gagal memutar musik:", error);
      // Tetap sembunyikan splash screen dan tampilkan konten
      splashScreen.style.display = "none";
      invitationContent.style.display = "block";
    });
});

// Opsional: Auto-hide splash screen setelah 3 detik jika user tidak klik
setTimeout(() => {
  if (splashScreen.style.display !== "none") {
    splashScreen.style.display = "none";
    invitationContent.style.display = "block";
    // Coba play musik lagi
    weddingAudio.play().catch((e) => console.log("Musik tidak bisa autoplay"));
  }
}, 30000);
