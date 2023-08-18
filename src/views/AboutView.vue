<template>
  <title>Acerca de</title>
  <div class="hero d-flex align-items-center">
    <div class="container-hero">
      <div class="row rowagus">
        <div class="col-lg-7 mx-auto text-center">
          <h1 class="display-6">Este sitio web fue desarrollado usando Bootstrap, VueJs y Firebase</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="body-about py-5 d-flex align-items-center justify-content-center">
    <div class="container-body">
      <div class="about-flex">
        <div class="col px-4">
          <img class="img-about" alt="selfie" src="../assets/img/yo.jpg">
        </div>
        <div class="col px-4 flex-column">
          <h1>Yo</h1>
          <p>Soy estudiante de la UADE, me
            interesa la programación y el desarrollo
            web. Trabajo como Freelancer por lo que
            trabajo bien sin que me controlen,
            estableciéndome y cumpliendo con mis
            propias metas.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container-body {
  height: 100%;
}

.rowagus {
  width: 100%;
}

.img-about {
  margin-top: 10px;
  max-width: 400px;
  border-radius: 100%;
  border: 1px #c2c2c2 solid;
}

.col {
  display: flex;
  justify-content: center;
}

.about-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

}

@media screen and (max-width:1024px) {
  .about-flex {
    display: block;
  }

  .img-about {
    max-width: 300px;

  }
}

@media screen and (max-width:300px) {
  .img-about {
    max-width: 200px;

  }
}

.body-about {
  background-color: rgb(223, 237, 237);
}

.hero {
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  z-index: 2;
  justify-content: center;
  height: 40vh;
}

.hero::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(239, 246, 246);
  z-index: -1;

}

img {
  max-height: 600px;
}

/* Container holding the image and the text */
.container {
  position: relative;
  text-align: center;
  color: white;
  width: 100vw;
  margin: 0;
  margin-right: 0;
  padding: 0;
}

/* Bottom left text */
.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 16px;
}

/* Top left text */
.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
}

/* Top right text */
.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}

/* Bottom right text */
.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}

/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.timer {
  align-items: center;
}
</style>
