
const music = document.querySelector('.player__song');
const songImg = document.querySelector('.player__img');
const songTitle = document.querySelector('.player__song-title');
const songArtist = document.querySelector('.player__song-artist');
const prevBtn = document.querySelector('.prev');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.next');
const currentTimeEl = document.querySelector('.progress__current-time');
const durationEl = document.querySelector('.progress__duration');
const progressContainer = document.querySelector('.progress__container');
const progressBar = document.querySelector('.progress__bar');

let isPlaying = false;
let songIndex = 0;

const songArray = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-3',
    displayName: 'Good Night, Disco Queen',
    artist: 'Jacinto Design'
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design'
  }
];

// play
function playSong() {
  isPlaying = true;
  playBtn.setAttribute('title', 'pause');
  playBtn.classList.replace('fa-play', 'fa-pause');
  music.play();
}


// pause
function pauseSong() {
  isPlaying = false;
  playBtn.setAttribute('title', 'play');
  playBtn.classList.replace('fa-pause', 'fa-play');
  music.pause();
}

// upload
function uploadSong(song) {
  songImg.src = `img/${song.name}.jpg`;
  music.src = `music/${song.name}.mp3`;
  songTitle.textContent = song.displayName;
  songArtist.textContent = song.artist;
}

//prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songArray.length - 1;
  }
  uploadSong(songArray[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex++;
  if (songIndex > songArray.length - 1) {
    songIndex = 0;
  }
  uploadSong(songArray[songIndex]);
  playSong();
}

// update progress bar
function updateProgressBar(e) {
  if (isPlaying) {
    // progress bar width
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // current time
    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSeconds = Math.floor(currentTime % 60);

    if (currentTimeSeconds < 10) {
      currentTimeSeconds = `0${currentTimeSeconds}`;
    }

    currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;

    // duration time
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    if (duration) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
  }
}

function setProgressBar(e) {
  if (isPlaying) {
    const width = this.clientWidth;
    const offsetX = e.offsetX;
    const { duration } = music;
    music.currentTime = ((offsetX / width) * duration);
  }
}

// event listeners
nextBtn.addEventListener('click', nextSong);
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);
