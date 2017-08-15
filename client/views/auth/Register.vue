<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="content has-text-centered">
    <h1 class="is-title is-bold">Register</h1>

    <div class="columns is-vcentered">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
          <form v-on:submit.prevent="register">
            <b-field label="Name">
              <b-input type="text" placeholder="Adam" v-model="data.body.name"></b-input>
            </b-field>

            <b-field label="Lastname">
              <b-input type="text" placeholder="Ondra" v-model="data.body.lastname"></b-input>
            </b-field>

            <b-field label="Email" :type="emailValidator" :message="emailMsg">
              <b-input type="email" placeholder="email@email.com" v-model="data.body.email"></b-input>
            </b-field>

            <b-field label="Password" :type="passwordValidator" :message="passwordMsg">
              <b-input type="password" v-model="data.body.password" placeholder="Password"></b-input>
            </b-field>

            <div class="field">
              <b-checkbox v-model="data.rememberMe">Remember me</b-checkbox>
            </div>

            <hr>
            <p class="control level level-left">
              <button type="submit" class="button is-primary level-item">Register</button>
              <button type="reset" class="button is-default level-item">Cancel</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        data: {
          body: {
            email: null,
            password: null,
            name: null,
            lastname: null
          },
          rememberMe: false
        },
        error: null,
        passwordMsg: null,
        emailMsg: null
      }
    },
    computed: {
      passwordValidator () {
        // TODO : Password validation here return 'is-danger' when bad, use Vuelidate ?
        return 'is-success'
      },
      emailValidator () {
        // TODO : Email validation here return 'is-danger' when bad, use Vuelidate ?
        return 'is-success'
      }
    },
    methods: {
      register () {
        this.$auth.register({
          headers: {
            'Content-Type': 'application/json'
          },
          data: this.data.body,
          rememberMe: this.data.rememberMe,
          autoLogin: true,
          success (res) {
            this.$auth.fetch()
            // console.log('Register Success', res)
            // console.log('Token: ' + this.$auth.token())
            // console.log(res)
          },
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
              console.log('Error', err.message)
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
