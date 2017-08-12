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
          <div class="content has-text-centered">
            <div class="select">
              <select v-model="selectedGym">
                <option v-for="gym in gyms" :value="gym">{{ gym.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div v-else class="card-content">
          <p class="content has-text-centered">
            There is no gym currently or you already are a member in every gyms.
          </p>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" v-if="gymsExists" @click="join">Join</a>
          <router-link to="/create-gym" class="card-footer-item">Create your gym ?</router-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
  import { mapGetters } from 'vuex'

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
        if (Array.isArray(this.gyms) && this.gyms.length > 0) {
          // Removing gyms that the user already have joined
          for (let i = 0; i < this.gyms.length; i++) {
            let gymId = this.gyms[i].id
            for (let j = 0; j < this.user.gyms.length; j++) {
              if (gymId === this.user.gyms[j].id) {
                this.gyms.splice(i, 1)
                i--
              }
            }
          }

          if (this.gyms.length > 0) {
            this.selectedGym = this.gyms[0]
            return true
          }
        }
        return false
      },
      ...mapGetters({
        user: 'user'
      })
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
          this.$notify({ // should we use notification from bulma ?
            type: 'error',
            title: 'error',
            text: 'Unable to fetch gyms.'
          })
        })
    },
    methods: {
      join () {
        this.axios.post(process.env.BACKEND + 'users/gym', { email: this.$store.getters.user.email, gymId: this.selectedGym.id })
          .then(res => {
            this.$store.dispatch('updateGyms', res.data.gyms)
          })
          .catch(e => {
            console.log('error while joining a gym', e)
          })
      }
    }
  }
</script>

<style scoped>
</style>
