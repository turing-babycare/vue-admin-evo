<template>
  <div class="index_text">
    欢迎来到
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.index_text {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1890ff;
  font-weight: 700;
  font-size: 150px;
  text-align: center;
}
</style>
