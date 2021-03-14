<template>
  <a-layout class="layout" v-on:keyup.esc="onKeyDown">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      v-if="state.full_hident"
    ><div class="logo" /><Sider /></a-layout-sider>

    <a-layout>
      <a-layout-header v-if="state.full_hident" :style="{ background: '#fff', padding: 0 }"><Header /></a-layout-header>

      <a-layout-content  :class="state.full_hident?'content': 'hident_content'">
        <router-view></router-view>
      </a-layout-content>

      <a-layout-footer v-if="state.full_hident" style="text-align: center">
        Ant Design ©2018 Created by Ant UED
        <a-affix :style="{ position: 'absolute', bottom: '20px', right: '20px'}">
          <ExpandOutlined @click="fullScreen"/>
        </a-affix>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import Sider from './Sider.vue'
import Header from './Header.vue'
import screenfull from 'screenfull'
export default defineComponent({
  components:{
    Sider,Header
  },
  setup() {
    const state = reactive({
      full_hident:<boolean>true
    })

    const fullScreen = () => {
      state.full_hident = false
      if (!screenfull.isEnabled) return false
      screenfull.toggle()
    }
    
    const onKeyDown = (e:any) => {
      e.key === 'Escape' ? state.full_hident = true :''
    }

    window.addEventListener('keydown', onKeyDown)

    return {
      selectedKeys: ref<string[]>(['4']),
      state,
      fullScreen,
      onKeyDown
    }
  },
  beforeDestroy(){
    window.removeEventListener("keydown", this.onKeyDown)
  }
});
</script>
<style scoped>
.layout{
  width: 100%;
  height: 100vh;
}
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.content{
  margin: 24px 16px 0;
  background: #fff;
}
.hident_content{
  padding: 0;
  margin: 0;
}
</style>
