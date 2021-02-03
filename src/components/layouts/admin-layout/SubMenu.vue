<template functional>
  <a-sub-menu
    v-if="!props.menuInfo.meta.hidden"
    :key="
      props.menuInfo.redirect ? props.menuInfo.redirect : props.menuInfo.path
    "
  >
    <span slot="title">
      <router-link :to="props.menuInfo.path">
        <a-icon
          v-if="props.menuInfo.meta.icon"
          :type="props.menuInfo.meta.icon"
        />
        <i
          v-if="props.menuInfo.meta.iconfont"
          style="margin-right: 10px"
          :class="props.menuInfo.meta.iconfont"
        />
        <span v-if="props.menuInfo.meta.name">{{
          props.menuInfo.meta.name
        }}</span>
      </router-link>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children && !item.meta.hidden"
        :key="item.redirect ? item.redirect : item.path"
      >
        <a-icon
          v-if="item.meta.icon || item.meta.iconClass"
          :type="item.meta.icon"
        />
        <i
          v-if="item.meta.iconfont"
          style="margin-right: 10px"
          :class="item.meta.iconfont"
        />
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
  }
  // methods: {
  //   toPath(item) {
  //     if (item.children?.length) {
  //       this.$router.push({ path: item.children[0].path });
  //     } else {
  //       this.$router.push({ path: item.path });
  //     }
  //   }
  // }
};
</script>
