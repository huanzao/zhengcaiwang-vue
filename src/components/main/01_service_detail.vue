<template>
    <div style="text-align:left;background:#fff">
        <el-page-header @back="goBack" content="商品配件详情"></el-page-header>
        <el-divider></el-divider>
        <div style="width:60%;padding:20px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>基本信息</span>
              </div>
              <ul>
                  <li><span>型号编号</span> <span>{{ pagedata.xhbh }}</span></li>
                  <li><span>型号名称</span> <span>{{ pagedata.xhmc }}</span></li>
                  
                  <li><span>品目编号</span> <span>{{ pagedata.pmbh }}</span></li>
                  <li><span>品目名称</span> <span>{{ pagedata.pmmc }}</span></li>
                  
                  <li><span>服务编号</span> <span>{{ pagedata.fwbh }}</span></li>
                  <li><span>服务名称</span> <span>{{ pagedata.fwmc }}</span></li>
                  <li><span>上架时间</span> <span>{{ pagedata.execute_time }}</span></li>
                  <li><span>服务价格</span> <span>{{ pagedata.fwjg }}</span></li>
                  <li><span>变价原因</span> <span>{{ pagedata.fwjg_return }}</span></li>
              </ul>
            </el-card>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            pagedata:[]
        }
    },
    mounted(){
        let postData = this.$qs.stringify({
            'zzfw_id':this.$route.params.id
        });
        this.axios.post('api/zzfw_detail',postData).then((res)=>{
                  console.log(res.data.result[0])
                  this.pagedata=res.data.result[0]
                 
        })
    },
    methods:{
      goBack() {
        window.history.go(-1)
      }
    }
}
</script>
<style scoped>
    ul{
      list-style: none;
    }
    ul>li{
      line-height: 26px
    }
    ul>li>span:first-child{
      display: inline-block;
      width: 120px;
    }
</style>
