<template>
  <a-layout-header class="admin-header">
    <div :class="['admin-header-wide', 'fixed']">
      <div :class="['logo', theme]">
        <router-link to="/">
          <img :src="logoSrc" />
        </router-link>
      </div>
      <a-icon
        v-if="layout !== 'head' && showHeaderIcon"
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggleCollapse"
      />
      <!-- 顶部导航-项目模块 -->
      <div class="admin-header-menu">
        <ProjectMenu class="head-menu" :options="projectData" />
      </div>
      <div :class="['admin-header-right', headerTheme]">
        <header-avatar
          :personalCenterShow="personalCenterShow"
          :settingShow="settingShow"
          :user="user"
          class="header-item"
        />
      </div>
    </div>
  </a-layout-header>
</template>
<script>
import HeaderAvatar from './HeaderAvatar';
import ProjectMenu from '../ProjectMenu';
export default {
  name: 'AdminHeader',
  components: { HeaderAvatar, ProjectMenu },
  props: {
    personalCenterShow: {
      type: Boolean,
      default: false
    },
    settingShow: {
      type: Boolean,
      default: false
    },
    showHeaderIcon: {
      type: Boolean,
      default: true
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    systemName: {
      type: String,
      default: '家庭健康服务平台'
    }
  },
  data() {
    return {
      layout: 'side',
      logoSrc:
        'https://pic1.baobaohehu.com/fhs/admin/420201120182735411/1605868056474.png',
      headerTheme: 'light'
    };
  },
  computed: {
    user() {
      return this.$store.state.evo.userInfo;
    },
    projectData() {
      return this.user.authInfo || [];
    }
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse');
    }
  }
};
</script>
<style lang="scss" scope>
.admin-header {
  position: relative;
  padding: 0;
  background: #fff;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  .admin-header-wide {
    padding-left: 24px;
    &.head.fixed {
      margin: auto;
      padding-left: 0;
      max-width: 1400px;
    }
    &.side {
      padding-right: 12px;
    }
    .logo {
      display: inline-block;
      padding: 0 12px 0 24px;
      height: 64px;
      line-height: 58px;
      font-size: 20px;
      color: inherit;
      vertical-align: top;
      cursor: pointer;
      &.pc {
        padding: 0 12px 0 0;
      }
      img {
        width: 169px;
        vertical-align: middle;
      }
      h1 {
        display: inline-block;
        font-size: 16px;
        color: inherit;
      }
    }
    .trigger {
      padding: 0 24px;
      line-height: 64px;
      font-size: 20px;
      transition: color 0.3s;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
    .admin-header-menu {
      display: inline-block;
      .head-menu {
        max-height: 65px;
        line-height: 65px;
        box-shadow: none;
        vertical-align: middle;
        .ant-menu-horizontal {
          line-height: 62px;
        }
      }
    }
    .admin-header-right {
      display: flex;
      float: right;
      color: inherit;
      .header-item {
        padding: 0 12px;
        color: inherit;
        cursor: pointer;
        align-self: center;
        a {
          color: inherit;
          i {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
