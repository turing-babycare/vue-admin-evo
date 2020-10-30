<template>
  <div class="container">
    page-a
  </div>
</template>
<script>
import { client } from 'vue-admin-evo';
export default {
  created() {
    console.log('22this.$route=', this.$route);
    client.get('/adsf');
  }
};
</script>
