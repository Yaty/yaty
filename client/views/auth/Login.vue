<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="content has-text-centered">
    <h1 class="is-title is-bold">Login</h1>

    <div class="columns is-vcentered">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <div v-if="authRedirect">You'll be redirected to {{ authRedirect.from.name }} after logging in.</div>
          <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
          <form v-on:submit.prevent="login">
            <label class="label">Email</label>
            <p class="control">
              <input v-model="data.body.email" class="input" type="text" placeholder="email@example.org">
            </p>
            <label class="label">Password</label>
            <p class="control">
              <input v-model="data.body.password" class="input" type="password" placeholder="password">
            </p>

            <p class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="data.rememberMe">
                Remember me
              </label>
            </p>

            <hr>
            <p class="control level level-left">
              <button type="submit" class="button is-primary level-item">Login</button>
              <button class="button is-default level-item">Cancel</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {

    data () {
      return {
        data: {
          body: {
            email: null,
            password: null
          },
          rememberMe: false
        },
        error: null
      }
    },
    computed: {
      ...mapGetters({
        pkg: 'pkg'
      }),
      authRedirect () {
        return this.$auth.redirect()
      }
    },
    methods: {
      // TODO : Validators
      login () {
        const redirect = this.authRedirect
        this.$auth.login({
          headers: {
            'Content-Type': 'application/json'
          },
          data: this.data.body,
          rememberMe: this.data.rememberMe,
          redirect: {name: redirect ? redirect.from.name : 'Home'},
          error (err) {
            if (err.response) {
              // The request was made, but the server responded with a status code
              // that falls out of the range of 2xx
              // console.log(err.response.status)
              // console.log(err.response.data)
              // console.log(err.response.headers)
              this.error = err.response.data
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error login', err)
              this.error = 'Unknown error, contact : ' + this.pkg.author.email
            }
            console.log(err.config)
          }
        })
      }
    }
    // filters: {
    //   json: function (value) {
    //     console.log(value)
    //     return value
    //   }
    // }

  }
</script>

<style lang="scss" scoped>
  .is-title {
    text-transform: capitalize;
  }
</style>
