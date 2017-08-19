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

          <div class="nav-item" v-if="$auth.check() && user.gyms && user.gyms.length > 0">
            <b-field>
              <b-select v-model="selectedGym" placeholder="Select a gym">
                <option
                  v-for="gym in user.gyms"
                  :value="gym"
                  :key="gym.id">
                  {{ gym.name }}
                </option>
              </b-select>
            </b-field>
          </div>

          <div class="nav-item">
            <router-link v-if="$auth.check()" to="/add-gym" class="button is-primary is-outlined" title="Add a gym !">
                <i v-if="user.gyms && user.gyms.length > 0" class="fa fa-plus"></i>
                <span v-else>Add a gym to your account</span>
            </router-link>
          </div>
        </div>

        <div class="nav-center">
          <router-link class="nav-item hero-brand" to="/">
            <img src="~assets/logo.svg" :alt="pkginfo.description">
            <div class="is-hidden-mobile">
              <b-tooltip :label="'v' + pkginfo.version" position="is-right" always size="is-large">
                <span class="vue">Yaty</span><strong class="admin">Admin</strong>
              </b-tooltip>
            </div>
          </router-link>
        </div>
        <div class="nav-right is-flex">
          <router-link v-if="!$auth.check()" to="/login" class="nav-item">Login</router-link>
          <router-link v-if="!$auth.check()" to="/register" class="nav-item">Register</router-link>
          <a v-if="$auth.check()" @click="logout" class="nav-item">Logout</a>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
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
          this.$router.push('/')
        }
      }
    },

    methods: {
      ...mapActions([
        'toggleSidebar'
      ]),
      logout () {
        this.$auth.logout({ redirect: '/' })
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
    background-color: white;

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
