<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar
        class="avatar"
        size="large"
        :icon="!user || !user.avatar ? 'user' : ''"
        shape="circle"
        :src="user && user.avatar ? user.avatar : ''"
      />
      <span class="name" style="margin-left:10px;margin-right:10px;">
        {{ user.name || '未知' }}
      </span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item v-if="personalCenterShow">
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item v-if="settingShow">
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
import client from '@/utils/client';
import { removeToken } from '@/utils/auth';
import { get } from '@/utils/options';
export default {
  name: 'HeaderAvatar',
  props: {
    personalCenterShow: {
      type: Boolean,
      default: false
    },
    settingShow: {
      type: Boolean,
      default: false
    },
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
      const logoutURL = get('options').logoutURL;
      client.post(logoutURL).then(() => {
        removeToken();
        location.reload();
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
