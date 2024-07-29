export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/webProjects/doc2show/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/nuxt3FOD/01-%E5%BC%80%E7%AF%87%EF%BC%9A%E8%AF%BE%E7%A8%8B%E4%BB%8B%E7%BB%8D%E5%92%8C%E5%AE%89%E6%8E%92.html", { loader: () => import(/* webpackChunkName: "nuxt3FOD_01-开篇：课程介绍和安排.html" */"D:/webProjects/doc2show/docs/.vuepress/.temp/pages/nuxt3FOD/01-开篇：课程介绍和安排.html.js"), meta: {"title":""} }],
  ["/nuxt3FOD/", { loader: () => import(/* webpackChunkName: "nuxt3FOD_index.html" */"D:/webProjects/doc2show/docs/.vuepress/.temp/pages/nuxt3FOD/index.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/webProjects/doc2show/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
