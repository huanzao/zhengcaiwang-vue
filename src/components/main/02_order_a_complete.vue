<template>
    <div>
        <div style="height: 30px;line-height: 30px;margin-bottom: 15px;padding:5px;background:#fff">
            <el-breadcrumb separator="/" style="line-height:30px">
                 <el-breadcrumb-item>已完成订单列表</el-breadcrumb-item>
                 <el-tooltip class="item" effect="dark" content="搜索" placement="top-end">
                    <el-button type="primary" icon="el-icon-search" size="mini"  @click="searchDialog=true" style="display:inline-block;float:right;margin-left:10px"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="刷新复位" placement="top-end">
                    <el-button type="info" icon="el-icon-refresh" size="mini"  @click="myReload" style="display:inline-block;float:right;"></el-button>
                </el-tooltip>
            </el-breadcrumb>
        </div>
        <template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="订单编号"
      width="280"
      prop="ddbh">
    </el-table-column>
    <el-table-column
      label="订单金额"
      width="120"
      prop="ddze">
    </el-table-column>
    <el-table-column
      label="订单提交时间"
      prop="cjrq"
      width="180"
      :formatter="stateFormat_time"
      >
    </el-table-column>
    <el-table-column
      label="收货期限"
      width="120"
      :formatter="stateFormat_shqx"
      prop="shqx">
    </el-table-column>
    <el-table-column
      label="收货时间"
      width="145"
      :formatter="stateFormat_shsj"
      prop="shsj">
    </el-table-column>
    
    <el-table-column
      label="地址">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.shdd}}</span>
          </div>
        </template>
    </el-table-column>
    
    <el-table-column label="操作" width="300">
      <template slot-scope="scope">
        <el-button type="primary"  size='mini' @click="open_Detail(scope.row)">详情</el-button>
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
          let postData = this.$qs.stringify({
              'pageSize':this.pageSize,
              'currentPage':this.currentPage,
              'ddbh':this.searchForm.ddbh,
              'cgrmc':this.searchForm.cgrmc,
              'time':this.searchForm.time[0]+'-'+this.searchForm.time[1],
              'zt'  :'8'
          });
          this.axios.post('api/order_search',postData).then((res)=>{
              this.tableData=res.data.result
              this.totalPage=res.data.total_page
          }).catch((err)=>{
              this.$notify.error({
                title: '错误',
                message: '网路错误，请稍后再试'
              })
          })
      },
      stateFormat_time(row){                  //订单状态格式化
        return row.cjrq.slice(0,4)+"-"+row.cjrq.slice(4,6)+"-"+row.cjrq.slice(6,8)+" "+row.cjrq.slice(8,10)+":"+row.cjrq.slice(10,12)+":"+row.cjrq.slice(12,14)
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
                })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });       
          });
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
         }else{
              this.MYsearch()
         }
      },
      handleCurrentChange(val) {
        this.currentPage=val
        if(this.ISfen==false){
              this.paging()
         }else{
              this.MYsearch()
         }
      },
      paging(){ 
          let postdata=this.$qs.stringify({'order_zt':'8','pageSize':this.pageSize,'currentPage':this.currentPage})
          this.axios.post('api/show_order',postdata).then((res)=>{
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
