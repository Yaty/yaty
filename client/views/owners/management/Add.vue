<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="box">
    <b-loading :active.sync="loading" :canCancel="true"></b-loading>
    <p class="title">{{ user.selectedGym.name }}</p>
    <div class="columns is-multiline is-centered">
      <div class="column is-full" v-if="error">{{ error }}</div>
      <b-panel hasCustomTemplate collapsible v-for="member in members" :key="member.id" class="column is-one-quarter" :open="false" :header="getMemberName(member)">
        <div class="panel-block has-text-centered">
          <div class="content">
            <b-field label="Email">
              <b-input v-model="member.email" type="text" placeholder="email@example.org"></b-input>
            </b-field>

            <b-field label="Name">
              <b-input v-model="member.name" type="text" placeholder="Name"></b-input>
            </b-field>

            <b-field label="Last name">
              <b-input v-model="member.lastname" type="text" placeholder="Lastname"></b-input>
            </b-field>

            <b-field label="Role">
              <b-select v-model="member.role" class="has-text-centered">
                <option v-for="role in roles.roles" :value="role">{{ role.charAt(0).toUpperCase() + role.slice(1) }}</option>
              </b-select>
            </b-field>
          </div>
        </div>
      </b-panel>
      <div class="column has-text-centered is-full">
        <button class="button is-primary is-outlined" @click="addMember">New member</button>
        <button class="button is-info is-outlined" @click="createMembers">Create members</button>
      </div>
    </div>
  </div>
</template>

<script>
  // TODO : Add an image to each user after creation (success, unknown or failure !)
  // TODO : Add subscription choice

  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        error: null,
        loading: null,
        creationDone: null,
        roles: null,
        members: []
      }
    },
    computed: mapGetters({
      user: 'user'
    }),
    created () {
      this.loading = true
      this.axios.get(process.env.BACKEND + 'users/roles')
        .then(res => {
          this.roles = res.data
          this.addMember()
          this.loading = false
        })
        .catch(e => {
          console.log(e)
          this.loading = false
        })
    },
    methods: {
      getMemberName (member) {
        if (member.name) {
          if (member.lastname) return member.name + ' ' + member.lastname
          return member.name
        }
        return 'Member'
      },
      addMember () {
        this.members.push({
          id: this.members.length,
          email: null,
          name: null,
          lastname: null,
          created: null,
          role: this.roles.default
        })
      },
      getMemberByID (id) {
        for (let i = 0; i < this.members.length; i++) {
          if (this.members[i].id === id) return this.members[i]
        }
        return null
      },
      createMembers () {
        // Removing bad users
        for (let index = 0; index < this.members.length; index++) {
          let member = this.members[index]
          if (!member || !member.email || !member.name || !member.lastname) {
            this.members.splice(index, 1)
            index--
          }
        }

        if (this.members.length > 0) {
          this.error = null
          this.creationDone = false
          this.axios.post(process.env.BACKEND + 'gyms/members/add', {
            members: this.members,
            gym: this.$store.getters.user.selectedGym.id
          })
          .then(res => {
            res.data.members.forEach(member => {
              this.getMemberByID(member.id).created = member.created
            })
            this.creationDone = true
          })
          .catch(e => {
            this.error = e.response.statusText
          })
        } else {
          this.error = 'Invalid members.'
        }
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 100%;
  }
</style>
