// تسجيل دخول المطور العادي
function loginAsDev() {
  const username = document.getElementById("devUsername").value.trim();
  const password = document.getElementById("devPassword").value.trim();

  const devAccounts = JSON.parse(localStorage.getItem("dev_accounts")) || [];

  const found = devAccounts.find(acc => acc.username === username && acc.password === password);

  if (found) {
    localStorage.setItem("current_user", username);
    localStorage.setItem("current_role", "developer");
    window.location.href = "dev.html";
  } else {
    alert("اسم المستخدم أو كلمة المرور غير صحيحة");
  }
}

// الذهاب لموقع المستخدمين
function goToUserSite() {
  window.location.href = "signup.html";
}

// تسجيل دخول المطور الأساسي
function loginAsMaster() {
  const username = prompt("ادخل اسم المستخدم للمطور الأساسي:");
  const password = prompt("ادخل كلمة المرور:");

  if (username === "amine" && password === "amine") {
    localStorage.setItem("current_user", "amine");
    localStorage.setItem("current_role", "master");
    window.location.href = "master.html";
  } else {
    alert("بيانات المطور الأساسي غير صحيحة");
  }
}
