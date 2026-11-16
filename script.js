const WA_NUMBER = "923047800409";

const PRODUCTS = [
  {
    id: "beauty-cream-hd",
    cat: "creams",
    name: "Sumbal Beauty Cream HD",
    pill: "For face & body",
    price: 450,
    priceNote: "",
    packs: [1, 2, 3, 6],
    packUnit: "Piece",
    points: ["No Mercury · No Steroids", "Face aur poore jism ke liye", "7-Day Money-Back Guarantee"],
    img: "images/studio-cream.jpg",
    desc: "The original HD Whitening Beauty Cream. Instant brightness, improves skin tone and helps remove acne blemishes. No mercury, no steroids — with a 7-day money-back guarantee."
  },
  {
    id: "whitening-serum",
    cat: "serum",
    name: "Sumbal Skin Whitening Serum — Day & Night",
    pill: "SPF 30 · 2 × 20ml",
    price: 1500,
    priceNote: "Free delivery",
    packs: [1, 2, 3],
    packUnit: "Set",
    points: ["SPF 30 Sunblock — Day bottle", "Day & Night set · 20ml + 20ml", "No Mercury · No Side Effects"],
    img: "images/studio-serum.jpg",
    desc: "Day & Night serum set for whole body skin. Day bottle carries SPF 30 sun block; Night bottle works while you sleep. No mercury, no steroids, no side effects."
  },
  {
    id: "radiance-cream",
    cat: "creams",
    name: "Sumbal Whitening & Radiance Cream",
    pill: "For face & body",
    price: 450,
    priceNote: "",
    packs: [1, 2, 3],
    packUnit: "Piece",
    points: ["No Mercury · No Steroids", "Luminous glow aur even tone", "Face aur poore jism ke liye"],
    img: "images/radiance-2.jpg",
    desc: "Achieve luminous skin — evens tone and boosts your natural glow. The radiance edition of the Sumbal whitening cream, for face and whole body."
  },
  {
    id: "beauty-soap",
    cat: "soap",
    name: "Sumbal Special Whitening Beauty Soap",
    pill: "Daily care",
    price: null,
    priceNote: "Price on WhatsApp",
    packs: [1, 2, 3],
    packUnit: "Piece",
    points: ["Daily whitening care", "Face aur body dono ke liye", "Sumbal routine ka pehla step"],
    img: "images/soap.jpg",
    desc: "The Special Whitening Beauty Soap — gentle daily whitening care for face and body, the classic first step of the Sumbal routine."
  },
  {
    id: "face-wash",
    cat: "facewash",
    name: "Sumbal Whitening Face Wash",
    pill: "Daily care",
    price: null,
    priceNote: "Price on WhatsApp",
    packs: [1, 2, 3],
    packUnit: "Piece",
    points: ["Rozana gentle cleansing", "Cream aur serum se pehle — pehla step", "Har skin type ke liye"],
    img: "images/studio-facewash.jpg",
    desc: "Daily whitening face wash — the first step of the Sumbal routine. Gentle cleansing that preps your skin for the cream and serum."
  }
];
const byName = {};
PRODUCTS.forEach(p => { byName[p.name] = p; });

const grid = document.getElementById("productGrid");
function cardHTML(p) {
  return `
  <article class="product-card">
    <img class="p-img" src="${p.img}" alt="${p.name}" loading="lazy">
    <div class="p-body">
      <span class="p-pill">${p.pill}</span>
      <h3>${p.name}</h3>
      <p class="p-rating">★★★★★ <small>100% recommend · 7 Facebook reviews</small></p>
      <ul class="p-points">${p.points.map(pt => "<li>" + pt + "</li>").join("")}</ul>
      <p class="p-desc">${p.desc}</p>
      <p class="p-price">${p.price ? "Rs " + p.price.toLocaleString("en-PK") : "WhatsApp par price"} ${p.priceNote ? "<small>· " + p.priceNote + "</small>" : ""}</p>
      <button class="btn btn-gold" data-order="${p.name}" data-price="${p.price || ""}" data-img="${p.img}">Order Now — COD</button>
    </div>
  </article>`;
}
function renderProducts(cat) {
  const list = !cat || cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  grid.innerHTML = list.map(cardHTML).join("");
}
renderProducts("all");

const catalogList = document.getElementById("catalogList");
catalogList.innerHTML = "<h4>Price List</h4>" + PRODUCTS.map(p => `
  <button class="catalog-item" data-order="${p.name}" data-price="${p.price || ""}" data-img="${p.img}">
    <span>${p.name}</span><strong>${p.price ? "Rs " + p.price.toLocaleString("en-PK") : "WhatsApp"}</strong>
  </button>`).join("");

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.cat);
    document.getElementById("productGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ---------- order drawer (checkout style) ---------- */
const drawer = document.getElementById("orderDrawer");
const overlay = document.getElementById("drawerOverlay");
const dImg = document.getElementById("drawerImg");
const dTitle = document.getElementById("drawerTitle");
const dUnit = document.getElementById("drawerUnit");
const packList = document.getElementById("packList");
const qtyDisplay = document.getElementById("fQtyDisplay");
const sumSubtotal = document.getElementById("sumSubtotal");
const sumTotal = document.getElementById("sumTotal");
let current = null;   // product object
let packSize = 1;
let qty = 1;

function fmt(n) { return "Rs " + n.toLocaleString("en-PK"); }

function renderPacks() {
  if (!current.price) {
    packList.innerHTML = `<div class="pack-opt active"><span>Standard Pack</span><small>Price WhatsApp par confirm hogi</small></div>`;
    return;
  }
  packList.innerHTML = current.packs.map(n => `
    <button type="button" class="pack-opt${n === packSize ? " active" : ""}" data-pack="${n}">
      <span>${n} ${current.packUnit}${n > 1 ? "s" : ""}${n === 6 ? " — Full Pack" : ""}</span>
      <small>${fmt(current.price * n)}</small>
    </button>`).join("");
}
function renderTotals() {
  qtyDisplay.textContent = qty;
  if (current && current.price) {
    const total = current.price * packSize * qty;
    sumSubtotal.textContent = fmt(total);
    sumTotal.textContent = fmt(total);
  } else {
    sumSubtotal.textContent = "WhatsApp par";
    sumTotal.textContent = "WhatsApp par";
  }
}
function openDrawer(name, price, img) {
  current = byName[name] || { name, price: price ? Number(price) : null, packs: [1, 2, 3], packUnit: "Piece" };
  packSize = 1;
  qty = 1;
  dTitle.textContent = current.name;
  dUnit.textContent = current.price ? fmt(current.price) + " · Cash on Delivery · Free Shipping" : "Price on WhatsApp · Cash on Delivery";
  dImg.src = img || "images/range-2026.jpg";
  dImg.alt = current.name;
  renderPacks();
  renderTotals();
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
  if (btn) { openDrawer(btn.dataset.order, btn.dataset.price, btn.dataset.img); return; }
  const pk = e.target.closest("[data-pack]");
  if (pk) {
    packSize = Number(pk.dataset.pack);
    packList.querySelectorAll(".pack-opt").forEach(o => o.classList.toggle("active", Number(o.dataset.pack) === packSize));
    renderTotals();
  }
});
document.getElementById("qtyMinus").addEventListener("click", () => { if (qty > 1) qty--; renderTotals(); });
document.getElementById("qtyPlus").addEventListener("click", () => { if (qty < 50) qty++; renderTotals(); });
document.getElementById("drawerClose").addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("fName").value.trim();
  const phone = document.getElementById("fPhone").value.trim();
  const address = document.getElementById("fAddress").value.trim();
  const near = document.getElementById("fNear").value.trim();
  const city = document.getElementById("fCity").value.trim();
  const province = document.getElementById("fProvince").value;
  const packLine = current.price
    ? "Pack: " + packSize + " " + current.packUnit + (packSize > 1 ? "s" : "") + " x " + qty + " (Total " + (packSize * qty) + " " + current.packUnit + (packSize * qty > 1 ? "s" : "") + ")"
    : "Quantity: " + qty;
  const priceLine = current.price
    ? "Total: " + fmt(current.price * packSize * qty) + " (Shipping FREE)"
    : "Price: please confirm on WhatsApp";
  const msg =
    "Assalam-o-Alaikum! New order from Sumbal PRO Cosmetics store:\n" +
    "Product: " + current.name + "\n" +
    packLine + "\n" + priceLine + "\n" +
    "Name: " + name + "\nPhone: " + phone + "\nAddress: " + address + "\n" +
    "Nearest famous place: " + near + "\nCity: " + city + "\nProvince: " + province + "\n" +
    "Payment: Cash on Delivery";
  window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
  closeDrawer();
});
