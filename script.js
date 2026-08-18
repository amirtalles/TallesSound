/* =========================
   INTRO
========================= */

const intro = document.getElementById("intro");
const startScreen = document.getElementById("startScreen");
const videoBox = document.getElementById("introVideoBox");
const video = document.getElementById("introVideo");
const letsGo = document.getElementById("letsGo");
const app = document.getElementById("app");

let introStarted = false;
let introFinished = false;

function enterApp(){

  if(introFinished) return;

  introFinished = true;

  if(video){
    video.pause();
  }

  if(intro){
    intro.style.transition = "opacity .5s ease";
    intro.style.opacity = "0";
  }

  setTimeout(() => {

    if(intro){
      intro.remove();
    }

    if(app){
      app.classList.remove("hidden");
    }

  },500);

}

if(letsGo){

  letsGo.addEventListener("click",async(e)=>{

    e.stopPropagation();

    if(introStarted) return;

    introStarted = true;

    if(intro){
      intro.classList.add("playing");
    }

    if(startScreen){
      startScreen.style.display = "none";
    }

    if(videoBox){
      videoBox.style.display = "block";
    }

    if(video){

      video.currentTime = 0;

      try{
        await video.play();
      }catch(error){
        console.log("Video error:",error);
      }

    }

  });

}

if(video){

  video.addEventListener("click",()=>{

    if(!introStarted) return;

    enterApp();

  });

  video.addEventListener("ended",enterApp);

}


/* =========================
   SIDEBAR
========================= */

const menuBtn =
  document.getElementById("menuBtn");

const sidebar =
  document.querySelector(".sidebar");

if(menuBtn && sidebar){

  menuBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    sidebar.classList.toggle("open");

  });

  document.addEventListener("click",(e)=>{

    if(!sidebar.classList.contains("open")) return;

    if(
      !sidebar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ){

      sidebar.classList.remove("open");

    }

  });

}


/* =========================
   ACCOUNT TYPE
========================= */

const roleItems =
  document.querySelectorAll(".role-item");

const artistUploadOptions =
  document.getElementById("artistUploadOptions");

const producerUploadOptions =
  document.getElementById("producerUploadOptions");

const accountTypeLabel =
  document.getElementById("accountTypeLabel");

let accountType =
  localStorage.getItem("lostSoundAccountType") || "artist";


function updateAccountUI(){

  roleItems.forEach(item => {

    item.classList.toggle(
      "active",
      item.dataset.account === accountType
    );

  });


  if(accountTypeLabel){

    if(accountType === "artist"){

      accountTypeLabel.textContent = "Artist";

    }

    else if(accountType === "producer"){

      accountTypeLabel.textContent = "Producer";

    }

  }


  /*
     Artist options
  */

  if(artistUploadOptions){

    artistUploadOptions.classList.toggle(
      "hidden",
      accountType !== "artist"
    );

  }


  /*
     Producer options
  */

  if(producerUploadOptions){

    producerUploadOptions.classList.toggle(
      "hidden",
      accountType !== "producer"
    );

  }

}


roleItems.forEach(item => {

  item.addEventListener("click",()=>{

    accountType =
      item.dataset.account;

    localStorage.setItem(
      "lostSoundAccountType",
      accountType
    );

    updateAccountUI();

  });

});


updateAccountUI();


/* =========================
   PLUS BUTTON
========================= */

const plusBtn =
  document.getElementById("plusBtn");

const uploadOverlay =
  document.getElementById("uploadOverlay");

const uploadClose =
  document.getElementById("uploadClose");

const uploadModal =
  document.querySelector(".upload-modal");


if(plusBtn){

  plusBtn.addEventListener("click",(e)=>{

    e.preventDefault();
    e.stopPropagation();


    /*
       اگر Listener باشد
    */

    if(
      accountType !== "artist" &&
      accountType !== "producer"
    ){

      return;

    }


    /*
       Artist
    */

    if(accountType === "artist"){

      if(artistUploadOptions){

        artistUploadOptions.classList.remove(
          "hidden"
        );

      }

      if(producerUploadOptions){

        producerUploadOptions.classList.add(
          "hidden"
        );

      }

    }


    /*
       Producer
    */

    if(accountType === "producer"){

      if(artistUploadOptions){

        artistUploadOptions.classList.add(
          "hidden"
        );

      }

      if(producerUploadOptions){

        producerUploadOptions.classList.remove(
          "hidden"
        );

      }

    }


    /*
       نمایش پنجره
    */

    if(uploadOverlay){

      uploadOverlay.classList.add("show");

    }

  });

}


/* =========================
   CLOSE UPLOAD
========================= */

if(uploadClose){

  uploadClose.addEventListener("click",(e)=>{

    e.preventDefault();
    e.stopPropagation();

    if(uploadOverlay){

      uploadOverlay.classList.remove("show");

    }

  });

}


/*
   بستن با لمس بیرون
*/

if(uploadOverlay){

  uploadOverlay.addEventListener("click",(e)=>{

    if(e.target === uploadOverlay){

      uploadOverlay.classList.remove("show");

    }

  });

}


/*
   جلوگیری از بسته شدن با کلیک
   داخل پنجره
*/

if(uploadModal){

  uploadModal.addEventListener("click",(e)=>{

    e.stopPropagation();

  });

}


/* =========================
   UPLOAD OPTIONS
========================= */

const uploadButtons =
  document.querySelectorAll("[data-upload]");


uploadButtons.forEach(button => {

  button.addEventListener("click",()=>{

    const type =
      button.dataset.upload;


    /*
       ARTIST
    */

    if(type === "track"){

      console.log("Upload Track");

      openUploadForm("track");

    }


    if(type === "album"){

      console.log("Upload Album");

      openUploadForm("album");

    }


    /*
       PRODUCER
    */

    if(type === "pack"){

      console.log("Upload Pack");

      openUploadForm("pack");

    }


    if(type === "beat"){

      console.log("Upload Beat");

      openUploadForm("beat");

    }

  });

});


/* =========================
   UPLOAD FORM
========================= */

function openUploadForm(type){

  /*
     فعلاً پنجره اصلی بسته می‌شود.
     فرم واقعی را مرحله بعد اضافه می‌کنیم.
  */

  if(uploadOverlay){

    uploadOverlay.classList.remove("show");

  }


  console.log(
    "Selected upload type:",
    type
  );

}


/* =========================
   YOUR SOUND
========================= */

const yourSoundBtn =
  document.getElementById("yourSoundBtn");

const yourSoundSection =
  document.getElementById("yourSoundSection");


if(yourSoundBtn && yourSoundSection){

  yourSoundBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    yourSoundSection.classList.toggle(
      "hidden"
    );

    yourSoundSection.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

  });

}


/* =========================
   SEARCH
========================= */

const searchBtn =
  document.getElementById("searchBtn");

const artistSearch =
  document.getElementById("artistSearch");

const artistSearchResult =
  document.getElementById("artistSearchResult");

const largeSearch =
  document.getElementById("largeSearch");

const largeSearchBtn =
  document.getElementById("largeSearchBtn");


/*
   آرتیست‌های نمونه
*/

const demoArtists = [

  {
    name:"AmirTalles",
    type:"Artist",
    avatar:"AT"
  },

  {
    name:"Dark Producer",
    type:"Producer",
    avatar:"DP"
  },

  {
    name:"Lost Artist",
    type:"Artist",
    avatar:"LA"
  }

];


function performSearch(value){

  if(!artistSearchResult) return;

  const query =
    value.trim().toLowerCase();


  if(!query){

    artistSearchResult.classList.remove(
      "show"
    );

    artistSearchResult.innerHTML = "";

    return;

  }


  const results =
    demoArtists.filter(artist =>

      artist.name
        .toLowerCase()
        .includes(query)

    );


  artistSearchResult.innerHTML = "";


  results.forEach(artist => {

    const item =
      document.createElement("div");

    item.className =
      "artist-result";


    item.innerHTML = `

      <div class="artist-result-avatar">
        ${artist.avatar}
      </div>

      <div class="artist-result-info">

        <strong>
          ${artist.name}
        </strong>

        <small>
          ${artist.type}
        </small>

      </div>

    `;


    item.addEventListener("click",()=>{

      console.log(
        "Opening channel:",
        artist.name
      );

      /*
         بعداً اینجا channel.html
         یا پروفایل آرتیست باز می‌شود.
      */

    });


    artistSearchResult.appendChild(item);

  });


  if(results.length){

    artistSearchResult.classList.add(
      "show"
    );

  }

  else{

    artistSearchResult.classList.remove(
      "show"
    );

  }

}


/*
   سرچ بالای صفحه
*/

if(searchBtn && artistSearch){

  searchBtn.addEventListener("click",()=>{

    artistSearch.focus();

  });


  artistSearch.addEventListener("input",()=>{

    performSearch(
      artistSearch.value
    );

  });

}


/*
   سرچ بزرگ
*/

if(largeSearch){

  largeSearch.addEventListener("input",()=>{

    /*
       انتقال عبارت به سرچ اصلی
    */

    if(artistSearch){

      artistSearch.value =
        largeSearch.value;

    }

    performSearch(
      largeSearch.value
    );

  });

}


if(largeSearchBtn){

  largeSearchBtn.addEventListener("click",()=>{

    performSearch(
      largeSearch
        ? largeSearch.value
        : ""
    );

  });

}


/* =========================
   PLAYER
========================= */

const player =
  document.getElementById("player");

const record =
  document.getElementById("record");

const mainPlay =
  document.getElementById("mainPlay");

const trackName =
  document.getElementById("trackName");

let playing = false;


/*
   پلیر در ابتدا مخفی
*/

if(player){

  player.classList.add("hidden");

}


function showPlayer(){

  if(player){

    player.classList.remove(
      "hidden"
    );

  }

}


function setPlaying(state){

  playing = state;


  if(mainPlay){

    mainPlay.textContent =
      playing ? "Ⅱ" : "▶";

  }


  if(record){

    record.style.animationPlayState =
      playing
      ? "running"
      : "paused";

  }

}


/*
   Play ترک
*/

document.querySelectorAll(".play")
.forEach(button => {

  button.addEventListener("click",()=>{

    if(trackName){

      trackName.textContent =
        button.dataset.name;

    }


    /*
       اولین Play:
       پلیر ظاهر می‌شود
    */

    showPlayer();

    setPlaying(true);

  });

});


/*
   Play / Pause
*/

if(mainPlay){

  mainPlay.addEventListener("click",()=>{

    setPlaying(!playing);

  });

}


/* =========================
   ESC
========================= */

document.addEventListener("keydown",(e)=>{

  if(e.key === "Escape"){

    if(uploadOverlay){

      uploadOverlay.classList.remove(
        "show"
      );

    }

    if(artistSearchResult){

      artistSearchResult.classList.remove(
        "show"
      );

    }

  }

});
