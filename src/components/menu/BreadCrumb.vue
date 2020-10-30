<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <!-- route item -->
      <a-breadcrumb-item :key="index" v-for="(item, index) in breadcrumb">
        <span v-if="item.meta && !item.meta.breadHidden">{{
          item.meta.name
        }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    breadcrumb: {
      type: Array,
      default: () => [],
      required: false
    }
  }
};
</script>
