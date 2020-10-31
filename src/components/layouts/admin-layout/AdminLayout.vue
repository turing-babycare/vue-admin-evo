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
      // const menu = allRoute.concat(showRouter);
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
      const menuData = [];
      menuArr.forEach(item => {
        if (item.children?.length && !!item.meta.hidden) {
          const childrenRoute = item.children;
          console.log('childrenRoute', childrenRoute);
          childrenRoute.forEach(iitem => {
            if (!iitem.meta.hidden) {
              menuData.push(iitem);
            }
            if (iitem && iitem.children) {
              this.setMenu(iitem.children);
            }
          });
        } else {
          menuData.push(item);
        }
      });
      return menuData;
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
