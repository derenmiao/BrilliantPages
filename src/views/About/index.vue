<template>
  about
    <a-button @click="onClick">测试</a-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { apiAwaitPost } from '../../Request/http'

export default defineComponent({
  name: 'Home',
  setup(){
    const onClick = () => {
      console.log("畸形了点击")
      apiAwaitPost('http://localhost:3000/abs', {name: '你好'})
    }
    return {
      onClick
    }
  }
})
</script>

<style>
</style>