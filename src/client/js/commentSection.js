import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const deleteBtn = document.getElementById("commentDelete");
const videoId = videoContainer.dataset.id;
const comment = document.getElementById("comment");

const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  if (text === "") {
    return;
  }
  await fetch(`/api/video/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  textarea.value = "";
  window.location.reload();
};

//const handleDelete = (event) => {}

form.addEventListener("submit", handleSubmit);
//deleteBtn.addEventListener("click", handleDelete);
