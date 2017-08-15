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
    opened: true,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  user: {
    logged: false,
    email: null,
    name: null,
    lastname: null,
    gyms: null,
    selectedGym: null,
    role: null
  }
}

const updateGyms = () => {
  const selectedGymId = window.localStorage.getItem('selectedGymId')
  if (selectedGymId && state.user.gyms) {
    for (let gym of state.user.gyms) {
      if (String(gym.id) === String(selectedGymId)) {
        state.user.selectedGym = gym
        state.user.role = state.user.selectedGym.role
        return
      }
    }
  }

  // If the gym wasn't found we select the first gym (or null)
  state.user.selectedGym = state.user.gyms && state.user.gyms.length > 0 && state.user.gyms[0] ? state.user.gyms[0] : null
  state.user.role = state.user.selectedGym.role
  if (state.user.selectedGym) window.localStorage.setItem('selectedGymId', state.user.selectedGym.id)
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_SIDEBAR] (state, config) {
    if (config.hasOwnProperty('opened')) {
      state.sidebar.opened = config.opened
    } else {
      state.sidebar.opened = false
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

  [types.UPDATE_GYMS] (state, gyms) {
    state.user.gyms = gyms
    updateGyms()
  },

  [types.UPDATE_USER] (state, user) {
    state.user.email = user.email
    state.user.name = user.name
    state.user.lastname = user.lastname
    state.user.gyms = user.gyms
    updateGyms()
  },

  [types.SELECT_GYM] (state, gym) {
    window.localStorage.setItem('selectedGymId', gym.id)
    state.user.selectedGym = gym
    state.user.role = state.user.selectedGym ? state.user.selectedGym.role : null
  },

  [types.LOG_OUT] (state) {
    state.user.logged = false
    state.sidebar.hidden = true
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
  },

  [types.LOG_IN] (state) {
    state.user.logged = true
    state.sidebar.hidden = false
  }
}

export default {
  state,
  mutations
}
