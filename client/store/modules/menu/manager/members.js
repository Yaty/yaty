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

import lazyLoading from '../lazyLoading'

export default {
  path: '/members',
  meta: {
    icon: 'fa-users',
    expanded: false,
    label: 'Members',
    auth: 'owner'
  },
  component: lazyLoading('owners/management', true),
  redirect: 'members/list',

  children: [
    {
      name: 'List members',
      path: 'list',
      component: lazyLoading('owners/management/List'),
      meta: {
        label: 'List'
      }
    },
    {
      name: 'Add members',
      path: 'add',
      component: lazyLoading('owners/management/Add'),
      meta: {
        label: 'Add'
      }
    }
  ]
}
