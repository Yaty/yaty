<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="box">
    <div class="columns is-multiline">
      <div class="column is-narrow">
        <p class="title">{{ user.selectedGym.name }}</p>
      </div>

      <div class="column has-text-centered">
        <a class="button is-primary">New subscription</a>
        <a class="button is-info">Refresh</a>
      </div>

      <div class="column is-full">
        <b-table
          :data="subscriptions"
          striped
          narrowed
          :loading="isLoading"
          mobile-cards
          paginated
          per-page="20"
          detailed
        >
          <template scope="props">
            <b-table-column field="label" label="Label" sortable centered>
              {{ props.row.label }}
            </b-table-column>

            <b-table-column field="description" label="Description" sortable centered>
              {{ props.row.description }}
            </b-table-column>

            <b-table-column field="Duration" label="Duration" sortable centered>
              {{ props.row.duration_in_days }}
            </b-table-column>
          </template>

          <template slot="detail" scope="props">
            <div class="content">
              <p>
                <strong>{{ props.row.label }}</strong>
                <br>
                Actions ici
              </p>
            </div>
          </template>

          <div slot="empty" class="has-text-centered">
            There is currently no subscriptions to display.
          </div>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        subscriptions: [],
        isLoading: null
      }
    },
    computed: mapGetters({
      user: 'user'
    }),
    mounted () {
      this.isLoading = true
      this.axios.get(process.env.BACKEND + 'gyms/subscriptions', {
        params: {
          gym: this.user.selectedGym.id
        }
      })
      .then(res => {
        this.subscriptions = res.data.subscriptions
        this.isLoading = false
      })
      .catch(e => {
        this.isLoading = false
        console.log(e)
      })
    }
  }
</script>

<style scoped></style>
