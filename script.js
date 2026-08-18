/* =====================================================
   LOST SOUND
   MAIN SCRIPT
===================================================== */


/* =====================================================
   INTRO
===================================================== */

const intro =
  document.getElementById("intro");

const startScreen =
  document.getElementById("startScreen");

const videoBox =
  document.getElementById("introVideoBox");

const video =
  document.getElementById("introVideo");

const letsGo =
  document.getElementById("letsGo");

const app =
  document.getElementById("app");

let introStarted = false;
let introFinished = false;


function enterApp(){

  if(introFinished) return;

  introFinished = true;

  if(video){
    video.pause();
  }

  if(intro){

    intro.style.transition =
      "opacity .5s ease";

    intro.style.opacity = "0";

  }

  setTimeout(()=>{

    if(intro){
      intro.remove();
    }

    if(app){
      app.classList.remove("hidden");
    }

  },500);

}


if(letsGo){

  letsGo.addEventListener(
    "click",
    async(e)=>{

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

          console.log(
            "Video error:",
            error
          );

        }

      }

    }
  );

}


if(video){

  video.addEventListener(
    "click",
    ()=>{

      if(!introStarted) return;

      enterApp();

    }
  );


  video.addEventListener(
    "ended",
    enterApp
  );

}


/* =====================================================
   ACCOUNT TYPE
===================================================== */

let accountType =
  localStorage.getItem(
    "lostSoundAccountType"
  ) || "listener";


/*
   Listener:
   default = Artist

   Artist:
   default = Artist

   Producer:
   default = Producer
*/


/* =====================================================
   RANKING DATA
===================================================== */

const artists = [

  {
    rank:1,
    name:"AmirTalles",
    username:"@amirtalles",
    plays:"12.5M",
    avatar:"AT",
    verified:true
  }

];


const producers = [

  {
    rank:1,
    name:"AmirTalles",
    username:"@amirtalles",
    plays:"0",
    avatar:"AT",
    verified:true
  }

];


/* =====================================================
   ELEMENTS
===================================================== */

const artistsTab =
  document.getElementById(
    "artistsTab"
  );

const producersTab =
  document.getElementById(
    "producersTab"
  );

const rankingList =
  document.getElementById(
    "rankingList"
  );

const rankingTitle =
  document.getElementById(
    "rankingTitle"
  );

const rankingEyebrow =
  document.getElementById(
    "rankingEyebrow"
  );

const rankingDescription =
  document.getElementById(
    "rankingDescription"
  );

const rankingFilter =
  document.getElementById(
    "rankingFilter"
  );


let currentRanking =
  "artists";


/* =====================================================
   RENDER RANKING
===================================================== */

function renderRanking(type){

  currentRanking = type;

  const data =
    type === "artists"
      ? artists
      : producers;


  if(artistsTab){

    artistsTab.classList.toggle(
      "active",
      type === "artists"
    );

  }


  if(producersTab){

    producersTab.classList.toggle(
      "active",
      type === "producers"
    );

  }


  if(rankingTitle){

    rankingTitle.textContent =
      type === "artists"
        ? "ARTISTS RANKING"
        : "PRODUCERS RANKING";

  }


  if(rankingEyebrow){

    rankingEyebrow.textContent =
      type === "artists"
        ? "TOP ARTISTS"
        : "TOP PRODUCERS";

  }


  if(rankingDescription){

    rankingDescription.textContent =
      type === "artists"
        ? "Top artists based on total plays"
        : "Top producers based on total plays";

  }


  if(!rankingList) return;

  rankingList.innerHTML = "";


  data.forEach(item=>{

    const card =
      document.createElement("article");

    card.className =
      "rank-card";


    card.innerHTML = `

      <div class="rank-number">
        ${item.rank}
      </div>

      <div class="rank-avatar">
        ${item.avatar}
      </div>

      <div class="rank-name">

        <strong>

          ${item.name}

          ${
            item.verified
              ? `<span class="verified">✓</span>`
              : ""
          }

        </strong>

        <small>
          ${item.username}
        </small>

      </div>

      <div class="rank-plays">

        <strong>
          ${item.plays}
        </strong>

        <small>
          PLAYS
        </small>

      </div>

      <button
        class="rank-more"
        type="button"
      >
        ⋮
      </button>

    `;


    card
      .querySelector(".rank-more")
      .addEventListener(
        "click",
        ()=>{
          openProfile(
            item.name
          );
        }
      );


    rankingList.appendChild(card);

  });

}


/* =====================================================
   INITIAL PAGE
===================================================== */

if(accountType === "producer"){

  renderRanking("producers");

}else{

  renderRanking("artists");

}


/* =====================================================
   RANKING TABS
===================================================== */

if(artistsTab){

  artistsTab.addEventListener(
    "click",
    ()=>{
      renderRanking("artists");
    }
  );

}


if(producersTab){

  producersTab.addEventListener(
    "click",
    ()=>{
      renderRanking("producers");
    }
  );

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

const pages = {

  home:
    document.getElementById(
      "homePage"
    ),

  explore:
    document.getElementById(
      "explorePage"
    ),

  library:
    document.getElementById(
      "libraryPage"
    ),

  profile:
    document.getElementById(
      "profilePage"
    )

};


function showPage(page){

  Object.keys(pages)
    .forEach(key=>{

      if(pages[key]){

        pages[key].classList.toggle(
          "hidden",
          key !== page
        );

      }

    });


  document
    .querySelectorAll(
      ".bottom-item"
    )
    .forEach(button=>{

      button.classList.toggle(
        "active",
        button.dataset.page === page
      );

    });


  document
    .querySelectorAll(
      ".side-link"
    )
    .forEach(link=>{

      link.classList.toggle(
        "active",
        link.dataset.page === page
      );

    });

}


document
  .querySelectorAll(
    "[data-page]"
  )
  .forEach(button=>{

    button.addEventListener(
      "click",
      (e)=>{

        e.preventDefault();

        showPage(
          button.dataset.page
        );

      }
    );

  });


/* =====================================================
   SIDEBAR MOBILE
===================================================== */

const menuBtn =
  document.getElementById(
    "menuBtn"
  );

const sidebar =
  document.querySelector(
    ".sidebar"
  );


if(menuBtn && sidebar){

  menuBtn.addEventListener(
    "click",
    (e)=>{

      e.stopPropagation();

      sidebar.classList.toggle(
        "open"
      );

    }
  );


  document.addEventListener(
    "click",
    (e)=>{

      if(
        !sidebar.classList.contains(
          "open"
        )
      ) return;


      if(
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
      ){

        sidebar.classList.remove(
          "open"
        );

      }

    }
  );

}


/* =====================================================
   UPLOAD
===================================================== */

const plusBtn =
  document.getElementById(
    "plusBtn"
  );

const bottomPlus =
  document.getElementById(
    "bottomPlus"
  );

const uploadOverlay =
  document.getElementById(
    "uploadOverlay"
  );

const uploadClose =
  document.getElementById(
    "uploadClose"
  );

const artistUploadOptions =
  document.getElementById(
    "artistUploadOptions"
  );

const producerUploadOptions =
  document.getElementById(
    "producerUploadOptions"
  );


function updateUploadMenu(){

  if(!artistUploadOptions) return;

  artistUploadOptions.classList.toggle(
    "hidden",
    accountType !== "artist"
  );


  if(producerUploadOptions){

    producerUploadOptions.classList.toggle(
      "hidden",
      accountType !== "producer"
    );

  }

}


function openUpload(){

  if(accountType === "listener"){

    alert(
      "Choose Artist or Producer first."
    );

    return;

  }


  updateUploadMenu();

  uploadOverlay.classList.remove(
    "hidden"
  );

}


function closeUpload(){

  if(uploadOverlay){

    uploadOverlay.classList.add(
      "hidden"
    );

  }

}


if(plusBtn){

  plusBtn.addEventListener(
    "click",
    openUpload
  );

}


if(bottomPlus){

  bottomPlus.addEventListener(
    "click",
    openUpload
  );

}


if(uploadClose){

  uploadClose.addEventListener(
    "click",
    closeUpload
  );

}


if(uploadOverlay){

  uploadOverlay.addEventListener(
    "click",
    (e)=>{

      if(
        e.target ===
        uploadOverlay
      ){

        closeUpload();

      }

    }
  );

}


/* =====================================================
   UPLOAD OPTIONS
===================================================== */

document
  .querySelectorAll(
    ".upload-option"
  )
  .forEach(button=>{

    button.addEventListener(
      "click",
      ()=>{

        const type =
          button.dataset.upload;


        if(type === "track"){

          alert(
            "Upload Track selected."
          );

        }

        else if(type === "album"){

          alert(
            "Upload Album selected."
          );

        }

        else if(type === "pack"){

          alert(
            "Upload Pack selected."
          );

        }

        else if(type === "beat"){

          alert(
            "Upload Beat selected."
          );

        }

        closeUpload();

      }
    );

  });


/* =====================================================
   SEARCH
===================================================== */

const artistSearch =
  document.getElementById(
    "artistSearch"
  );


function searchArtist(value){

  const query =
    value
      .trim()
      .toLowerCase();


  if(!query) return;


  const result =
    artists.find(
      artist=>
        artist.username
          .toLowerCase()
          .includes(query) ||
        artist.name
          .toLowerCase()
          .includes(query)
    );


  if(result){

    openProfile(
      result.name
    );

  }else{

    alert(
      "Artist not found."
    );

  }

}


if(artistSearch){

  artistSearch.addEventListener(
    "keydown",
    (e)=>{

      if(e.key === "Enter"){

        searchArtist(
          artistSearch.value
        );

      }

    }
  );

}


/* =====================================================
   SEARCH BUTTON
===================================================== */

const searchBtn =
  document.getElementById(
    "searchBtn"
  );


if(searchBtn){

  searchBtn.addEventListener(
    "click",
    ()=>{

      if(artistSearch){

        artistSearch.focus();

      }

    }
  );

}


/* =====================================================
   PROFILE
===================================================== */

const profileTopBtn =
  document.getElementById(
    "profileTopBtn"
  );


function openProfile(){

  showPage("profile");

}


if(profileTopBtn){

  profileTopBtn.addEventListener(
    "click",
    openProfile
  );

}


/* =====================================================
   LIBRARY
===================================================== */

const likedList =
  document.getElementById(
    "likedList"
  );


document
  .querySelectorAll(
    ".library-card"
  )
  .forEach(card=>{

    card.addEventListener(
      "click",
      ()=>{

        const category =
          card.dataset.category;


        if(likedList){

          likedList.textContent =
            `${category} — Nothing saved yet.`;

        }

      }
    );

  });


/* =====================================================
   EXPLORE SEARCH
===================================================== */

const exploreSearch =
  document.getElementById(
    "exploreSearch"
  );

const exploreSearchBtn =
  document.getElementById(
    "exploreSearchBtn"
  );


function runExploreSearch(){

  const value =
    exploreSearch
      ? exploreSearch.value.trim()
      : "";


  if(!value) return;


  searchArtist(value);

}


if(exploreSearchBtn){

  exploreSearchBtn.addEventListener(
    "click",
    runExploreSearch
  );

}


if(exploreSearch){

  exploreSearch.addEventListener(
    "keydown",
    (e)=>{

      if(e.key === "Enter"){

        runExploreSearch();

      }

    }
  );

}


/* =====================================================
   PLAYER
===================================================== */

const player =
  document.getElementById(
    "player"
  );

const trackName =
  document.getElementById(
    "trackName"
  );

const mainPlay =
  document.getElementById(
    "mainPlay"
  );

const playerClose =
  document.getElementById(
    "playerClose"
  );


let playerPlaying = false;


function openPlayer(name){

  if(trackName){

    trackName.textContent =
      name;

  }


  if(player){

    player.classList.remove(
      "hidden"
    );

  }


  playerPlaying = true;

  if(mainPlay){

    mainPlay.textContent =
      "Ⅱ";

  }

}


function closePlayer(){

  if(player){

    player.classList.add(
      "hidden"
    );

  }

  playerPlaying = false;

}


if(mainPlay){

  mainPlay.addEventListener(
    "click",
    ()=>{

      playerPlaying =
        !playerPlaying;


      mainPlay.textContent =
        playerPlaying
          ? "Ⅱ"
          : "▶";

    }
  );

}


if(playerClose){

  playerClose.addEventListener(
    "click",
    closePlayer
  );

}


/* =====================================================
   DEMO TRACK PLAY
===================================================== */

document
  .querySelectorAll(
    ".play"
  )
  .forEach(button=>{

    button.addEventListener(
      "click",
      ()=>{

        openPlayer(
          button.dataset.name ||
          "Lost Sound Track"
        );

      }
    );

  });


/* =====================================================
   PROFILE ROLE
===================================================== */

const profileRole =
  document.getElementById(
    "profileRole"
  );

if(profileRole){

  if(accountType === "producer"){

    profileRole.textContent =
      "Producer";

  }

  else{

    profileRole.textContent =
      "Artist";

  }

}


/* =====================================================
   FINAL STATE
===================================================== */

updateUploadMenu();

showPage("home");
