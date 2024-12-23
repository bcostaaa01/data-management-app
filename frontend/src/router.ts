import { createWebHistory, createRouter } from "vue-router";
import DashboardView from "./views/DashboardView.vue";
import AboutView from "./views/AboutView.vue";
import ReportsView from "./views/ReportsView.vue";
import SettingsView from "./views/SettingsView.vue";
import TablesView from "./views/TablesView.vue";

const routes = [
  { path: "/", component: DashboardView },
  {
    path: "/about",
    component: AboutView,
  },
  {
    path: "/reports",
    component: ReportsView,
  },
  {
    path: "/tables",
    component: TablesView,
  },
  {
    path: "/settings",
    component: SettingsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
