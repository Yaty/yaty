<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div>
    {{ undefinedPage }} doesn't exists.
  </div>
</template>

<script>
  export default {
    computed: {
      undefinedPage () {
        const redirect = this.$auth.redirect()
        if (redirect) return redirect.from.name
        return 'The page you are looking for'
      }
    }
  }
</script>

<style scoped></style>
