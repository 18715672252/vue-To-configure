//1.关于vue-router中点击浏览器前进后退地址栏路由变了但是页面没跳转   hash路由时
//解决:https://blog.csdn.net/weixin_30674525/article/details/97129793
//2.vue-router中使用EventBus传值需要注意到的问题
//解决:https://blog.csdn.net/wei_smile/article/details/80502858
//3.关于promise
//解决:https://www.cnblogs.com/whybxy/p/7645578.html
//4.关于history路由时 , 公共路由导航组件 , 点击浏览器回退按钮 , 导航组件不刷新问题
//    4.1:在App.vue中给#app设置一个:key="appKey" , 然后用watch监听路由 , 路由改变时改变appKey的值
//<div id="app" :key="appKey">
//    <router-view />
// </div>
// data(){
//     return {
//       appKey:1
//     }
//   }
// watch:{
//     '$route':function(newUrl,oldUrl){
//       this.appKey = new Date().getTime();
//     }
//   }
//5.axios用post传输数据 , 后台接受JSON格式的数据 , 但是后台接收不到数据   来源:https://www.cnblogs.com/yiyi17/p/9409249.html
//1.config.headers['Content-Type'] = 'application/x-www-form-urlencoded';//解决后端接受JSON格式数据  , post传输后端无法收到数据 , 需要设置的请求头的Content-Type
//2.config.data = JSON.stringify(config.data);//解决后端接受JSON格式数据,post传输后端无法收到数据 , data需要qs序列化一下
