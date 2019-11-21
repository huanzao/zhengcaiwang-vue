<template>
    <div>
        <div style="height: 30px;line-height: 30px;margin-bottom: 15px;padding:5px;background:#fff">
            <el-breadcrumb separator="/" style="line-height:30px" >
                <el-breadcrumb-item >商品配件报价</el-breadcrumb-item>

                <el-tooltip class="item" effect="dark" content="添加商品配件报价" placement="top-end">
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
      prop="pjmc"
      label="配件名称"
      width="200"
      show-overflow-tooltip>
    </el-table-column> 

    <el-table-column
      prop="pjjg"
      label="配件价格"
      width="100"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="execute_time"
      label="报价时间"
      width="200"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" min-width="250">
      <template slot-scope="scope">
        <el-button size="mini" type="success" @click="handleUp(scope.$index, scope.row)">上架</el-button>
        <el-button size="mini" type="danger" @click="handleDown(scope.$index, scope.row)">下架</el-button>
        <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">重新报价</el-button>
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
      :total=totalPage>
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
            <el-form-item label="配件名称" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.pjmc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="操作时间" :label-width="formLabelWidth">
              <el-date-picker size="mine" style='width:100%' v-model="searchForm.time" type="daterange"
                value-format='yyyyMMddHHmmss' range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>


            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select size="mini" v-model="searchForm.zt" placeholder="状态" style='width:100%'>
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
            pjmc:"",
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
              'pjmc':this.searchForm.pjmc,
              'time':this.searchForm.time[0]+'-'+this.searchForm.time[1],
              'zt'  :this.searchForm.zt
          });
          
          console.log(postData)
          this.axios.post('api/pj_search',postData).then((res)=>{
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
      handleUp(index, row){
          const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          });
          let param = new URLSearchParams()
          param.append('xhbh', row.xhbh)
          param.append('pjbh', row.pjbh)
          param.append('zt', 1)
          param.append('xjyy', "")
          param.append('pj_id', row.id)
          this.axios({
              method: 'post',
              url: 'api/updown_pj',
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
      handleDown(index, row){
          //if(row.zt==2){
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
              param.append('pjbh', row.pjbh)
              param.append('zt', 2)
              param.append('xjyy', value)
              param.append('pj_id', row.id)
              this.axios({
                  method: 'post',
                  url: 'api/updown_pj',
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });       
          });
        // }else{
        //     this.$message.success('商品已下架');
        // }
      },
      handleAdd(){
          this.$router.push({
          name: 'goodsparts_offer_add',
        })
      },  
      handleDetail(index,row){
          this.$router.push({
            name: 'goodsparts_offer_detail',
            params: {
              id:row.id
            }
          })
      },
      handleEdit(index, row) { //编辑
        console.log(11111111,index, row);
         this.$router.push({
          name: 'goodsparts_offer_edit',
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
      },
      paging(){
          let postData = this.$qs.stringify({'pageSize':this.pageSize,'currentPage':this.currentPage});
          this.axios.post('api/show_pj',postData).then((res)=>{
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
    
</style>
