import { defineStore } from "pinia";
import { validatePlateAndLicense } from "../services/validation.service";

export const useValidationStore = defineStore("validation", {
  state: () => ({
    placa: "",
    licencia: "",
    loading: false,
    result: null, 
  }),
  actions: {
    async validate() {
      this.loading = true;
      try {
        this.result = await validatePlateAndLicense(this.placa, this.licencia);
      } finally {
        this.loading = false;
      }
    },
    reset() {
      this.placa = "";
      this.licencia = "";
      this.result = null;
    },
  },
});
