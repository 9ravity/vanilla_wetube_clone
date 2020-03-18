const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = videoContainer.querySelector("video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumButton");
const fullScrnBtn = document.getElementById("js");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
};

/* formater 함수 */
const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};
/* 함수 */

function handlePalyClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumClick() {
  if (videoPlayer) {
    videoPlayer.muted = false;
    volumeRange.value = videoPlayer.volume;
    volumeBtn.innerHTML = "<i class'fas fa-volime-up'></i>";
  } else {
    videoPlayer.muted = true;
    volumeRange.value = 0;
    volumeBtn.innerHTML = "<i class'fas fa-volume-mute'></i>";
  }
}

function exitFullScreen() {
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.addEventListener("click", goFullScreen);
  // 브라우저, 체크(크롬,ie.파이어폭스,사파리)
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
}

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function endedVideo() {
  registerView();
  currentTime.innerHTML = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(e) {
  console.log(e); // 볼륨키 움직일때마다 이벤트 발생
  console.log(e.target.value);
  const {
    target: { value }
  } = e;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = "<i class'fas fa-volime-up'></i>";
  } else if (value >= 0.3) {
    volumeBtn.innerHTML = "<i class'fas fa-volime-down'></i>";
  } else if (value >= 0.1) {
    volumeBtn.innerHTML = "<i class'fas fa-volume-off'></i>";
  } else {
    volumeBtn.innerHTML = "<i class'fas fa-volume-mute'></i>";
  }
}

function init() {
  videoPlayer.volume = 0.5; //볼륨 초기 셋팅
  playBtn.addEventListener("click", handlePalyClick);
  volumeBtn.addEventListener("click", handleVolumClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", endedVideo);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init();
}
