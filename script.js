const intro = document.getElementById("intro");
const startScreen = document.getElementById("startScreen");
const videoBox = document.getElementById("introVideoBox");
const video = document.getElementById("introVideo");
const letsGo = document.getElementById("letsGo");
const app = document.getElementById("app");

let introStarted = false;
let introFinished = false;


/* =========================
   ورود به سایت
========================= */

function enterApp() {

  if (introFinished) return;

  introFinished = true;

  video.pause();

  intro.style.transition = "opacity .5s ease";
  intro.style.opacity = "0";

  setTimeout(() => {

    intro.remove();
    app.classList.remove("hidden");

  }, 500);
}


/* =========================
   LET'S GO
========================= */

letsGo.addEventListener("click", async (e) => {

  e.stopPropagation();

  if (introStarted) return;

  introStarted = true;

  intro.classList.add("playing");

  startScreen.style.display = "none";
  videoBox.style.display = "block";

  video.currentTime = 0;

  try {

    await video.play();

  } catch (error) {

    console.log("Video error:", error);

  }

});


/* =========================
   لمس ویدیو = SKIP
========================= */

video.addEventListener("click", () => {

  if (!introStarted) return;

  enterApp();

});


/* =========================
   پایان ویدیو
========================= */

video.addEventListener("ended", () => {

  enterApp();

});


/* =========================
   خطای ویدیو
========================= */

video.addEventListener("error", () => {

  console.log("intro.mp4 پیدا نشد یا قابل پخش نیست.");

});


/* =========================
   منوی همبرگری
========================= */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {

  menuBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    sidebar.classList.toggle("open");

  });


  document.addEventListener("click", (e) => {

    if (!sidebar.classList.contains("open")) return;

    if (
      !sidebar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {

      sidebar.classList.remove("open");

    }

  });

}


/* =========================
   پلیر
========================= */

const record = document.getElementById("record");
const mainPlay = document.getElementById("mainPlay");
const trackName = document.getElementById("trackName");

let playing = true;


function setPlaying(state) {

  playing = state;

  if (mainPlay) {

    mainPlay.textContent = playing
      ? "Ⅱ"
      : "▶";

  }

  if (record) {

    record.style.animationPlayState =
      playing ? "running" : "paused";

  }

}


setPlaying(true);


/* Play / Pause */

if (mainPlay) {

  mainPlay.addEventListener("click", () => {

    setPlaying(!playing);

  });

}


/* =========================
   PACK ها
========================= */

document.querySelectorAll(".play").forEach((button) => {

  button.addEventListener("click", () => {

    if (trackName) {

      trackName.textContent =
        button.dataset.name;

    }

    setPlaying(true);

  });

});
