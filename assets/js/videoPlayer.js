const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = videoContainer.querySelector("video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumButton");
const fullScrnBtn = document.getElementById("js");

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
    volumeBtn.innerHTML = "<i class'fas fa-volime-up'></i>";
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = "<i class'fas fa-volume-mute'></i>";
  }
}

function exitFullScreen() {
  fullScrnBtn.innerHTML = "<i class'fas fa-expand'></i>";
  fullScrnBtn.addEventListener("click", goFullScrnClick);
  document.webkitExitFullScreen();
}

function goFullScrnClick() {
  videoContainer.webkitrequestFullscreen();
  fullScrnBtn.innerHTML = "<i class'fas fa-compress'></i>";
  fullScrnBtn.removeEventListener("click", goFullScrnClick);
  fullScrnBtn.addEventListener("click", exitFullScreen);
}

function init() {
  playBtn.addEventListener("click", handlePalyClick);
  volumeBtn.addEventListener("click", handleVolumClick);
  fullScrnBtn.addEventListener("click", goFullScrnClick);
}

if (videoContainer) {
  init();
}
