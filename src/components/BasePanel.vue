<template>
  <section class="panel">
    <slot />
  </section>
</template>

<style scoped>
.panel{
  position: relative;
  overflow: hidden;

  border-radius: 44px;
  border: 4px solid rgba(0,81,147,0.35);
  padding: 22px 26px;
  min-height: 360px;
  box-shadow: 0 16px 45px rgba(0,0,0,.18);

  background: transparent; 
}

.panel::before{
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("../assets/Truck.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  transform: scale(1.02);
}

.panel::after{
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(7,17,32,0.45);
  z-index: 1;
}

.panel > *{
  position: relative;
  z-index: 2;
}

@media (max-width: 520px){
  .panel{
    padding: 14px 12px;
    border-radius: 26px;
  }
}
</style>
