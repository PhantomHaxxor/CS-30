var LogoutBtn = document.getElementsByClassName("LogoutBtn")[0]
var toggleButton = document.getElementsByClassName('toggle-button')[0]
var navbarLinks = document.getElementsByClassName('navbar-links')[0]

var Settings = {
    LoginData: JSON.parse(localStorage.getItem("LoginData")),
    Debounce: false,
    DelayTime: 1000,
}

// Small Functions //
function ToggleNavBar() {
    navbarLinks.classList.toggle('active')
}

function RemoveSignedIn() {
    console.log("Storing Data")

    Settings.LoginData.SignedIn = false
    var StringifiedArray = JSON.stringify(Settings.LoginData)
    console.log("Storing Data: " + StringifiedArray)
    localStorage.setItem("LoginData", StringifiedArray)
}


// Big Functions //
function OnWindowLoad() {
    // Runs when window loads and logs out a user if they wern't signed in //

    // Print Current Details //
    console.log(Settings.LoginData)

    // Default LoginData Template //
    if (Settings.LoginData == null || Settings.LoginData.AccountCreated == false) {
        Logout()
        return
    }
}

function Logout() {
    console.log("Log out")

    // Make user logout by getting rid of their current data //
    if (Settings.LoginData && Settings.LoginData.AccountCreated == true) {
        RemoveSignedIn()
    }

    window.location.href = window.location.origin
}

// Event Listeners //
OnWindowLoad()
toggleButton.addEventListener('click', ToggleNavBar)



const image = document.querySelector('#cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/1.mp3',
    displayName: 'Yıldız Tozu',
    artist: 'Ozbi',
    cover: "https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg",
  },
  {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/2.mp3',
    displayName: 'You\'re Somebody Else',
    artist: 'flora cash',
    cover: "https://pbs.twimg.com/media/D2NZH-2U4AAL9Xs.jpg",
  },
  {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/3.mp3',
    displayName: 'Powerless',
    artist: 'Linkin Park',
    cover: "https://images.genius.com/c5a58cdaab9f3199214f0e3c26abbd0e.1000x1000x1.jpg",
  },
  {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/4.mp3',
    displayName: 'Seni Dert Etmeler',
    artist: 'Madrigal',
    cover: "https://www.radyomega.fm/wp-content/uploads/2020/04/MADRIGAL-600.jpg",
  },
  {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/5.mp3',
    displayName: 'Ederlezi',
    artist: 'Solomun',
    cover: "https://m.media-amazon.com/images/I/616t0841uvL._SS500_.jpg",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove('active');
  setTimeout(() => {
    image.src = cover;
    image.classList.add('active');
  }, 100)
} 

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
