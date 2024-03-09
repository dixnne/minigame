const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const muteButton = document.getElementById('mute');
const stopButton = document.getElementById('stop');

if (document.getElementById("leaderboard")) {
    document.getElementById("leaderboard").addEventListener("click", () => {
        window.location.href = "./leaderboard.html";
    }); 
}

if (document.getElementById("back")) {
    document.getElementById("back").addEventListener("click", () => {
        window.location.href = "./index.html";
    }); 
}

let isMuted = false;
const pause = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"/></svg>';
const play = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/></svg>';
const mute = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/></svg>';
const unmute = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-volume-down-fill" viewBox="0 0 16 16"><path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zm3.025 4a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8"/></svg>';

playPauseButton.addEventListener('click', () => {
    if (audio.paused || audio.ended) {
        audio.play();
        playPauseButton.innerHTML = pause;
    } else {
        audio.pause();
        playPauseButton.innerHTML = play;
    }
});

muteButton.addEventListener('click', () => {
    if (!isMuted) {
        audio.muted = true;
        muteButton.innerHTML = unmute;
        isMuted = true;
    } else {
        audio.muted = false;
        muteButton.innerHTML = mute;
        isMuted = false;
    }
});

stopButton.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseButton.innerHTML = play;
});