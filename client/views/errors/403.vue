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
