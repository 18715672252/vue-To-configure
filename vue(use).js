//关于vue的自定义插件写法,用axios举例
//方法1
import Axios from 'axios'
export default {
    install(Vue){
        Object.defineProperty(Vue.prototype,'$http',{value:Axios})
    }
}
//在main.js中
//封装好的有拦截器的axios：this.$http
import packedAxios from "./axios";
Vue.use(packedAxios); 
//在组间中使用this.$http代替封装好的axios
//-----------------------------------------------------------------------
//方法2
Axios.install = (Vue)=> {
    Vue.mixin({//混合
        beforeCreate(){//某个vue组件会执行
            Object.defineProperty(this,'$http',{value:Axios})
        }
    })
}
export default Axios;
//在main.js中
//封装好的有拦截器的axios：this.$http
import packedAxios from "./axios/axios.js";
Vue.use(packedAxios); 
//在组间中使用this.$http代替封装好的axios

