/*
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
*/

import lazyLoading from '../lazyLoading'

export default {
  path: '/gym-management',
  meta: {
    icon: 'fa-gear',
    expanded: false,
    label: 'Gym',
    auth: 'owner'
  },
  component: lazyLoading('owners/gym', true),
  redirect: 'gym-management/parameters',

  children: [
    {
      name: 'Gym parameters',
      path: 'parameters',
      component: lazyLoading('owners/gym/Parameters'),
      meta: {
        label: 'Parameters'
      }
    },
    {
      name: 'Gym subscriptions',
      path: 'subscriptions',
      component: lazyLoading('owners/gym/Subscriptions'),
      meta: {
        label: 'Subscriptions'
      }
    }
  ]
}
