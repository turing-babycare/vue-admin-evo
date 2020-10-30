<template>
  <page-toggle-transition :disabled="true">
    <!-- :animate="animate.name"
    :direction="animate.direction" -->
    <router-view />
  </page-toggle-transition>
</template>

<script>
import PageToggleTransition from '@/components/transition/PageToggleTransition';

export default {
  name: 'BlankLayout',
  components: { PageToggleTransition }
};
</script>

<style scoped></style>
