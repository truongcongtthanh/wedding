const audio = document.querySelector("[data-audio]");
const musicButton = document.querySelector("[data-music-toggle]");
const musicLabel = document.querySelector("[data-music-label]");

function setMusicState(isPlaying) {
  musicButton.classList.toggle("is-playing", isPlaying);
  musicButton.setAttribute("aria-pressed", String(isPlaying));
  musicLabel.textContent = isPlaying ? "Tạm dừng bài hát" : "Phát bài hát của mình";
}

if (audio && musicButton && musicLabel) {
  musicButton.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      setMusicState(false);
      return;
    }

    try {
      await audio.play();
      setMusicState(true);
    } catch {
      musicLabel.textContent = "Không phát được nhạc";
      musicButton.disabled = true;
    }
  });

  audio.addEventListener("ended", () => setMusicState(false));
  audio.addEventListener("pause", () => setMusicState(false));
  audio.addEventListener("play", () => setMusicState(true));
}
