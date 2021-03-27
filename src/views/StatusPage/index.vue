<template>
  <p class="content">{{state.info.msg}}</p>
  <a-button class="btn">GO HOME</a-button>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance, reactive } from 'vue'
import { status_code } from '@/global/index.ts'

export default defineComponent({
  name: 'StatusCode',
  setup: () => {
    let { ctx }:any = getCurrentInstance()
    let state = reactive<any>({ info: { code: '0', msg: '100 NOT INCLUDED', msg_cn: '暂未收录' }})
    let viewMsg = ref<string>('')
    let code = ctx.$router.currentRoute.value.query.code
    status_code.forEach((e:any) => (e.code === code ? state.info = e : ''))
    viewMsg.value = state.info.msg
    return { state }
  }
})
</script>

<style scoped lang="less">
.content{
  position: relative;
  font-family: 'Bebas Neue', cursive;
  font-weight: bold;
  text-align: center;
  font-size: 11em;
  text-shadow: 0px 0px 15px black;
  margin-top: 100px;
  height: 180px;
  -webkit-box-reflect: below 20px -webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(.4, transparent), to(rgba(3,3,3,.2)));
}
.content::before{
  content: v-bind('state.info.msg');
  background: pink;
  margin-top: 100px;
}

.btn{
  font-size: .9em;
  font-weight: bold;
  width: 90px;
  margin-left: calc(50% - 45px);
}
</style>
