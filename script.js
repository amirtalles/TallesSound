document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     INTRO
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
      video.currentTime = 0;
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

      document.body.style.overflowX = "hidden";

    },500);

  }


  /* LET'S GO */

  if(letsGo){

    letsGo.addEventListener("click", async (e) => {

      e.preventDefault();
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


      /* اگر ویدیو وجود ندارد */

      if(!video){

        enterApp();
        return;

      }


      try{

        video.currentTime = 0;

        await video.play();

      }

      catch(error){

        console.log(
          "Intro video could not play:",
          error
        );

        /* اگر ویدیو پخش نشد، سایت باز شود */

        enterApp();

      }

    });

  }


  /* لمس ویدیو = ورود */

  if(video){

    video.addEventListener("click", () => {

      if(!introStarted) return;

      enterApp();

    });


    /* پایان ویدیو */

    video.addEventListener("ended", () => {

      enterApp();

    });


    /* خطای ویدیو */

    video.addEventListener("error", () => {

      console.log(
        "intro.mp4 پیدا نشد یا قابل پخش نیست."
      );

      enterApp();

    });

  }


  /* ==================================================
     SIDEBAR
  ================================================== */

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

      if(!sidebar.classList.contains("open")){
        return;
      }

      if(
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
      ){

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
    document.getElementById(
      "artistUploadOptions"
    );

  const producerUploadOptions =
    document.getElementById(
      "producerUploadOptions"
    );

  const accountTypeLabel =
    document.getElementById(
      "accountTypeLabel"
    );


  let accountType =
    localStorage.getItem(
      "lostSoundAccountType"
    ) || "listener";


  function updateAccountUI(){

    accountButtons.forEach(button => {

      button.classList.toggle(
        "selected",
        button.dataset.account === accountType
      );

    });


    if(accountTypeLabel){

      if(accountType === "artist"){

        accountTypeLabel.textContent =
          "Artist";

      }

      else if(accountType === "producer"){

        accountTypeLabel.textContent =
          "Producer";

      }

      else{

        accountTypeLabel.textContent =
          "Listener";

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


  accountButtons.forEach(button => {

    button.addEventListener("click", () => {

      accountType =
        button.dataset.account;

      localStorage.setItem(
        "lostSoundAccountType",
        accountType
      );

      updateAccountUI();

    });

  });


  updateAccountUI();


  /* ==================================================
     PLUS / UPLOAD
  ================================================== */

  const plusBtn =
    document.getElementById("plusBtn");

  const uploadOverlay =
    document.getElementById(
      "uploadOverlay"
    );

  const uploadClose =
    document.getElementById(
      "uploadClose"
    );


  if(plusBtn && uploadOverlay){

    plusBtn.addEventListener("click",(e)=>{

      e.preventDefault();
      e.stopPropagation();


      if(accountType === "listener"){

        alert(
          "Please choose Artist or Producer first."
        );

        return;

      }


      uploadOverlay.classList.remove(
        "hidden"
      );

    });

  }


  /* بستن آپلود */

  if(uploadClose && uploadOverlay){

    uploadClose.addEventListener(
      "click",
      () => {

        uploadOverlay.classList.add(
          "hidden"
        );

      }
    );

  }


  /* کلیک بیرون از پنجره */

  if(uploadOverlay){

    uploadOverlay.addEventListener(
      "click",
      (e) => {

        if(e.target === uploadOverlay){

          uploadOverlay.classList.add(
            "hidden"
          );

        }

      }
    );

  }


  /* ==================================================
     UPLOAD OPTIONS
  ================================================== */

  const uploadButtons =
    document.querySelectorAll(
      "[data-upload]"
    );


  uploadButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.upload;

        console.log(
          "Selected upload:",
          type
        );


        /*
          فعلاً فقط انتخاب نوع آپلود.
          فرم واقعی آپلود را بعداً اضافه می‌کنیم.
        */

        if(type === "track"){

          alert(
            "Upload Track"
          );

        }

        else if(type === "album"){

          alert(
            "Upload Album"
          );

        }

        else if(type === "pack"){

          alert(
            "Upload Pack"
          );

        }

        else if(type === "beat"){

          alert(
            "Upload Beat"
          );

        }

      }
    );

  });


  /* ==================================================
     YOUR SOUND
  ================================================== */

  const yourSoundBtn =
    document.getElementById(
      "yourSoundBtn"
    );

  const yourSoundSection =
    document.getElementById(
      "yourSoundSection"
    );


  if(yourSoundBtn && yourSoundSection){

    yourSoundBtn.addEventListener(
      "click",
      (e) => {

        e.preventDefault();

        yourSoundSection.classList.toggle(
          "hidden"
        );


        if(
          !yourSoundSection.classList.contains(
            "hidden"
          )
        ){

          yourSoundSection.scrollIntoView({
            behavior:"smooth"
          });

        }

      }
    );

  }


  /* ==================================================
     SEARCH
  ================================================== */

  const artistSearch =
    document.getElementById(
      "artistSearch"
    );

  const largeSearch =
    document.getElementById(
      "largeSearch"
    );

  const largeSearchBtn =
    document.getElementById(
      "largeSearchBtn"
    );

  const artistSearchResult =
    document.getElementById(
      "artistSearchResult"
    );


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

    const resultsBox =
      artistSearchResult;


    if(!resultsBox) return;


    const query =
      value.trim().toLowerCase();


    if(!query){

      resultsBox.classList.add(
        "hidden"
      );

      resultsBox.innerHTML = "";

      return;

    }


    const results =
      demoArtists.filter(artist =>

        artist.name
          .toLowerCase()
          .includes(query)

      );


    resultsBox.innerHTML = "";


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
            ${artist.type}
          </small>

        </div>

      `;


      item.addEventListener(
        "click",
        () => {

          alert(
            artist.type +
            " channel: " +
            artist.name
          );

        }
      );


      resultsBox.appendChild(item);

    });


    resultsBox.classList.toggle(
      "hidden",
      results.length === 0
    );

  }


  if(artistSearch){

    artistSearch.addEventListener(
      "input",
      () => {

        performSearch(
          artistSearch.value
        );

      }
    );

  }


  if(largeSearch){

    largeSearch.addEventListener(
      "input",
      () => {

        performSearch(
          largeSearch.value
        );

      }
    );

  }


  if(largeSearchBtn){

    largeSearchBtn.addEventListener(
      "click",
      () => {

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

  const record =
    document.getElementById(
      "record"
    );

  const mainPlay =
    document.getElementById(
      "mainPlay"
    );

  const trackName =
    document.getElementById(
      "trackName"
    );

  const player =
    document.getElementById(
      "player"
    );


  let playing = false;


  function setPlaying(state){

    playing = state;


    if(mainPlay){

      mainPlay.textContent =
        playing
          ? "Ⅱ"
          : "▶";

    }


    if(record){

      record.style.animationPlayState =
        playing
          ? "running"
          : "paused";

    }

  }


  /* شروع بدون Player */

  setPlaying(false);


  if(mainPlay){

    mainPlay.addEventListener(
      "click",
      () => {

        setPlaying(
          !playing
        );

      }
    );

  }


  /* ==================================================
     PLAY TRACK
  ================================================== */

  document
    .querySelectorAll(".play")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          if(trackName){

            trackName.textContent =
              button.dataset.name ||
              "Unknown Track";

          }


          /* Player نمایش داده شود */

          if(player){

            player.classList.remove(
              "hidden"
            );

          }


          setPlaying(true);

        }
      );

    });


});
