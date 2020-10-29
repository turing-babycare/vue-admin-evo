<template>
  <a-layout class="layout">
    <a-layout-header class="header"></a-layout-header>
    <a-layout>
      <a-layout-sider class="sider"></a-layout-sider>
      <a-layout>
        <a-layout-content class="content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
// import Vue from 'vue';
// import Component from 'vue-class-component';
// @Component({
//   name: 'AdminLayout'
// })
// export default class AdminLayout extends Vue {}
export default {
  name: 'AdminLayout'
};
</script>

<style lang="scss" scoped></style>
