<template>
  <div class="bread_wrap" v-if="breadArr && breadArr.length">
    <a-breadcrumb>
      <a-breadcrumb-item :key="index" v-for="(item, index) in breadArr">
        <router-link
          v-if="index !== breadArr.length - 1"
          :to="item.path || '/'"
        >
          <span> {{ item.meta.name }}</span>
        </router-link>
        <!-- 面包屑最后一级禁止点击 -->
        <span v-else> {{ item.meta.name }}</span>
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
