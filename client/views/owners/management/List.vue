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
        <div class="content is-loading">
          <div v-if="error">Error while fetching members : {{ error }}</div>
          <table class="table is-bordered is-striped is-narrow is-fullwidth" v-if="members && members.length > 0 && !error">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tfoot>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
            </tfoot>
            <tbody>
              <tr v-for="member in members">
                <td>{{ member.email }}</td>
                <td>{{ member.name }}</td>
                <td>{{ member.lastname }}</td>
                <td>{{ member.lastLogin | ISOToHumanDate }}</td>
                <td>Actions here</td>
              </tr>
            </tbody>
          </table>
          <span v-else-if="!error">There is no members in this gym. Add members <router-link to="/members/add">here</router-link>.</span>
        </div>
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
        members: null,
        error: null
      }
    },
    filters: {
      ISOToHumanDate: filters.ISOToHumanDate
    },
    computed: mapGetters({
      user: 'user'
    }),
    mounted () {
      this.axios.get(process.env.BACKEND + 'gyms/members', {
        params: {
          email: this.user.email,
          gym: this.user.selectedGym.id
        }
      })
      .then(res => {
        this.members = res.data.members
      })
      .catch(e => {
        this.error = e.response.statusText
      })
    }
  }
</script>

<style scoped>
  .table th, td {
    text-align: center;
  }
</style>
