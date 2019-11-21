<template>
    <div>
        <div style="height: 30px;line-height: 30px;margin-bottom: 15px;padding:5px;background:#fff">
            <el-breadcrumb separator="/" style="line-height:30px">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">价格对比</a></el-breadcrumb-item>
                <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
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
      prop="goods"
      label="商品型号"
      width="300">
    </el-table-column>
    
    <el-table-column
      prop="price"
      label="本站报价"
      width="200"
      >
      <span slot-scope="scope" style="color:#1890ff">{{ scope.row.price }}</span>
    </el-table-column>
    
    <el-table-column
      prop="jd"
      label="京东"
      width="200"
      >
    </el-table-column>

    <el-table-column
      prop="tb"
      label="淘宝"
      width="200"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column 
      prop="sn"
      label="苏宁"
      width="200"
      >
    </el-table-column>
     <el-table-column 
      prop="time"
      label="平均优惠"
      width="150"
      >
        <div slot-scope="scope" style="color:#1890ff">
            <span style="color:#b5621b">{{ scope.row.youhui }}</span>
        </div>
    </el-table-column>
    <el-table-column 
      prop="time"
      label="更新时间"
      >
    </el-table-column>
    <el-table-column label="操作">
      <template>
          <el-button size="mini" type="success">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
      <div class="block" style="height:32px">
    <el-pagination
    style="height:50px"
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
    data() {
      return {
        currentPage4:1,
        tableData: [{
          goods: '深度操作系统服务器版软件V15',
          price:'6,900.00',
          jd:'7,000.00',
          tb:'7,000.00',
          sn:'7,000.00',
          time:'7,000.00',
          youhui:45
        },
        {
          goods: 'OptiPlex 3060 Tower 231269',
          price:'1838.00-3778.00',
          jd:'1838.00-3778.00',
          tb:'1838.00-3778.00',
          sn:'1838.00-3778.00',
          time:'2019-09-22 19:56:38',
          youhui:45
        },
        {
          goods: '中美隆1.6米TZ-01811办公套装',
          price:'3688.00-4488.00',
          jd:'3688.00-4488.00',
          tb:'3688.00-4488.00',
          sn:'3688.00-4488.00',
          time:'2019-09-22 19:56:38',
          youhui:45
        },
        {
          goods: '华为荣耀MagicBook PRO 14寸笔记本电脑 2019款 锐龙 I5 I7 16寸',
          price:'3688.00-4488.00',
          jd:'3688.00-4488.00',
          tb:'3688.00-4488.00',
          sn:'3688.00-4488.00',
          time:'2019-09-22 19:56:38',
          youhui:45
        },
        {
          goods: '书架 B2116-X蓝',
          price:'36',
          jd:'38',
          tb:'40',
          sn:'39',
          time:'38',
          youhui:2
        },
        {
          goods: '华为荣耀 荣耀平板5 10.1英寸安卓手机ipad平板电脑10寸新款8寸m5',
          price:'1128.00-1599.00',
          jd:'1128.00-1599.00',
          tb:'1128.00-1599.00',
          sn:'1128.00-1599.00',
          time:'2019-09-22 19:56:38',
          youhui:45
        },
        {
          goods: '官方正品华为honor/荣耀NOTE10全网通6.95寸屏6G/8G+128G游戏手机',
          price:'1799.00-2599.00',
          jd:'1799.00-2599.00',
          tb:'1799.00-2599.00',
          sn:'1799.00-2599.00',
          time:'2019-09-22 19:56:38',
          youhui:45
        },
        {
          goods: '红米k20 pro尊享版骁龙855Plus大存储学生智能游戏手机小米',
          price:'2699.00-3199.00',
          jd:'2699.00-3199.00',
          tb:'2699.00-3199.00',
          sn:'2699.00-3199.00',
          time:'2019-09-22 19:56:38',
          youhui:45
        },
        {
          goods: 'Xiaomi/小米 Redmi K20骁龙 855红米k20pro官方旗舰新手机9大魔王',
          price:'1408.00-3369.00',
          jd:'1408.00-3369.00',
          tb:'1408.00-3369.00',
          sn:'1408.00-3369.00',
          time:'2019-09-22 19:56:38',
          youhui:45
        },
        {
          goods: '小米9 骁龙855智能游戏学生老人老年手机大屏大字小米官方旗',
          price:'2599.00-2799.00',
          jd:'2599.00-2799.00',
          tb:'2599.00-2799.00',
          sn:'2599.00-2799.00',
          time:'2019-09-22 19:56:38',
          youhui:45
        }
        ]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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
      handleSizeChange(val) {
        console.log(`1111每页 ${val} 条`);
        this.size=val
      },
      handleCurrentChange(val) {
        console.log(`2222 当前页: ${val}`);
        this.size=val
      }
    }
  }
</script>
<style scoped>
    
</style>
