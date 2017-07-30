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
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'

Vue.router = router
Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
  auth: {
    request: function (req, token) {
      this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
    },
    response: function (res) {
      return res.data.token
    }
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  registerData: { url: process.env.BACKEND + 'auth/register' },
  loginData: { url: process.env.BACKEND + 'auth/login' },
  logoutData: { url: process.env.BACKEND + 'auth/logout' },
  refreshData: { enabled: false },
  fetchData: { url: process.env.BACKEND + 'auth/user' }
})

// use 419 to know when token is out of date

Vue.use(NProgress)

// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store

router.beforeEach((route, redirect, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }

  if (route.name === 'Login' && app.$auth.check()) {
    next(false)
  } else if (route.name === 'Register' && app.$auth.check()) {
    next(false)
  } else {
    next()
  }
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App,
  watch: {
    // Binding Vue Auth user data to our store
    '$auth.watch.data' (data) {
      this.$store.dispatch('updateUser', {
        email: data.email,
        name: data.name,
        lastname: data.lastname,
        gyms: data.gyms,
        lastLogin: data.lastLogin
      })
    }
  }
})

export { app, router, store }
