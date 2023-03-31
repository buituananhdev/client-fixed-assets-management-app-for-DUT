import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _45140230 = () => interopDefault(import('..\\pages\\details_asset\\_detail_asset.vue' /* webpackChunkName: "pages/details_asset/_detail_asset" */))
const _a03ba4de = () => interopDefault(import('..\\pages\\disposed_assets\\_disposed_assets.vue' /* webpackChunkName: "pages/disposed_assets/_disposed_assets" */))
const _24dde0d5 = () => interopDefault(import('..\\pages\\home\\_home.vue' /* webpackChunkName: "pages/home/_home" */))
const _25dd8a55 = () => interopDefault(import('..\\pages\\statistics\\_statistics.vue' /* webpackChunkName: "pages/statistics/_statistics" */))
const _225c1e67 = () => interopDefault(import('..\\pages\\users\\_users.vue' /* webpackChunkName: "pages/users/_users" */))
const _9a670bb0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/details_asset/:detail_asset?",
    component: _45140230,
    name: "details_asset-detail_asset"
  }, {
    path: "/disposed_assets/:disposed_assets?",
    component: _a03ba4de,
    name: "disposed_assets-disposed_assets"
  }, {
    path: "/home/:home?",
    component: _24dde0d5,
    name: "home-home"
  }, {
    path: "/statistics/:statistics?",
    component: _25dd8a55,
    name: "statistics-statistics"
  }, {
    path: "/users/:users?",
    component: _225c1e67,
    name: "users-users"
  }, {
    path: "/",
    component: _9a670bb0,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
