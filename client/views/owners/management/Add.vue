<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="columns is-multiline is-centered">
    <div class="column is-full" v-if="error">{{ error }}</div>
      <b-panel collapsible v-for="member in members" :key="member.id" class="column is-11 is-narrow" :open="false">
        <strong slot="header">{{ getMemberName(member) }}</strong>
        <div class="content">
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
        </div>
      </b-panel>
    <div class="column has-text-centered is-narrow is-half">
      <button class="button is-primary is-outlined" @click="addMember">New member</button>
      <button class="button is-info is-outlined" @click="createMembers">Create members</button>
    </div>
  </div>
</template>

<script>
  // TODO : Add an image to each user after creation (sucess, unknown or failure !)
  export default {
    data () {
      return {
        error: null,
        creationDone: null,
        members: [{
          id: 0,
          email: null,
          name: null,
          lastname: null,
          created: null
        }]
      }
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
          created: null
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
  .column {
    padding: 0
  }

  .panel {
    margin-bottom: 0.5rem;
    background-color: white;
  }
</style>
