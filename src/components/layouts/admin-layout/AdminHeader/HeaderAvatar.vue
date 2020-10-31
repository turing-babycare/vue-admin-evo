<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar
        class="avatar"
        size="small"
        :icon="!user || !user.avatar ? 'user' : ''"
        shape="circle"
        :src="user && user.avatar ? user.avatar : ''"
      />
      <span class="name" style="margin-left:14px;margin-right:10px;">
        {{ user.name || '未知' }}
      </span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logoutHandle">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import client from '../../../../utils/client';
import { removeToken } from '../../../../utils/auth';
import { getOptions } from '../../../../utils/options';
export default {
  name: 'HeaderAvatar',
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          avatar: '',
          name: ''
        };
      }
    }
  },
  methods: {
    logoutHandle() {
      console.log('logout .......');
      client.get(getOptions.logoutURL, {}).then(() => {
        removeToken();
      });
    }
  }
};
</script>

<style lang="scss">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
