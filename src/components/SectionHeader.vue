<template>
  <div class="hdr">
    <div class="hdr__text">
      <h2 class="hdr__title">{{ title }}</h2>
      <p v-if="subtitle" class="hdr__subtitle">{{ subtitle }}</p>
    </div>

    <div class="hdr__icon" aria-hidden="true" v-html="iconSvg"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  variant: { type: String, default: "resumen" }, 
});

const iconSvg = computed(() => {
  if (props.variant === "resumen") {
    return `
    <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 52H56" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <rect x="14" y="30" width="8" height="18" rx="2" fill="white"/>
      <rect x="26" y="22" width="8" height="26" rx="2" fill="white"/>
      <rect x="38" y="28" width="8" height="20" rx="2" fill="white"/>
      <path d="M18 18L30 12L40 16L54 6" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M54 6V18" stroke="white" stroke-width="5" stroke-linecap="round"/>
    </svg>`;
  }

  return `
  <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10H40L50 20V54H18V10Z" stroke="white" stroke-width="4" stroke-linejoin="round"/>
    <path d="M40 10V20H50" stroke="white" stroke-width="4" stroke-linejoin="round"/>
    <path d="M24 28H42" stroke="white" stroke-width="4" stroke-linecap="round"/>
    <path d="M24 36H38" stroke="white" stroke-width="4" stroke-linecap="round"/>
    <path d="M26 46L30 50L40 40" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
});
</script>

<style scoped>
.hdr{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: linear-gradient(90deg, rgba(0,81,147,0.92), rgba(25,46,75,0.65));
  border: 2px solid rgba(125, 211, 252, 0.95); 
  border-radius: 20px;
  padding: 16px 18px;

  box-shadow: 0 14px 30px rgba(0,0,0,0.25);
  backdrop-filter: blur(8px);
}

.hdr__text{
  min-width: 0;
}

.hdr__title{
  margin: 0;
  color: #fff;
  font-weight: 1000;
  letter-spacing: 0.4px;
  font-size: 22px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.35);
}

.hdr__subtitle{
  margin: 4px 0 0 0;
  color: rgba(255,255,255,0.85);
  font-weight: 600;
  font-size: 13px;
}

.hdr__icon{
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: grid;
  place-items: center;

  background: rgba(0,0,0,0.18);
  border: 1px solid rgba(125, 211, 252, 0.8);
}
</style>
