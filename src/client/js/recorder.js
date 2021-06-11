import { async } from "regenerator-runtime";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  startBtn.innerText = "Re Recording";
  startBtn.removeEventListener("click", handleDownload);
  startBtn.addEventListener("click", handleInit);
  const a = document.createElement("a");
  // a 를 만들어주고
  a.href = videoFile;
  // a 링크를 videoFile 로 해주고
  a.download = "My Download.webm";
  // link 를 다운로드 받게 해준다.
  document.body.appendChild(a);
  a.click();
  // a 를 자동으로 클릭한 것과 같이 해준다.
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream, { MimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    console.log(event.data);
    // URL 은 파일을 가르킨다.
    // createObjectURL() 은 오직 브라우저 메모리에서만 가능한 URL 을 만들어 준다.
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const handleInit = async () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleInit);
  startBtn.addEventListener("click", handleStart);
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

startBtn.addEventListener("click", handleInit);
