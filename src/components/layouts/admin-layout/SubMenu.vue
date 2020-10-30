<template>
  <a-sub-menu v-if="!menuInfo.meta.hidden" :key="menuInfo.key">
    <span slot="title">
      <a-icon v-if="menuInfo.meta.icon" :type="menuInfo.meta.icon" />
      <span v-if="menuInfo.meta.name">{{ menuInfo.meta.name }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.key">
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <router-link v-if="item.meta.name" :to="item.path">
          {{ item.meta.name }}
        </router-link>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  name: 'SubMenu',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
