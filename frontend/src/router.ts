import { createMemoryHistory, createRouter } from "vue-router";
import DashboardView from "./views/DashboardView.vue";
import AboutView from "./views/AboutView.vue";
import ReportsView from "./views/ReportsView.vue";

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
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export { router };
