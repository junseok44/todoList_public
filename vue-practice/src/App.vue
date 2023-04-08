<script>
import ChildComp from './components/ChildComp.vue'
export default {
  components: {
    ChildComp
  }
}
</script>

<template>
  <ChildComp>
    <template #header>header</template>
    <template #footer>footer</template>
  </ChildComp>
</template>
