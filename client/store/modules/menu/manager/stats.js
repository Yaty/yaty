/*
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
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
