import { createWebHistory, createRouter } from "vue-router";
import DashboardView from "./views/DashboardView.vue";
import ReportsView from "./views/ReportsView.vue";
import SettingsView from "./views/SettingsView.vue";
import TablesView from "./views/TablesView.vue";
import SignIn from "./views/Auth/SignIn.vue";
import supabase from "./supabase/config";

const routes = [
  { path: "/", component: DashboardView, meta: { requiresAuth: true } },
  {
    path: "/reports",
    component: ReportsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tables",
    component: TablesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    component: SettingsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!supabase.auth.getUser()) {
      next("/signin");
    } else {
      next();
    }
  } else {
    next();
  }
});

export { router };
