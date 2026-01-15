import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import ValidationView from "../views/ValidationView.vue";

const routes = [
  { path: "/", redirect: "/validacion" },
  { path: "/resumen", name: "resumen", component: DashboardView },
  { path: "/validacion", name: "validacion", component: ValidationView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
