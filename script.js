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
    } catch (e) {
      console.error("Playback failed:", e);
      musicLabel.textContent = "Nhấp lại để thử phát nhạc";
    }
  });

  audio.addEventListener("ended", () => setMusicState(false));
  audio.addEventListener("pause", () => setMusicState(false));
  audio.addEventListener("play", () => setMusicState(true));
}

// Auto-scroll logic
const scrollButton = document.querySelector("[data-scroll-toggle]");
const scrollLabel = document.querySelector("[data-scroll-label]");
let scrollInterval = null;

if (scrollButton && scrollLabel) {
  scrollButton.addEventListener("click", () => {
    const isScrolling = scrollInterval !== null;
    
    if (isScrolling) {
      clearInterval(scrollInterval);
      scrollInterval = null;
      scrollButton.classList.remove("is-scrolling");
      scrollButton.setAttribute("aria-pressed", "false");
      scrollLabel.textContent = "Tự động cuộn";
    } else {
      scrollButton.classList.add("is-scrolling");
      scrollButton.setAttribute("aria-pressed", "true");
      scrollLabel.textContent = "Dừng cuộn";
      
      scrollInterval = setInterval(() => {
        window.scrollBy({
          top: 1,
          left: 0,
          behavior: "auto"
        });
        
        // Auto-stop at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1) {
          clearInterval(scrollInterval);
          scrollInterval = null;
          scrollButton.classList.remove("is-scrolling");
          scrollButton.setAttribute("aria-pressed", "false");
          scrollLabel.textContent = "Tự động cuộn";
        }
      }, 20); // 50px/sec scroll speed
    }
  });
}
