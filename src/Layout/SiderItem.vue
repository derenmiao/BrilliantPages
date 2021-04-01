<template>
    <template v-if="data.children && data.children.length > 0">
        <a-sub-menu :key="data.meta.key">
            <template #title>
                <span>{{data.meta.title}}</span>
            </template>
            <sider-item :data="item" v-for="item in data.children" :key="item.meta.key" />
        </a-sub-menu>
    </template>   
    <template v-else>
        <router-link :to="{name: data.name}" :key="data.meta.key">
            <a-menu-item>
                <span>{{data.meta.title}}</span>
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
