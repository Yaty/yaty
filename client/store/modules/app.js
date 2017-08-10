/*
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
*/

import * as types from '../mutation-types'

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  user: {
    email: null,
    name: null,
    lastname: null,
    gyms: null,
    selectedGym: null
  }
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_SIDEBAR] (state, config) {
    if (state.device.isMobile && config.hasOwnProperty('opened')) {
      state.sidebar.opened = config.opened
    } else {
      state.sidebar.opened = true
    }

    if (config.hasOwnProperty('hidden')) {
      state.sidebar.hidden = config.hidden
    }
  },

  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  },

  [types.UPDATE_USER] (state, user) {
    state.user.email = user.email
    state.user.name = user.name
    state.user.lastname = user.lastname
    state.user.gyms = user.gyms
    const selectedGymId = window.localStorage.getItem('selectedGymId')
    if (selectedGymId && state.user.gyms) {
      for (let gym of state.user.gyms) {
        if (String(gym.id) === String(selectedGymId)) {
          state.user.selectedGym = gym
          return
        }
      }
    }

    // If the gym wasn't found we select the first gym (or null)
    state.user.selectedGym = state.user.gyms && state.user.gyms.length > 0 && state.user.gyms[0] ? state.user.gyms[0] : null
    if (state.user.selectedGym) window.localStorage.setItem('selectedGymId', state.user.selectedGym.id)
  },

  [types.SELECT_GYM] (state, gym) {
    window.localStorage.setItem('selectedGymId', gym.id)
    state.user.selectedGym = gym
  },

  [types.ADD_SELECT_GYM] (state, gym) {
    state.user.gyms.push(gym)
    window.localStorage.setItem('selectedGymId', gym.id)
    state.user.selectedGym = gym
  },

  [types.LOG_OUT] (state, auth) {
    // Logging out with Vue-auth
    auth.logout({ redirect: '/' })

    // Then we clear the browser
    window.localStorage.clear()
    window.sessionStorage.clear()
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i]
      let eqPos = cookie.indexOf('=')
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }

    // Reseting user infos to null
    for (let key in state.user) {
      state.user[key] = null
    }
  }
}

export default {
  state,
  mutations
}
