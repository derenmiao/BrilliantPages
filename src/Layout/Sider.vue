<template>
  <a-menu
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
    <sider-item :data="route" />
  </a-menu>
</template>

<script lang="ts">
import routes from '../router/detail'
import { ref, defineComponent, reactive } from 'vue'
import SiderItem from './SiderItem.vue'
export default defineComponent({
  name: 'Sider',
  components:{
      'sider-item': SiderItem
  },
  setup: () => {
    const route = [] as any
    routes.forEach(e => !e.hident ? route.push(e) : '')
    return{ route }
  }
})
</script>
