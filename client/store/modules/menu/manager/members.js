/*
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
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

  children: [
    {
      name: 'Members',
      path: '',
      component: lazyLoading('owners/management/List')
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
