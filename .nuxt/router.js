import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d446c998 = () => interopDefault(import('..\\pages\\details_asset\\_detail_asset.vue' /* webpackChunkName: "pages/details_asset/_detail_asset" */))
const _06253e76 = () => interopDefault(import('..\\pages\\disposed_assets\\_disposed_assets.vue' /* webpackChunkName: "pages/disposed_assets/_disposed_assets" */))
const _cda119ee = () => interopDefault(import('..\\pages\\home\\_home.vue' /* webpackChunkName: "pages/home/_home" */))
const _55fd22ee = () => interopDefault(import('..\\pages\\statistics\\_statistics.vue' /* webpackChunkName: "pages/statistics/_statistics" */))
const _6edc18ca = () => interopDefault(import('..\\pages\\users\\_users.vue' /* webpackChunkName: "pages/users/_users" */))
const _41167948 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _d446c998,
    name: "details_asset-detail_asset"
  }, {
    path: "/disposed_assets/:disposed_assets?",
    component: _06253e76,
    name: "disposed_assets-disposed_assets"
  }, {
    path: "/home/:home?",
    component: _cda119ee,
    name: "home-home"
  }, {
    path: "/statistics/:statistics?",
    component: _55fd22ee,
    name: "statistics-statistics"
  }, {
    path: "/users/:users?",
    component: _6edc18ca,
    name: "users-users"
  }, {
    path: "/",
    component: _41167948,
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
