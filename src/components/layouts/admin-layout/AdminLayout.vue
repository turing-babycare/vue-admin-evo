<template>
  <a-layout class="layout" :class="['admin-layout', 'beauty-scroll']">
    <AdminHeader
      :class="[
        {
          'fixed-tabs': fixedTabs,
          'fixed-header': fixedHeader,
          'multi-page': multiPage
        }
      ]"
      :style="headerStyle"
      :user="userInfo"
      :collapsed="collapsed"
      @toggleCollapse="toggleCollapse"
    />
    <a-layout>
      <SideMenu
        class="fixed-side"
        :menuData="menuData"
        :collapsed="collapsed"
        :collapsible="true"
        :appName="appName"
      ></SideMenu>
      <a-layout class="admin-layout-wrap beauty-scroll">
        <a-layout-content class="content">
          <BreadCrumb :breadcrumb="breadcrumb"></BreadCrumb>
          <div class="admin-layout-content">
            <router-view></router-view>
            <p v-show="false" class="build_id">{{ buildId }}</p>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import SideMenu from './SideMenu';
import BreadCrumb from '@/components/BreadCrumb';
import AdminHeader from './AdminHeader';
export default {
  props: {
    appName: {
      type: String,
      require,
      default: ''
    }
  },
  name: 'AdminLayout',
  components: {
    SideMenu,
    AdminHeader,
    BreadCrumb
  },
  data() {
    return {
      collapsed: false,
      showMenu: [],
      list: []
    };
  },
  computed: {
    buildId() {
      return process.env.VUE_APP_BUILD_ID;
    },
    userInfo() {
      return this.$store.state.evo.userInfo;
    },
    menuData() {
      // 只隐藏当前路由
      const allRoute = this.$router.options.routes || [];
      const showRouter = this.setMenu(allRoute);
      return showRouter;
    },
    breadcrumb() {
      const meta = this.$route.meta;
      const breadcrumb = meta && meta.breadcrumb;
      if (breadcrumb?.length) {
        return breadcrumb;
      } else {
        return this.$route.matched;
      }
    }
  },
  methods: {
    setMenu(menuArr) {
      menuArr.forEach(item => {
        const meta = item.meta;
        // 若当前项，meta.hidden不为true
        if (meta && !meta.hidden) {
          this.showMenu.push(item);
        } else if (meta && meta.hidden && item.children?.length) {
          // 若当前项 meta.hidden:true ,且存在children项
          // this.showMenu.push(item);
          const unhide = item.children.find(iitem => {
            if (iitem.meta && !iitem.meta.hidden) {
              // push children中meta.hidden不为true的那一项
              this.showMenu.push(iitem);
            } else {
              // 返回子项中meta.hidden为true的项，去递归判断子项
              return iitem;
            }
          });
          if (unhide && unhide.children?.length) {
            this.setMenu(unhide.children);
          }
        }
      });
      console.log('menuData==', this.showMenu);
      return this.showMenu;
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style lang="scss">
.admin-layout-wrap {
  padding: 16px;
  .admin-layout-content {
    margin-top: 16px;
  }
}
.build_id {
  position: fixed;
  right: 10px;
  bottom: 2px;
}
</style>
