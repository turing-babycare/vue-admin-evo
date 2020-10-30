<template>
  <div>
    <a-menu
      mode="horizontal"
      v-model="actived"
      @click="handleClick"
      style="box-shadow:none;"
    >
      <a-menu-item :key="item.key" v-for="item in options">
        <a :href="item.url" target="_blank">{{ item.text }}</a>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      actived: []
    };
  },
  computed: {},
  watch: {},
  // WATC
  methods: {
    handleClick(val) {
      console.log(val);
    }
  }
};
</script>
