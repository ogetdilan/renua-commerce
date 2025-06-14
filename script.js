// ----------------------
// ÜRÜN SEPETE EKLEME
// ----------------------
const sepeteEkleBtnler = document.querySelectorAll(".sepete-ekle");

sepeteEkleBtnler.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const id = this.dataset.id;
    const ad = this.dataset.ad;
    const fiyat = Number(this.dataset.fiyat);
    const gorsel = this.dataset.gorsel;

    const yeniUrun = {
      id,
      ad,
      fiyat,
      adet: 1,
      gorsel
    };

    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

    const mevcutUrun = sepet.find((u) => u.id === id && u.ad === ad);
    if (mevcutUrun) {
      mevcutUrun.adet += 1;
    } else {
      sepet.push(yeniUrun);
    }

    localStorage.setItem("sepet", JSON.stringify(sepet));
    alert(`${ad} sepete eklendi!`);
  });
});

// ----------------------
// SEPET SAYFASI GÖRÜNTÜLEME ve YÖNETİM
// ----------------------
function sepetiGoster() {
  const sepetContainer = document.getElementById("sepet");
  if (!sepetContainer) return;

  let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

  sepetContainer.innerHTML = "";
  let toplamTutar = 0;

  sepet.forEach((urun, index) => {
    toplamTutar += urun.fiyat * urun.adet;

    const urunDiv = document.createElement("div");
    urunDiv.classList.add("sepet-urun");
    urunDiv.innerHTML = `
      <img src="${urun.gorsel}" alt="${urun.ad}" width="80">
      <p>${urun.ad}</p>
      <p>${urun.fiyat} TL</p>
      <p>Adet: 
        <button onclick="adetAzalt(${index})">-</button> 
        ${urun.adet} 
        <button onclick="adetArttir(${index})">+</button>
      </p>
      <button onclick="urunSil(${index})">Sil</button>
    `;

    sepetContainer.appendChild(urunDiv);
  });

  const toplamDiv = document.getElementById("toplamTutar");
  if (toplamDiv) {
    toplamDiv.textContent = `Toplam: ${toplamTutar} TL`;
  }
}

function urunSil(index) {
  let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
  sepet.splice(index, 1);
  localStorage.setItem("sepet", JSON.stringify(sepet));
  sepetiGoster();
}

function adetArttir(index) {
  let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
  sepet[index].adet += 1;
  localStorage.setItem("sepet", JSON.stringify(sepet));
  sepetiGoster();
}

function adetAzalt(index) {
  let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
  if (sepet[index].adet > 1) {
    sepet[index].adet -= 1;
  } else {
    sepet.splice(index, 1);
  }
  localStorage.setItem("sepet", JSON.stringify(sepet));
  sepetiGoster();
}

function sepetiTemizle() {
  localStorage.removeItem("sepet");
  sepetiGoster();
}

document.addEventListener("DOMContentLoaded", () => {
  sepetiGoster();

  const temizleBtn = document.getElementById("sepetiTemizleBtn");
  if (temizleBtn) {
    temizleBtn.addEventListener("click", sepetiTemizle);
  }

  // ----------------------
  // Sipariş Onay Sayfası
  // ----------------------
  const siparisOzet = document.getElementById("siparis-ozet");
  if (siparisOzet) {
    const sepet = JSON.parse(localStorage.getItem("sepet")) || [];
    let toplam = 0;
    sepet.forEach((urun) => {
      toplam += urun.fiyat * urun.adet;
      const div = document.createElement("div");
      div.innerHTML = `${urun.ad} x ${urun.adet} - ${urun.fiyat * urun.adet} TL`;
      siparisOzet.appendChild(div);
    });
    const toplamDiv = document.createElement("div");
    toplamDiv.innerHTML = `<strong>Toplam: ${toplam} TL</strong>`;
    siparisOzet.appendChild(toplamDiv);
  }

 document.getElementById("odemeYapBtn").addEventListener("click", function () {
  localStorage.removeItem("sepet");
  window.location.href = "tesekkur.html"; // ✅ Bu satır doğruysa tesekkur.html'e gider
});

});
