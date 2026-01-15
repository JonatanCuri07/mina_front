<template>
  <div class="chartCard">
    <div class="chartTitle">{{ title }}</div>

    <div class="chartWrap">
      <apexchart
        type="pie"
        :options="options"
        :series="seriesSafe"
        width="100%"
        height="260"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  labels: { type: Array, required: true },
  series: { type: Array, required: true },
});

const seriesSafe = computed(() =>
  (props.series || []).map((n) => Number(n || 0))
);

const options = computed(() => ({
  chart: {
    type: "pie",
    toolbar: { show: false },
    redrawOnParentResize: true,
    redrawOnWindowResize: true,
  },
  labels: props.labels,
  legend: {
    position: "bottom",
    fontSize: "14px",
  },
  dataLabels: {
    enabled: true,
    style: { fontSize: "14px", fontWeight: 800 },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["rgba(255,255,255,0.9)"],
  },
  colors: ["#0075d4", "#6b7280"],
  responsive: [
    {
      breakpoint: 900,
      options: {
        chart: { height: 260 },
        legend: { fontSize: "13px" },
        dataLabels: { style: { fontSize: "13px" } },
      },
    },
    {
      breakpoint: 520,
      options: {
        chart: { height: 220 },
        legend: { fontSize: "12px" },
        dataLabels: { style: { fontSize: "12px" } },
      },
    },
    {
      breakpoint: 420,
      options: {
        chart: { height: 205 },
        legend: { fontSize: "11px" },
        dataLabels: { style: { fontSize: "11px" } },
      },
    },
  ],
}));
</script>

<style scoped>
.chartCard {
  background: rgba(255, 255, 255, 0.88);
  border: 3px solid rgba(11, 27, 43, 0.85);
  border-radius: 18px;
  padding: 16px 18px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.18);
}

.chartTitle {
  font-weight: 1000;
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--blue-900);
}

.chartCard{
  overflow: hidden; 
}

.chartWrap{
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

:deep(.apexcharts-canvas){
  max-width: 100% !important;
  width: 100% !important;
}

:deep(.apexcharts-canvas svg){
  max-width: 100% !important;
}

:deep(.apexcharts-legend){
  max-width: 100% !important;
  justify-content: center !important;
}

@media (max-width: 520px) {
  .chartCard {
    padding: 10px 12px;
    border-width: 2px;
    border-radius: 14px;
  }
}
</style>
