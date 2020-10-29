<template>
  <div class="container">
    page-a
  </div>
</template>
<script>
import { client } from 'vue-admin-evo';
export default {
  created() {
    client.get('/adsf');
  }
};
</script>
