const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const letsGo = document.getElementById("letsGo");
const app = document.getElementById("app");

letsGo.addEventListener("click", async () => {
  intro.classList.add("playing");
  try {
    video.currentTime = 0;
    await video.play();
  } catch (e) {
    // Browser permissions/errors are handled without breaking the intro.
  }
});

video.addEventListener("ended", () => {
  intro.style.transition = "opacity .7s ease";
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.remove();
    app.classList.remove("hidden");
  }, 700);
});

// Fallback if the video file cannot be loaded.
video.addEventListener("error", () => {
  setTimeout(() => {
    intro.remove();
    app.classList.remove("hidden");
  }, 1000);
});

// Mobile sidebar
document.getElementById("menuBtn").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("open");
});

// Demo player state + rotating record
const record = document.getElementById("record");
const mainPlay = document.getElementById("mainPlay");
const trackName = document.getElementById("trackName");
let playing = false;

function setPlaying(state) {
  playing = state;
  mainPlay.textContent = playing ? "Ⅱ" : "▶";
  record.style.animationPlayState = playing ? "running" : "paused";
}
setPlaying(true);

mainPlay.addEventListener("click", () => setPlaying(!playing));

document.querySelectorAll(".play").forEach(btn => {
  btn.addEventListener("click", () => {
    trackName.textContent = btn.dataset.name;
    setPlaying(true);
  });
});
