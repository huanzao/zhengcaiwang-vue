<template>
    <div>
        <h1>警告框hahha zhaohaunhaun</h1>
        <el-button type="primary" @click="openCenter">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <hr>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
        currentPage4: 1
      };
    },
    mounted(){
      
    },
    methods:{
      hello() {
        alert('Hello World!');
      },
      openCenter() {
        this.$message({
          message: '居中的文字',
          center: true
        });
      },
       handleSizeChange(val) {
        console.log(`1111每页 ${val} 条`);
        this.size=val
      },
      handleCurrentChange(val) {
        console.log(`2222 当前页: ${val}`);
        this.size=val
      }  
    },
   
}
</script>
<style scoped>

</style>
