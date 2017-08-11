/*
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
*/

const pkg = state => state.pkg
const app = state => state.app
const device = state => state.app.device
const sidebar = state => state.app.sidebar
const effect = state => state.app.effect
const user = state => state.app.user
const menuitems = state => {
  const menuItems = []
  const userLogged = state.app.user.logged
  const userRole = state.app.user.role

  state.menu.items.forEach(menuItem => {
    if (!menuItem.hasOwnProperty('meta')) return
    let meta = menuItem.meta
    if (meta.hasOwnProperty('auth')) {
      if (typeof meta.auth === 'string' && userRole === meta.auth) { // Role checking
        menuItems.push(menuItem)
      } else if (typeof meta.auth === 'boolean' && userLogged === meta.auth) { // Auth checking
        menuItems.push(menuItem)
      }
    } else {
      menuItems.push(menuItem)
    }
  })

  return menuItems
}
const componententry = state => {
  return state.menu.items.filter(c => c.meta && c.meta.label === 'Components')[0]
}

export {
  pkg,
  app,
  device,
  sidebar,
  effect,
  menuitems,
  componententry,
  user
}
