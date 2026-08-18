/* =========================================================
   LOST SOUND - COMPLETE SCRIPT
   Intro preserved
========================================================= */


/* =========================================================
   INTRO
========================================================= */

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
      }

      catch(error){
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


/* =========================================================
   SIDEBAR
========================================================= */

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


/* =========================================================
   ACCOUNT TYPE
========================================================= */

const roleButtons =
  document.querySelectorAll(".role-item");

const accountTypeLabel =
  document.getElementById("accountTypeLabel");

let accountType =
  localStorage.getItem("lostSoundAccountType") || "listener";


function updateAccountType(){

  roleButtons.forEach(button=>{

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

}


roleButtons.forEach(button=>{

  button.addEventListener("click",()=>{

    accountType =
      button.dataset.account;

    localStorage.setItem(
      "lostSoundAccountType",
      accountType
    );

    updateAccountType();

    setMainPage(
      accountType === "producer"
        ? "producers"
        : "artists"
    );

  });

});


updateAccountType();


/* =========================================================
   UPLOAD SYSTEM
========================================================= */

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

const uploadButtons =
  document.querySelectorAll("[data-upload]");


function updateUploadOptions(){

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


function openUploadMenu(){

  if(!uploadOverlay) return;

  updateUploadOptions();

  uploadOverlay.classList.remove("hidden");

}


function closeUploadMenu(){

  if(!uploadOverlay) return;

  uploadOverlay.classList.add("hidden");

}


if(plusBtn){

  plusBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    if(accountType === "listener"){

      alert(
        "Please choose Artist or Producer first."
      );

      return;

    }

    openUploadMenu();

  });

}


if(uploadClose){

  uploadClose.addEventListener(
    "click",
    closeUploadMenu
  );

}


if(uploadOverlay){

  uploadOverlay.addEventListener("click",(e)=>{

    if(e.target === uploadOverlay){

      closeUploadMenu();

    }

  });

}


uploadButtons.forEach(button=>{

  button.addEventListener("click",()=>{

    const type =
      button.dataset.upload;

    closeUploadMenu();

    console.log(
      "Upload selected:",
      type
    );

    if(type === "track"){

      openUploadPage("track");

    }

    else if(type === "album"){

      openUploadPage("album");

    }

    else if(type === "pack"){

      openUploadPage("pack");

    }

    else if(type === "beat"){

      openUploadPage("beat");

    }

  });

});


function openUploadPage(type){

  const titles = {

    track:"Upload Track",

    album:"Upload Album",

    pack:"Upload Pack",

    beat:"Upload Beat"

  };

  alert(
    titles[type] +
    "\n\nUpload system is ready."
  );

}


/* =========================================================
   SEARCH
========================================================= */

const artistSearch =
  document.getElementById("artistSearch");

const largeSearch =
  document.getElementById("largeSearch");

const largeSearchBtn =
  document.getElementById("largeSearchBtn");

const artistSearchResult =
  document.getElementById("artistSearchResult");


/*
   فعلاً فقط خودت داخل پلتفرم هستی.
   بعداً این آرایه از دیتابیس پر می‌شود.
*/

const artists = [

  {
    id:1,
    name:"AmirTalles",
    username:"@amirtalles",
    type:"Artist",
    plays:"12.5M",
    avatar:"AT",
    verified:true
  }

];


const producers = [];


function searchArtists(value){

  if(!artistSearchResult) return;

  const query =
    value.trim().toLowerCase();


  if(!query){

    artistSearchResult.innerHTML = "";

    artistSearchResult.classList.add(
      "hidden"
    );

    return;

  }


  const artistResults =
    artists.filter(artist=>

      artist.name
        .toLowerCase()
        .includes(query)

      ||

      artist.username
        .toLowerCase()
        .includes(query)

    );


  const producerResults =
    producers.filter(producer=>

      producer.name
        .toLowerCase()
        .includes(query)

      ||

      producer.username
        .toLowerCase()
        .includes(query)

    );


  const results = [

    ...artistResults,

    ...producerResults

  ];


  artistSearchResult.innerHTML = "";


  results.forEach(person=>{

    const item =
      document.createElement("div");

    item.className =
      "search-result";


    item.innerHTML = `

      <div class="search-result-avatar">
        ${person.avatar || "LS"}
      </div>

      <div class="search-result-info">

        <strong>
          ${person.name}
        </strong>

        <small>
          ${person.username}
          ·
          ${person.type}
        </small>

      </div>

    `;


    item.addEventListener("click",()=>{

      openProfile(person);

    });


    artistSearchResult.appendChild(item);

  });


  artistSearchResult.classList.toggle(
    "hidden",
    results.length === 0
  );

}


if(artistSearch){

  artistSearch.addEventListener(
    "input",
    ()=>{
      searchArtists(
        artistSearch.value
      );
    }
  );

}


if(largeSearch){

  largeSearch.addEventListener(
    "input",
    ()=>{
      searchArtists(
        largeSearch.value
      );
    }
  );

}


if(largeSearchBtn){

  largeSearchBtn.addEventListener(
    "click",
    ()=>{
      searchArtists(
        largeSearch?.value || ""
      );
    }
  );

}


/* =========================================================
   SEARCH BUTTON
   روی آیکون سرچ = باز شدن input
========================================================= */

const searchBtn =
  document.getElementById("searchBtn");

const topSearch =
  document.getElementById("topSearch");


if(searchBtn && artistSearch){

  searchBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    artistSearch.classList.toggle(
      "search-open"
    );

    if(
      artistSearch.classList.contains(
        "search-open"
      )
    ){

      artistSearch.focus();

    }

  });

}


/* =========================================================
   MAIN PAGE SYSTEM
========================================================= */

const content =
  document.querySelector(".content");

const originalHero =
  document.querySelector(".hero");

const originalCategories =
  document.querySelectorAll(
    ".content > section"
  );


let currentPage = "artists";


function hideOriginalSections(){

  originalHero?.classList.add(
    "lost-hidden"
  );

  originalCategories.forEach(
    section=>{

      if(
        !section.classList.contains(
          "lost-generated"
        )
      ){

        section.classList.add(
          "lost-hidden"
        );

      }

    }
  );

}


function setMainPage(page){

  currentPage = page;

  hideOriginalSections();

  renderPage(page);

  updateBottomNavigation();

}


function renderPage(page){

  let ranking =
    document.getElementById(
      "lostRankingPage"
    );


  if(!ranking){

    ranking =
      document.createElement("section");

    ranking.id =
      "lostRankingPage";

    ranking.className =
      "lost-generated lost-ranking-page";

    content.appendChild(ranking);

  }


  ranking.innerHTML = "";


  if(page === "artists"){

    ranking.innerHTML =
      createRankingPage(
        "ARTISTS",
        "ARTISTS RANKING",
        "Top artists based on total plays",
        artists
      );

  }

  else if(page === "producers"){

    ranking.innerHTML =
      createRankingPage(
        "PRODUCERS",
        "PRODUCERS RANKING",
        "Top producers based on total plays",
        producers
      );

  }

  else if(page === "library"){

    ranking.innerHTML =
      createLibraryPage();

  }

  else if(page === "explore"){

    ranking.innerHTML =
      createExplorePage();

  }

  else if(page === "profile"){

    ranking.innerHTML =
      createProfilePage();

  }

}


/* =========================================================
   RANKING PAGE
========================================================= */

function createRankingPage(
  tabTitle,
  heading,
  description,
  people
){

  let rows = "";


  if(people.length === 0){

    rows = `

      <div class="lost-empty">

        <strong>
          No ${tabTitle.toLowerCase()} yet
        </strong>

        <small>
          New ${tabTitle.toLowerCase()}
          will appear here.
        </small>

      </div>

    `;

  }

  else{

    people.forEach((person,index)=>{

      const rank =
        index + 1;


      rows += `

        <article
          class="ranking-card"
          data-person-id="${person.id}"
        >

          <div class="ranking-number">
            ${rank}
          </div>


          <div class="ranking-avatar">
            ${person.avatar || "LS"}
          </div>


          <div class="ranking-user">

            <strong>

              ${person.name}

              ${
                person.verified
                ? `<span class="verified">✓</span>`
                : ""
              }

            </strong>

            <small>
              ${person.username}
            </small>

          </div>


          <div class="ranking-plays">

            <strong>
              ${person.plays || "0"}
            </strong>

            <small>
              PLAYS
            </small>

          </div>


          <button
            class="ranking-more"
            type="button"
          >
            ⋮
          </button>

        </article>

      `;

    });

  }


  return `

    <div class="ranking-tabs">

      <button
        class="ranking-tab ${
          tabTitle === "ARTISTS"
          ? "active"
          : ""
        }"
        data-page="artists"
      >
        ARTISTS
      </button>


      <button
        class="ranking-tab ${
          tabTitle === "PRODUCERS"
          ? "active"
          : ""
        }"
        data-page="producers"
      >
        PRODUCERS
      </button>

    </div>


    <div class="ranking-header">

      <div>

        <h1>
          ${heading}
        </h1>

        <p>
          ${description}
        </p>

      </div>


      <select class="ranking-filter">

        <option>
          ALL TIME
        </option>

        <option>
          THIS MONTH
        </option>

        <option>
          THIS WEEK
        </option>

      </select>

    </div>


    <div class="ranking-list">

      ${rows}

    </div>

  `;

}


/* =========================================================
   LIBRARY
========================================================= */

function createLibraryPage(){

  return `

    <div class="library-page">

      <div class="library-title">

        <h1>
          LIBRARY
        </h1>

        <p>
          Your saved music and collections
        </p>

      </div>


      <div class="library-categories">

        <button
          class="library-category"
          data-library="tracks"
        >
          <strong>
            TRACKS
          </strong>

          <small>
            Saved & liked tracks
          </small>

        </button>


        <button
          class="library-category"
          data-library="albums"
        >
          <strong>
            ALBUMS
          </strong>

          <small>
            Saved albums
          </small>

        </button>


        <button
          class="library-category"
          data-library="packs"
        >
          <strong>
            PACKS
          </strong>

          <small>
            Saved producer packs
          </small>

        </button>


        <button
          class="library-category"
          data-library="beats"
        >
          <strong>
            BEATS
          </strong>

          <small>
            Saved beats
          </small>

        </button>


        <button
          class="library-category"
          data-library="favorites"
        >
          <strong>
            LIKES
          </strong>

          <small>
            Your favorites
          </small>

        </button>

      </div>


      <div class="library-empty">

        <strong>
          Your Library is empty
        </strong>

        <small>
          Anything you save or like
          will appear here.
        </small>

      </div>

    </div>

  `;

}


/* =========================================================
   EXPLORE
========================================================= */

function createExplorePage(){

  return `

    <div class="explore-page">

      <div class="explore-title">

        <h1>
          EXPLORE
        </h1>

        <p>
          Discover artists, producers and sounds.
        </p>

      </div>


      <div class="explore-grid">

        <button
          data-page="artists"
        >
          ARTISTS
        </button>

        <button
          data-page="producers"
        >
          PRODUCERS
        </button>

        <button>
          TRACKS
        </button>

        <button>
          ALBUMS
        </button>

        <button>
          PACKS
        </button>

        <button>
          BEATS
        </button>

      </div>

    </div>

  `;

}


/* =========================================================
   PROFILE
========================================================= */

function createProfilePage(){

  const isProducer =
    accountType === "producer";


  return `

    <div class="lost-profile-page">

      <div class="lost-profile-avatar">
        AT
      </div>


      <h1>
        AmirTalles
      </h1>


      <p>
        ${
          isProducer
          ? "Producer"
          : "Artist"
        }
      </p>


      <div class="profile-stats">

        <div>
          <strong>
            1
          </strong>

          <small>
            RELEASES
          </small>
        </div>


        <div>
          <strong>
            0
          </strong>

          <small>
            FOLLOWERS
          </small>
        </div>


        <div>
          <strong>
            0
          </strong>

          <small>
            FOLLOWING
          </small>
        </div>

      </div>


      <button
        class="edit-profile-btn"
        type="button"
      >
        EDIT PROFILE
      </button>

    </div>

  `;

}


/* =========================================================
   PROFILE OPEN
========================================================= */

function openProfile(person){

  setMainPage("profile");

}


/* =========================================================
   GENERATED PAGE CLICKS
========================================================= */

document.addEventListener("click",(e)=>{

  const tab =
    e.target.closest(
      ".ranking-tab"
    );


  if(tab){

    setMainPage(
      tab.dataset.page
    );

    return;

  }


  const exploreButton =
    e.target.closest(
      ".
