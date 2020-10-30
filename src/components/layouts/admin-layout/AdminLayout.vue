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
      :user="user"
      :collapsed="collapsed"
      @toggleCollapse="toggleCollapse"
    />
    <a-layout>
      <SideMenu
        class="fixed-side"
        :menuData="menuData"
        :collapsed="collapsed"
        :collapsible="true"
      ></SideMenu>
      <a-layout class="admin-layout-wrap beauty-scroll">
        <a-layout-content class="content">
          <BreadCrumb :breadcrumb="breadcrumb"></BreadCrumb>
          <div class="admin-layout-content">
            <router-view></router-view>
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
    user() {
      return (
        this.$store.state.account.user || {
          name: 'wyf',
          avatar:
            'https://static-legacy.dingtalk.com/media/lADPAuoR6HXIEnXNA3LNA3I_882_882.jpg'
        }
      );
    },
    menuData() {
      return this.$router.options.routes || [];
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
  created() {
    console.log('this menuData', this.$router, this.$router.options.routes);
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: '#fff';
  padding: '24px';
  margin: 0;
  min-height: '480px';
  height: calc(100vh - 64px);
}
.admin-layout-wrap {
  padding: 16px;
  .admin-layout-content {
    margin-top: 16px;
  }
}
</style>
