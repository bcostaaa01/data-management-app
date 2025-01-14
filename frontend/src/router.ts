import { createWebHistory, createRouter } from "vue-router";
import DashboardView from "./views/DashboardView.vue";
import ReportsView from "./views/ReportsView.vue";
import SettingsView from "./views/SettingsView.vue";
import TablesView from "./views/TablesView.vue";
import SignIn from "./views/Auth/SignIn.vue";
import DataImportView from "./views/DataImportView.vue";
import HomePage from "./views/HomePageView.vue";
import ChatbotView from "./views/ChatbotView.vue";
import FileView from "./views/FileView.vue";
import { checkAuth } from "./supabase/auth";

const routes = [
  { path: "/", component: HomePage, meta: { requiresAuth: true } },
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/file/:id",
    name: "file",
    component: FileView,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/data-import",
    component: DataImportView,
    meta: { requiresAuth: true },
  },
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
    path: "/chatbot",
    component: ChatbotView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    component: SignIn,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !checkAuth()) {
    next("/signin");
  } else {
    next();
  }
});

export { router };
