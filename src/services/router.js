import App from "@/App.vue";
import { accessToken } from "@/utils";
import { createRouter, createWebHistory } from "vue-router";

import RoutesHome from "@/views/home/services/routes";
import RoutesPersonal from "@/views/personal/services/routes";
import RoutesApplication from "@/views/application/services/routes";

const routes = [
  {
    path: "",
    name: "App",
    component: App,
    meta: {
      requiresAuth: true,
    },
    children: [...RoutesHome, ...RoutesPersonal, ...RoutesApplication],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/Register.vue"),
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: () => import("@/pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  window.scrollTo(0, 0);

  if (!to.name || !router.hasRoute(to.name)) {
    return next({ name: "NotFound" });
  }

  try {
    if (accessToken.value) {
      if (to.name === "Login") {
        return next({ name: "Home" });
      }
      next();
    } else {
      if (
        to.name !== "Login" &&
        to.name !== "Register" &&
        to.name !== "Home" &&
        to.name !== "NotFound" &&
        to.name !== "VirtualAssistantChat"
      ) {
        return next({ name: "Login" });
      }
      next();
    }
  } catch (error) {
    if (to.name === "Register") {
      next();
    }
    return next({ name: "Login" });
  }
});

export default router;
