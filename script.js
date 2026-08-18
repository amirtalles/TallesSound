/* ==================================================
   INTRO
   دست نخورده
================================================== */

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

  setTimeout(()=>{

    if(intro){
      intro.remove();
    }

    if(app){
      app.classList.remove("hidden");
    }

    initializeApp();

  },500);
}

if(letsGo){

  letsGo.addEventListener("click",async(e)=>{

    e.stopPropagation();

    if(introStarted) return;

    introStarted = true;

    intro.classList.add("playing");

    startScreen.style.display = "none";
    videoBox.style.display = "block";

    video.currentTime = 0;

    try{
      await video.play();
    }catch(error){
      console.log("Video error:",error);
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


/* ==================================================
   DATA
================================================== */

const users = {

  artists:[
    {
      name:"AmirTalles",
      type:"Artist",
      avatar:"AT",
      score:0
    }
  ],

  producers:[]

};


/* ==================================================
   ACCOUNT
================================================== */

let accountType =
  localStorage.getItem("lostSoundAccountType") || "listener";


/* ==================================================
   NAVIGATION
================================================== */

const pages = document.querySelectorAll(".page-section");
const navItems = document.querySelectorAll(".nav-item");

function showPage(page){

  pages.forEach(item=>{
    item.classList.remove("active-page");
  });

  const target =
    document.getElementById("page-"+page);

  if(target){
    target.classList.add("active-page");
  }

  navItems.forEach(item=>{
    item.classList.toggle(
      "active",
      item.dataset.page === page
    );
  });

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


document.querySelectorAll("[data-page]").forEach(button=>{

  button.addEventListener("click",e=>{

    e.preventDefault();

    showPage(button.dataset.page);

  });

});


/* ==================================================
   RANKING
================================================== */

function createRankCard(user,index){

  const card =
    document.createElement("div");

  card.className="rank-card";

  card.innerHTML=`

    <div class="rank-number">
      ${index + 1}
    </div>

    <div class="rank-avatar">
      ${user.avatar}
    </div>

    <div class="rank-info">

      <strong>
        ${user.name}
      </strong>

      <small>
        ${user.type}
      </small>

    </div>

    <div class="rank-score">
      ${user.score || 0} points
    </div>

  `;

  return card;

}


function renderRanking(){

  const artistRanking =
    document.getElementById("artistRanking");

  const producerRanking =
    document.getElementById("producerRanking");

  const homeRanking =
    document.getElementById("homeRanking");


  if(artistRanking){

    artistRanking.innerHTML="";

    users.artists.forEach((user,index)=>{

      artistRanking.appendChild(
        createRankCard(user,index)
      );

    });

  }


  if(producerRanking){

    producerRanking.innerHTML="";

    if(users.producers.length === 0){

      producerRanking.innerHTML=`

        <div class="library-empty">

          <strong>
            No Producers Yet
          </strong>

          <small>
            Producers will appear here after they join Lost Sound.
          </small>

        </div>

      `;

    }else{

      users.producers.forEach((user,index)=>{

        producerRanking.appendChild(
          createRankCard(user,index)
        );

      });

    }

  }


  if(homeRanking){

    homeRanking.innerHTML="";

    const list =
      accountType === "producer"
        ? users.producers
        : users.artists;

    if(list.length === 0){

      homeRanking.innerHTML=`

        <div class="library-empty">

          <strong>
            No Producers Yet
          </strong>

          <small>
            The ranking will appear here.
          </small>

        </div>

      `;

    }else{

      list.slice(0,5).forEach((user,index)=>{

        homeRanking.appendChild(
          createRankCard(user,index)
        );

      });

    }

  }

}


/* ==================================================
   ACCOUNT UI
================================================== */

const roleButtons =
  document.querySelectorAll(".role-item");

function updateAccountUI(){

  roleButtons.forEach(button=>{

    button.classList.toggle(
      "selected",
      button.dataset.account === accountType
    );

  });

  renderRanking();

}


roleButtons.forEach(button=>{

  button.addEventListener("click",()=>{

    accountType =
      button.dataset.account;

    localStorage.setItem(
      "lostSoundAccountType",
      accountType
    );

    updateAccountUI();

    /*
      Artist:
      Home -> Artist Ranking

      Producer:
      Home -> Producer Ranking
    */

    showPage("home");

  });

});


/* ==================================================
   DEFAULT PAGE
================================================== */

function openDefaultPage(){

  /*
    Listener -> Artist Ranking
    Artist   -> Artist Ranking
    Producer -> Producer Ranking
  */

  showPage("home");

}


/* ==================================================
   PLUS / UPLOAD
================================================== */

const plusBtn =
  document.getElementById("plusBtn");

const uploadOverlay =
  document.getElementById("uploadOverlay");

const uploadClose =
  document.getElementById("uploadClose");

const artistUploadOptions =
  document.getElementById("artistUploadOptions");

const producerUploadOptions =
  document.getElementById("producerUploadOptions");


function updateUploadMenu(){

  if(accountType === "producer"){

    artistUploadOptions.classList.add("hidden");
    producerUploadOptions.classList.remove("hidden");

  }else{

    artistUploadOptions.classList.remove("hidden");
    producerUploadOptions.classList.add("hidden");

  }

}


if(plusBtn){

  plusBtn.addEventListener("click",e=>{

    e.stopPropagation();

    updateUploadMenu();

    uploadOverlay.classList.remove("hidden");

  });

}


if(uploadClose){

  uploadClose.addEventListener("click",()=>{

    uploadOverlay.classList.add("hidden");

  });

}


if(uploadOverlay){

  uploadOverlay.addEventListener("click",e=>{

    if(e.target === uploadOverlay){

      uploadOverlay.classList.add("hidden");

    }

  });

}


document.querySelectorAll("[data-upload]").forEach(button=>{

  button.addEventListener("click",()=>{

    const type =
      button.dataset.upload;

    uploadOverlay.classList.add("hidden");

    alert(
      "Upload " +
      type +
      " page will be connected here."
    );

  });

});


/* ==================================================
   SEARCH
================================================== */

const topSearch =
  document.getElementById("topSearch");

const searchBtn =
  document.getElementById("searchBtn");

const artistSearch =
  document.getElementById("artistSearch");

const largeSearch =
  document.getElementById("largeSearch");

const largeSearchBtn =
  document.getElementById("largeSearchBtn");


function openSearch(){

  topSearch.classList.add("open");

  setTimeout(()=>{

    artistSearch.focus();

  },100);

}


if(searchBtn){

  searchBtn.addEventListener("click",e=>{

    e.stopPropagation();

    openSearch();

  });

}


document.addEventListener("click",e=>{

  if(
    topSearch &&
    !topSearch.contains(e.target)
  ){

    if(
      !artistSearch.value.trim()
    ){

      topSearch.classList.remove("open");

    }

  }

});


/* ==================================================
   SEARCH DATA
================================================== */

function searchArtist(value){

  const query =
    value.trim().toLowerCase();

  if(!query){
    return;
  }

  const found =
    users.artists.find(user=>
      user.name.toLowerCase().includes(query)
    );

  if(found){

    alert(
      "Artist: " +
      found.name +
      "\nRank: 1"
    );

  }else{

    alert(
      "No artist found for: " +
      value
    );

  }

}


if(artistSearch){

  artistSearch.addEventListener("keydown",e=>{

    if(e.key === "Enter"){

      searchArtist(
        artistSearch.value
      );

    }

  });

}


if(largeSearch){

  largeSearch.addEventListener("focus",()=>{

    /*
      باعث می‌شود روی موبایل
      کیبورد باز شود
    */

    largeSearch.focus();

  });

  largeSearch.addEventListener("keydown",e=>{

    if(e.key === "Enter"){

      searchArtist(
        largeSearch.value
      );

    }

  });

}


if(largeSearchBtn){

  largeSearchBtn.addEventListener("click",()=>{

    searchArtist(
      largeSearch.value
    );

  });

}


/* ==================================================
   SIDEBAR MOBILE
================================================== */

const menuBtn =
  document.getElementById("menuBtn");

const sidebar =
  document.querySelector(".sidebar");

if(menuBtn && sidebar){

  menuBtn.addEventListener("click",e=>{

    e.stopPropagation();

    sidebar.classList.toggle("open");

  });

}


/* ==================================================
   LIBRARY
================================================== */

const libraryData = {

  likedTracks:[],
  albums:[],
  beats:[],
  packs:[],
  vocals:[],
  fx:[]

};


function updateLibrary(){

  document.getElementById(
    "likedTracksCount"
  ).textContent =
    libraryData.likedTracks.length +
    " items";

  document.getElementById(
    "albumsCount"
  ).textContent =
    libraryData.albums.length +
    " items";

  document.getElementById(
    "beatsCount"
  ).textContent =
    libraryData.beats.length +
    " items";

  document.getElementById(
    "packsCount"
  ).textContent =
    libraryData.packs.length +
    " items";

  document.getElementById(
    "vocalsCount"
  ).textContent =
    libraryData.vocals.length +
    " items";

  document.getElementById(
    "fxCount"
  ).textContent =
    libraryData.fx.length +
    " items";

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

let playing=false;


function setPlaying(state){

  playing=state;

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


document.querySelectorAll(".play").forEach(button=>{

  button.addEventListener("click",()=>{

    if(trackName){

      trackName.textContent =
        button.dataset.name;

    }

    /*
      Player فقط وقتی آهنگ انتخاب شود
      نمایش داده می‌شود.
    */

    player.classList.remove("hidden");

    setPlaying(true);

  });

});


if(mainPlay){

  mainPlay.addEventListener("click",()=>{

    setPlaying(!playing);

  });

}


/* ==================================================
   INITIALIZE
================================================== */

function initializeApp(){

  updateAccountUI();

  updateUploadMenu();

  updateLibrary();

  openDefaultPage();

}
