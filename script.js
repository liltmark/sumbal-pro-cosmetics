const WA_NUMBER = "923047800409";

const PRODUCTS = [
  {
    id: "beauty-cream-hd",
    name: "Sumbal Beauty Cream HD",
    pill: "For face & body",
    price: 450,
    priceNote: "",
    img: "images/cream-pack.jpg",
    desc: "The original HD Whitening Beauty Cream. Instant brightness, improves skin tone and helps remove acne blemishes. No mercury, no steroids — with a 7-day money-back guarantee."
  },
  {
    id: "whitening-serum",
    name: "Sumbal Skin Whitening Serum — Day & Night",
    pill: "SPF 30 · 2 × 20ml",
    price: 1500,
    priceNote: "Free delivery",
    img: "images/serum-clean.jpg",
    desc: "Day & Night serum set for whole body skin. Day bottle carries SPF 30 sun block; Night bottle works while you sleep. No mercury, no steroids, no side effects."
  },
  {
    id: "radiance-cream",
    name: "Sumbal Whitening & Radiance Cream",
    pill: "For face & body",
    price: 450,
    priceNote: "",
    img: "images/radiance-2.jpg",
    desc: "Achieve luminous skin — evens tone and boosts your natural glow. The radiance edition of the Sumbal whitening cream, for face and whole body."
  },
  {
    id: "beauty-soap",
    name: "Sumbal Special Whitening Beauty Soap",
    pill: "Daily care",
    price: null,
    priceNote: "Price on WhatsApp",
    img: "images/soap.jpg",
    desc: "The Special Whitening Beauty Soap — gentle daily whitening care for face and body, the classic first step of the Sumbal routine."
  },
  {
    id: "face-wash",
    name: "Sumbal Whitening Face Wash",
    pill: "Daily care",
    price: null,
    priceNote: "Price on WhatsApp",
    img: "images/facewash.jpg",
    desc: "Daily whitening face wash — the first step of the Sumbal routine. Gentle cleansing that preps your skin for the cream and serum."
  }
];

const grid = document.getElementById("productGrid");
grid.innerHTML = PRODUCTS.map(p => `
  <article class="product-card">
    <img class="p-img" src="${p.img}" alt="${p.name}" loading="lazy">
    <div class="p-body">
      <span class="p-pill">${p.pill}</span>
      <h3>${p.name}</h3>
      <p class="p-desc">${p.desc}</p>
      <p class="p-price">${p.price ? "Rs " + p.price.toLocaleString("en-PK") : "WhatsApp par price"} ${p.priceNote ? "<small>· " + p.priceNote + "</small>" : ""}</p>
      <button class="btn btn-gold" data-order="${p.name}" data-price="${p.price || ""}" data-img="${p.img}">Order Now — COD</button>
    </div>
  </article>`).join("");

const drawer = document.getElementById("orderDrawer");
const overlay = document.getElementById("drawerOverlay");
const dImg = document.getElementById("drawerImg");
const dTitle = document.getElementById("drawerTitle");
const dPrice = document.getElementById("drawerPrice");
let currentProduct = null;

function openDrawer(name, price, img) {
  currentProduct = { name, price };
  dTitle.textContent = name;
  dPrice.textContent = price ? "Rs " + Number(price).toLocaleString("en-PK") + " · Cash on Delivery" : "Price confirmed on WhatsApp · Cash on Delivery";
  dImg.src = img || "images/range-2026.jpg";
  dImg.alt = name;
  drawer.hidden = false;
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  drawer.hidden = true;
  overlay.hidden = true;
  document.body.style.overflow = "";
}
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-order]");
  if (btn) openDrawer(btn.dataset.order, btn.dataset.price, btn.dataset.img);
});
document.getElementById("drawerClose").addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("fName").value.trim();
  const phone = document.getElementById("fPhone").value.trim();
  const city = document.getElementById("fCity").value.trim();
  const address = document.getElementById("fAddress").value.trim();
  const qty = document.getElementById("fQty").value;
  const priceLine = currentProduct.price
    ? "Price: Rs " + (currentProduct.price * qty).toLocaleString("en-PK") + " (" + qty + " x Rs " + currentProduct.price.toLocaleString("en-PK") + ")"
    : "Price: please confirm";
  const msg =
    "Assalam-o-Alaikum! New order from Sumbal PRO Cosmetics store:\n" +
    "Product: " + currentProduct.name + "\n" +
    "Quantity: " + qty + "\n" + priceLine + "\n" +
    "Name: " + name + "\nPhone: " + phone + "\nCity: " + city + "\nAddress: " + address + "\n" +
    "Payment: Cash on Delivery";
  window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
  closeDrawer();
});
