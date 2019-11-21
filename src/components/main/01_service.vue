<template>
    <div>
        <div style="height: 30px;line-height: 30px;margin-bottom: 15px;padding:5px;background:#fff">
            <el-breadcrumb separator="/" style="line-height:30px" >
                <el-breadcrumb-item>增值服务报价</el-breadcrumb-item>

                <el-tooltip class="item" effect="dark" content="添加增值服务" placement="top-end">
                    <el-button type="success" icon="el-icon-plus" size="mini"  @click="handleAdd" style="display:inline-block;float:right" ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="搜索" placement="top-end">
                    <el-button type="primary" icon="el-icon-search" size="mini"  @click="searchDialog=true" style="display:inline-block;float:right;margin-right:10px"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="刷新复位" placement="top-end">
                    <el-button type="info" icon="el-icon-refresh" size="mini"  @click="myReload" style="display:inline-block;float:right;"></el-button>
                </el-tooltip>

            </el-breadcrumb>
        </div>
        <el-table
        max-height="700"
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>


    <el-table-column
      prop="xhmc"
      label="型号名称"
      width="300"
      show-overflow-tooltip>
    </el-table-column>  

    <el-table-column
      prop="pmmc"
      label="品目名称"
      width="200"
      show-overflow-tooltip>
    </el-table-column> 

    <el-table-column
      prop="fwmc"
      label="服务名称"
      width="200"
      show-overflow-tooltip>
    </el-table-column> 

    <el-table-column
      prop="fwjg"
      label="服务价格"
      width="100"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="execute_time"
      label="报价时间"
      width="200"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="zt"
      label="状态"
      width="200"
      :formatter="stateFormat_zt"
      show-overflow-tooltip>
    </el-table-column>

    <!-- <el-table-column label="状态" >
        <template slot-scope="scope">
        <el-tooltip :content="' 状态: ' + scope.row.zt" placement="top">
          <el-switch
            v-model="scope.row.zt"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="上架"
            inactive-value="下架"
            @change='myswitch(scope.$index,scope.row)'
            >
          </el-switch>
        </el-tooltip>
      </template>
    </el-table-column> -->


    <el-table-column label="操作" min-width="250">
      <template slot-scope="scope">
        <el-button size="mini" type='success' @click="handleUp(scope.$index, scope.row)">上架</el-button>
        <el-button size="mini" type='danger' @click="handleDown(scope.$index, scope.row)">下架</el-button>
        <el-button size="mini" type='primary' @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        <el-button size="mini" type='warning' @click="handleEdit(scope.$index, scope.row)">重新报价</el-button>
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
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
  </div>
    <!-- 搜索框 -->
        <el-dialog title="搜索" :visible.sync="searchDialog">
          <el-form :model="searchForm">
            <el-form-item label="型号名称" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.xhmc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品目名称" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.pmmc " autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="服务名称" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.fwmc" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="操作时间" :label-width="formLabelWidth">
              <el-date-picker size="mine" style='width:100%' v-model="searchForm.time" type="daterange"
                value-format='yyyyMMddHHmmss' range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>


            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select size="mini" v-model="searchForm.zt" placeholder="请选择活动区域" style='width:100%'>
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="2"></el-option>
              </el-select>
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
        currentPage:1,
        pageSize:10,
        totalPage:0,
        tableData: [],
        formLabelWidth:'140px',
        searchDialog:false,
        searchForm:{
            xhmc:"",
            pmmc:"",
            fwmc:"",
            time:"",
            zt:""
        }
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
        this.ISfen=true
        this.MYsearch()
      },
      MYsearch(){
          this.searchDialog=false
          console.log(this.searchForm)
          let postData = this.$qs.stringify({
              'pageSize':this.pageSize,
              'currentPage':this.currentPage,
              'xhmc':this.searchForm.xhmc,
              'pmmc':this.searchForm.pmmc,
              'fwmc':this.searchForm.fwmc,
              'time':this.searchForm.time[0]+'-'+this.searchForm.time[1],
              'zt'  :this.searchForm.zt
          });
          
          console.log('789546512--查询分页')
          this.axios.post('api/fw_search',postData).then((res)=>{
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
      
      paging(){
          let postData = this.$qs.stringify({'pageSize':this.pageSize,'currentPage':this.currentPage});
          this.axios.post('api/show_zzfw',postData).then((res)=>{
              console.log(res.data)
              console.log('789546512--原始分页')
              this.tableData=res.data.result
              this.totalPage=res.data.total_page
          }).catch((err)=>{
              this.$notify.error({
                title: '错误',
                message: '网路错误，请稍后再试'
              })
          })
      },
      stateFormat_zt(row){
        if(row.zt==1){
            return '上架'
        }else if(row.zt==2){
            return '下架'
        }
      },
      myswitch(index,row){
          console.log(row.zt)
          if(row.zt=='上架'){
              this.handleUp(index,row)
          } else if(row.zt=='下架'){
              this.handleDown(index,row)
          }
            
      },
      handleUp(index,row){
          const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
          let param = new URLSearchParams()
          param.append('xhbh', row.xhbh)
          param.append('fwbh', row.fwbh)
          param.append('zt', 1)
          param.append('xjyy', "")
          param.append('fw_id', row.id)
          this.axios({
              method: 'post',
              url: 'api/updown_fw',
              data: param
          }).then((res)=>{
              console.log(res)
              if(res.data.success==0){
                    this.tableData[index].zt='下架'
                    loading.close()
                    this.$message.error(res.data.result);
                }else{
                    loading.close()
                    this.$message.success(res.data.result);
                }

          })
      },
      handleDown(index,row){
          this.$prompt('请输入下架原因','提示',{
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
          param.append('xhbh', row.xhbh)
          param.append('fwbh', row.fwbh)
          param.append('zt', 2)
          param.append('xjyy', value)
          param.append('fw_id', row.id)
          this.axios({
              method: 'post',
              url: 'api/updown_fw',
              data: param
          }).then((res)=>{
                if(res.data.success==0){
                    this.tableData[index].zt='上架'
                    loading.close()
                    this.$message.error(res.data.result);
                }else{
                    loading.close()
                    this.$message.success(res.data.result);
                }
          })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });       
          });
      },
      handleAdd(){
          this.$router.push({
          name: 'service_add',
        })
      },  
      handleDetail(index,row){
          this.$router.push({
            name: 'service_detail',
            params: {
              id:row.id
            }
          })
      },
      handleEdit(index, row) { //编辑
        console.log(11111111,index, row);
         this.$router.push({
          name: 'service_edit',
          params: {
            id: index,
            row:row
          }
        })
      },
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
      handleSizeChange(val) { //分页 
        this.pageSize=val
        console.log(this.pageSize,this.currentPage)
        if(this.ISfen==false){
              this.paging()
         }else{
              this.MYsearch()
         }
      },
      handleCurrentChange(val) {
        this.currentPage=val
         console.log(this.pageSize,this.currentPage)
         if(this.ISfen==false){
              this.paging()
              console.log('111111')
         }else{
              this.MYsearch()
              console.log('2222222')
         }
      }
    }
  }
</script>
<style scoped>
    
</style>
