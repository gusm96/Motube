import { async } from "regenerator-runtime";

const recodeBtn = document.getElementById("recodeBtn");
const video = document.getElementById("preview");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

recodeBtn.addEventListener("click", handleStart);
