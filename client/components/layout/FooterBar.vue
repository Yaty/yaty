<!--
Yaty - Climbing Gym Management
Copyright (C) 2017 - Hugo Da Roit <contact@hdaroit.fr>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
