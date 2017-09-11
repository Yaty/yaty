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
  <transition
    @beforeEnter="beforeEnter"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    @afterLeave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
  export default {
    methods: {
      beforeEnter (el) {
        el.classList.remove('collapse')
        el.style.display = 'block'
        el.classList.add('collapsing')
        el.style.height = `${el.scrollHeight}px`
      },
      afterEnter (el) {
        el.classList.remove('collapsing')
        el.classList.add('collapse', 'in')
      },
      beforeLeave (el) {
        el.classList.add('collapsing')
        el.classList.remove('collapse', 'in')
        el.style.height = 0
      },
      afterLeave (el) {
        el.classList.remove('collapsing')
        el.classList.add('collapse')
        el.style.display = 'none'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .collapse {
    display: none;
    &.in {
      display: block;
    }
  }
  .collapsing {
    position: relative;
    height: 0;
    overflow: hidden;
    transition: height .377s ease;
  }
</style>
