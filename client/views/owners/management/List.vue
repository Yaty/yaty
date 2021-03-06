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
  <div class="box">
    <p class="title">{{ user.selectedGym.name }}</p>
    <div class="columns is-centered">
      <div class="column is-half is-narrow">
        <b-field>
          <b-autocomplete
            v-model="searchValue"
            icon="search"
            placeholder="Search a member"
            max-results="50"
            :loading="searchLoading"
            :data="searchResult"
            field="toString"
            icon-pack="fa"
            @input="searchMember"
          >
          </b-autocomplete>
        </b-field>
      </div>
      <div class="column is-narrow">
          <button class="button is-primary" @click="reset">Reset</button>
      </div>
    </div>

    <b-table
      :data="searchResult.length > 0 ? searchResult : members"
      striped
      narrowed
      :loading="isLoading"
      mobile-cards
      paginated
      per-page="20"
      detailed
      id="membersTable"
    >
      <template scope="props">
        <b-table-column field="email" label="E-mail" sortable centered>
          {{ props.row.email }}
        </b-table-column>

        <b-table-column field="name" label="First Name" sortable centered>
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="lastname" label="Last Name" sortable centered>
          {{ props.row.lastname }}
        </b-table-column>

        <b-table-column field="" label="Subscription" sortable centered>
          {{ props.row.subscription }}
        </b-table-column>

        <b-table-column field="lastLogin" label="Last connection" sortable centered>
          <span :class="'tag ' + getDateColor(props.row.lastLogin)">
              {{ props.row.lastLogin ? new Date(props.row.lastLogin).toLocaleDateString() : 'Never' }}
          </span>
        </b-table-column>
      </template>

      <template slot="detail" scope="props">
        <!-- CHECK THAT THE END DATE OF THE SUBSCRIPTION IS UPDATED -->
        <div class="columns">
          <div v-if="!props.row.lastLogin" class="column is-one-quarter">
            <b-field>
              <b-input v-model="props.email"></b-input>
            </b-field>
          </div>

          <div v-if="!props.row.lastLogin" class="column is-one-quarter">
            <b-field>
              <b-input v-model="props.name"></b-input>
            </b-field>
          </div>

          <div v-if="!props.row.lastLogin" class="column is-one-quarter">
            <b-field>
              <b-input v-model="props.lastname"></b-input>
            </b-field>
          </div>

          <div :class="!props.row.lastLogin ? 'column is-one-quarter' : 'column'">
            <b-field class="has-text-centered is-fullwidth">
              <b-select expanded v-model="props.subscription"></b-select>
            </b-field>
          </div>
        </div>
      </template>

      <div slot="empty" class="has-text-centered">
        There is currently no members to display.
      </div>
    </b-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import filters from '../../../filters'
  import BField from '../../../../node_modules/buefy/src/components/field/Field.vue'
  import BInput from '../../../../node_modules/buefy/src/components/input/Input.vue'

  export default {
    components: {
      BInput,
      BField},
    data () {
      return {
        members: [],
        error: null,
        isLoading: null,
        searchResult: [],
        searchFunction: null,
        searchLoading: null,
        searchValue: ''
      }
    },
    filters: {
      ISOToHumanDate: filters.ISOToHumanDate
    },
    computed: mapGetters({
      user: 'user'
    }),
    methods: {
      searchMember (memberPropQuery) {
        clearTimeout(this.searchFunction)
        if (memberPropQuery) {
          this.searchLoading = true
          this.searchFunction = setTimeout(() => {
            // Add a member in the result array if he is not in here
            const memberToString = (m) => `${m.name} ${m.lastname} [${m.email}]`

            const addMember = (m) => {
              if (!m.email) return
              for (let i = 0; i < this.searchResult.length; i++) {
                if (this.searchResult[i].email === m.email) return // already added
              }

              // If we are here the member is not in the search result, we can add it
              m.toString = memberToString(m) // Will be displayed in the autocomplete form
              this.searchResult.push(m)
            }

            // Cleaning the results
            this.cleanSearchResults()

            // Looking for match in members properties, add it if match
            for (let i = 0; i < this.members.length; i++) {
              let member = this.members[i]
              let memberProps = Object.keys(member)
              // Searching by props
              memberProps.forEach(prop => member[prop] && member[prop].includes(memberPropQuery) ? addMember(member) : '')
              // Searching by `${m.name} ${m.lastname} [${m.email}]`
              if (memberToString(member) === memberPropQuery) {
                addMember(member)
              }
            }

            // In that case we open the details box
            if (this.searchResult.length === 1) {
              let membersTable = document.getElementById('membersTable')
              if (membersTable) {
                let aEls = membersTable.getElementsByTagName('a')
                if (aEls && aEls.length > 0) {
                  let button = aEls[0]
                  if (button) button.click()
                }
              }
            }

            this.searchLoading = false
          }, 500)
        } else {
          this.reset()
        }
      },
      goToMemberPage (member) {
      },
      cleanSearchResults () {
        this.searchLoading = false
        this.searchResult = []
      },
      reset () {
        this.searchValue = ''
        this.cleanSearchResults()
      },
      getDateColor (date) {
        if (date) {
          const d = new Date(date).getTime()
          const now = new Date().getTime()
          const dateDiff = now - d
          if (dateDiff < 2.628e+9) { // 1 month
            return 'is-success'
          } else if (dateDiff < 7.884e+9) { // 3 months
            return 'is-info'
          } else {
            return 'is-warning'
          }
        } else {
          return 'is-danger'
        }
      }
    },
    created () {
      this.isLoading = true
      this.axios.get(process.env.BACKEND + 'gyms/members', {
        params: {
          gym: this.user.selectedGym.id
        }
      })
      .then(res => {
        this.members = res.data.members
        this.isLoading = false
      })
      .catch(e => {
        this.error = e.response.statusText
        this.isLoading = false
      })
    }
  }
</script>

<style scoped>
</style>
