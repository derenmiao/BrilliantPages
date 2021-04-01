<template>
  <a-menu
      mode="inline"
      theme="dark"
    >
    <sider-item :data="item" v-for="item in route" :key="item.key"/>
  </a-menu>
</template>

<script lang="ts">
import routes from '@/router/detail.ts'
import { defineComponent } from 'vue'
import SiderItem from './SiderItem.vue'
export default defineComponent({
  name: 'Sider',
  components:{
      'sider-item': SiderItem
  },
  setup: () => {
    const route:any = []
    routes.forEach((e:any) => !e.meta.hident ? route.push(e) : '')
    return{ route }
  }
})
</script>
