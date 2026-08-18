document.addEventListener("DOMContentLoaded", function () {

  const intro = document.getElementById("intro");
  const startScreen = document.getElementById("startScreen");
  const videoBox = document.getElementById("introVideoBox");
  const video = document.getElementById("introVideo");
  const letsGo = document.getElementById("letsGo");
  const app = document.getElementById("app");

  console.log("LOST SOUND JS LOADED");

  if (!letsGo) {
    console.log("LET'S GO BUTTON NOT FOUND");
    return;
  }

  letsGo.addEventListener("click", function () {

    console.log("LET'S GO CLICKED");

    if (startScreen) {
      startScreen.style.display = "none";
    }

    if (videoBox) {
      videoBox.style.display = "block";
    }

    if (intro) {
      intro.classList.add("playing");
    }

    /*
      اگر ویدیو وجود داشت، پخش کن
    */

    if (video) {

      video.currentTime = 0;

      const playPromise = video.play();

      if (playPromise !== undefined) {

        playPromise
          .then(function () {

            console.log("VIDEO PLAYING");

          })
          .catch(function (error) {

            console.log("VIDEO ERROR:", error);

            enterSite();

          });

      }

    } else {

      enterSite();

    }

  });


  function enterSite() {

    console.log("ENTERING SITE");

    if (video) {
      video.pause();
    }

    if (intro) {

      intro.style.opacity = "0";
      intro.style.transition = "opacity .5s ease";

    }

    setTimeout(function () {

      if (intro) {
        intro.style.display = "none";
      }

      if (app) {

        app.classList.remove("hidden");

        app.style.display = "block";

      }

      console.log("SITE OPENED");

    }, 500);

  }


  /*
    کلیک روی ویدیو = Skip
  */

  if (video) {

    video.addEventListener("click", function () {

      enterSite();

    });


    /*
      وقتی ویدیو تمام شد
    */

    video.addEventListener("ended", function () {

      enterSite();

    });


    /*
      اگر ویدیو خطا داشت
    */

    video.addEventListener("error", function () {

      console.log("INTRO VIDEO ERROR");

      enterSite();

    });

  }

});
