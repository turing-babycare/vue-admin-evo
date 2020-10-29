<template>
  <div class="menu"></div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Provide } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
export default class Menu extends Vue {
  @Provide() list: Array<RouteConfig> = [];
  created() {
    if (this.$router.options.routes) {
      this.list = this.$router.options.routes;
    }
  }
}
// export default Vue.extend({
//   data() {
//     return {
//       list: []
//     };
//   },
//   created() {
//     // this.list = this.$router.options.routes.map(route => {
//     //   return {
//     //     name: route.name,
//     //     cname: route.meta.name,
//     //     icon: route.meta.icon,
//     //   };
//     // });
//   }
// });
</script>
