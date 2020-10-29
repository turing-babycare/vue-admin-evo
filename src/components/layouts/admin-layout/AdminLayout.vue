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
export default {
  data() {
    return {
      list: []
    };
  }
};
</script>

<style lang="scss" scoped></style>
