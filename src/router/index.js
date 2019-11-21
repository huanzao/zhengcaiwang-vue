import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes=[
  {
    path:'/',
    component: ()=>import('@/components/start') 
  },
  {
    path:'/start',
    name:'start',
    component:()=>import('@/components/start'),
    redirect:'start/login',
    children:[
      {
        path: 'login',
        name: 'login',
        component: ()=>import('@/components/start/login') 
      }
    ]
  },
  {
    path:'/main',
    name:'main',
    component:()=>import('@/components/main'),
    redirect:'main/goods',
    requireAuth:true,
    children:[
      {
        path: 'goods',
        name: 'goods',
        component: ()=>import('@/components/main/00_goods.vue') 
      },
      {
        path: 'goods_edit',
        name: 'goods_edit',
        component: ()=>import('@/components/main/00_goods_edit.vue') 
      },
      {
        path: 'goods_information',
        name: 'goods_information',
        component: ()=>import('@/components/main/00_goods_information.vue') 
      },
      {
        path: 'goods_service',
        name: 'goods_service',
        component: ()=>import('@/components/main/00_goods_service.vue') 
      },
      {
        path: 'goods_offer',               //商品报价
        name: 'goods_offer',
        component: ()=>import('@/components/main/01_goods_offer.vue'), 
      },
      {
        path: 'goods_offer_add',
        name: 'goods_offer_add',
        component: ()=>import('@/components/main/01_goods_offer_add.vue') 
      },
      {
        path: 'goods_offer_edit',
        name: 'goods_offer_edit',
        component: ()=>import('@/components/main/01_goods_offer_edit.vue') 
      },
      {
        path: 'goods_offer_detail',
        name: 'goods_offer_detail',
        component: ()=>import('@/components/main/01_goods_offer_detail.vue') 
      },
      {
        path: 'goodsparts_offer',            //商品配件报价
        name: 'goodsparts_offer',
        component: ()=>import('@/components/main/01_goodsparts_offer.vue') 
      },
      {
        path: 'goodsparts_offer_add',            
        name: 'goodsparts_offer_add',
        component: ()=>import('@/components/main/01_goodsparts_offer_add.vue') 
      },
      {
        path: 'goodsparts_offer_edit',            
        name: 'goodsparts_offer_edit',
        component: ()=>import('@/components/main/01_goodsparts_offer_edit.vue') 
      },
      {
        path: 'goodsparts_offer_detail',            
        name: 'goodsparts_offer_detail',
        component: ()=>import('@/components/main/01_goodsparts_offer_detail.vue') 
      },
      {
        path: 'goodsModel_offer',            //获取商品型号信息及报价
        name: 'goodsModel_offer',
        component: ()=>import('@/components/main/01_goodsModel_offer.vue') 
      },
      {
        path: 'goodsSingle_offer',            //获取单个商品报价
        name: 'goodsSingle_offer',
        component: ()=>import('@/components/main/01_goodsSingle_offer.vue') 
      },
      {                                       //总订单列表
        path: 'order',
        name: 'order',
        component: ()=>import('@/components/main/02_order.vue') 
      },
      {                                       //待确认
        path: 'order_sure',
        name: 'order_sure',
        component: ()=>import('@/components/main/02_order_a_sure.vue') 
      },
      {                                       //已确认 待验收
        path: 'order_check',
        name: 'order_check',
        component: ()=>import('@/components/main/02_order_a_check.vue') 
      },
      {                                       //已验收
        path: 'order_checked',
        name: 'order_checked',
        component: ()=>import('@/components/main/02_order_a_checked.vue') 
      },
      {                                       //已取消订单
        path: 'order_cancel',
        name: 'order_cancel',
        component: ()=>import('@/components/main/02_order_a_cancel.vue') 
      },
      {                                       //已拒绝订单
        path: 'order_refuse',
        name: 'order_refuse',
        component: ()=>import('@/components/main/02_order_a_refuse.vue') 
      },
      {                                       //已完成订单
        path: 'order_complete',
        name: 'order_complete',
        component: ()=>import('@/components/main/02_order_a_complete.vue') 
      },
      
      {                                       //
        path: 'order_detail',
        name: 'order_detail',
        component: ()=>import('@/components/main/02_order_detail.vue') 
      },
      {                                       //
        path: 'order_logistics',
        name: 'order_logistics',
        component: ()=>import('@/components/main/02_order_Wuliu.vue') 
      },
      {                                       //标识
        path: 'order_Identification',
        name: 'order_Identification',
        component: ()=>import('@/components/main/02_order_biaoshi.vue') 
      },
      {                                       //
        path: 'order_logistics_edit',
        name: 'order_logistics_edit',
        component: ()=>import('@/components/main/02_order_Wuliu_edit.vue') 
      },
      {                                       //订单信息确认
        path:'orderSure',
        name:'orderSure',
        component: ()=>import('@/components/main/02_orderSure.vue')
      },
      {                                       //订单合同获取
        path:'orderContract',
        name:'orderContract',
        component:()=>import('@/components/main/02_orderContract.vue')
      },
      {
        path:'orderCheck',                     //订单验收
        name:'orderCheck',
        component:()=>import('@/components/main/02_orderCheck.vue')
      },
      {                                        //物流管理
        path: 'logistics',
        name: 'logistics',
        component: ()=>import('@/components/main/02_wuliu.vue') 
      },
      {                                       //商品上下架
        path:'shop',
        name:'shop',
        component:()=>import('@/components/main/03_shop.vue')
      },  
      {
        path: 'contrast',
        name: 'contrast',
        component: ()=>import('@/components/main/05_Contrast.vue') 
      },
      {                                       //增值服务报价
        path: 'service',
        name: 'service',
        component: ()=>import('@/components/main/01_service.vue') 
      },
      {                                       //增值服务报价
        path: 'service_add',
        name: 'service_add',
        component: ()=>import('@/components/main/01_service_add.vue') 
      },
      {                                       //增值服务报价
        path: 'service_edit',
        name: 'service_edit',
        component: ()=>import('@/components/main/01_service_edit.vue') 
      },
      {                                       //增值服务报价
        path: 'service_detail',
        name: 'service_detail',
        component: ()=>import('@/components/main/01_service_detail.vue') 
      },
      {
        path: 'echarts',
        name: 'echarts',
        component: ()=>import('@/components/main/Charts/echart.vue') 
      },
      {
        path: 'echart2',
        name: 'echart2',
        component: ()=>import('@/components/main/Charts/echart2.vue') 
      }
      
    ]
  },
]
export default new Router({
  routes: routes
})



// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
  }
   
  const router = new Router({
    mode: "history",
    routes
  });
   
  router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
  if (store.state.token) {
  next();
  }
  else {
  next({
  path: '/login',
  query: {redirect: to.fullPath}
  })
  }
  }
  else {
  next();
  }
  })
