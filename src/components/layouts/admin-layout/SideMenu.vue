<template>
  <div>
    <a-layout-sider
      theme="light"
      style="background: #fff"
      :class="['side-menu', 'beauty-scroll', 'shadow']"
      :collapsible="collapsible"
      v-model="collapsed"
      :trigger="null"
    >
      <div v-if="!collapsed" class="current_project">
        {{ appName }}
      </div>
      <a-divider />
      <a-menu
        :default-selected-keys="defaultSelectedKeys"
        :default-open-keys="defaultOpenKeys"
        mode="inline"
        theme="light"
        :inline-collapsed="collapsed"
      >
        <template v-for="item in menuData">
          <a-menu-item v-if="!item.children" :key="item.path">
            <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
            <span v-if="item.meta.name" @click="toMenu(item)">
              {{ item.meta.name }}</span
            >
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import SubMenu from './SubMenu';
export default {
  name: 'SideMenu',
  components: {
    'sub-menu': SubMenu
  },
  props: {
    menuData: {
      type: Array,
      default: () => []
    },
    appName: {
      type: String,
      default: '咨询服务'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      defaultOpenKeys: [],
      defaultSelectedKeys: []
    };
  },
  methods: {
    toMenu(item) {
      console.log('item==', item);
      if (item.path) {
        this.$router.push({ path: item.path });
      }
    }
  }
};
</script>
<style lang="scss">
.shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
::v-deep.side-menu {
  overflow-y: auto;
  max-width: 256px !important;
  min-height: calc(100vh - 64px);
  height: 100%;
  z-index: 10;
  .ant-layout-sider-children {
    //
  }
}
</style>
