import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const deleteBtn = document.getElementById("commentDelete");
const videoId = videoContainer.dataset.id;

const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/video/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
  }
  window.location.reload();
};

const handleDelete = async (event) => {
  event.preventDefault();
  const cmt = event.target.parentElement;
  const { id } = cmt.dataset;
  await fetch(`/api/video/${videoId}/comment/${id}/delete`, {
    method: "delete",
  });
  window.location.reload();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (deleteBtn) {
  deleteBtn.addEventListener("click", handleDelete);
}
