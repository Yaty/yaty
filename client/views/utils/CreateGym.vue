<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div>
    For now the gym creation is not automatic.<br>
    If you want to use YatyAdmin and add ur gym pease contact this address : <a href="mailto:contact@hdaroit.fr">contact@hdaroit.fr</a>.<br>
    <a class="button is-primary" @click="goBack">Go back</a>
  </div>
</template>

<script>
  export default {
    methods: {
      goBack () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped></style>
