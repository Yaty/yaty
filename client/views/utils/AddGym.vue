<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="columns is-centered is-mobile">
    <div class="column is-half is-narrow">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Add a gym to your account
          </p>
        </header>
        <div class="card-content" v-if="gymsExists">
          <div class="content">
            <select v-on:change="selectGym" v-model="selectedGym" style="width: 95%">
              <option v-for="gym in gyms" :value="gym">{{ gym }}</option>
            </select>
          </div>
          <div class="content">
            <button style="width: 95%" class="button is-success" v-on:click="join">Join !</button>
          </div>
        </div>
        <div v-else class="card-content">
          <p class="content">
            There is no gym currently. See with your gym manager to create his.
          </p>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" v-if="gymsExists">Join</a>
          <router-link to="/create-gym" class="card-footer-item">Create your gym ?</router-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'

  export default {
    data () {
      return {
        newGym: {
          name: null,
          address: null,
          website: null,
          facebook: null,
          owner: {
            name: null,
            phone: null
          }
        },
        gyms: null,
        gymsLoading: null,
        selectedGym: null
      }
    },
    computed: {
      gymsExists () {
        return Array.isArray(this.gyms) && this.gyms.length > 0
      }
    },
    components: {
      Collapse,
      CollapseItem
    },
    mounted () {
      this.gymsLoading = true
      this.axios.get(process.env.BACKEND + 'gyms')
        .then(response => {
          this.gyms = response.data.gyms
          this.gymsLoading = false
        })
        .catch(e => {
          console.log('get gyms error', e)
          this.gymsLoading = false
          this.$notify({
            type: 'error',
            title: 'error',
            text: 'Unable to fetch gyms.'
          })
        })
    },
    methods: {
      selectGym () {
        this.$store.dispatch('addAndSelectGym', this.selectedGym)
        this.axios.post(process.env.BACKEND + 'users/gym', { email: this.$store.getters.user.email, gym: this.selectedGym })
      },
      join () {
      }
    }
  }
</script>

<style scoped>
  select {
    height: 100%;
    text-align-last: center;
    text-align:center;
    width: 25%;
  }
</style>
