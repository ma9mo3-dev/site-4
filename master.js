window.onload = function() {
  showLogin();
};

// ===================== تسجيل دخول المطور الأساسي =====================
function showLogin() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <div class="profile" style="max-width:400px;">
      <h2>تسجيل دخول المطور الأساسي</h2>
      <input id="masterUser" class="input" placeholder="اسم المستخدم" />
      <input id="masterPass" class="input" type="password" placeholder="كلمة المرور" />
      <button onclick="loginMaster()">تسجيل الدخول</button>
    </div>
  `;
}

function loginMaster() {
  const user = document.getElementById("masterUser").value.trim();
  const pass = document.getElementById("masterPass").value.trim();

  if (user === "amine" && pass === "amine") {
    localStorage.setItem("current_user", user);
    localStorage.setItem("current_role", "master");
    loadMasterPanel();
  } else {
    alert("اسم المستخدم أو كلمة المرور غير صحيحة");
  }
}

// ===================== لوحة المطور الأساسي =====================
function loadMasterPanel() {
  document.getElementById("content").innerHTML = `
    <h2>مرحبًا المطور الأساسي!</h2>
    <p>استخدم الشريط الجانبي لإرسال الإعلانات والتحكم بالحسابات.</p>
  `;
}

// ===================== وظائف الشريط الجانبي =====================
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// إرسال إعلان للمستخدمين
function sendMessage() {
  const msg = prompt("اكتب الرسالة للمستخدمين:");
  if (!msg) return;

  let messages = JSON.parse(localStorage.getItem("user_messages")) || [];
  messages.push({ text: msg, time: Date.now() });
  localStorage.setItem("user_messages", JSON.stringify(messages));
  alert("تم إرسال الإعلان للمستخدمين!");
}

// إرسال إعلان لمستودعات المطورين
function sendRepoMessage() {
  const msg = prompt("اكتب الرسالة لمطوري المستودعات:");
  if (!msg) return;

  let repoMessages = JSON.parse(localStorage.getItem("repo_messages")) || [];
  repoMessages.push({ text: msg, time: Date.now() });
  localStorage.setItem("repo_messages", JSON.stringify(repoMessages));
  alert("تم إرسال الإعلان لمطوري المستودعات!");
}

// حذف حساب المطور الأساسي
function deleteAccount() {
  if (!confirm("هل أنت متأكد من حذف حسابك؟")) return;
  localStorage.removeItem("current_user");
  localStorage.removeItem("current_role");
  alert("تم حذف حسابك!");
  showLogin();
}

// عرض لائحة المشتركين
function listUsers() {
  const users = JSON.parse(localStorage.getItem("user_accounts")) || [];
  if (users.length === 0) {
    alert("لا يوجد مستخدمين حاليًا.");
    return;
  }

  let list = "لائحة المشتركين:\n\n";
  users.forEach((u, i) => {
    list += `${i + 1}. اسم المستخدم: ${u.username}\n`;
  });
  alert(list);
}
