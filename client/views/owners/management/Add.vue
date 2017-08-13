<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="columns is-multiline">
    <collapse class="column is-narrow">
      <collapse-item v-for="member in members" :key="member.id" :title="member.name || member.lastname ? member.name + ' ' + member.lastname : 'Member'">
        <label class="label">Email</label>
        <p class="control">
          <input v-model="member.email" class="input" type="text" placeholder="email@example.org">
        </p>

        <label class="label">Name</label>
        <p class="control">
          <input v-model="member.name" class="input" type="text" placeholder="Name">
        </p>

        <label class="label">Last name</label>
        <p class="control">
          <input v-model="member.lastname" class="input" type="text" placeholder="Lastname">
        </p>
      </collapse-item>
    </collapse>

    <div class="column has-text-centered">
      <button class="button is-primary is-outlined" @click="addMember">New member</button>
      <button class="button is-info is-outlined" @click="createMembers">Create members</button>
    </div>
  </div>
</template>

<script>
  import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'

  export default {
    components: {
      Collapse, CollapseItem
    },
    data () {
      return {
        members: [{
          id: 0,
          email: '',
          name: '',
          lastname: ''
        }]
      }
    },
    methods: {
      addMember () {
        this.members.push({
          id: this.members.length,
          email: '',
          name: '',
          lastname: ''
        })
      },
      createMembers () {
      }
    }
  }
</script>

<style scoped>
  #buttons {
    margin: auto;
  }
</style>
