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
