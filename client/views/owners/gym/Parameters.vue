<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="box">
    <p class="title">{{ user.selectedGym.name }}</p>
    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <b-field label="Name" expanded>
          <b-input :value="user.selectedGym.name"></b-input>
        </b-field>
      </div>

      <div class="column is-one-quarter">
        <b-field label="Contact e-mail" expanded>
          <b-input :value="user.selectedGym.contact"></b-input>
        </b-field>
      </div>

      <div class="column is-full">
        <b-field grouped>
          <b-field label="Num">
            <b-input type="number" value=""></b-input>
          </b-field>
          <b-field label="Street" expanded>
            <b-input value=""></b-input>
          </b-field>
        </b-field>
      </div>

      <div class="column is-full">
        Set owners here
        Set routesetters here
        Wait for multiselect buefy
      </div>

      <div class="column is-full">
        <div class="control has-text-centered ">
          <a class="button is-primary">Update {{ user.selectedGym.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // TODO : set binded value in adress field
  import { mapGetters } from 'vuex'
  export default {
    computed: mapGetters({
      user: 'user'
    })
  }
</script>

<style scoped></style>
