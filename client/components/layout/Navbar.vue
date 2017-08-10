<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item is-hidden-tablet" @click="toggleSidebar({opened: !sidebar.opened})">
            <i class="fa fa-bars" aria-hidden="true" v-show="!sidebar.hidden"></i>
          </a>
          <p class="control nav-item">
            <span class="select" v-if="$auth.check() && user.gyms && user.gyms.length > 0">
              <select v-model="selectedGym">
                <option v-for="gym in user.gyms" :value="gym">{{ gym.name }}</option>
              </select>
            </span>
            <span v-else-if="$auth.check()">
              <router-link to="/add-gym" class="button is-success is-outlined">Join or create a gym</router-link>
            </span>
          </p>
        </div>
        <div class="nav-center">
          <router-link class="nav-item hero-brand" to="/">
            <img src="~assets/logo.svg" :alt="pkginfo.description">
            <tooltip :label="'v' + pkginfo.version" placement="right" type="success" size="small" :no-animate="true" :always="true" :rounded="true">
              <div class="is-hidden-mobile">
                <span class="vue">Yaty</span><strong class="admin">Admin</strong>
              </div>
            </tooltip>
          </router-link>
        </div>
        <div class="nav-right is-flex">
          <router-link v-if="!$auth.check()" to="/login" class="nav-item">Login</router-link>
          <router-link v-if="!$auth.check()" to="/register" class="nav-item">Register</router-link>
          <a v-if="$auth.check()" @click="logout($auth)" class="nav-item">Logout</a>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
  import Tooltip from 'vue-bulma-tooltip'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      Tooltip
    },

    props: {
      show: Boolean
    },

    computed: {
      ...mapGetters({
        pkginfo: 'pkg',
        sidebar: 'sidebar',
        user: 'user'
      }),
      selectedGym: {
        get () {
          return this.$store.getters.user.selectedGym
        },
        set (gym) {
          this.$store.dispatch('selectGym', gym)
        }
      }
    },

    methods: {
      ...mapActions([
        'toggleSidebar',
        'logout'
      ]),
      selectGym () {
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/variables';

  .app-navbar {
    position: fixed;
    min-width: 100%;
    z-index: 1024;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

    .container {
      margin: auto 10px;
    }

    .nav-right {
      align-items: stretch;
      align-items: stretch;
      flex: 1;
      justify-content: flex-end;
      overflow: hidden;
      overflow-x: auto;
      white-space: nowrap;
    }
  }

  .hero-brand {
    .vue {
      margin-left: 10px;
      color: #36AC70;
    }
    .admin {
      color: #28374B;
    }
  }
</style>
