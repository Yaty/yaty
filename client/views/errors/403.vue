<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <div>
    You can't access {{ redirection }}. If you think it's an error please <a href="mailto:contact@hdaroit.fr">contact us</a>.
  </div>
</template>

<script>
  export default {
    computed: {
      redirection () {
        const redirect = this.$auth.redirect()
        if (redirect) return redirect.from.name
        return 'this page'
      }
    }
  }
</script>

<style scoped></style>
