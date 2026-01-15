<template>
  <BasePanel>
    <SectionHeader
      title="Resumen de operación: placas y licencias"
      variant="resumen"
    />
    <div class="dashboardGrid">
      <div class="leftCol">
        <BaseCard>
          <div class="sectionHeader">
            <div class="sectionTitle">Placas</div>
            <div class="miniIcon" aria-hidden="true">
              <Icon icon="mdi:car" width="26" height="26" />
            </div>
          </div>
          <div class="row">
            <div class="name">En circulación</div>
            <div class="value">{{ s.placas.aprobadas }}</div>
          </div>
          <div class="row">
            <div class="name">Fuera de circulación</div>
            <div class="value">{{ s.placas.desaprobadas }}</div>
          </div>
        </BaseCard>

        <BaseCard>
          <div class="sectionHeader">
            <div class="sectionTitle">Licencias de conducir</div>
            <div class="miniIcon" aria-hidden="true">
              <Icon icon="mdi:card-account-details-outline" width="26" height="26" />
            </div>
          </div>
          <div class="row">
            <div class="name">Vigente</div>
            <div class="value">{{ s.licencias.vigentes }}</div>
          </div>
          <div class="row">
            <div class="name">No vigente</div>
            <div class="value">{{ s.licencias.noVigentes }}</div>
          </div>
        </BaseCard>
      </div>

      <div class="midCol">
        <PieChartCard
          title="Placas (En circulación vs Fuera de circulación)"
          :labels="['En circulación', 'Fuera de circulación']"
          :series="placasSeries"
        />
      </div>

      <div class="rightCol">
        <PieChartCard
          title="Licencias (Vigente vs No vigente)"
          :labels="['Vigente', 'No vigente']"
          :series="licenciasSeries"
        />
      </div>
    </div>
  </BasePanel>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, computed } from "vue";
import SectionHeader from "../components/SectionHeader.vue";
import BaseCard from "../components/BaseCard.vue";
import BasePanel from "../components/BasePanel.vue";
import { useDashboardStore } from "../stores/dashboard.store";
import PieChartCard from "../components/PieChartCard.vue";

const placasSeries = computed(() => [
  s.value.placas.aprobadas,
  s.value.placas.desaprobadas,
]);

const licenciasSeries = computed(() => [
  s.value.licencias.vigentes,
  s.value.licencias.noVigentes,
]);

const store = useDashboardStore();
const s = computed(() => store.summary);

onMounted(() => {
  store.fetchSummary();
});
</script>


<style scoped>
.stack{
  margin-top: 18px;
  display: grid;
  gap: 16px;
}

.sectionHeader{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.sectionTitle{
  font-weight: 1000;
  font-size: 18px;
  margin: 0; 
  color: #0b1b2b;
}

.miniIcon{
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;

  background: rgba(0, 81, 147, 0.08);
  border: 1px solid rgba(0, 81, 147, 0.18);
}


.row{
  display: grid;
  grid-template-columns: 1fr 80px;
  padding: 10px 0;
  font-size: 16px;
}
.name{ color: var(--blue-800); font-weight: 700; font-size: 15px; }
.value{ text-align: right; font-weight: 900; font-size: 18px; }

.chartsGrid{
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 980px){
  .chartsGrid{
    grid-template-columns: 1fr;
  }
}

.dashboardGrid{
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: start;
}

.leftCol{
  display: grid;
  gap: 22px; 
}

.leftCol .sectionTitle{
  margin-bottom: 14px; 
}

.leftCol .row{
  padding: 12px 0; 
}

.leftCol .row + .row{
  border-top: 1px solid rgba(11,27,43,0.08);
}

@media (min-width: 900px){
  .dashboardGrid{
    grid-template-columns: minmax(280px, 420px) 1fr;
  }

  .midCol{ grid-column: 2; }
  .rightCol{ grid-column: 2; }
}

@media (min-width: 1280px){
  .dashboardGrid{
    grid-template-columns: minmax(280px, 360px) 1fr 1fr;
  }
  .midCol, .rightCol{
    align-self: stretch;
  }

  .midCol{ grid-column: auto; }
  .rightCol{ grid-column: auto; }
}


</style>
