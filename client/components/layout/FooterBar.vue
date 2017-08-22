<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <footer id="footer" :style="[hiddenSidebarStyle]">
    <div class="container">
      <div class="content has-text-centered">
        <p class="social">
          <a :href="'mailto:' + author.email">
            <span class="icon">
              <i class="fa fa-envelope"></i>
            </span>
          </a>
          <a href="#">
            <span class="icon">
              <i class="fa fa-facebook"></i>
            </span>
          </a>
          <a href="#">
            <span class="icon">
              <i class="fa fa-twitter"></i>
            </span>
          </a>
        </p>
        <p>Copyright {{ new Date().getFullYear() }} © <a href="http://hdaroit.fr" title="contact@hdaroit.fr">Hugo Da Roit</a> - All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  data () {
    return this.$store.state.pkg
  },

  computed: {
    ...mapGetters({
      sidebar: 'sidebar',
      user: 'user'
    }),
    hiddenSidebarStyle () {
      if (!this.user.logged) return { 'margin-left': 0 }
      if (this.sidebar.hidden) return { 'margin-left': 0 }
      return null
    }
  }

}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables.sass';
@import '~bulma/sass/utilities/mixins';

#footer {
  margin-left: 180px;
  padding-top: 20px;
  padding-bottom: 20px;

  @include mobile() {
    margin-left: 0;
  }

  .social a {
    border-bottom: none !important;
  }
}
</style>
