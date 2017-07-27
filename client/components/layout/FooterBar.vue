<!--
Copyright (C) Hugo Da Roit <contact@hdaroit.fr> - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Hugo Da Roit <contact@hdaroit.fr>, 2017
Based on Vue-admin from Fangdun Cai <cfddream@gmail.com>
-->

<template>
  <footer class="footer">
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
        <p>Based on Vue-admin by <a href="https://github.com/fundon">fundon</a>.</p>
        <p>Copyright {{ new Date().getFullYear() }} © <a href="http://hdaroit.fr" title="contact@hdaroit.fr">Hugo Da Roit</a> - All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

  data () {
    return this.$store.state.pkg
  }

}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/mixins';

.footer {
  margin-left: 180px;

  @include mobile() {
    margin-left: 0;
  }

  .social a {
    border-bottom: none !important;
  }

  .fa.fa-heart {
    color: red;
  }
}
</style>
