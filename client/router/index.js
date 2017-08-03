/*
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
*/

import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: require('../views/Home')
    },
    {
      name: 'Login',
      path: '/login',
      meta: {
        auth: false
      },
      component: require('../views/auth/Login')
    },
    {
      name: 'Register',
      path: '/register',
      meta: {
        auth: false
      },
      component: require('../views/auth/Register')
    },
    {
      name: 'Add a gym',
      path: '/add-gym',
      meta: {
        auth: true
      },
      component: require('../views/utils/AddGym')
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: '/403',
      name: 'Error 403',
      component: require('../views/errors/403')
    },
    {
      path: '/404',
      name: 'Error 404',
      component: require('../views/errors/404')
    }
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
