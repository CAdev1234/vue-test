import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/calc",
      name: "calc",
      component: () => import("../views/CalcView.vue"),
    },
    {
      path: "/summary",
      name: "summary",
      component: () => import("../views/SummaryView.vue")
    },
    {
      path: '/:pathMatch(.*)*',
      name: "error",
      component: () => import("../views/ErrorView.vue")
    }
  ],
});

export default router;
