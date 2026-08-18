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

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

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

const accountButtons =
  document.querySelectorAll(".account-option");

const artistUploadOptions =
  document.getElementById("artistUploadOptions");

const producerUploadOptions =
  document.getElementById("producerUploadOptions");

const accountTypeLabel =
  document.getElementById("accountTypeLabel");

let accountType =
  localStorage.getItem("lostSoundAccountType") || "listener";


function updateAccountUI(){

  accountButtons.forEach(button=>{

    button.classList.toggle(
      "selected",
      button.dataset.account === accountType
    );

  });


  if(accountTypeLabel){

    if(accountType === "artist"){
      accountTypeLabel.textContent = "Artist";
    }

    else if(accountType === "producer"){
      accountTypeLabel.textContent = "Producer";
    }

    else{
      accountTypeLabel.textContent = "Listener";
    }

  }


  if(artistUploadOptions){

    artistUploadOptions.classList.toggle(
      "hidden",
      accountType !== "artist"
    );

  }


  if(producerUploadOptions){

    producerUploadOptions.classList.toggle(
      "hidden",
      accountType !== "producer"
    );

  }

}


accountButtons.forEach(button=>{

  button.addEventListener("click",()=>{

    accountType = button.dataset.account;

    localStorage.setItem(
      "lostSoundAccountType",
      accountType
    );

    updateAccountUI();

    console.log(
      "Account:",
      accountType
    );

  });

});


updateAccountUI();


/* =========================
   PLUS / UPLOAD MENU
========================= */

const plusBtn =
  document.getElementById("plusBtn");

const uploadMenu =
  document.getElementById("uploadMenu");

if(plusBtn && uploadMenu){

  plusBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    if(accountType === "listener"){

      alert(
        "Please choose Artist or Producer first."
      );

      return;

    }

    uploadMenu.classList.toggle("hidden");

  });


  document.addEventListener("click",(e)=>{

    if(
      !uploadMenu.contains(e.target) &&
      !plusBtn.contains(e.target)
    ){

      uploadMenu.classList.add("hidden");

    }

  });

}


/* =========================
   UPLOAD MODAL
========================= */

const uploadModal =
  document.getElementById("uploadModal");

const uploadModalTitle =
  document.getElementById("uploadModalTitle");

const uploadModalText =
  document.getElementById("uploadModalText");

const closeUploadModal =
  document.getElementById("closeUploadModal");

const uploadButtons =
  document.querySelectorAll(
    "[data-upload]"
  );


function openUploadModal(type){

  if(!uploadModal) return;

  if(uploadModalTitle){

    if(type === "track"){
      uploadModalTitle.textContent =
        "Upload Track";
    }

    else if(type === "album"){
      uploadModalTitle.textContent =
        "Upload Album";
    }

    else if(type === "pack"){
      uploadModalTitle.textContent =
        "Upload Pack";
    }

  }


  if(uploadModalText){

    if(type === "track"){
      uploadModalText.textContent =
        "Upload your complete track.";
    }

    else if(type === "album"){
      uploadModalText.textContent =
        "Create a new album release.";
    }

    else if(type === "pack"){
      uploadModalText.textContent =
        "Upload your producer sound pack.";
    }

  }


  uploadModal.dataset.type = type;

  uploadModal.classList.remove("hidden");

  if(uploadMenu){
    uploadMenu.classList.add("hidden");
  }

}


uploadButtons.forEach(button=>{

  button.addEventListener("click",()=>{

    openUploadModal(
      button.dataset.upload
    );

  });

});


if(closeUploadModal){

  closeUploadModal.addEventListener("click",()=>{

    uploadModal.classList.add("hidden");

  });

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
      behavior:"smooth"
    });

  });

}


/* =========================
   SEARCH
========================= */

const artistSearch =
  document.getElementById("artistSearch");

const largeSearch =
  document.getElementById("largeSearch");

const largeSearchBtn =
  document.getElementById("largeSearchBtn");

const searchResults =
  document.getElementById("searchResults");


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

  if(!searchResults) return;

  const query =
    value.trim().toLowerCase();

  if(!query){

    searchResults.classList.add("hidden");

    searchResults.innerHTML = "";

    return;

  }


  const results =
    demoArtists.filter(artist=>
      artist.name
        .toLowerCase()
        .includes(query)
    );


  searchResults.innerHTML = "";


  results.forEach(artist=>{

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
          ${artist.type}
        </small>

      </div>

    `;


    item.addEventListener("click",()=>{

      alert(
        "Artist channel: " +
        artist.name
      );

    });


    searchResults.appendChild(item);

  });


  searchResults.classList.toggle(
    "hidden",
    results.length === 0
  );

}


if(artistSearch){

  artistSearch.addEventListener(
    "input",
    ()=>performSearch(
      artistSearch.value
    )
  );

}


if(largeSearch){

  largeSearch.addEventListener(
    "input",
    ()=>performSearch(
      largeSearch.value
    )
  );

}


if(largeSearchBtn){

  largeSearchBtn.addEventListener(
    "click",
    ()=>performSearch(
      largeSearch?.value || ""
    )
  );

}


/* =========================
   PLAYER
========================= */

const record =
  document.getElementById("record");

const mainPlay =
  document.getElementById("mainPlay");

const trackName =
  document.getElementById("trackName");

let playing = false;


function setPlaying(state){

  playing = state;

  if(mainPlay){

    mainPlay.textContent =
      playing ? "Ⅱ" : "▶";

  }

  if(record){

    record.style.animationPlayState =
      playing ? "running" : "paused";

  }

}


if(mainPlay){

  setPlaying(false);

  mainPlay.addEventListener("click",()=>{

    setPlaying(!playing);

  });

}


document.querySelectorAll(".play").forEach(button=>{

  button.addEventListener("click",()=>{

    if(trackName){

      trackName.textContent =
        button.dataset.name;

    }

    setPlaying(true);

  });

});
