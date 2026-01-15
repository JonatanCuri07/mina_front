<template>
  <section class="card">
    <slot />
  </section>
</template>

<style scoped>
.card{
  border-radius: 18px;
  padding: 16px 18px;

  background: rgba(255,255,255,0.88);
  border: 3px solid rgba(11,27,43,0.85);
  box-shadow: 0 12px 25px rgba(0,0,0,0.18);
}
</style>
