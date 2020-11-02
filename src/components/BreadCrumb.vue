<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item :key="index" v-for="(item, index) in breadcrumb">
        <span v-if="item.meta && !item.meta.breadHidden">
          <router-link v-if="item.meta.name" :to="item.path || '/'">
            <span> {{ item.meta.name }}</span>
          </router-link>
        </span>
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
  }
};
</script>
