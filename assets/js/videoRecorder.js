const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");
//함수 만드는 방법은 function과 const로 만들 수 있다.

const handleVideoData = e => {
  console.log(e);
  console.log(e.data);

  const { data: videoFile } = e;
  const link = document.createElement("a"); // a태그 생성
  link.href = URL.createObjectURL(videoFile); // 링크는 레코드 비디오파일
  link.download = "recorded.mp4"; // 다운로드 가능하도록 삽입
  document.body.appendChild(link);
  link.click(); // 조작된 클릭
};

const stopRecording = videoRecorder => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording(videoRecorder));
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Stop recording";
  recordBtn.style = "background-color: #f44336";
};

const startRecording = async streaming => {
  console.log(streaming);
  const videoRecorder = new MediaRecorder(streaming);
  console.log(videoRecorder);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData); // stop됐을때 얻을 수 있음 dataavailable
  recordBtn.addEventListener("click", stopRecording(videoRecorder));
};

const getVideo = async () => {
  try {
    const streaming = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    }); // 스트리밍 시작
    console.log(streaming);
    videoPreview.srcObject = streaming;
    videoPreview.play();
    videoPreview.muted = true;
    recordBtn.innerHTML = "Stop recording";
    recordBtn.style = "background-color: #f44336";
    startRecording(streaming);
  } catch (error) {
    recordBtn.innerHTML = "☹️ Cant record";
  } finally {
    recordBtn.removeEventListener("click", getVideo); //녹화가 안되므로, 이벤트 접근 막기 위하여 삭제,
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
