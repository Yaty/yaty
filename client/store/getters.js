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
      } else {
        menuItems.push(null) // We are pushing a null to not change the index of the item between vuex and the sidebar, the sidebar will ignore this
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
