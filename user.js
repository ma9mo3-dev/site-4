window.onload = function () {
  loadRepos();
};

// تحميل المستودعات من localStorage وعرضها
function loadRepos() {
  const container = document.getElementById("repoList");
  container.innerHTML = "";

  const repos = JSON.parse(localStorage.getItem("repos")) || [];

  if (repos.length === 0) {
    container.innerHTML = "<p>لا توجد مستودعات متاحة حالياً.</p>";
    return;
  }

  repos.forEach((repo, index) => {
    const repoDiv = document.createElement("div");
    repoDiv.className = "repo-item";
    repoDiv.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.desc}</p>
      <p><strong>المطور:</strong> ${repo.owner}</p>
      <p>
        ❤️ <span id="likes-${index}">${repo.likes || 0}</span> 
        | 💬 <span id="comments-${index}">${(repo.comments || []).length}</span>
      </p>
      <button onclick="likeRepo(${index})">إعجاب</button>
      <button onclick="commentRepo(${index})">تعليق</button>
    `;
    container.appendChild(repoDiv);
  });
}

// إظهار أو إخفاء الشريط الجانبي
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// تسجيل خروج المستخدم
function logout() {
  localStorage.removeItem("current_user");
  localStorage.removeItem("current_role");
  window.location.href = "index.html";
}

// تحميل رسائل المطور (من messages.js)
function loadMessages() {
  const box = document.getElementById("messagesContainer");
  box.innerHTML = "";
  const now = Date.now();

  const messages = JSON.parse(localStorage.getItem("user_messages")) || [];

  const filtered = messages.filter(msg => now - msg.time < 3600000); // أقل من ساعة

  if (filtered.length === 0) {
    box.innerHTML = "<p>لا توجد رسائل حالياً.</p>";
    return;
  }

  filtered.forEach(msg => {
    const item = document.createElement("div");
    item.className = "card";
    item.innerHTML = `<p>${msg.text}</p><small>من المطور الأساسي</small>`;
    box.appendChild(item);
  });

  // تحديث القائمة بدون الرسائل المنتهية
  localStorage.setItem("user_messages", JSON.stringify(filtered));
      }
