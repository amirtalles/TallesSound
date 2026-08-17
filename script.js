/* =========================================
   TALLESSOUND - MAIN SCRIPT
========================================= */


/* =========================================
   INTRO
========================================= */

const intro = document.getElementById("intro");
const startScreen = document.getElementById("startScreen");
const videoBox = document.getElementById("introVideoBox");
const video = document.getElementById("introVideo");
const letsGo = document.getElementById("letsGo");
const app = document.getElementById("app");

let introStarted = false;
let introFinished = false;


/* ورود به سایت */

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


/* =========================================
   LET'S GO
========================================= */

letsGo.addEventListener("click", async (event) => {

  event.stopPropagation();

  if (introStarted) return;

  introStarted = true;

  /* نمایش ویدیو */

  intro.classList.add("playing");

  videoBox.style.display = "block";

  startScreen.style.opacity = "0";
  startScreen.style.pointerEvents = "none";


  /* از اول */

  try {

    video.currentTime = 0;

  } catch (e) {}

  
  /* پخش ویدیو + صدا */

  try {

    await video.play();

  } catch (error) {

    console.log("Video playback error:", error);

  }

});


/* =========================================
   لمس هر جای Intro
   بعد از شروع ویدیو = Skip
========================================= */

intro.addEventListener("click", (event) => {

  if (!introStarted) return;

  if (event.target === letsGo) return;

  enterApp();

});


/* =========================================
   لمس موبایل
========================================= */

intro.addEventListener(
  "touchend",
  (event) => {

    if (!introStarted) return;

    enterApp();

  },
  { passive:true }
);


/* =========================================
   پایان ویدیو
========================================= */

video.addEventListener("ended", () => {

  enterApp();

});


/* =========================================
   خطای ویدیو
========================================= */

video.addEventListener("error", () => {

  console.log("Intro video could not be loaded.");

  setTimeout(() => {

    enterApp();

  }, 1000);

});


/* =========================================
   MOBILE SIDEBAR
========================================= */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {

  menuBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    sidebar.classList.toggle("open");

  });


  /* کلیک بیرون منو */

  document.addEventListener("click", (event) => {

    if (!sidebar.classList.contains("open")) return;

    if (
      !sidebar.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {

      sidebar.classList.remove("open");

    }

  });


  /* لمس بیرون منو */

  document.addEventListener(
    "touchstart",
    (event) => {

      if (!sidebar.classList.contains("open")) return;

      if (
        !sidebar.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {

        sidebar.classList.remove("open");

      }

    },
    { passive:true }
  );

}


/* =========================================
   BACK BUTTON
========================================= */

window.addEventListener("popstate", () => {

  if (sidebar && sidebar.classList.contains("open")) {

    sidebar.classList.remove("open");

  }

});


/* =========================================
   DEMO PLAYER
========================================= */

const record = document.getElementById("record");
const mainPlay = document.getElementById("mainPlay");
const trackName = document.getElementById("trackName");

let playing = false;


function setPlaying(state) {

  playing = state;

  if (mainPlay) {

    mainPlay.textContent = playing
      ? "Ⅱ"
      : "▶";

  }

  if (record) {

    record.style.animationPlayState =
      playing
        ? "running"
        : "paused";

  }

}


/* شروع چرخش */

setPlaying(true);


/* Play / Pause */

if (mainPlay) {

  mainPlay.addEventListener("click", () => {

    setPlaying(!playing);

  });

}


/* =========================================
   PACK PLAY BUTTONS
========================================= */

document.querySelectorAll(".play").forEach((button) => {

  button.addEventListener("click", (event) => {

    event.stopPropagation();

    if (trackName) {

      trackName.textContent =
        button.dataset.name || "Unknown Track";

    }

    setPlaying(true);

  });

});


/* =========================================
   PROFILE
========================================= */

const profileLink =
  document.querySelector('a[href="profile.html"]');

if (profileLink) {

  profileLink.addEventListener("click", () => {

    if (sidebar) {

      sidebar.classList.remove("open");

    }

  });

}
