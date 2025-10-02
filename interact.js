function likeRepo(index) {
  let repos = JSON.parse(localStorage.getItem("repos")) || [];
  if (!repos[index].likes) repos[index].likes = 0;

  repos[index].likes += 1;

  document.getElementById(`likes-${index}`).textContent = repos[index].likes;
  localStorage.setItem("repos", JSON.stringify(repos));
}

function commentRepo(index) {
  const comment = prompt("اكتب تعليقك:");
  if (!comment) return;

  let repos = JSON.parse(localStorage.getItem("repos")) || [];
  if (!repos[index].comments) repos[index].comments = [];

  repos[index].comments.push(comment);

  document.getElementById(`comments-${index}`).textContent = repos[index].comments.length;
  localStorage.setItem("repos", JSON.stringify(repos));
    }
