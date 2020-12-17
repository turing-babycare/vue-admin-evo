<template>
  <transition name="slide-fade">
    <div v-if="showMenu && showMenu.length">
      <a-layout-sider
        theme="light"
        width="256px"
        style="background: #fff;padding-top:29px;"
        :class="['side-menu', 'beauty-scroll', 'shadow']"
        :collapsible="collapsible"
        v-model="collapsed"
        :trigger="null"
      >
        <div v-if="!collapsed && appName" class="app_name_box">
          {{ appName }}
        </div>
        <a-divider v-if="!collapsed && appName" />
        <a-menu
          :default-selected-keys="defaultSelectedKeys"
          :default-open-keys="defaultOpenKeys"
          mode="inline"
          :selectedKeys="selectedKeys"
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
              <i
                v-if="item.meta.iconfont"
                :class="item.meta.iconfont"
                style="margin-right: 10px"
              />
              <span v-if="item.meta.name"> {{ item.meta.name }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.path" :menu-info="item" />
          </template>
        </a-menu>
      </a-layout-sider>
    </div>
  </transition>
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
      selectedKeys: [],
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
    },
    $route: {
      handler(val) {
        if (val && val.meta && val.meta.activeMenu) {
          this.selectedKeys = [val.meta.activeMenu];
        } else {
          this.selectedKeys = [val.path];
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
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
// content
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
    padding: 0px 0 0px 20px;
    line-height: 29px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    transition: all 0.4s;
  }
}
</style>
