const artists = [

  {
    name: "AmirTalles",
    role: "Producer / Artist",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85",
    bio:
      "Producer, composer and creative artist."
  },

  {
    name: "Lost Artist",
    role: "Singer",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=85",
    bio:
      "Independent music artist on Lost Sound."
  },

  {
    name: "Nova",
    role: "Music Producer",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85",
    bio:
      "Electronic music producer."
  },

  {
    name: "Echo",
    role: "Artist",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85",
    bio:
      "Sound and visual artist."
  },

  {
    name: "Luna",
    role: "Vocalist",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=85",
    bio:
      "Independent vocalist."
  },

  {
    name: "Noir",
    role: "Composer",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85",
    bio:
      "Composer and producer."
  }

];


const artistsContainer =
  document.getElementById("artists");


const profile =
  document.getElementById("profile");


const profileCover =
  document.getElementById("profileCover");


const profileName =
  document.getElementById("profileName");


const profileBio =
  document.getElementById("profileBio");


const closeButton =
  document.getElementById("close");


/* =========================
   CREATE ARTISTS
========================= */

artists.forEach((artist) => {

  const card =
    document.createElement("article");

  card.className =
    "artist";


  card.innerHTML = `

    <div
      class="artist-cover"
      style="
        background-image:
        url('${artist.image}');
      ">
    </div>

    <div class="artist-name">
      ${artist.name}
    </div>

    <div class="artist-role">
      ${artist.role}
    </div>

  `;


  artistsContainer.appendChild(card);


  /* =========================
     CLICK
  ========================= */

  card.addEventListener(
    "click",
    () => {

      document
        .querySelectorAll(".artist")
        .forEach((item) => {

          item.classList.remove(
            "selected"
          );

        });


      /*
        First enlarge
        the selected card
      */

      card.classList.add(
        "selected"
      );


      /*
        Small delay before
        opening profile
      */

      setTimeout(() => {

        profileCover.style.backgroundImage =
          `url('${artist.image}')`;


        profileName.textContent =
          artist.name;


        profileBio.textContent =
          artist.bio;


        profile.classList.add(
          "open"
        );

      }, 220);

    }
  );

});


/* =========================
   CLOSE PROFILE
========================= */

closeButton.addEventListener(
  "click",
  () => {

    profile.classList.remove(
      "open"
    );


    document
      .querySelectorAll(".artist")
      .forEach((item) => {

        item.classList.remove(
          "selected"
        );

      });

  }
);


/* =========================
   ESC KEY
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      profile.classList.remove(
        "open"
      );

    }

  }
);
