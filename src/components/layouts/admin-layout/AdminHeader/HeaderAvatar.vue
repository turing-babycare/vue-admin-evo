<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar
        class="avatar"
        v-if="user.avatar"
        size="small"
        shape="circle"
        :src="user.avatar"
      />
      <span class="name" v-if="user.name">{{ user.name }}</span>
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
