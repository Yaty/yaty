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
        <b-table
          :data="members"
          striped
          narrowed
          :loading="isLoading"
          mobile-cards
          paginated
          per-page="15"
          detailed
        >
          <template scope="props">
            <b-table-column field="email" label="E-mail" sortable>
              {{ props.row.email }}
            </b-table-column>

            <b-table-column field="name" label="First Name" sortable>
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="lastname" label="Last Name" sortable>
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
        isLoading: null
      }
    },
    filters: {
      ISOToHumanDate: filters.ISOToHumanDate
    },
    computed: mapGetters({
      user: 'user'
    }),
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
  .table th, td {
    text-align: center;
  }
</style>
