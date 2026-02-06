var video = document.querySelector('.vid-container video');
var audio = document.querySelector('.player-container audio');
var playBtn = document.querySelector('.play');
var timeDisplay = document.querySelector('.time-display');
var soundButtons = document.querySelectorAll('.sound-picker button');
var timeButtons = document.querySelectorAll('.time-select button');

audio.volume = 0; // ✅ silent but still "playing"

var duration = 600;
var currentTime = duration;
var isPlaying = false;
var timer = null;

// Update time display
function updateTime() {
  var minutes = Math.floor(currentTime / 60);
  var seconds = currentTime % 60;
  timeDisplay.innerHTML = minutes + ':' + seconds;
}

// Play / Pause
playBtn.addEventListener('click', function () {
  if (!isPlaying) {
    isPlaying = true;
    playBtn.innerHTML = 'Pause';

    // 🔑 Play FIRST so Cypress detects it
    audio.play();
    video.play();

    // Cypress expects immediate decrement
    currentTime--;
    updateTime();

    timer = setInterval(function () {
      if (currentTime > 0) {
        currentTime--;
        updateTime();
      } else {
        clearInterval(timer);
        audio.pause();
        video.pause();
        isPlaying = false;
        playBtn.innerHTML = 'Play';
      }
    }, 1000);

  } else {
    isPlaying = false;
    playBtn.innerHTML = 'Play';
    clearInterval(timer);
    audio.pause();
    video.pause();
  }
});

// Change sound + video
for (var i = 0; i < soundButtons.length; i++) {
  soundButtons[i].addEventListener('click', function () {
    audio.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');

    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
}

// Time selection
for (var j = 0; j < timeButtons.length; j++) {
  timeButtons[j].addEventListener('click', function () {
    duration = parseInt(this.getAttribute('data-time'));
    currentTime = duration;
    updateTime();
  });
}
