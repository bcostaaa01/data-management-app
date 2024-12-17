import { createMemoryHistory, createRouter } from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import ReportsView from "./views/ReportsView.vue";

const routes = [
  { path: "/", component: HomeView },
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
