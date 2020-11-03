<template>
  <div class="bread_wrap" v-if="breadArr && breadArr.length">
    <a-breadcrumb>
      <a-breadcrumb-item :key="index" v-for="(item, index) in breadArr">
        <router-link :to="item.path || '/'">
          <span> {{ item.meta.name }}</span>
        </router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumb',
  props: {
    breadcrumb: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  computed: {
    breadArr() {
      return this.breadcrumb.filter(item => {
        return item.meta && !item.meta.breadHidden && item.meta.name;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.bread_wrap {
  flex: 0 0 22px;
  margin-bottom: 28px;
}
</style>
