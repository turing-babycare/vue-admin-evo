<template>
  <div v-if="showMenu && showMenu.length">
    <a-layout-sider
      theme="light"
      width="256px"
      style="background: #fff"
      :class="['side-menu', 'beauty-scroll', 'shadow']"
      :collapsible="collapsible"
      v-model="collapsed"
      :trigger="null"
    >
      <div v-if="!collapsed" class="app_name_box">
        {{ appName }}
      </div>
      <a-divider v-if="appName" />
      <a-menu
        :default-selected-keys="defaultSelectedKeys"
        :default-open-keys="defaultOpenKeys"
        mode="inline"
        theme="light"
        :inline-collapsed="collapsed"
      >
        <template v-for="item in showMenu">
          <a-menu-item
            v-if="!item.children || item.children.length === 0"
            :key="item.redirect ? item.redirect : item.path"
            @click="toMenu(item)"
          >
            <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
            <span v-if="item.meta.name"> {{ item.meta.name }}</span>
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
      showMenu: [],
      defaultOpenKeys: [],
      defaultSelectedKeys: []
    };
  },
  watch: {
    menuData: {
      handler(val) {
        if (val) {
          this.ifChildAllHidden();
        }
      },
      immediate: true
    }
  },
  created() {
    this.setDefaultKey();
  },
  methods: {
    ifChildAllHidden() {
      this.showMenu = this.menuData.concat([]);
      this.showMenu.forEach(item => {
        // 判断改父节点下是否所有子项都为hidden
        let childrenShow = [];
        if (item.children?.length) {
          childrenShow = item.children.filter(function(o) {
            return !o.meta.hidden;
          });
        }
        if (childrenShow.length === 0) {
          item.children = [];
        }
      });
      this.showMenu = this.showMenu.filter(function(o) {
        return o.meta && !o.meta.hidden;
      });
      this.$emit('showHeaderIcon', this.showMenu.length ? true : false);
      console.log(222222, this.showMenu);
    },
    setDefaultKey() {
      this.defaultOpenKeys.push(this.$route.path);
      this.defaultSelectedKeys.push(this.$route.path);
    },
    toMenu(item) {
      if (item.path && this.$route.path !== item.path) {
        this.$router.push({ path: item.path });
      }
    }
  }
};
</script>
<style lang="scss">
// content
.admin-layout-wrap {
  padding: 24px 24px 0;
  min-height: calc(100vh - 64px - 10px);
}
.sider {
  height: calc(100vh - 64px);
  background: #fff;
}
.shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.side-menu {
  overflow-y: auto;
  max-width: 256px !important;
  min-height: calc(100vh - 64px);

  .app_name_box {
    padding: 24px 0 0px 20px;
    line-height: 24px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
