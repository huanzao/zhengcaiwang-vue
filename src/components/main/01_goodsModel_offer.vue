<template>
    <div>
        <div style="height: 30px;line-height: 30px;margin-bottom: 15px;padding:5px;background:#fff">
            <el-breadcrumb separator="/" style="line-height:30px" >
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">商品信号信息及报价</a></el-breadcrumb-item>
                <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
                
                 <el-button type="success" icon="el-icon-plus" size="mini"  style="display:inline-block;float:right"></el-button>
                 <el-button type="success" icon="el-icon-plus" size="mini"  @click='exportExcel("商品信号信息及报价")'  style="display:inline-block;float:right"> 导出excel表单 </el-button>
            </el-breadcrumb>
        </div>
        <el-table 
          id="out-table"
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
      label="型号编号/型号名称"
      width="600">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.xhbh}}</span><br>
            <span>{{scope.row.xhmc}}</span>
          </div>
        </template>
    </el-table-column>
    
    <el-table-column
      prop="SKU"
      label="SKU"
      width="200"
      >
    </el-table-column>

    <el-table-column
      prop="time"
      label="时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" width="250">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      :total="400">
    </el-pagination>
  </div>
    </div>
</template>

<script>
   import FileSaver from 'file-saver'
   import XLSX from 'xlsx'
  export default {
    data() {
      return {  
        currentPage:1,
        pagesize:10,
        tableData: [
          {
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング ',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング ',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        }
        ]
      }
    },
    methods: {
      exportExcel (name) {
         /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name+'.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
     },
     
      handleDetail(){
        console.log(this)
      },
      handleEdit(index, row) { //编辑
        console.log(index, row);
         this.$router.push({
          name: 'goods_edit',
          params: {
            id: index,
            row:row
          }
        })
      },
      handleDelete(index, row) { //删除
        console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
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
        this.pagesize=val
        console.log(this.pagesize,this.currentPage)
      },
      handleCurrentChange(val) {
        this.currentPage=val
         console.log(this.pagesize,this.currentPage)
      }
    }
  }
</script>
<style scoped>
    
</style>
