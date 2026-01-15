import { defineStore } from "pinia";
import { getDashboardSummary } from "../services/validation.service";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    loading: false,
    summary: {
      placas: { aprobadas: 0, desaprobadas: 0 },
      licencias: { vigentes: 0, noVigentes: 0 },
    },
  }),
  actions: {
    async fetchSummary() {
      this.loading = true;
      try {
        this.summary = await getDashboardSummary();
      } finally {
        this.loading = false;
      }
    },
  },
});
