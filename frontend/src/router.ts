import { createWebHistory, createRouter } from "vue-router";
import DashboardView from "./views/DashboardView.vue";
import ReportsView from "./views/ReportsView.vue";
import SettingsView from "./views/SettingsView.vue";
import TablesView from "./views/TablesView.vue";
import OAuth from "./views/Auth/OAuth.vue";
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
    meta: { requiresAuth: true, breadcrumb: "dashboard.title" },
  },
  {
    path: "/file/:id",
    name: "file",
    component: FileView,
    meta: {
      requiresAuth: true,
      breadcrumb: "fileView.fileDetails",
      parent: "/dashboard",
    },
    props: true,
  },
  {
    path: "/data-import",
    component: DataImportView,
    meta: { requiresAuth: true, breadcrumb: "dataImport.title" },
  },
  {
    path: "/reports",
    component: ReportsView,
    meta: {
      requiresAuth: true,
      breadcrumb: "reports.title",
    },
  },
  {
    path: "/tables",
    component: TablesView,
    meta: {
      requiresAuth: true,
      breadcrumb: "tables.title",
    },
  },
  {
    path: "/settings",
    component: SettingsView,
    meta: {
      requiresAuth: true,
      breadcrumb: "pages.settings",
    },
  },
  {
    path: "/chatbot",
    component: ChatbotView,
    meta: {
      requiresAuth: true,
      breadcrumb: "chatbot.title",
    },
  },
  {
    path: "/oauth",
    component: OAuth,
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
  if (to.matched.some((record) => record.meta.requiresAuth) && !checkAuth(router)) {
    next("/oauth");
  } else {
    next();
  }
});

export { router };
