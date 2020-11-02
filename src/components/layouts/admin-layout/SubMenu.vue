<template>
  <a-sub-menu
    v-if="!menuInfo.meta.hidden"
    :key="item.redirect ? item.redirect : item.path"
  >
    <span slot="title" @click="toPath">
      <a-icon v-if="menuInfo.meta.icon" :type="menuInfo.meta.icon" />
      <span v-if="menuInfo.meta.name">{{ menuInfo.meta.name }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item
        v-if="!item.children && !item.meta.hidden"
        :key="item.redirect ? item.redirect : item.path"
      >
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <router-link v-if="item.meta.name" :to="item.path">
          {{ item.meta.name }}
        </router-link>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.redirect ? item.redirect : item.path"
        :menu-info="item"
      />
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
  },
  methods: {
    toPath(item) {
      if (item.children?.length) {
        this.$router.push({ path: item.children[0].path });
      } else {
        this.$router.push({ path: item.path });
      }
    }
  }
};
</script>
