<template>
    <div class="box">
        <header class="header">
            <div class="time"><font face="黑体">{{now_time}}</font></div>
            <img  src="@/assets/images/chat_header.png" alt="加载失败" />
            <a-affix offset-top="top"><p class="inputing"  :style="{visibility: loading ? 'visible': 'hidden'}">对方正在输入...</p></a-affix>
        </header>

        <div class="content">
            <ul ref="contref">
            <li v-for="(item, idx) in chat_list" :key="idx">
               <div v-if="item.user === 'thor'">
              <el-row>
                <el-col :span="3"><img src="@/assets/images/thor.png" class="avatar lf"/></el-col>
                <el-col :span="21"><div class="avatar-jt msg-lf lf"></div><div class="avatar-msg lf">{{item.msg}}{{item.mood}}</div></el-col>
              </el-row>
            </div>
            <div v-else>
              <el-row>
                <el-col :span="3"><img src="@/assets/images/kbyx.png" class="avatar rt" style="margin-right: 10px;"/></el-col>
                <el-col :span="21"><div class="avatar-jt msg-rt rt"></div><div class="avatar-msg rt">{{item.msg}}</div></el-col>
              </el-row>
            </div>
            </li>
            </ul>
        </div>
        <footer>
            <a-row>
                <a-col :span="3">
                    <icon-font class="zdy" type="icon-yuyin" />
                </a-col>
                <a-col :span="16"><a-input v-model:value="input" @keyup.enter="sendMsg" /></a-col>
                <a-col :span="2" style="margin-left: 6px;"><icon-font class="zdy" type="icon-biaoqing" /></a-col>
                <a-col :span="2"><icon-font class="zdy" type="icon-jiahao" @click.stop="sendMsg" /></a-col>
            </a-row>
        </footer>
    </div>
    <div v-show="dialogue.isshow" class="chat_box">
        <span>{{dialogue.msg}}{{dialogue.mood}}</span>
        <br><span>{{dialogue.tgt}}</span>
    </div>
    
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, nextTick, reactive, onBeforeUnmount, watch } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue';
// import { IconFont } from '@/Components/Components.jsx'
import { apiAwaitGet, apiNotAwaitPost } from '@/Request/http.ts'
import { apiZh2Jp } from '@/Apis/thor.ts'
import { message } from 'ant-design-vue';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2448721_vyjmtj70lm8.js',
});

export default defineComponent({
  name: 'Thor',
  components: {
    IconFont,
  },
  setup: () => {
    const model = ref<string>('shizuku')
    const contref = ref<any>(null)
    const now_time = ref('')
    const input = ref('')
    const loading = ref<boolean>(false)
    // '好''乐' '哀' '怒' '惧' '恶' '惊' '无'
    // '😊', '😄', '😔', '😡', '😰', '😮'
    const emojis = [
        {mood: '无', emojs: ''},
        {mood: '好', emojs: '😊'},
        {mood: '乐', emojs: '😄'},
        {mood: '哀', emojs: '😔'},
        {mood: '怒', emojs: '😡'},
        {mood: '恶', emojs: '😰'},
        {mood: '惊', emojs: '😮'}]

    const dialogue = reactive<any>({isshow: false, msg: 'Hello World', mood: '', tgt: ''})
    let handle = ref<any>(null)
    let chat_list = reactive<any>([{user:"thor", msg:"你好呀", mood:''}])
    const live2dInit = ():any => {
        (window as any).L2Dwidget.init({
            pluginRootPath: '/static/live2dw',
            pluginJsPath: 'lib/',
            pluginModelPath: `live2d-widget-model-${model.value}/assets/`,
            tagMode: false,
            debug: false,
            model: {
                jsonPath: `/static/live2dw/live2d-widget-model-${model.value}/assets/${model.value}.model.json`,
            },
            display: { position: 'left', width: 150, height: 300 },
            mobile: { show: true },
            log: true,
        })
    }

    const getNowTime = ()=>{
      let date = new Date();
      let hours = date.getHours();
      let minute = date.getMinutes();
      return hours + ":" + minute
    }

    const findEmoji = (m:string) => {
        let t:any = emojis.find((x:any) => x.mood === m)
        return t.emojs
    }

    const updateScroll = () => {
        contref.value.scrollTop = contref.value.scrollHeight
    }

    const Japanese = (text:string) => {
        var url =  `http://tts.youdao.com/fanyivoice?word=${text}&le=jap&keyfrom=speaker-target`
        let audio = new Audio(url);
　　    audio.src = url;
        audio.play()

        let tt = setInterval(() => {
            if(audio.ended) {
                dialogue.isshow = false
                clearInterval(tt)
            }
        }, 1000)
    }

    const ZhToJp = (text:string) => {
        let url = `/youdao/translate?doctype=json&type=ZH_CN2JA&i=${text}`
        apiZh2Jp(url).then((res:any) => {
            if(!res) return;
            dialogue.tgt = res.tgt
            Japanese(res.tgt)
        })
    }

    const getAnswer = async (msg:string) => {
        loading.value = true
        const res = await apiNotAwaitPost('/thorapi/getanswer', { msg })
        const { result } = res.data
        loading.value = false
        let temp = {
            user: 'thor',
            msg: result.text,
            mood: findEmoji(result.mood)
        }
        chat_list.push(temp)
        dialogue.isshow = true
        dialogue.msg = result.text
        dialogue.mood = findEmoji(result.mood)
        // 稍后执行啦
        nextTick(()=>{
            updateScroll()
            ZhToJp(result.text)
        })
    }

    const sendMsg = () => {
        if(input.value === ''){
            message.warn('啥也没有输入')
            return
        }
        let tempmsg = {user: 'kbyx', msg: input.value.trim()}
        chat_list.push(tempmsg)
        getAnswer(input.value.trim())
        input.value = ''
    }

    onMounted(()=>{
        nextTick(() => {
            live2dInit()
        })
        now_time.value = getNowTime();
        handle.value = setInterval(()=>{
            now_time.value = getNowTime();
        }, 1000 * 60)
    })

    onBeforeUnmount(()=>{
        handle.value = null
        clearTimeout(handle.value)
    })
    return { 
        chat_list,
        now_time,
        input,
        sendMsg,
        loading,
        dialogue,
        contref
    }
  }
})
</script>

<style lang="less" scoped>
.box{
    position: relative;
    float: right;
    right: 100px;
    width: 290px;
    height: 540px;
    border-radius: 8px;
    box-shadow: 0px 0px 55px black;
    background-color: rgb(245,245,245);
    overflow: hidden;

    .header{
        border-bottom: 1px solid rgba(200,200,200,0.8);
        .time{
            position: absolute;
            z-index: 100;
            width: 100%;
            text-align: center;
            font-size: .8em;
        }
        img {
            width: 100%;
            height: auto;
        }
    }
    .inputing{
        position: fixed;
        width: 290px;
        text-align: center;
        font-size: .1em;
        z-index: 100;
    }
    .content{
        padding: 0px 0px  0px 10px;
        height: calc(100% - 100px);
        width: calc(100% -15px);
        overflow: hidden;
        font-size: .6em;
        .avatar{
            width: 35px;
            height: 35px;
        }
        .avatar-msg{
            background: rgb(187, 177, 195);
            display: inline-block;
            padding: 4px;
            min-height: 35px;
            border-radius: 3px;
            max-width: 74%;
        }
        .avatar-jt{
            display: inline-block;
            height:0px;
            width:0px;
            border-width:5px;
            margin-top: 7px;
            border-style:solid;
        }
        ul{
            list-style: none;
            height: 100%;
            overflow-y: auto;
        }
        li{
            display: inline-block;
            width: 100%;
            margin-top: 10px;
        }

        .msg-rt{
            border-color: transparent   transparent  transparent rgb(187, 177, 195);
        }
        .msg-lf{
            border-color: transparent  rgb(187, 177, 195) transparent  transparent ;
        }
    }

    footer{
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 45px;
        line-height: 45px;
        background-color: rgb(245,245,245);
        text-align: center;
        box-shadow: 0px -1px 3px gray;
        .zdy {
            font-size: 1.3em;
        }
        
        .inp{
            width: 70%;
        }
    }
}

.chat_box{
    position: absolute;
    left: 85px;
    bottom: 195px;
    min-width: 200px;
    min-height: 70px;
    padding: 5px;
    clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 29% 75%, 13% 100%, 14% 75%, 0% 75%);
    background-color: #bbb1c3;
}

.lf{
  float: left;
}
.rt{
  float: right;
}
</style>

