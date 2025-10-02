window.onload = function() {
  loadMyRepos();
};

// عرض المستودعات الخاصة بالمطور الحالي
function loadMyRepos() {
  const container = document.getElementById("myRepos");
  container.innerHTML = "";

  const allRepos = JSON.parse(localStorage.getItem("repos")) || [];
  const currentUser = localStorage.getItem("current_user");

  const myRepos = allRepos.filter(repo => repo.owner === currentUser);

  if (myRepos.length === 0) {
    container.innerHTML = "<p>لا توجد مستودعات حتى الآن.</p>";
    return;
  }

  myRepos.forEach((repo, index) => {
    const repoDiv = document.createElement("div");
    repoDiv.className = "repo-item";
    repoDiv.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.desc}</p>
      <p><strong>المطور:</strong> ${repo.owner}</p>
      <span class="options-btn" onclick="toggleOptions(${index})">⋮</span>
      <div id="options-${index}" class="repo-options">
        <button onclick="editRepo(${index})">تعديل</button>
        <button onclick="deleteRepo(${index})">حذف</button>
      </div>
    `;
    container.appendChild(repoDiv);
  });
}

// إظهار/إخفاء خيارات المستودع
function toggleOptions(index) {
  const el = document.getElementById(`options-${index}`);
  el.style.display = el.style.display === "flex" ? "none" : "flex";
}

// فتح نموذج إنشاء مستودع جديد
function openRepoForm() {
  document.getElementById("repoForm").style.display = "block";
}

// إلغاء إنشاء المستودع
function cancelRepo() {
  document.getElementById("repoForm").style.display = "none";
}

// نشر المستودع الجديد
function submitRepo() {
  const name = document.getElementById("repoName").value.trim();
  const desc = document.getElementById("repoDesc").value.trim();
  const owner = document.getElementById("repoDev").value.trim();

  if (!name || !desc || !owner) {
    alert("يرجى ملء جميع الحقول");
    return;
  }

  const repos = JSON.parse(localStorage.getItem("repos")) || [];
  repos.push({ name, desc, owner, likes: 0, comments: [] });
  localStorage.setItem("repos", JSON.stringify(repos));

  alert("تم نشر المستودع بنجاح!");
  document.getElementById("repoForm").style.display = "none";
  loadMyRepos();
}

// حذف مستودع
function deleteRepo(index) {
  if (!confirm("هل أنت متأكد من حذف هذا المستودع؟")) return;

  const repos = JSON.parse(localStorage.getItem("repos")) || [];
  const currentUser = localStorage.getItem("current_user");

  const myRepos = repos.filter(repo => repo.owner === currentUser);
  const repoToDelete = myRepos[index];

  const newRepos = repos.filter(r => r !== repoToDelete);
  localStorage.setItem("repos", JSON.stringify(newRepos));
  loadMyRepos();
}

// تعديل مستودع
function editRepo(index) {
  const repos = JSON.parse(localStorage.getItem("repos")) || [];
  const currentUser = localStorage.getItem("current_user");
  const myRepos = repos.filter(repo => repo.owner === currentUser);
  const repo = myRepos[index];

  const newName = prompt("اسم جديد:", repo.name);
  const newDesc = prompt("وصف جديد:", repo.desc);
  if (newName) repo.name = newName;
  if (newDesc) repo.desc = newDesc;

  localStorage.setItem("repos", JSON.stringify(repos));
  loadMyRepos();
}

// الشريط الجانبي
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// تسجيل خروج المطور
function logout() {
  localStorage.removeItem("current_user");
  localStorage.removeItem("current_role");
  window.location.href = "index.html";
                  }
