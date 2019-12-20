/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
import router from "../../index.js";//配置路由的文件
 
const Axios = axios.create({
  baseURL: "https://api.xxxxxx.com", // 基础URL
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    "Content-Type": "application/json;charset=utf-8"
  }
});
 
//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === "post") {//请求方式为post时
      // 提交能直接接受json 格式,可以不用 qs 来序列化的
      // config.data = qs.stringify(config.data);
	  //项目中遇到的问题:后端接受JSON格式数据 , 但是post传输后端无法收到数据
      //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';//解决后端接受JSON格式数据  , post传输后端无法收到数据 , 需要设置的请求头的Content-Type
	  //config.data = JSON.stringify(config.data);//解决后端接受JSON格式数据,post传输后端无法收到数据 , data需要qs序列化一下
    }else {
		config.headers['Content-Type'] = 'application/json;charset=utf-8';
	}
	
    // 做鉴权token , 就给头部带上token
    // 跨站点,存放到 cookie 会好一点,限制也没那么多,浏览环境限制了 localstorage 的使用
    // if (localStorage.token) {
    //   config.headers.Authorization = localStorage.token;
    // }
    return config;
  },
  error => {
    // error 的回调信息
    Message({
      showClose: true,
      message: error,
      type: "warning"
    });
    return Promise.reject(error);
  }
);
 
//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    // if (res.data && !res.data.success) {
    //   return Promise.reject(res.data.error);
    // }
 
    return res;
  },
  error => {
    // console.log(error);
    if (error.data) {
      switch (error.data.code) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // store.commit("del_token");
          router.push({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
       
      }
    }
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    // if (!window.localStorage.getItem("token")) {
    //   // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
    //   this.$router.push({
    //     path: "/login"
    //   });
    // } else {
    //   // 有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
    //   // 返回去登录页重新登录
    //   let lifeTime =
    //     JSON.parse(window.localStorage.getItem("token")).lifeTime * 1000;
    //   let nowTime = new Date().getTime(); // 当前时间的时间戳
    //   console.log(nowTime, lifeTime);
    //   console.log(nowTime > lifeTime);
    //   if (nowTime > lifeTime) {
    //     Message({
    //       showClose: true,
    //       message: "登录状态信息过期,请重新登录",
    //       type: "error"
    //     });
    //     this.$router.push({
    //       path: "/login"
    //     });
    //   } else {
    //     // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
    //     // if (error.response.status === 403) {
    //     //     this.$router.push({
    //     //         path: "/error/403"
    //     //     });
    //     // }
    //     // if (error.response.status === 500) {
    //     //     this.$router.push({
    //     //         path: "/error/500"
    //     //     });
    //     // }
    //     // if (error.response.status === 502) {
    //     //     this.$router.push({
    //     //         path: "/error/502"
    //     //     });
    //     // }
    //     // if (error.response.status === 404) {
    //     //     this.$router.push({
    //     //         path: "/error/404"
    //     //     });
    //     // }
    //   }
    // }
    // 返回 response 里的错误信息
    // let errorInfo = error.data.error ? error.data.error.message : error.data;
    // return Promise.reject(errorInfo);error.response.data
    return Promise.reject(error);
  }
);
 
// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$http", { value: Axios });
  }
};
//在main.js中
//封装好的有拦截器的axios：this.$http
import packedAxios from "./axios";
Vue.use(packedAxios); //使用this.$http代替封装好的axios


