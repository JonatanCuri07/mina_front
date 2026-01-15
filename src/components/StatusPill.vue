<template>
  <span class="pill" :class="variantClass">
    {{ text }}
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: { type: String, default: "neutral" }, 
  text: { type: String, required: true },
});

const variantClass = computed(() => {
  if (props.variant === "ok") return "ok";
  if (props.variant === "bad") return "bad";
  return "neutral";
});
</script>

<style scoped>
.pill{
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 12px;
  border: 2px solid var(--blue-900);
  background: white;
}
.pill.ok{ border-color: var(--ok); color: var(--ok); }
.pill.bad{ border-color: var(--bad); color: var(--bad); }
.pill.neutral{ color: var(--blue-900); }
</style>
