<template>
    <template v-if="data.children && data.children.length > 0">
        <a-sub-menu :key="data.key">
            <template #title>
                <span>{{data.title}}</span>
            </template>
            <sider-item :data="item" v-for="item in data.children" :key="item.key" />
        </a-sub-menu>
    </template>   
    <template v-else>
        <router-link :to="data.path" :key="data.key">
            <a-menu-item>
                <span>{{data.title}}</span>
            </a-menu-item>
        </router-link>
    </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SiderItem',
  props: ['data']
})
</script>
