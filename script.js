/* =====================================================
   LOST SOUND
   Main Application
===================================================== */


/* ================= INTRO ================= */

const intro = document.getElementById("intro");
const startScreen = document.getElementById("startScreen");
const letsGo = document.getElementById("letsGo");
const videoBox = document.getElementById("introVideoBox");
const video = document.getElementById("introVideo");
const app = document.getElementById("app");

let introStarted = false;


function enterApp(){

  if(!intro) return;

  if(video){
    video.pause();
  }

  intro.style.transition = "opacity .5s ease";
  intro.style.opacity = "0";

  setTimeout(()=>{

    intro.remove();

    if(app){
      app.classList.remove("hidden");
    }

    initApp();

  },500);

}


if(letsGo){

  letsGo.addEventListener("click", async (event)=>{

    event.preventDefault();
    event.stopPropagation();

    if(introStarted) return;

    introStarted = true;

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

        console.log("Intro video could not autoplay:",error);

        /* اگر ویدیو پلی نشد، با یک کلیک وارد سایت می‌شویم */
        enterApp();

      }

    }else{

      enterApp();

    }

  });

}


if(video){

  video.addEventListener("ended",()=>{
    enterApp();
  });

  video.addEventListener("error",()=>{
    enterApp();
  });

}


/* ================= DATA ================= */

const artists = [

  {
    name:"AmirTalles",
    id:"@amirtalles",
    type:"Artist",
    avatar:"AT",
    plays:12480
  }

];


const producers = [

  {
    name:"AmirTalles",
    id:"@amirtalles",
    type:"Producer",
    avatar:"AT",
    plays:8420
  }

];


const demoSearch = [

  {
    name:"AmirTalles",
    id:"@amirtalles",
    type:"Artist",
    avatar:"AT"
  },

  {
    name:"AmirTalles",
    id:"@amirtalles",
    type:"Producer",
    avatar:"AT"
  }

];


/* ================= APP INIT ================= */

let accountType =
  localStorage.getItem("lostSoundAccountType") || "listener";

let currentRanking = "artists";


function initApp(){

  setupNavigation();
  setupMobileMenu();
  setupAccount();
  setupUpload();
  setupSearch();
  setupRanking();
  setupLibrary();
  setupProfile();
  setupPlayer();

  updateRankingForAccount();

}


/* ================= NAVIGATION ================= */

function setupNavigation(){

  const links =
    document.querySelectorAll(".side-link");

  links.forEach(link=>{

    link.addEventListener("click",(event)=>{

      event.preventDefault();

      const page =
        link.dataset.page;

      showPage(page);

      links.forEach(item=>{
        item.classList.remove("active");
      });

      link.classList.add("active");

    });

  });


  const profileTopBtn =
    document.getElementById("profileTopBtn");

  if(profileTopBtn){

    profileTopBtn.addEventListener("click",()=>{

      showPage("profile");

      links.forEach(item=>{
        item.classList.toggle(
          "active",
          item.dataset.page === "profile"
        );
      });

    });

  }

}


function showPage(page){

  const pages = {

    home:
      document.getElementById("homePage"),

    explore:
      document.getElementById("explorePage"),

    library:
      document.getElementById("libraryPage"),

    profile:
      document.getElementById("profilePage")

  };


  Object.values(pages).forEach(section=>{

    if(section){
      section.classList.add("hidden");
    }

  });


  if(pages[page]){
    pages[page].classList.remove("hidden");
  }

}


/* ================= MOBILE MENU ================= */

function setupMobileMenu(){

  const menuBtn =
    document.getElementById("menuBtn");

  const sidebar =
    document.querySelector(".sidebar");

  if(!menuBtn || !sidebar) return;


  menuBtn.addEventListener("click",(event)=>{

    event.stopPropagation();

    sidebar.classList.toggle("open");

  });


  document.addEventListener("click",(event)=>{

    if(!sidebar.classList.contains("open")) return;

    if(
      !sidebar.contains(event.target) &&
      !menuBtn.contains(event.target)
    ){

      sidebar.classList.remove("open");

    }

  });

}


/* ================= ACCOUNT ================= */

function setupAccount(){

  const buttons =
    document.querySelectorAll(".role-item");

  buttons.forEach(button=>{

    button.addEventListener("click",()=>{

      accountType =
        button.dataset.account;

      localStorage.setItem(
        "lostSoundAccountType",
        accountType
      );

      updateRankingForAccount();

      updateUploadOptions();

      updateProfileRole();

    });

  });


  updateUploadOptions();
  updateProfileRole();

}


function updateRankingForAccount(){

  if(accountType === "producer"){

    currentRanking = "producers";

    renderRanking("producers");

  }else{

    currentRanking = "artists";

    renderRanking("artists");

  }

}


function updateProfileRole(){

  const role =
    document.querySelector(".profile-role");

  if(!role) return;

  if(accountType === "producer"){
    role.textContent = "Producer";
  }else if(accountType === "artist"){
    role.textContent = "Artist";
  }else{
    role.textContent = "Listener";
  }

}


/* ================= RANKING ================= */

function setupRanking(){

  const artistsTab =
    document.getElementById("artistsTab");

  const producersTab =
    document.getElementById("producersTab");


  if(artistsTab){

    artistsTab.addEventListener("click",()=>{

      currentRanking = "artists";

      artistsTab.classList.add("active");

      if(producersTab){
        producersTab.classList.remove("active");
      }

      renderRanking("artists");

    });

  }


  if(producersTab){

    producersTab.addEventListener("click",()=>{

      currentRanking = "producers";

      producersTab.classList.add("active");

      if(artistsTab){
        artistsTab.classList.remove("active");
      }

      renderRanking("producers");

    });

  }


  const filter =
    document.getElementById("rankingFilter");

  if(filter){

    filter.addEventListener("change",()=>{

      renderRanking(currentRanking);

    });

  }

}


function renderRanking(type){

  const list =
    document.getElementById("rankingList");

  const eyebrow =
    document.getElementById("rankingEyebrow");

  const title =
    document.getElementById("rankingTitle");

  const description =
    document.getElementById("rankingDescription");


  if(!list) return;


  const data =
    type === "producers"
      ? producers
      : artists;


  if(type === "producers"){

    if(eyebrow)
      eyebrow.textContent = "TOP PRODUCERS";

    if(title)
      title.textContent = "PRODUCERS RANKING";

    if(description)
      description.textContent =
        "Top producers based on total plays";

  }else{

    if(eyebrow)
      eyebrow.textContent = "TOP ARTISTS";

    if(title)
      title.textContent = "ARTISTS RANKING";

    if(description)
      description.textContent =
        "Top artists based on total plays";

  }


  list.innerHTML = "";


  data.forEach((person,index)=>{

    const row =
      document.createElement("div");

    row.className = "ranking-row";


    row.innerHTML = `

      <div class="rank-number">
        ${index + 1}
      </div>

      <div class="rank-avatar">
        ${person.avatar}
      </div>

      <div class="rank-info">

        <strong>
          ${person.name}
        </strong>

        <small>
          ${person.id} • ${person.type}
        </small>

      </div>

      <div class="rank-score">
        ${person.plays.toLocaleString()} plays
      </div>

    `;


    list.appendChild(row);

  });


  document
    .getElementById("artistsTab")
    ?.classList.toggle(
      "active",
      type === "artists"
    );

  document
    .getElementById("producersTab")
    ?.classList.toggle(
      "active",
      type === "producers"
    );

}


/* ================= UPLOAD ================= */

function setupUpload(){

  const plusBtn =
    document.getElementById("plusBtn");

  const overlay =
    document.getElementById("uploadOverlay");

  const close =
    document.getElementById("uploadClose");


  if(plusBtn){

    plusBtn.addEventListener("click",()=>{

      updateUploadOptions();

      overlay?.classList.remove("hidden");

    });

  }


  if(close){

    close.addEventListener("click",()=>{

      overlay?.classList.add("hidden");

    });

  }


  if(overlay){

    overlay.addEventListener("click",(event)=>{

      if(event.target === overlay){
        overlay.classList.add("hidden");
      }

    });

  }


  document
    .querySelectorAll("[data-upload]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        const type =
          button.dataset.upload;

        console.log(
          "Selected upload:",
          type
        );

        overlay?.classList.add("hidden");

        alert(
          "Selected: " +
          type
        );

      });

    });

}


function updateUploadOptions(){

  const artistOptions =
    document.getElementById("artistUploadOptions");

  const producerOptions =
    document.getElementById("producerUploadOptions");


  if(!artistOptions || !producerOptions) return;


  if(accountType === "producer"){

    artistOptions.classList.add("hidden");

    producerOptions.classList.remove("hidden");

  }else{

    artistOptions.classList.remove("hidden");

    producerOptions.classList.add("hidden");

  }

}


/* ================= SEARCH ================= */

function setupSearch(){

  const search =
    document.getElementById("artistSearch");

  const searchBtn =
    document.getElementById("searchBtn");

  if(!search) return;


  search.addEventListener("input",()=>{

    renderSearchResults(search.value);

  });


  if(searchBtn){

    searchBtn.addEventListener("click",()=>{

      search.focus();

    });

  }


  document.addEventListener("click",(event)=>{

    const box =
      document.querySelector(".search-box");

    if(
      box &&
      !box.contains(event.target)
    ){

      document
        .getElementById("searchResults")
        ?.classList.add("hidden");

    }

  });

}


function renderSearchResults(value){

  const resultsBox =
    document.getElementById("searchResults");

  if(!resultsBox) return;


  const query =
    value.trim().toLowerCase();


  if(!query){

    resultsBox.classList.add("hidden");
    resultsBox.innerHTML = "";

    return;

  }


  const results =
    demoSearch.filter(person=>

      person.name
        .toLowerCase()
        .includes(query)

      ||

      person.id
        .toLowerCase()
        .includes(query)

    );


  resultsBox.innerHTML = "";


  results.forEach(person=>{

    const item =
      document.createElement("div");

    item.className =
      "search-result";


    item.innerHTML = `

      <div class="search-avatar">
        ${person.avatar}
      </div>

      <div class="search-info">

        <strong>
          ${person.name}
        </strong>

        <small>
          ${person.id} • ${person.type}
        </small>

      </div>

    `;


    item.addEventListener("click",()=>{

      alert(
        person.name +
        " channel"
      );

      resultsBox.classList.add("hidden");

    });


    resultsBox.appendChild(item);

  });


  resultsBox.classList.toggle(
    "hidden",
    results.length === 0
  );

}


/* ================= LIBRARY ================= */

function setupLibrary(){

  const cards =
    document.querySelectorAll(".library-card");

  cards.forEach(card=>{

    card.addEventListener("click",()=>{

      const category =
        card.dataset.category;

      alert(
        category +
        " library"
      );

    });

  });

}


/* ================= PROFILE ================= */

function setupProfile(){

  const profile =
    document.getElementById("profilePage");

  if(!profile) return;

}


/* ================= PLAYER ================= */

let playing = false;

function setupPlayer(){

  const player =
    document.getElementById("player");

  const mainPlay =
    document.getElementById("mainPlay");

  const trackName =
    document.getElementById("trackName");


  document
    .querySelectorAll(".play")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        if(trackName){

          trackName.textContent =
            button.dataset.name ||
            "Untitled Track";

        }

        player?.classList.remove("hidden");

        playing = true;

        if(mainPlay){
          mainPlay.textContent = "Ⅱ";
        }

      });

    });


  if(mainPlay){

    mainPlay.addEventListener("click",()=>{

      playing = !playing;

      mainPlay.textContent =
        playing ? "Ⅱ" : "▶";

    });

  }

}


/* ================= SAFETY ================= */

window.addEventListener("error",(event)=>{

  console.log(
    "Lost Sound error:",
    event.message
  );

});
