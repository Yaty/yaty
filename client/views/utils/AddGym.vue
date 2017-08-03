<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="column is-three-quarters nav-center">
    <collapse>
      <collapse-item title="Create your gym">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
      </collapse-item>
      <collapse-item title="Join a gym" selected>
        <div class="tile is-ancestor is-parent">
          <div class="tile is-child">
            <select v-on:change="selectGym" style="width: 95%">
              <option v-for="gym in gyms" :value="gym">{{ gym }}</option>
            </select>
          </div>
          <div class="tile is-child">
            <button style="width: 95%" class="button is-success" v-on:click="join">Join !</button>
          </div>
        </div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script>
  // TODO : Lazy load gyms
  import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
  export default {
    components: {
      Collapse,
      CollapseItem
    },
    data () {
      return {
        gyms: ['bla', 'bla2']
      }
    },
    methods: {
      selectGym () {
      },
      join () {
      }
    }
  }
</script>

<style scoped>
  select {
    height: 100%;
    text-align-last: center;
    text-align:center;
    width: 25%;
  }
</style>
