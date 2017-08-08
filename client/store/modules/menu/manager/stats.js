/*
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
*/

import lazyLoading from '../lazyLoading'

export default {
  name: 'Manager Stats',
  path: '/manager-stats',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    auth: true
  },
  component: lazyLoading('stats/manager', true),

  children: [
    {
      name: 'Members',
      path: 'members',
      component: lazyLoading('stats/manager/Members'),
      meta: {}
    }
  ]
}
