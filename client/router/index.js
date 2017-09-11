/*
Yaty - Climbing Gym Management
Copyright (C) 2017 - Hugo Da Roit <contact@hdaroit.fr>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
      component: require('../views/Home'),
      meta: {
        auth: true
      }
    },
    {
      name: 'Login',
      path: '/login',
      meta: {
        auth: false
      },
      component: () => import('../views/auth/Login')
    },
    {
      name: 'Register',
      path: '/register',
      meta: {
        auth: false
      },
      component: () => import('../views/auth/Register')
    },
    {
      name: 'Add a gym',
      path: '/add-gym',
      meta: {
        auth: true
      },
      component: () => import('../views/utils/AddGym')
    },
    {
      name: 'Create a gym',
      path: '/create-gym',
      component: () => import('../views/utils/CreateGym')
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: '/403',
      name: 'Error 403',
      component: () => import('../views/errors/403')
    },
    {
      path: '/404',
      name: 'Error 404',
      component: () => import('../views/errors/404')
    },
    {
      path: '*',
      name: '404',
      component: () => import('../views/errors/404')
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
