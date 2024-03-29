<template>
  <a-layout class="layout admin-layout">
    <AdminHeader
      :class="[
        {
          'fixed-tabs': fixedTabs,
          'fixed-header': fixedHeader,
          'multi-page': multiPage
        }
      ]"
      :style="headerStyle"
      :collapsed="collapsed"
      :showHeaderIcon="showIcon"
      @toggleCollapse="toggleCollapse"
    />
    <a-layout>
      <SideMenu
        :menuData="menuData"
        :collapsed="collapsed"
        :collapsible="true"
        :appName="appName"
        @showHeaderIcon="showHeaderIcon"
      ></SideMenu>
      <a-layout
        class="admin-layout-wrap beauty-scroll"
        :style="{ 'background-image': `url(${base64})` }"
      >
        <a-layout-content class="content">
          <BreadCrumb :breadcrumb="breadcrumb"></BreadCrumb>
          <div class="admin-layout-content beauty-scroll">
            <Index v-if="isRoot">{{ appName }}</Index>
            <BlankLayout></BlankLayout>
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
import BlankLayout from '../BlankLayout';
import Index from './Index.vue';
import client from '@/utils/client';
import { get } from '@/utils/options';
export default {
  // props: {
  //   appName: {
  //     type: String,
  //     require,
  //     default: ''
  //   }
  // },
  name: 'AdminLayout',
  components: {
    SideMenu,
    BlankLayout,
    AdminHeader,
    BreadCrumb,
    Index
  },
  data() {
    return {
      base64: '',
      headerStyle: 'flex: 0 0 64px;',
      showIcon: true,
      collapsed: false,
      showMenu: [],
      list: []
    };
  },
  computed: {
    appName() {
      return get('options').appName;
    },
    isRoot() {
      return this.$route.path === '/';
    },
    buildId() {
      return process.env.VUE_APP_BUILD_ID;
    },
    userInfo() {
      return this.$store.state.evo.userInfo;
    },
    menuData() {
      // 只隐藏当前路由
      const allRoute = this.$router.options.routes || [];
      const authRoute = this.userInfo.authInfo?.find(
        i => i.name === this.appName
      );
      const showMenu = get('options').showMenu;
      const showRouter = showMenu
        ? allRoute[0].children
        : this.setMenu(
            allRoute[0].children.filter(i =>
              authRoute?.children?.find(item => item.path === i.path)
            )
          );
      return showRouter;
    },
    breadcrumb() {
      const meta = this.$route.meta;
      const breadcrumb = meta && meta.breadcrumb;
      if (breadcrumb?.length) {
        return breadcrumb;
      } else {
        return this.$route.matched.filter((_i, index) => index !== 0);
      }
    }
  },
  methods: {
    showHeaderIcon(val) {
      this.showIcon = val;
    },
    setMenu(menuArr) {
      const menu = [];
      menuArr.forEach(item => {
        const meta = item.meta;
        // 若当前项，meta.hidden不为true
        if (meta && !meta.hidden) {
          menu.push(item);
        } else if (meta && meta.hidden && item.children?.length) {
          // 若当前项 meta.hidden:true ,且存在children项
          // this.showMenu.push(item);
          const unhide = item.children.find(iitem => {
            if (iitem.meta && !iitem.meta.hidden) {
              // push children中meta.hidden不为true的那一项
              menu.push(iitem);
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
      return menu;
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    }
  },
  async mounted() {
    const { base64 } = await client.get('/v2/admin/watermark');
    this.base64 = base64;
    // this.$nextTick(() => {
    //   console.log(this.$refs.content);
    //   window.testContent = this.$refs.content;
    // });
  }
};
</script>

<style lang="scss">
.admin-layout {
  height: 100vh;
}
.admin-layout-wrap {
  display: flex;
  flex-direction: row-reverse;
  padding: 30px 20px;
  background: #f7f7f7;
  .content {
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    .admin-layout-content {
      flex: 1;
      overflow: auto;
      position: relative;
    }
  }
}
.build_id {
  position: fixed;
  right: 10px;
  bottom: 2px;
}
.beauty-scroll {
  // 底色#f9f9f9 ，条是#DDD
  scrollbar-color: #ddd #f9f9f9;
  scrollbar-width: thin;
  -ms-overflow-style: none;
  position: relative;
  &::-webkit-scrollbar {
    width: 3px;
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: #f9f9f9;
    border-radius: 3px;
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  }
}
</style>
