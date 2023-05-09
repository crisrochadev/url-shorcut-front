const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "links",
        name: "links",
        component: () => import("pages/ListLinksPage.vue"),
      },
      {
        path: "new",
        name: "new",
        component: () => import("pages/NewLinkPage.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("pages/AboutPage.vue"),
      },
      {
        path: "error",
        name: "error",
        component: () => import("pages/LinkRedirectErrorPage.vue"),
      },
    ],
  },
  {
    path: "/:slug",
    name: "slug",
    component: () => import("pages/LinkRedirectPage.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
