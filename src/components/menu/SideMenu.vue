<template>
  <a-layout-sider
    :theme="sideTheme"
    style="background: #fff"
    :class="['side-menu', 'beauty-scroll', 'shadow']"
    width="256px"
    :style="sideStyle"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <div v-if="!collapsed" class="current_project">
      {{ appName }}
    </div>
    <a-divider />
    <i-menu
      :theme="theme"
      :collapsed="collapsed"
      :options="menuData"
      @select="onSelect"
      class="menu"
    />
  </a-layout-sider>
</template>
<script>
import IMenu from './menu';
export default {
  name: 'SideMenu',
  components: { IMenu },
  props: {
    appName: {
      type: String,
      default: '咨询服务'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'light'
    }
  },
  data() {
    return {
      sideStyle: ''
    };
  },
  computed: {
    sideTheme() {
      return this.theme == 'light' ? this.theme : 'dark';
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj);
    }
  }
};
</script>

<style lang="scss">
@import 'index';
</style>
