const title = $("#music-title");
const artist = $("#music-artist");
const currentTimeEl = $("#current-time");
const durationEl = $("#duration");
const progress = $("#progress");
const playerProgress = $("#player-progress");
const prevBtn = $("#prev");
const nextBtn = $("#next");
const playBtn = $("#play");
const background = $("#bg-img");
const image = $(".poster");

const music = new Audio();

const songs = [
  {
    path: "1.mp3",
    displayName: "Something Just Like This",
    cover: "1.jpg",
    background: "bg1.jpg",
    artist: "The Chainsmokers & Coldplay",
  },
  {
    path: "2.mp3",
    displayName: "Shape of You",
    cover: "2.jpg",
    background: "bg2.jpg",
    artist: "Ed Sheeran ",
  },
  {
    path: "3.mp3",
    displayName: "As It Was",
    cover: "3.jpg",
    background: "bg3.jpg",
    artist: "Harry Styles",
  },
  {
    path: "4.mp3",
    displayName: "Bad Dream",
    cover: "4.jpg",
    background: "bg4.jpg",
    artist: "Stellar",
  },
  {
    path: "5.mp3",
    displayName: "Mr. Forgettable",
    cover: "5.jpg",
    background: "bg5.jpg",
    artist: "David Kushner",
  },
  {
    path: "6.mp3",
    displayName: "Let Me Love You",
    cover: "6.jpg",
    background: "6.jpg",
    artist: "DJ Snake ft. Justin Bieber",
  },
   {
    path: "7.mp3",
    displayName: "Never Gonna Give You Up",
    cover: "7.jpg",
    background: "bg7.png",
    artist: "Rick Astley"
  }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  playBtn.removeClass("fa-play").addClass("fa-pause");
  playBtn.attr("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  playBtn.removeClass("fa-pause").addClass("fa-play");
  playBtn.attr("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.text(song.displayName);
  artist.text(song.artist);
  image.attr("src", song.cover);
  background.attr("src", song.cover);
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgress() {
  const duration = music.duration;
  const currentTime = music.currentTime;
  const progressPercent = (currentTime / duration) * 100;
  progress.css("width", `${progressPercent}%`);

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");

  durationEl.text(`${formatTime(duration / 60)}:${formatTime(duration % 60)}`);
  currentTimeEl.text(
    `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`
  );
}

function setProgressBar(e) {
  const width = playerProgress.width();
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.on("click", togglePlay);
prevBtn.on("click", () => changeMusic(-1));
nextBtn.on("click", () => changeMusic(1));
music.onended = () => changeMusic(1);
music.ontimeupdate = updateProgress;
playerProgress.on("click", setProgressBar);
loadMusic(songs[musicIndex]);
