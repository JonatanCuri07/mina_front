<template>
  <BasePanel>
    <SectionHeader
      title="Validación de placa y licencia"
      variant="validacion"
    />

    <div class="grid">
      <BaseCard>
        <div class="form">
          <div class="field">
            <div class="label" style="margin-bottom: 1vh;">Ingrese la placa</div>
            <input class="input" v-model="store.placa" placeholder="Ej: ABC123" />
          </div>
    
          <div class="field">
            <div class="label" style="margin-bottom: 1vh;">Ingrese la licencia de conducir</div>
            <input class="input" v-model="store.licencia" placeholder="Ej: L-12345678" />
          </div>
    
          <div class="actions">
            <button class="btn" @click="store.validate" :disabled="store.loading">
              {{ store.loading ? "VALIDANDO..." : "VALIDAR" }}
            </button>
    
            <button class="btn secondary" @click="store.reset" :disabled="store.loading" style="margin-left: 1vh;">
              LIMPIAR
            </button>
          </div>
        </div>
      </BaseCard>

      <div class="result" >
        <div class="title">Resultado</div>

        <div v-if="!store.result" class="placeholder">
          Complete los datos y presione <b>VALIDAR</b>.
        </div>

        <div v-else class="cards">
          <div class="card">
            <div class="cardTitle">Placa</div>
            <StatusPill
              :variant="store.result.placa.circula ? 'ok' : 'bad'"
              :text="store.result.placa.label"
            />
          </div>

          <div class="card">
            <div class="cardTitle">Licencia</div>
            <StatusPill
              :variant="store.result.licencia.vigente ? 'ok' : 'bad'"
              :text="store.result.licencia.label"
            />
          </div>
        </div>
      </div>
    </div>
  </BasePanel>
</template>

<script setup>
import SectionHeader from "../components/SectionHeader.vue";
import BasePanel from "../components/BasePanel.vue";
import StatusPill from "../components/StatusPill.vue";
import BaseCard from "../components/BaseCard.vue";
import { useValidationStore } from "../stores/validation.store";

const store = useValidationStore();
</script>


<style scoped>
.grid{
  display: grid;
  margin-top: 1vh;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  align-items: start;
}
@media (max-width: 860px){
  .grid{ grid-template-columns: 1fr; }
}

.form{ display: grid; gap: 14px; }
.field{ display: grid; gap: 8px; }

.result{
  border: 3px solid var(--blue-900);
  border-radius: 22px;
  padding: 16px;
  background: #fbfdff;
}
.title{
  font-weight: 900;
  color: var(--blue-900);
  margin-bottom: 10px;
}
.placeholder{
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
}

.cards{ display: grid; gap: 12px; }
.card{
  background: white;
  border: 2px solid var(--blue-900);
  border-radius: 16px;
  padding: 12px;
}
.cardTitle{
  font-weight: 900;
  margin-bottom: 8px;
  color: var(--blue-800);
}

.actions{
  display: flex;
  gap: 12px;
  margin-top: 6px;
}

.secondary{
  background: transparent !important;
  color: #005193 !important;
  border: 2px solid rgba(0,81,147,0.55) !important;
  box-shadow: none !important;
}
.secondary:hover{
  background: rgba(0,81,147,0.08) !important;
}

</style>
