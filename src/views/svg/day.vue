<template>
  <svg viewBox="0 0 1000 1000" class="world">
    <defs>
      <clipPath id="clip-path">
        <circle  cx="500" cy="500" r="400"/>
      </clipPath>

      <clipPath id="reflection">
        <rect width="1000" height="500"/>
      </clipPath>

      <symbol id="star" viewBox="-20 -20 40 40">
        <circle class="stars" r="20"/>
      </symbol>

      <radialGradient id="sky-gradient" cx="737.45" cy="94.64" r="800.05" gradientUnits="userSpaceOnUse">
        <stop offset="0.03" stop-color="#ffd7ac"/>
        <stop offset="0.5" stop-color="#f8a7a1"/>
        <stop offset="0.92" stop-color="#6d5d91"/>
      </radialGradient>

      <symbol id="sky" viewBox="0 0 1000 1000">
        <rect width="1000" height="1000" fill="url(#sky-gradient)"/>
        <circle id="sun" class="sun" cx="658" cy="265" r="62"/>
        <use width="10" height="10" x="350" y="550" xlink:href="#star" class="star" />
        <use width="10" height="10" x="470" y="650" xlink:href="#star" class="star" />
        <use width="8" height="8" x="430" y="750" xlink:href="#star" class="star" />
        <use width="9" height="9" x="250" y="650" xlink:href="#star" class="star" />
        <use width="9" height="9" x="590" y="780" xlink:href="#star" class="star" />
        <use width="5" height="5" x="700" y="750" xlink:href="#star" class="star" />
        <use width="4" height="4" x="300" y="800" xlink:href="#star" class="star" />
      </symbol>
    </defs>

    <g id="planet" clip-path="url(#clip-path)">
      <use xlink:href="#sky" class="sky"></use>
      <g clip-path="url(#reflection)" class="reflection">
        <use xlink:href="#sky" class="sky"></use>
        <rect id="ocean_light" class="ocean"  width="1000" height="500"/>
      </g>
      <path class="hill_reflection" d="M638 547H457l51-32H-22l294 148 35-22 148 71 183-165"/>
      <path class="hill_back" d="M-22 526l294-177 236 177H-22"/>
      <path class="hill" d="M108 547l347-159 183 159H108"/>
    </g>
  </svg>
</template>
<style scoped>
.world {
  /*width: 60%;
  height: 60%;*/
  vertical-align: bottom;
}

.title1 {
  font-family: 'Unica One', cursive;
  font-size: 1rem;
  line-height: 3rem;
  color: #fff;
  padding: 1rem;
  margin: 0 auto;
  box-sizing: border-box;
}

@keyframes sunset {
  25%,
  60% {
    transform: rotateZ(180deg);
  }
  80%,
  100% {
    transform: rotateZ(360deg);
  }
}

.sun {
  fill: #ffd7ac;
}

.sky {
  transform-origin: 500px 500px;
  animation: sunset 7.5s infinite;
}

.reflection {
  transform: scaleY(-1);
  transform-origin: 500px 500px;
}

.ocean {
  fill: #fff;
  opacity: 0.2;
}

.hill {
  fill: #6d5d91
}

.hill_back,
.hill_reflection {
  fill: lighten(#6d5d91, 4%);
}

.hill_reflection {
 opacity: 0.2;
}

.stars {
  fill: #fff;
}

.star {
  opacity: 0.3;
  animation: stars 2.5s infinite;
}
.star:nth-child(1){
  animation-delay:  0.25s
}
.star:nth-child(2){
  animation-delay:  0.5s
}
.star:nth-child(3){
  animation-delay:  0.75s
}
.star:nth-child(4){
  animation-delay:  1s
}
.star:nth-child(5){
  animation-delay:  1.25s
}
.star:nth-child(6){
  animation-delay:  1.5s
}
.star:nth-child(7){
  animation-delay:  1.75s
}
@keyframes stars {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}
</style>
