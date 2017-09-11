<!--
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
-->

<template>
  <div class="content has-text-centered">
    <h1 class="is-title is-bold">Login</h1>

    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <div v-if="authRedirect">You'll be redirected to {{ authRedirect.from.name }} after logging in.</div>
          <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
          <form v-on:submit.prevent="login">
            <b-field label="Email">
              <b-input type="email" placeholder="email@email.com" v-model="data.body.email"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input type="password" v-model="data.body.password" placeholder="Password"></b-input>
            </b-field>

            <div class="field">
              <b-checkbox v-model="data.rememberMe">Remember me</b-checkbox>
            </div>

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
        error: null,
        emailMsg: null,
        passwordMsg: null
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
