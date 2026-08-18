/* ==================================================
   LOST SOUND - MAIN SCRIPT
================================================== */


/* ==================================================
   INTRO / LET'S GO
================================================== */

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

  /* توقف ویدیو */
  if (video) {
    video.pause();
  }

  /* محو شدن Intro */
  if (intro) {

    intro.style.transition = "opacity .5s ease";
    intro.style.opacity = "0";

  }

  /* نمایش سایت */
  setTimeout(() => {

    if (intro) {
      intro.remove();
    }

    if (app) {
      app.classList.remove("hidden");
    }

    document.body.style.overflowX = "hidden";

  }, 500);

}


/* دکمه LET'S GO */

if (letsGo) {

  letsGo.addEventListener("click", async function (e) {

    e.preventDefault();
    e.stopPropagation();

    if (introStarted) return;

    introStarted = true;


    /* فعال شدن حالت ویدیو */

    if (intro) {
      intro.classList.add("playing");
    }

    if (startScreen) {
      startScreen.style.display = "none";
    }

    if (videoBox) {
      videoBox.style.display = "block";
    }


    /* پخش ویدیو */

    if (video) {

      try {

        video.currentTime = 0;

        await video.play();

      } catch (error) {

        console.log("Video play error:", error);

        /*
          اگر ویدیو پخش نشد،
          باز هم وارد سایت شو
        */

        setTimeout(() => {
          enterApp();
        }, 300);

      }

    } else {

      enterApp();

    }

  });

}


/* کلیک روی ویدیو = ورود */

if (video) {

  video.addEventListener("click", function () {

    if (!introStarted) return;

    enterApp();

  });


  /* پایان ویدیو */

  video.addEventListener("ended", function () {

    enterApp();

  });


  /* خطای ویدیو */

  video.addEventListener("error", function () {

    console.log("intro.mp4 پیدا نشد یا قابل پخش نیست.");

    /*
      اگر فایل ویدیو مشکل داشت
      سایت قفل نمی‌شود
    */

    setTimeout(() => {

      if (!introFinished) {
        enterApp();
      }

    }, 500);

  });

}


/* ==================================================
   SIDEBAR / MOBILE MENU
================================================== */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {

  menuBtn.addEventListener("click", function (e) {

    e.preventDefault();
    e.stopPropagation();

    sidebar.classList.toggle("open");

  });


  document.addEventListener("click", function (e) {

    if (!sidebar.classList.contains("open")) return;

    if (
      !sidebar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {

      sidebar.classList.remove("open");

    }

  });

}


/* ==================================================
   ACCOUNT TYPE
================================================== */

const accountButtons =
  document.querySelectorAll(".role-item");

const artistUploadOptions =
  document.getElementById("artistUploadOptions");

const producerUploadOptions =
  document.getElementById("producerUploadOptions");

const accountTypeLabel =
  document.getElementById("accountTypeLabel");


/*
  Listener
  Artist
  Producer
*/

let accountType =
  localStorage.getItem("lostSoundAccountType") || "listener";


function updateAccountUI() {


  /* انتخاب Artist / Producer */

  accountButtons.forEach(button => {

    button.classList.toggle(
      "selected",
      button.dataset.account === accountType
    );

  });


  /* نوشته Your Sound */

  if (accountTypeLabel) {

    if (accountType === "artist") {

      accountTypeLabel.textContent = "Artist";

    }

    else if (accountType === "producer") {

      accountTypeLabel.textContent = "Producer";

    }

    else {

      accountTypeLabel.textContent = "Listener";

    }

  }


  /* آپلودهای Artist */

  if (artistUploadOptions) {

    artistUploadOptions.classList.toggle(
      "hidden",
      accountType !== "artist"
    );

  }


  /* آپلودهای Producer */

  if (producerUploadOptions) {

    producerUploadOptions.classList.toggle(
      "hidden",
      accountType !== "producer"
    );

  }

}


/* انتخاب حساب */

accountButtons.forEach(button => {

  button.addEventListener("click", function () {

    accountType =
      this.dataset.account;

    localStorage.setItem(
      "lostSoundAccountType",
      accountType
    );

    updateAccountUI();

  });

});


updateAccountUI();


/* ==================================================
   PLUS / UPLOAD OVERLAY
================================================== */

const plusBtn =
  document.getElementById("plusBtn");

const uploadOverlay =
  document.getElementById("uploadOverlay");

const uploadClose =
  document.getElementById("uploadClose");


/* باز کردن Upload */

if (plusBtn) {

  plusBtn.addEventListener("click", function (e) {

    e.preventDefault();
    e.stopPropagation();


    /* Listener اجازه آپلود ندارد */

    if (accountType === "listener") {

      alert(
        "Please choose Artist or Producer first."
      );

      return;

    }


    if (uploadOverlay) {

      uploadOverlay.classList.add("show");

      uploadOverlay.classList.remove("hidden");

    }

  });

}


/* بستن Upload */

if (uploadClose) {

  uploadClose.addEventListener("click", function () {

    if (uploadOverlay) {

      uploadOverlay.classList.remove("show");

      uploadOverlay.classList.add("hidden");

    }

  });

}


/* کلیک بیرون مودال */

if (uploadOverlay) {

  uploadOverlay.addEventListener("click", function (e) {

    if (e.target === uploadOverlay) {

      uploadOverlay.classList.remove("show");

      uploadOverlay.classList.add("hidden");

    }

  });

}


/* ==================================================
   UPLOAD OPTIONS
================================================== */

const uploadButtons =
  document.querySelectorAll("[data-upload]");


uploadButtons.forEach(button => {

  button.addEventListener("click", function () {

    const type =
      this.dataset.upload;

    console.log(
      "Selected upload:",
      type
    );


    /*
      فعلاً فقط انتخاب نوع آپلود.
      فرم واقعی آپلود را بعداً اضافه می‌کنیم.
    */

    if (type === "track") {

      alert("Upload Track");

    }

    else if (type === "album") {

      alert("Upload Album");

    }

    else if (type === "pack") {

      alert("Upload Pack");

    }

    else if (type === "beat") {

      alert("Upload Beat");

    }

  });

});


/* ==================================================
   YOUR SOUND / LIBRARY
================================================== */

const yourSoundBtn =
  document.getElementById("yourSoundBtn");

const yourSoundSection =
  document.getElementById("yourSoundSection");


if (yourSoundBtn && yourSoundSection) {

  yourSoundBtn.addEventListener("click", function (e) {

    e.preventDefault();

    yourSoundSection.classList.toggle("hidden");

    if (!yourSoundSection.classList.contains("hidden")) {

      yourSoundSection.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

}


/* ==================================================
   SEARCH
================================================== */

const artistSearch =
  document.getElementById("artistSearch");

const largeSearch =
  document.getElementById("largeSearch");

const largeSearchBtn =
  document.getElementById("largeSearchBtn");

const artistSearchResult =
  document.getElementById("artistSearchResult");


/* فعلاً دیتای آزمایشی */

const demoArtists = [

  {
    name: "AmirTalles",
    username: "@amirtalles",
    type: "Artist",
    avatar: "AT",
    rank: 1
  },

  {
    name: "Dark Producer",
    username: "@darkproducer",
    type: "Producer",
    avatar: "DP",
    rank: 2
  }

];


function performSearch(value) {

  if (!artistSearchResult) return;

  const query =
    value.trim().toLowerCase();


  if (!query) {

    artistSearchResult.classList.add("hidden");

    artistSearchResult.innerHTML = "";

    return;

  }


  const results =
    demoArtists.filter(artist =>

      artist.name
        .toLowerCase()
        .includes(query)

      ||

      artist.username
        .toLowerCase()
        .includes(query)

    );


  artistSearchResult.innerHTML = "";


  results.forEach(artist => {

    const item =
      document.createElement("div");

    item.className =
      "search-result";


    item.innerHTML = `

      <div class="search-result-avatar">
        ${artist.avatar}
      </div>

      <div class="search-result-info">

        <strong>
          ${artist.name}
        </strong>

        <small>
          ${artist.username} • ${artist.type}
        </small>

      </div>

    `;


    item.addEventListener("click", function () {

      console.log(
        "Open profile:",
        artist.name
      );

    });


    artistSearchResult.appendChild(item);

  });


  artistSearchResult.classList.toggle(
    "hidden",
    results.length === 0
  );

}


/* سرچ بالای صفحه */

if (artistSearch) {

  artistSearch.addEventListener(
    "input",
    function () {

      performSearch(
        this.value
      );

    }
  );

}


/* سرچ بزرگ */

if (largeSearch) {

  largeSearch.addEventListener(
    "input",
    function () {

      performSearch(
        this.value
      );

    }
  );

}


/* دکمه سرچ */

if (largeSearchBtn) {

  largeSearchBtn.addEventListener(
    "click",
    function () {

      performSearch(
        largeSearch
          ? largeSearch.value
          : ""
      );

    }
  );

}


/* ==================================================
   PLAYER
================================================== */

const player =
  document.getElementById("player");

const record =
  document.getElementById("record");

const mainPlay =
  document.getElementById("mainPlay");

const trackName =
  document.getElementById("trackName");

let playing = false;


/* وضعیت Player */

function setPlaying(state) {

  playing = state;


  if (mainPlay) {

    mainPlay.textContent =
      playing
        ? "Ⅱ"
        : "▶";

  }


  if (record) {

    record.style.animationPlayState =
      playing
        ? "running"
        : "paused";

  }


  /*
    Player فقط وقتی موزیک Play شده
    نمایش داده شود
  */

  if (player) {

    if (playing) {

      player.classList.remove("hidden");

    }

  }

}


/* اول سایت Player مخفی باشد */

if (player) {

  player.classList.add("hidden");

}


if (mainPlay) {

  mainPlay.addEventListener("click", function () {

    setPlaying(!playing);

  });

}


/* ==================================================
   PLAY BUTTONS
================================================== */

document.querySelectorAll(".play").forEach(button => {

  button.addEventListener("click", function () {

    const name =
      this.dataset.name || "Unknown Track";


    if (trackName) {

      trackName.textContent =
        name;

    }


    /* Player باز شود */

    if (player) {

      player.classList.remove("hidden");

    }


    setPlaying(true);

  });

});


/* ==================================================
   FINAL
================================================== */

console.log(
  "Lost Sound loaded successfully."
);
