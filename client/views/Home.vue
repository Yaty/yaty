<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div class="content has-text-centered">
    <p>
      <img width="200" src="~assets/logo.svg" :alt="projectdescription">
    </p>

    <h1 class="is-title is-bold">{{ name.replace('-', ' ') }}</h1>

    <p>
      <strong>{{ description }}</strong>
    </p>

    <p>
      TMP :
      <strong>2 {{ user }}</strong>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  data () {
    return this.$store.state.pkg
  },

  computed: mapGetters({
    user: 'user'
  })

}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
