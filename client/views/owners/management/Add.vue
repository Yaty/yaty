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
      <div class="column is-full has-text-centered" v-if="error">{{ error }}</div>

      <div class="column is-full">
        <b-table
          :data="members"
          striped
          narrowed
          mobile-cards
        >
          <template scope="props">
            <b-table-column field="created" label="Created" :visible="creationDone" sortable centered>
              <b-field>
                <b-checkbox v-model="props.row.created" disabled></b-checkbox>
              </b-field>
            </b-table-column>

            <b-table-column field="email" label="E-mail" sortable centered>
              <b-field>
                <b-input v-model="props.row.email" type="email" placeholder="email@example.org"></b-input>
              </b-field>
            </b-table-column>

            <b-table-column field="name" label="First Name" sortable centered>
              <b-field>
                <b-input v-model="props.row.name" type="text" placeholder="Name"></b-input>
              </b-field>
            </b-table-column>

            <b-table-column field="lastname" label="Last Name" sortable centered>
              <b-field>
                <b-input v-model="props.row.lastname" type="text" placeholder="Lastname"></b-input>
              </b-field>
            </b-table-column>

            <b-table-column field="subscription" label="Subscription" sortable centered>
              <b-field>
                <b-select v-model="props.row.subscription" class="has-text-centered" placeholder="Select a subscription">
                  <option v-for="subscription in subscriptions" :value="subscription">{{ subscription.label }}</option>
                </b-select>
              </b-field>
            </b-table-column>

            <b-table-column field="role" label="Role" sortable centered>
              <b-field>
                <b-select v-model="props.row.role" class="has-text-centered">
                  <option v-for="role in roles.roles" :value="role">{{ role.charAt(0).toUpperCase() + role.slice(1) }}</option>
                </b-select>
              </b-field>
            </b-table-column>
          </template>

          <div slot="empty" class="has-text-centered">
            There is currently no members to display.
          </div>
        </b-table>
      </div>

      <div class="column has-text-centered is-full">
        <button class="button is-primary is-outlined" @click="addMember">New member</button>
        <button class="button is-info is-outlined" :title="createMembersBtnTitle" :disabled="!checkIfMembersAreCorrect" @click="createMembers">Create members</button>
      </div>
    </div>
  </div>
</template>

<script>
  // TODO : Use a tool to validate data
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        error: null,
        loading: null,
        creationDone: null,
        roles: null,
        subscriptions: null,
        members: [],
        createMembersBtnTitle: ''
      }
    },
    computed: {
      ...mapGetters({
        user: 'user'
      }),
      // TODO : Check if this email was already entered
      checkIfMembersAreCorrect () {
        if (!this.subscriptions || this.subscriptions.length === 0 || this.members.length === 0) {
          this.createMembersBtnTitle = 'Some of your members are invalid'
          return false
        }
        let validity = true
        for (let i = 0; i < this.members.length; i++) {
          const member = this.members[i]
          const nameIsInvalid = !member.name || member.name.length === 0
          const lastNameIsInvalid = !member.lastname || member.lastname.length === 0
          const emailIsInvalid = !member.email || member.email.length === 0 || !this.isMailValid(member.email)
          const subscriptionIsInvalid = !member.subscription || !member.subscription.id
          if (nameIsInvalid || lastNameIsInvalid || emailIsInvalid || subscriptionIsInvalid) {
            member.valid = false
            validity = false
          } else {
            member.valid = true
          }
        }
        if (!validity) this.createMembersBtnTitle = 'Some of your members are invalid'
        return validity
      }
    },
    created () {
      this.loading = true
      this.fetchRoles()
        .then(this.fetchSubscriptions)
        .then(() => {
          this.addMember()
          this.loading = false
        })
        .catch(e => {
          if (e.hasOwnProperty('response')) this.error = e.response.statusText
          else this.error = 'Error while loading this page.'
          this.loading = false
        })
    },
    methods: {
      isMailValid (mail) {
        return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(mail)
      },
      fetchRoles () {
        return new Promise((resolve, reject) => {
          this.axios.get(process.env.BACKEND + 'users/roles')
            .then(res => {
              this.roles = res.data
              return resolve()
            })
            .catch(reject)
        })
      },
      fetchSubscriptions () {
        return new Promise((resolve, reject) => {
          this.axios.get(process.env.BACKEND + 'gyms/subscriptions', {
            params: {
              gym: this.user.selectedGym.id
            }
          })
            .then(res => {
              this.subscriptions = res.data.subscriptions
              if (this.subscriptions.length === 0) this.error = 'Please add subscriptions before adding members.'
              return resolve()
            })
            .catch(reject)
        })
      },
      addMember () {
        this.members.push({
          id: this.members.length,
          email: null,
          name: null,
          lastname: null,
          created: null,
          valid: null,
          role: this.roles.default,
          subscription: null
        })
      },
      getMemberByID (id) {
        for (let i = 0; i < this.members.length; i++) {
          if (this.members[i].id === id) return this.members[i]
        }
        return null
      },
      createMembers () {
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
            this.creationDone = true
            this.error = e.response.statusText
          })
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 100%;
  }
</style>
