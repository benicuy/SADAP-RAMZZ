// Fake DB upgrade
let adminLoggedIn = false;
let currentAdmin = "BajigurΩ";
let fakeVictims = [
  { number: "6281234567890", status: "Online", package: "Tahunan Elite", expired: "2027-03-10", lastSync: "Baru saja", ip: "36.72.145.xx" },
  { number: "6289876543210", status: "Offline", package: "Bulanan Pro", expired: "2026-05-20", lastSync: "1 jam lalu", ip: "114.5.221.xx" },
  { number: "6285512345678", status: "Online", package: "Harian Flash", expired: "2026-03-17", lastSync: "Sedang chatting", ip: "182.2.45.xx" },
  { number: "6281912345678", status: "Online", package: "Tahunan Elite", expired: "2027-01-05", lastSync: "Mengetik...", ip: "103.147.xx.xx" }
];

const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logout");
const adminNameEl = document.getElementById("adminName");
const activeTargetsEl = document.getElementById("activeTargets");
const totalRevenueEl = document.getElementById("totalRevenue");
const onlineNowEl = document.getElementById("onlineNow");
const victimTableBody = document.querySelector("#victimTable tbody");
const liveFeeds = document.getElementById("liveFeeds");
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

// Login (username: bajigur | password: omega2026)
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value.trim().toLowerCase();
  const pass = document.getElementById("password").value.trim();
  
  if (user.includes("bajigur") && pass === "omega2026") {
    adminLoggedIn = true;
    currentAdmin = user || "BajigurΩ";
    adminNameEl.textContent = currentAdmin;
    loginPage.classList.add("hidden");
    dashboard.classList.remove("hidden");
    updateAll();
  } else {
    alert("Ω Access Denied! Key invalid bro 🔥 Try again.");
  }
});

logoutBtn.addEventListener("click", () => {
  adminLoggedIn = false;
  dashboard.classList.add("hidden");
  loginPage.classList.remove("hidden");
  loginForm.reset();
});

function updateAll() {
  const online = fakeVictims.filter(v => v.status === "Online").length;
  activeTargetsEl.textContent = fakeVictims.length;
  onlineNowEl.textContent = online;
  totalRevenueEl.textContent = `Rp ${(fakeVictims.length * 350000).toLocaleString("id-ID")}`;

  // Victim table
  victimTableBody.innerHTML = "";
  fakeVictims.forEach(v => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${v.number}</td>
      <td><span class="status-dot \( {v.status.toLowerCase()}"></span> \){v.status}</td>
      <td>${v.package}</td>
      <td>${v.expired}</td>
      <td>${v.lastSync}</td>
      <td>
        <button class="btn small">View Chat</button>
        <button class="btn small">Download Media</button>
      </td>
    `;
    victimTableBody.appendChild(row);
  });

  // Live feeds
  liveFeeds.innerHTML = "";
  fakeVictims.filter(v => v.status === "Online").forEach(v => {
    const card = document.createElement("div");
    card.className = "live-card glow";
    card.innerHTML = `
      <strong>${v.number}</strong><br>
      <span class="status-dot online"></span> ${v.lastSync}<br>
      <small>IP: ${v.ip} • Last update: ${new Date().toLocaleTimeString("id-ID")}</small>
    `;
    liveFeeds.appendChild(card);
  });
}

// Tab switch
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    
    tabContents.forEach(c => c.classList.remove("active"));
    document.getElementById(tab.dataset.tab + "Tab").classList.add("active");
  });
});

// Fake Victim APK generate
document.getElementById("victimApkForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const num = document.getElementById("victimNumber").value.trim();
  const pkg = document.getElementById("victimPackage").value;
  alert(`Victim APK Generated!\nFile: wa-update-${num.slice(-6)}.apk\nPaket: \( {pkg}\nLink: https://quantum-omega.site/dl/victim/ \){Date.now()}.apk\nKirim ke target via WA (mode silent aktif) 🔥`);
});

// Fake Admin Controller APK
document.getElementById("adminApkForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert(`Controller APK Generated!\nFile: QuantumSpyControl-Ω.apk\nUntuk HP Admin\nLink: https://quantum-omega.site/dl/controller/${Date.now()}.apk\nInstall & sync dengan panel 🔥`);
});

// Init dashboard
updateAll();
