<template>
  <template v-for="item in data" :key="item.key">
        <template v-if="item.children && item.children.length > 0">
            <a-sub-menu :key="item.key">
                <template #title>
                    <router-link :to="item.path" >
                        <WindowsOutlined v-if="item.icon === 'WindowsOutlined'" />
                        <span>{{item.title}}</span>
                    </router-link>
                </template>
                <sider-item :data="item.children"/>
            </a-sub-menu>
        </template>
        <a-menu-item v-else :key="item.key">
            <router-link :to="item.path">
                <MailOutlined />
                <span>{{item.title}}</span>
            </router-link>
        </a-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SiderItem',
  props: {
      data: Array
  },
})
</script>
