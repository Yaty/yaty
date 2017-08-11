/*
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
*/

import * as types from './mutation-types'

export const toggleSidebar = ({ commit }, config) => {
  if (config instanceof Object) {
    commit(types.TOGGLE_SIDEBAR, config)
  }
}

export const toggleDevice = ({ commit }, device) => commit(types.TOGGLE_DEVICE, device)

export const expandMenu = ({ commit }, menuItem) => {
  if (menuItem) {
    menuItem.expanded = menuItem.expanded || false
    commit(types.EXPAND_MENU, menuItem)
  }
}

export const switchEffect = ({ commit }, effectItem) => {
  if (effectItem) {
    commit(types.SWITCH_EFFECT, effectItem)
  }
}

export const updateUser = ({ commit }, user) => {
  commit(types.UPDATE_USER, user)
}

export const selectGym = ({ commit }, gym) => {
  commit(types.SELECT_GYM, gym)
}

export const addAndSelectGym = ({ commit }, gym) => {
  commit(types.ADD_SELECT_GYM, gym)
}

export const logout = ({ commit }, auth) => {
  commit(types.LOG_OUT, auth)
}

export const login = ({ commit }, auth) => {
  commit(types.LOG_IN, auth)
}
