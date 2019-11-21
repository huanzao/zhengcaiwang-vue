<template>
    <div>
        <div style="height: 30px;line-height: 30px;margin-bottom: 15px;padding:5px;background:#fff">
            <el-breadcrumb separator="/" style="line-height:30px">
                 <el-breadcrumb-item>订单待验收列表</el-breadcrumb-item>
                 <el-tooltip class="item" effect="dark" content="搜索" placement="top-end">
                    <el-button type="primary" icon="el-icon-search" size="mini"  @click="searchDialog=true" style="display:inline-block;float:right;margin-left:10px"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="刷新复位" placement="top-end">
                    <el-button type="info" icon="el-icon-refresh" size="mini"  @click="myReload" style="display:inline-block;float:right;"></el-button>
                </el-tooltip>
            </el-breadcrumb>
            
        </div>
        <template>
  <el-table :data="tableData" style="width: 100%">
        <el-table-column label="订单编号" width="290" prop="ddbh"></el-table-column>
        <el-table-column label="订单金额" width="100" prop="ddze"></el-table-column>
        <el-table-column label="订单提交时间" prop="cjrq" width="180" :formatter="stateFormat_time"></el-table-column>
        <el-table-column label="收货期限" width="100" :formatter="stateFormat_shqx" prop="shqx"></el-table-column>
        <el-table-column label="采购人名称" width="175"  prop="cgrmc"></el-table-column>
        <el-table-column label="收货时间" width="140" :formatter="stateFormat_shsj" prop="shsj"></el-table-column>
        <el-table-column  label="地址" prop="shdd"></el-table-column>
        <el-table-column label="操作" width="360">
        <template slot-scope="scope">
            <el-button size="mini" type="primary"  @click="open_Detail(scope.row)">详情</el-button>
            <el-button size="mini" type="info"  @click="handleHt(scope.$index, scope.row)">合同</el-button>
            <el-button size="mini" type="danger"  @click="handleWuliuEdit(scope.$index, scope.row)">物流</el-button>
            <el-button size="mini" type="info"  @click="open_YSZT(scope.row)">验收 </el-button>
            <el-button size="mini" type="warning"  @click="handleQuxiao(scope.$index, scope.row)">取消</el-button>
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
    

    <!-- 搜索框 -->
        <el-dialog title="搜索" :visible.sync="searchDialog">
          <el-form :model="searchForm">
            <el-form-item label="订单编号" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.ddbh" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="采购人名称" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.cgrmc " autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="时间" :label-width="formLabelWidth">
              <el-date-picker size="mine" style='width:100%' v-model="searchForm.time" type="daterange"
                value-format='yyyyMMddHHmmss' range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="searchDialog = false">取 消</el-button>
            <el-button type="primary" @click="MYsearch_par">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        ISfen:false,
        searchDialog:false,
        searchForm:{
            ddbh:"",
            cgrmc:"",
            time:""
        },
        currentPage:1,
        pageSize:10,
        totalPage:0,
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
        this.paging()
    },
    methods: {
      myReload(){
          this.pageSize=10
          this.currentPage=1
          this.ISfen=false
          this.paging()
      },
       MYsearch_par(){
        this.pageSize=10
        this.currentPage=1
        this.ISfen==true
        this.MYsearch()
      },
      MYsearch(){
          this.searchDialog=false
          console.log(this.searchForm)
          let postData = this.$qs.stringify({
              'pageSize':this.pageSize,
              'currentPage':this.currentPage,
              'ddbh':this.searchForm.ddbh,
              'cgrmc':this.searchForm.cgrmc,
              'time':this.searchForm.time[0]+'-'+this.searchForm.time[1],
              'zt'  :'13'
          });
          console.log(postData)
          this.axios.post('api/order_search',postData).then((res)=>{
              console.log(res.data)
              console.log('789546512*************--',res.data.total_page)
              this.tableData=res.data.result
              this.totalPage=res.data.total_page
          }).catch((err)=>{
              this.$notify.error({
                title: '错误',
                message: '网路错误，请稍后再试'
              })
          })
      },
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
      stateFormat_shqx(row){
        //0 不限 1 一天内 2 两天内 3 三天内 5 五天内 7 七天内
          if(row.shsj==0 || row.shsj=='null'){
              return '不限'
          }else if(row.shsj==1){
              return '一天内'
          }else if(row.shsj==2){
              return '两天内'
          }else if(row.shsj==3){
              return '三天内'
          }else if(row.shsj==5){
              return '五天内'
          }else if(row.shsj==7){
              return '七天内'
          }
      },
      stateFormat_shsj(row){
          if(row.shsj==0){
              return '工作日/周末/假日均可'
          }else if(row.shsj==1){
              return '周末送货'
          }else if(row.shsj==2){
              return '工作日送货'
          } 
      },

      ////////////
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
        if(this.ISfen==false){
              this.paging()
              console.log('111111')
         }else{
              this.MYsearch()
              console.log('2222222')
         }
      },
      handleCurrentChange(val) {
        this.currentPage=val
        if(this.ISfen==false){
              this.paging()
              console.log('111111')
         }else{
              this.MYsearch()
              console.log('2222222')
         }
      },
      paging(){
          let postData = this.$qs.stringify({'order_zt':13,'pageSize':this.pageSize,'currentPage':this.currentPage});
          this.axios.post('api/show_order',postData).then((res)=>{
              console.log(res.data)
              this.tableData=res.data.result
              this.totalPage=res.data.total_page
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
