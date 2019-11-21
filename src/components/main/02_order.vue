<template>
    <div>
        <div style="height: 30px;line-height: 30px;margin-bottom: 15px;padding:5px;background:#fff">
            <el-breadcrumb separator="/" style="line-height:30px">
                 <el-breadcrumb-item>订单列表</el-breadcrumb-item>
                <el-button type="success" icon="el-icon-refresh" size="mini"  @click="Refresh" style="display:inline-block;float:right;margin-left:10px" >刷新</el-button>
                <el-button type="success" icon="el-icon-refresh" size="mini"  @click="Test" style="display:inline-block;float:right" >测试</el-button>
            </el-breadcrumb>
        </div>
        <template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="订单编号"
      prop="ddbh">
    </el-table-column>
    <el-table-column
      label="订单状态"
      prop="zt"
      :formatter="stateFormat_zt"
      >
    </el-table-column>
    <el-table-column
      label="订单金额"
      prop="ddze">
    </el-table-column>
    <el-table-column
      label="订单提交时间"
      prop="cjrq"
      :formatter="stateFormat_time"
      >
    </el-table-column>
    <el-table-column
      label="收货期限"
      prop="shqx">
    </el-table-column>
    <el-table-column
      label="收货时间"
      prop="shsj">
    </el-table-column>
    
    <el-table-column
      label="地址">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.deliverycity}}</span> / <span>{{scope.row.deliverycounty}}</span> / <span>{{scope.row.shdd}}</span>
          </div>
        </template>
    </el-table-column>
    
    <el-table-column label="操作" width="300">
      <template slot-scope="scope">
        <el-link type="primary"   @click="handleSure(scope.$index, scope.row)">确认</el-link>
        <el-link type="success" @click="handleCancel(scope.$index, scope.row)">拒绝</el-link>
        <el-link type="warning"  @click="handleQuxiao(scope.$index, scope.row)">取消</el-link>
        <el-link type="danger"  @click="handleWuliuEdit(scope.$index, scope.row)">物流</el-link>
        <el-link type="info"  @click="handleHt(scope.$index, scope.row)">合同</el-link>
        <el-link type="info"  @click="handleFp_mess(scope.$index, scope.row)">开发票时间</el-link>
        <el-link type="info"  @click="handleFp_time_Received(scope.$index, scope.row)">收发票时间</el-link>
        <el-link type="info"  @click="open_Dialog(scope.row)">收款信息</el-link>
        <el-link type="info"  @click="open_YSZT(scope.row)">验收状态 </el-link>
        <el-link type="info"  @click="open_BS(scope.row)">标识</el-link>
        <el-link type="info"  @click="open_Detail(scope.row)">详情</el-link>
      </template>
    </el-table-column>
  </el-table>
  <div class="block" style="height:32px">
        <el-pagination
        style="height:50px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size=pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalPage>
        </el-pagination>
  </div>
</template>


    <el-dialog title="订单收款信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收款标志" :label-width="formLabelWidth" style='text-align:left'>
          <template>
            <el-radio v-model="form.skbz" label="1">已收款</el-radio>
            <el-radio v-model="form.skbz" label="2">未收款</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="收款金额" :label-width="formLabelWidth">
          <el-input v-model="form.skje" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款时间" :label-width="formLabelWidth"  style='text-align:left'>
          <div class="block">
        <el-date-picker
          v-model="form.sksj"
          type="datetime"
          value-format='yyyyMMddHHmmss'
          placeholder="选择日期时间"
          align="right"
        >
        </el-date-picker>
      </div>

        </el-form-item>
      </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取消</el-button>
    <el-button type="primary" @click="MY_dialogFormVisible">确 定</el-button>
  </div>
</el-dialog>
    <el-dialog :title="fapiaoTitele" :visible.sync="dialogFormVisible1">
      <el-form> 
        <el-form-item :label="fapiaoTitele" :label-width="formLabelWidth1">
            <div class="block" style='text-align:left'>
              <el-date-picker
                v-model="fp_time.time"
                type="datetime"
                is-range="true"
                value-format='yyyyMMddHHmmss'
                placeholder="选择日期时间"
                align="right"
              >
              </el-date-picker>
            </div>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="handleFp_time_Received_then">确 定</el-button>
      </div>
    </el-dialog>
    
    </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage:1,
        pageSize:10,
        totalPage:100,
        tableData: [],
        dialogFormVisible: false,
        dialogFormVisible1:false,
        fapiaoTitele:'',
        fp_time:{
            ddbh:'',
            order_id:'',
            time:''
        },
        form: {
          ddbh:'',
          order_id:'', 
          skbz: 2,
          skje: '',
          sksj: ''
        },
        formLabelWidth: '120px' ,
        formLabelWidth1: '120px' 
      } 
    },
    mounted(){
        this.axios.post('api/show_order').then((res)=>{
              console.log(res.data)
              this.tableData=res.data.result
          }).catch((err)=>{
              this.$notify.error({
                title: '错误',
                message: '网路错误，请稍后再试'
              })
          })
    },
    methods: {
      open_YSZT(row){                         //验收状态
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });

          let param = new URLSearchParams()
            param.append('ddbh', row.ddbh)
            param.append('order_id',row.id)
            
          this.axios({
              method: 'post',
              url: 'api/findYsByOrder',
              data: param
          }).then((res)=>{
                       loading.close()
                      if(res.data.success==1){
                          this.$message({
                            message: res.data.result,
                            type: 'success'
                          });
                      }else{
                          this.$message.error(res.data.result);
                      }
                  }).catch(()=>{
                      loading.close()
                      this.$notify.error({
                        title: '错误',
                        message: '政府网站崩溃，请稍后再试'
                      })
                  })
      },
      Test(){
          this.axios.post('api/up_data').then((res)=>{
              if(res.data.success==1){
                  this.$message({
                    message: res.data.result,
                    type: 'success'
                  });
              }else{
                  this.$message.error(res.data.result);
              }
          }).catch((res)=>{
              this.$notify.error({
                title: '错误',
                message: '政府网站崩溃，请稍后再试'
              })
          })
      },
      Refresh(){                              //获取最新订单
          this.axios.post('api/findOrder').then((res)=>{
              if(res.data.success==1){
                  this.$message({
                    message: res.data.result,
                    type: 'success'
                  });
              }else{
                  this.$message.error(res.data.result);
              }
          }).catch((res)=>{
              this.$notify.error({
                title: '错误',
                message: '政府网站崩溃，请稍后再试'
              })
          })
      },
      stateFormat_zt(row, column){            //修改数据格式 2-供应商待确认 4-订 单已取消
        if(row.zt==1){
            return '已确认'
        }else if(row.zt==2){
            return '供应商待确认'
        }else if(row.zt==3){
            return '待验收'
        }else if(row.zt==4){
            return '订单已取消'
        }else if(row.zt==5){
            return '验收通过'
        }else if(row.zt==7){
            return '拒绝'
        }else if(row.zt==8){
            return '已推送'
        }
      },
      stateFormat_time(row){                  //订单状态格式化
        return row.cjrq.slice(0,4)+"-"+row.cjrq.slice(4,6)+"-"+row.cjrq.slice(6,8)+" "+row.cjrq.slice(8,10)+":"+row.cjrq.slice(10,12)+":"+row.cjrq.slice(12,14)
      },
      handleFp_mess(index, row){              //订单发票开具信息

              this.fapiaoTitele='开发票的时间' //shop_ticket
              this.dialogFormVisible1=true
              this.fp_time.ddbh=row.ddbh
              this.fp_time.order_id=row.id    
      },
      handleFp_time_Received(index,row){               ///收发票时间
          this.fapiaoTitele='收发票的时间'
          this.dialogFormVisible1=true
          this.fp_time.ddbh=row.ddbh
          this.fp_time.order_id=row.id
      },
      handleFp_time_Received_then(){
        console.log('收发票时间',this.fp_time.time)
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.dialogFormVisible1=false
          let param = new URLSearchParams()
            param.append('ddbh', this.fp_time.ddbh)
            param.append('order_id', this.fp_time.order_id)

         if(this.fapiaoTitele=='收发票的时间'){
            param.append('fpsdsj', this.fp_time.time)  ///********************** */
            this.axios({
                method: 'post',
                url: 'api/gov_ticket',
                data: param
            }).then((res)=>{
                      loading.close()
                      console.log(res)
                      if(res.data.success==1){
                          this.$message({
                            message: res.data.result,
                            type: 'success'
                          });
                      }else{
                          this.$message.error(res.data.result);
                      }
                  }).catch(()=>{
                      loading.close()
                      this.$notify.error({
                        title: '错误',
                        message: '政府网站崩溃，请稍后再试'
                      })
                  })
         }else{
            param.append('fpkjsj', this.fp_time.time)  ///********************** */
            this.axios({
                method: 'post',
                url: 'api/shop_ticket',
                data: param
            }).then((res)=>{
                      loading.close()
                      console.log(res)
                      if(res.data.success==1){
                          this.$message({
                            message: res.data.result,
                            type: 'success'
                          });
                      }else{
                          this.$message.error(res.data.result);
                      }
                  }).catch(()=>{
                      loading.close()
                      this.$notify.error({
                        title: '错误',
                        message: '政府网站崩溃，请稍后再试'
                      })
                  })
         }   
            
      },
      MY_dialogFormVisible(){
          console.log(this.fp_time.time)
          console.log(typeof(this.fp_time.time))

          this.dialogFormVisible = false
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });

          let param = new URLSearchParams()
          let obj=this.form
          Object.keys(obj).forEach(function(key){
              param.append(key, obj[key])
          })
          this.axios({
              method: 'post',
              url: 'api/execSkqk',
              data: param
          }).then((res)=>{
                      console.log(res)
                      loading.close()
                      if(res.data.success==1){
                          this.$message({
                            message: res.data.result,
                            type: 'success'
                          });
                      }else{
                          this.$message.error(res.data.result);
                      }
                  }).catch(()=>{
                      loading.close()
                      this.$notify.error({
                        title: '错误',
                        message: '政府网站崩溃，请稍后再试'
                      })
                  })

      },
      open_Dialog(row){
          this.dialogFormVisible=true
          this.form.ddbh=row.ddbh
          this.form.order_id=row.id
      },
      handleMy_mess(index, row){              //订单收款信息
          this.$prompt('请输入发票时间', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
                const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                let param = new URLSearchParams()
                param.append('ddbh', row.ddbh)
                param.append('order_id', row.id)
                param.append('skbz', row.skbz)
                param.append('skje', row.skje)
                param.append('sksj', row.sksj)
                this.axios({
                    method: 'post',
                    url: 'api/execSkqk',
                    data: param
                }).then((res)=>{
                    console.log(res)
                })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });       
          });
      },
      handleHt(index, row){                   //合同
          console.log(index, row);
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          let param = new URLSearchParams()
          param.append('ddbh', row.ddbh)
          param.append('order_id', row.id)
          this.axios({
              method: 'post',
              url: 'api/findOrderHt',
              data: param
          }).then((res)=>{
                       loading.close()
                      if(res.data.success==1){
                          this.$message({
                            message: res.data.result,
                            type: 'success'
                          });
                        
                      }else{
                          this.$message.error(res.data.result);
                      }
                  }).catch(()=>{
                      loading.close()
                      this.$notify.error({
                        title: '错误',
                        message: '政府网站崩溃，请稍后再试'
                      })
                  })
      },
      handleSure(index, row) {                //订单确认
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        console.log(index, row);
        let param = new URLSearchParams()
        param.append('ddbh', row.ddbh)
        param.append('sfcd', row.ddbh)
        param.append('fczddbh', row.fczddbh)
        param.append('qrzt', '确认')
        this.axios({
            method: 'post',
            url: 'api/sure_cancel_order',
            data: param
        }).then((res)=>{
            console.log(res)
            loading.close()
            if(res.data.success==1){
                this.$message({
                  message: res.data.result,
                  type: 'success'
                });
            }else{
                this.$message.error(res.data.result);
            }

        }).catch(()=>{
            loading.close()
            this.$notify.error({
              title: '错误',
              message: '政府网站崩溃，请稍后再试'
            })
        })
      },
      handleQuxiao(index, row){               //取消
           this.$prompt('请输取消原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
              const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });

          let param = new URLSearchParams()
          param.append('ddbh', row.ddbh)
          param.append('order_id', row.id)
          param.append('qxyy', value)
          this.axios({
              method: 'post',
              url: 'api/cancel_order',
              data: param
          }).then((res)=>{
              console.log(res)
              loading.close()
              if(res.data.success==0){
                  this.$message.error(res.data.result);
              }else{
                  this.$message.success(res.data.result);
              }
          })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '放弃操作'
            });       
          });
      },
      open_BS(row){                           //标识
          this.$router.push({
            name: 'order_Identification',
            params: {
              id:row.id,
              ddbh:row.ddbh,
            }
          })
      },
      handleCancel(index, row) {              //拒绝
        console.log(index, row);
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let param = new URLSearchParams()
        param.append('ddbh', row.ddbh)
        param.append('qrzt', '拒绝')
        this.axios({
            method: 'post',
            url: 'api/sure_cancel_order',
            data: param
        }).then((res)=>{
              loading.close()
              if(res.data.success==1){
                  this.$message({
                    message: res.data.result,
                    type: 'success'
                  });
                  this.$router.push('/main/goods_offer')
              }else{
                  this.$message.error(res.data.result);
              }
        }).catch(()=>{
            loading.close()
            this.$notify.error({
              title: '错误',
              message: '政府网站崩溃，请稍后再试'
            })
        })
      },
      handleWuliu(index, row){                //物流
          this.$router.push({
            name: 'order_logistics',
            params: {
              id: index,
              row:row
            }
          })
      },
      open_Detail(row){
          this.$router.push({
            name: 'order_detail',
            params: {
              id: row.id,
              row:row
            }
          })
      },
      handleWuliuEdit(index, row){            //编辑
          this.$router.push({
            name: 'order_logistics_edit',
            params: {
              id: index,
              row:row
            }
          })
      },
                                              //分页
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageSize=val
        paging()
      },
      handleCurrentChange(val) {
        this.currentPage=val
        this.paging()
      },
      paging(){
          this.axios.post('api/show_order',{'pageSize':this.pageSize,'currentPage':this.currentPage}).then((res)=>{
              console.log(res.data)
              this.tableData=res.data.result
          }).catch((err)=>{
              this.$notify.error({
                title: '错误',
                message: '网路错误，请稍后再试'
              })
          })

      }
    }
  }
</script>
<style scoped>
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 20%;
  }
</style>
