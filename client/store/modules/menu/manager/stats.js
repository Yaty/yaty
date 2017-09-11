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
  name: 'Stats',
  path: '/stats',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    auth: 'owner'
  },
  component: lazyLoading('owners/stats', true),

  children: [
    {
      name: 'Members stats',
      path: 'members',
      component: lazyLoading('owners/stats/Members'),
      meta: {}
    }
  ]
}
