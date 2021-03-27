import axios from 'axios'
import { message } from 'ant-design-vue';
import router from '../Router/index'

//post请求头
axios.defaults.headers.post["Content-Type"] = "application/json";
//设置超时
// axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  config => {
    console.log("我要看看都发送了什么东西", config)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 拦截请求
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            console.log("朴拙到了404")
            return Promise.reject(response);
        }
    }, 
    error => {
        // 系统报错的状态码
        router.push({ path: '/starus_code_test', query: {code: error.response.status}} )
        message.warn("完了完了")
        return Promise.reject(error);
    }
);

export default axios