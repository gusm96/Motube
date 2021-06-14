import { async } from "regenerator-runtime";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};
const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);

  actionBtn.innerText = "Transcoding...";

  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  // log:true 를 사용하는 이유는  무슨일이 발생하는지 콘솔로 확인할 수 있기 때문.
  await ffmpeg.load();
  // ffmpeg.load() 를 사용하는 이유는 사용자가 js 코드가 아닌 소프트웨어를 설치하여 사용하기 때문에  사용하며
  // 소프트웨어가 무거울 수 있기 때문에 await 을 사용하여준다.
  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  // recording.webm input 을 받아서 output.mp4 로 변환해주는 명령어.
  // "-r", "60" 은 영상을 초당 60프레임으로 인코딩 해주는 것
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );
  // Thumbnail 만들기 위한 1. input 으로 파일을 정해주고 -ss 는 특정 시간을 선택
  // "-frames:v", "1" 첫 프레임의 스크린샷을 찍어준다.
  // files.thumb 그 스크린샷을 jpg 파일로
  const mp4File = ffmpeg.FS("readFile", files.output);
  // output 으로 받은 파일을 읽는 것.  Uint8Array 형태 이다.
  const thumbFile = ffmpeg.FS("readFile", files.thumb);
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  // Uint8Array 형태를 blob 형태로 변환 시켜춘다.
  // {type:"video/mp4"} 이 파일이 video/mp4 임을 알려주는 것
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
  const mp4Url = URL.createObjectURL(mp4Blob);
  // 만들어진 mp4Blob 을 URL 로 표시되도록한다.
  const thumbUrl = URL.createObjectURL(thumbBlob);

  actionBtn.removeEventListener("click", handleDownload);

  downloadFile(mp4Url, "My Recording.mp4");
  downloadFile(thumbUrl, "MY Thumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.thumb);
  ffmpeg.FS("unlink", files.output);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;

  actionBtn.innerText = "Re Recording";

  actionBtn.addEventListener("click", handleInit);
};

const handleStop = () => {
  actionBtn.innerText = "Download Recording";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  actionBtn.innerText = "Stop Recording";
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream, { MimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    console.log(videoFile);
    // URL 은 파일을 가르킨다.
    // createObjectURL() 은 오직 브라우저 메모리에서만 가능한 URL 을 만들어 준다.
    //createObjectURL 은 Video 의 모든 정보를 담은 URL 을 만들어 주는것! 아주 중요!!
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const handleInit = async () => {
  actionBtn.innerText = "Start Recording";
  actionBtn.removeEventListener("click", handleInit);
  actionBtn.addEventListener("click", handleStart);
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  });
  video.srcObject = stream;
  video.play();
};

actionBtn.addEventListener("click", handleInit);
