/*
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
*/

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import NProgress from 'vue-nprogress'
import Notifications from 'vue-notification'
import Buefy from 'buefy'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})
Vue.router = router
Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x'),
  registerData: { url: process.env.BACKEND + 'auth/register' },
  loginData: { url: process.env.BACKEND + 'auth/login', fetchUser: true },
  refreshData: { enabled: false },
  fetchData: { url: process.env.BACKEND + 'auth/user', enabled: true },
  rolesVar: 'role',
  // We are storing user data inside Vuex, Vue-auth will from now use Vuex
  fetchProcess (res, data) {
    this.watch.authenticated = true
    store.dispatch('updateUser', this.options.parseUserData.call(this, this.options.http._httpData.call(this, res)))
    this.watch.data = store.getters.user // dynamic
    this.watch.loaded = true
    if (data.success) data.success.call(this, res)
  }
})

Vue.use(NProgress)
Vue.use(Notifications)

// Enable devtools
Vue.config.devtools = true

sync(store, router)
const { state } = store

router.beforeEach((route, redirect, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }

  next()
})

const nprogress = new NProgress({ parent: '.nprogress-container' })

const app = new Vue({
  router,
  store,
  nprogress,
  ...App,
  watch: {
    '$auth.watch.authenticated' (authenticated) {
      // Keep track of the authentication status
      authenticated ? store.dispatch('login') : store.dispatch('logout')
    }
  }
})

export { app, router, store }
