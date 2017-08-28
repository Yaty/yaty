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
    <div v-if="ready">
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
                <b-field :type="getType($v.members.$each[props.index].email.$invalid)" :message="getMessage('email', props.index)">
                  <b-input v-model="props.row.email" type="email" placeholder="email@example.org"></b-input>
                </b-field>
              </b-table-column>

              <b-table-column field="name" label="First Name" sortable centered>
                <b-field :type="getType($v.members.$each[props.index].name.$invalid)" :message="getMessage('name', props.index)">
                  <b-input v-model="props.row.name" type="text" placeholder="Name"></b-input>
                </b-field>
              </b-table-column>

              <b-table-column field="lastname" label="Last Name" sortable centered>
                <b-field :type="getType($v.members.$each[props.index].lastname.$invalid)" :message="getMessage('lastname', props.index)">
                  <b-input v-model="props.row.lastname" type="text" placeholder="Last Name"></b-input>
                </b-field>
              </b-table-column>

              <b-table-column field="subscription" label="Subscription" sortable centered>
                <b-field :type="getType($v.members.$each[props.index].subscription.$invalid)" :message="getMessage('subscription', props.index)">
                  <b-select v-model="props.row.subscription" class="has-text-centered" placeholder="Subscription">
                    <option v-for="subscription in subscriptions" :value="subscription">{{ subscription.label }}</option>
                  </b-select>
                </b-field>
              </b-table-column>

              <b-table-column field="role" label="Role" sortable centered>
                <b-field :type="getType($v.members.$each[props.index].role.$invalid)" :message="getMessage('role', props.index)">
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
          <button class="button is-info is-outlined" :title="$v.$invalid ? 'Check your inputs' : ''" :disabled="$v.$invalid" @click="createMembers">Create members</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { required, requiredIf, minLength, email, maxLength } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        error: null,
        loading: null,
        ready: null,
        creationDone: null,
        roles: null,
        subscriptions: null,
        members: []
      }
    },
    validations: {
      members: {
        requiredIf: requiredIf('ready'),
        $each: {
          'email': {
            required,
            email
          },
          name: {
            required,
            maxLength: maxLength(45),
            minLength: minLength(2)
          },
          lastname: {
            required,
            maxLength: maxLength(45),
            minLength: minLength(2)
          },
          subscription: {
            required
          },
          role: {
            required
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        user: 'user'
      })
    },
    created () {
      this.loading = true
      this.fetchRoles()
        .then(this.fetchSubscriptions)
        .then(() => {
          this.addMember()
          this.loading = false
          this.ready = true
        })
        .catch(e => {
          if (e.hasOwnProperty('response')) this.error = e.response.statusText
          else this.error = 'Error while loading this page.'
          this.loading = false
        })
    },
    methods: {
      /**
       * This function take a field name and it's index inside the members array
       * It look into validation to see if some fields are valid or not
       * If some fields are invalid then it will return an appropriate message
       * @param fieldName The key of the field
       * @param index The position in the members array
       * @returns {string}
       */
      getMessage (fieldName, index) {
        if (!this.$v.members.$invalid) return '' // If it's valid there is no need for a message

        const validationStatus = this.$v.members.$each[index][fieldName]
        const validations = Object.keys(validationStatus)
        let message = ''

        for (let i = 0; i < validations.length; i++) {
          let validation = validations[i]
          if (!validationStatus[validation] && validation.charAt(0) !== '$') {
            switch (validation) {
              case 'required':
                message = 'This field is required.'
                break
              case 'email':
                message = 'This is not a correct email.'
                break
              case 'maxLength':
                message = 'This field cannot have more than ' + validationStatus.$params.maxLength.max + ' characters.'
                break
              case 'minLength':
                message = 'This field cannot have less than ' + validationStatus.$params.minLength.min + ' characters.'
                break
            }
            if (message.length > 0) return message
          }
        }

        return message
      },
      getType (fieldIsInvalid) {
        return fieldIsInvalid ? 'is-danger' : ''
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
