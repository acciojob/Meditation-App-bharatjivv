//your JS code here. If required.
var app = document.getElementById('app');
var video = document.querySelector('.vid-container video');
var audio = document.querySelector('.player-container audio');
var playBtn = document.querySelector('.play');
var timeDisplay = document.querySelector('.time-display');
var soundButtons = document.querySelectorAll('.sound-picker button');
var timeButtons = document.querySelectorAll('#time-select button');

var duration = 600; // default 10 minutes

// Play / Pause
playBtn.addEventListener('click', function () {
  if (audio.paused) {
    audio.play();
    video.play();
    playBtn.innerHTML = 'Pause';
  } else {
    audio.pause();
    video.pause();
    playBtn.innerHTML = 'Play';
  }
});

// Change Sound + Video
for (var i = 0; i < soundButtons.length; i++) {
  soundButtons[i].addEventListener('click', function () {
    audio.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    audio.play();
    video.play();
    playBtn.innerHTML = 'Pause';
  });
}

// Time Selection
for (var j = 0; j < timeButtons.length; j++) {
  timeButtons[j].addEventListener('click', function () {
    duration = parseInt(this.getAttribute('data-time'));
    updateTime(duration);
  });
}

// Update countdown
audio.addEventListener('timeupdate', function () {
  var remaining = duration - audio.currentTime;

  if (remaining <= 0) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    playBtn.innerHTML = 'Play';
  }

  updateTime(remaining);
});

function updateTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  timeDisplay.innerHTML = minutes + ':' + seconds;
}
