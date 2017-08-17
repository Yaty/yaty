<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child box">
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
          per-page="15"
          detailed
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

            <b-table-column field="lastLogin" label="Last connection" sortable centered>
              <span class="tag is-success">
                  {{ props.row.lastLogin ? new Date(props.row.lastLogin).toLocaleDateString() : 'Never' }}
              </span>
            </b-table-column>
          </template>

          <template slot="detail" scope="props">
            <div class="content">
              <p>
                <strong>{{ props.row.name }} {{ props.row.lastname }}</strong>
                <br>
                Actions ici
              </p>
            </div>
          </template>

          <div slot="empty" class="has-text-centered">
            There is currently no members to display.
          </div>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import filters from '../../../filters'

  export default {
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
              if (memberToString(member) === memberPropQuery) addMember(member)
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
      }
    },
    mounted () {
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
