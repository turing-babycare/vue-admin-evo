<template>
  <div id="app">
    <!-- <router-view /> -->
    <router-link to="/">AAAA</router-link>
    <router-link to="/child/b">BBBB</router-link>
    <router-link to="/child/c">CCCC</router-link>
    <admin-layout></admin-layout>
  </div>
</template>
<script>
// import { Layout } from 'vue-admin-evo';
export default {
  // components: { Layout }
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
