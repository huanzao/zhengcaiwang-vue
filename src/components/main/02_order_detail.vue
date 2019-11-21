<template>
    <div  style="text-align:left;background:#fff">
        <el-page-header @back="goBack" content="订单详情"></el-page-header>
        <el-divider></el-divider>
        <el-tabs type="border-card" >
            <el-tab-pane label="基本信息">
                <el-card class="box-card">
                    <div  class="text item">
                       <span>订单编号</span> {{dataDetail.ddbh}}
                    </div>
                    <div  class="text item">
                       <span>采购人名称</span> {{dataDetail.cgrmc}}
                    </div>
                    <div  class="text item">
                       <span>订单提交时间</span> {{dataDetail.cjrq | MYtime(dataDetail.cjrq)}}
                    </div>
                    <div  class="text item">
                       <span>订单金额</span> {{dataDetail.ddze+'/元'}}
                    </div>
                    <div  class="text item">
                       <span>订单状态</span> {{dataDetail.zt | MYzt(dataDetail.zt)}}
                    </div>
                    <div  class="text item">
                       <span>是否拆单</span> {{dataDetail.sfcd | Mysfcd(dataDetail.sfcd)}}
                    </div>
                    <div  class="text item">
                       <span>分拆子订单编号</span> {{dataDetail.fczddbh}}
                    </div>
                    <div  class="text item">
                       <span>是否需要安装服务</span> {{dataDetail.sfxyazfw | MYsfxyazfw(dataDetail.sfxyazfw)}}
                    </div>
                    <div  class="text item">
                       <span>订单备注说明</span> {{dataDetail.beiz}}
                    </div>
                </el-card>

            </el-tab-pane>
            <el-tab-pane label="物流信息">
                <el-card class="box-card">
                    <div  class="text item">
                        <span>快递单号</span> {{ dataDetail.kddh  }}
                    </div>
                    <div  class="text item">
                        <span>快递公司</span> {{ dataDetail.kdgs  }}
                    </div>
                    <div  class="text item">
                        <span>送货地址</span> {{ dataDetail.shdd}}
                    </div>
                    <div  class="text item">
                        <span>收货期限</span> {{ dataDetail.shqx | MYshqx(dataDetail.shqx) }}
                    </div>
                    <div  class="text item">
                        <span>收货时间</span> {{ dataDetail.shsj | MYshsj(dataDetail.shsj)  }}
                    </div>
                    <div  class="text item">
                        <span>收款标志</span> {{ dataDetail.skbz | MYskbz(dataDetail.skbz ) }}
                    </div>
                    <div  class="text item">
                        <span>收款金额</span> {{ dataDetail.skje + '/元' }}
                    </div>
                    <div  class="text item">
                        <span>需方联系人</span> {{ dataDetail.xflxrxm  }}
                    </div>
                    <div  class="text item">
                        <span>需方电话</span> {{ dataDetail.xfdh  }}
                    </div>
                    <div  class="text item">
                        <span>验收标志</span> {{ dataDetail.ysbz | MYysbz(dataDetail.ysbz) }}
                    </div>
                    <div  class="text item">
                        <span>支付方式</span> {{ dataDetail.zffs  }}
                    </div>
                  
                    <div  class="text item">
                        <span style="position:absolute">物流时间线</span>
                         <div style="display:inline-block;padding-left: 101px;padding-top: 9px">
                             <el-timeline>
                                <el-timeline-item v-for="(activity, index) in msTime" :key="index"
                                :timestamp="activity.split(',')[1] | MYtime(activity.split(',')[0])">
                                {{activity.split(',')[0]}}
                                </el-timeline-item>
                            </el-timeline>
                         </div> 
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="标识详情">
                     <el-table :data="biaoshi" style="width: 100%">
                        <el-table-column label="型号名称" prop='XHMC' width="450"></el-table-column>
                        <el-table-column label="品牌名称" prop='PPMC' width="180"></el-table-column>
                        
                        <el-table-column label="配件"  width="180" >
                            <template slot-scope="scope" v-if="scope.row.accessoryList">
                                <el-popover trigger="hover" placement="left">
                                 <template>
                                    <el-table
                                    :data="scope.row.accessoryList"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="PJMC"
                                        label="配件名称"
                                        width="180">
                                    </el-table-column>
                                    <el-table-column
                                        prop="PJJG"
                                        label="配件价格"
                                        width="180">
                                    </el-table-column>
                                    </el-table>
                                </template>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ '共'+scope.row.accessoryList.length+'个配件' }}</el-tag>
                                </div>
                                </el-popover>
                            </template>    
                            <template slot-scope="scope" v-else-if='!scope.row.accessoryList'>无</template>
                        </el-table-column>

                        <el-table-column label="服务"  width="180">
                            <template slot-scope="scope" v-if="scope.row.serviceList" >
                                <el-popover trigger="hover" placement="left">
                                 <template>
                                    <el-table
                                    :data="scope.row.serviceList"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="FWMC"
                                        label="服务名称"
                                        width="180">
                                    </el-table-column>
                                    <el-table-column
                                        prop="FWJG"
                                        label="服务价格"
                                        width="180">
                                    </el-table-column>
                                    </el-table>
                                </template>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ '共'+scope.row.serviceList.length+'个服务' }}</el-tag>
                                </div>
                                </el-popover>
                            </template>    
                            <template slot-scope="scope" v-else-if='!scope.row.serviceList'>无</template>
                        </el-table-column>
                    </el-table> 
            </el-tab-pane>
            <el-tab-pane label="发票信息">
                <el-card class="box-card">
                    <div  class="text item">
                       <span>发票开具时间</span> {{dataDetail.fpkjsj | MYtime(dataDetail.fpkjsj)}}
                    </div>
                    <div  class="text item">
                       <span>收到发票时间</span> {{dataDetail.fpsdsj | MYtime(dataDetail.fpsdsj)}}
                    </div>
                    <div  class="text item">
                       <span>电商名称</span> {{dataDetail.ghsmc}}
                    </div>
                    <div  class="text item">
                       <span>发票内容</span> {{dataDetail.fpnr}}
                    </div>
                    <div  class="text item">
                       <span>订单编号</span> {{dataDetail.ddbh}}
                    </div>
                    <div  class="text item">
                       <span>合同</span>
                       <el-link disabled target='_blank' v-if="!dataDetail.ddht" :href='dataDetail.ddht'>{{ '暂无合同' }}</el-link>
                       <el-link type="primary" target='_blank' v-if="dataDetail.ddht"  :href='dataDetail.ddht' >{{ '点击查看或下载合同' }}</el-link>
                    </div>
                </el-card>
            </el-tab-pane>
            
        </el-tabs>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msTime:"",
            biaoshi:[],
            dataDetail:{},
            fw_list:[],
            pj_list:[],
            mess_list:[],
        }
    },
    created(){
        console.log(this.$route.params.id)
        let param = new URLSearchParams()
        param.append('order_id', this.$route.params.id)
        this.axios({
            method: 'post',
            url: 'api/order_detail ',
            data: param
        }).then((res)=>{
            console.log(res.data.result[0])
            this.dataDetail=res.data.result[0]
            if(res.data.result[0].ms_and_time){
                this.msTime=res.data.result[0].ms_and_time.split(';')
            }
            if(res.data.result[0].productlist){
                this.biaoshi= eval(res.data.result[0].productlist)
                console.log(999,this.biaoshi)
                console.log(typeof(this.biaoshi))
                this.fw_list=this.biaoshi.fw_list
                this.pj_list=this.biaoshi.pj_list
                this.mess_list=this.biaoshi.mess_list
            }
        })
    },
    filters:{
        MYshsj (val){
            if(val==1){
                return  '周末送货'
            }else if(val==2){
                return  '工作日送货'
            }else if(val==0){
                return  '工作日/周末/假日 均可'
            }
        },
        MYzt (val) {
            if(val==2){
                return  '供应商待确认'
            }else if(val==3){
                return  '待验收'
            }else if(val==4){
                return  '订单已取消'
            }else if(val==5){
                return  '验收通过'
            }
        },
        Mysfcd(val){
            if(val==0){
                return  '拆单'
            }else if(val==1){
                return  '不拆单'
            }
        },
        MYsfxyazfw(val){
            if(val==0){
                return  '需要'
            }else if(val==1){
                return  '不需要'
            }

        },
        MYtime(val){
            if(val){
                return val.slice(0,4)+"-"+val.slice(4,6)+"-"+val.slice(6,8)+" "+val.slice(8,10)+":"+val.slice(10,12)+":"+val.slice(12,14)
            }else{
                return '暂无时间'
            }
        },
        MYshqx(val){
            if(val==0 || val=='null' ){
                return '不限'
            }else if(val==1){
                return '一天内'
            }else if(val==2){
                return '两天内'
            }else if(val==3){
                return '三天内'
            }else if(val==5){
                return '五天内'
            }else if(val=7){
                return '七天内'
            }
        },
        MYskbz(val){
            if(val==1){
                return '正常收款'
            }else if(val==2){
                return '未收款'
            }
        },
        MYysbz(val){
            if(val==1){
                return '自动验收'
            }else if(val==2){
                return '人工验收'
            }else {
                return '无'
            }
        }  
    },
    methods:{
        goBack(){
            window.history.go(-1)
        }    
    }
}
</script>
<style >
    .box-card>div{
        line-height: 30px;
        text-align:left;
    }
    .item>span{
        display: inline-block ;
        width: 138px ;
    }
</style>
