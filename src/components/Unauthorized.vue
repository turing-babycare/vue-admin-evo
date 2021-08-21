<template>
  <div class="auth_layout">
    <img
      class="img"
      src="https://pic1.baobaohehu.com/fhs/admin/52920210819145849164/1629356329139.png"
    />
    <div class="text">
      你没有访问当前页面的权限，若有访问需要，请联系人事开通权限
    </div>
    <div class="index" @click="goIndex">返回首页</div>
  </div>
</template>

<script>
export default {
  name: 'Unauthorized',
  methods: {
    goIndex() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.auth_layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: #fff;

  .img {
    width: 320px;
    object-fit: contain;
  }

  .text {
    color: #333;
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    margin: 30px 0;
  }

  .index {
    color: #1890ff;
    font-size: 24px;
    text-decoration: underline;
  }
}
</style>
