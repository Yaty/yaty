<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="box">
    <b-loading :active.sync="isLoading" :canCancel="true"></b-loading>
    <div class="columns is-multiline">
      <div class="column is-narrow">
        <p class="title">{{ user.selectedGym.name }}</p>
      </div>

      <div class="column has-text-centered">
        <a class="button is-primary" @click="addSubscriptionRow">New subscription</a>
      </div>

      <div class="column is-full">
        <b-table
          ref="table"
          :data="subscriptions"
          striped
          narrowed
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
              {{ props.row.duration_in_days ? props.row.duration_in_days + ' days' : '' }}
            </b-table-column>
          </template>

          <template slot="detail" scope="props">
            <div class="columns">
              <div class="column is-one-third">
                <b-field>
                  <b-input v-model="props.row.label" placeholder="Label"></b-input>
                </b-field>
              </div>

              <div class="column is-one-third">
                <b-field>
                  <b-input v-model="props.row.description" placeholder="Description"></b-input>
                </b-field>
              </div>

              <div class="column is-one-third">
                <b-field>
                  <b-input type="number" v-model="props.row.duration_in_days" placeholder="Duration"></b-input>
                </b-field>
              </div>
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
        newSubscription: {
          label: null,
          description: null,
          duration_in_days: null
        },
        isLoading: null
      }
    },
    computed: mapGetters({
      user: 'user'
    }),
    created () {
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
    },
    methods: {
      addSubscriptionRow () {
        this.subscriptions.push({
          label: null,
          description: null,
          duration_in_days: null
        })

        // For now we use the table API from a ref, is there a better way to do this ? It's highly coupled with this
        // Disable every enabled rows detail
        const rows = this.$refs.table.visibleData
        for (let i = 0; i < rows.length - 1; i++) {
          const visible = this.$refs.table.isVisibleDetailRow(rows[i])
          if (visible) this.$refs.table.toggleDetails(rows[i])
        }

        // Enable last row detail
        this.$refs.table.toggleDetails(rows[this.subscriptions.length - 1])
      }
    }
  }
</script>

<style scoped></style>
