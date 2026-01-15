<template>
  <aside class="sidebar">
    <div class="card">
      <h2 class="hint">Control de placas y licencias</h2>

      <button
        class="navBtn"
        :class="{ active: route.name === 'validacion' }"
        @click="router.push('/validacion')"
      >
        <span class="navText">Validación</span>

        <span
          v-if="route.name === 'validacion'"
          class="navCheck"
          aria-hidden="true"
          title="Vista actual"
        >
          ✓
        </span>
      </button>

      <button
        class="navBtn"
        :class="{ active: route.name === 'resumen' }"
        @click="router.push('/resumen')"
      >
        <span class="navText">Resumen</span>

        <span
          v-if="route.name === 'resumen'"
          class="navCheck"
          aria-hidden="true"
          title="Vista actual"
        >
          ✓
        </span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<style scoped>
.sidebar{
  display: flex;
  align-items: flex-start;
}

.card{
  width: 100%;
  border-radius: 22px;
  padding: 14px;
  background: rgba(7,17,32,0.95);
  border: 2px solid rgba(0,81,147,0.45);
  box-shadow: 0 16px 40px rgba(0,0,0,.22);
  display: grid;
  gap: 10px;
}

.hint{
  margin: 0 0 6px 0;
  font-size: 12px;
  color: rgba(255,255,255,0.75);
  font-weight: 700;
}

.navBtn{
  width: 100%;
  border-radius: 14px;
  padding: 12px 12px;
  font-weight: 900;
  letter-spacing: .4px;
  cursor: pointer;

  background: transparent;
  color: rgba(255,255,255,0.9);
  border: 2px solid rgba(0,81,147,0.45);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.navText{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navBtn:hover{
  border-color: rgba(0,81,147,0.75);
}

.navBtn.active{
  background: linear-gradient(180deg, #005193 0%, #003f73 100%);
  border-color: rgba(255,255,255,0.20);
  color: #fff;
  box-shadow: 0 10px 20px rgba(0,0,0,.18);
}

.navCheck{
  width: 26px;
  height: 26px;
  border-radius: 10px;
  display: grid;
  place-items: center;

  color: #ffffff;
  font-weight: 1000;
  line-height: 1;

  background: rgba(125, 211, 252, 0.25);
  border: 1px solid rgba(125, 211, 252, 0.85);
}
</style>