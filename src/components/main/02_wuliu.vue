<template>
    <div>
        <div style="height: 30px;line-height: 30px;margin-bottom: 15px;padding:5px;background:#fff">
            <el-breadcrumb separator="/" style="line-height:30px">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">物流</a></el-breadcrumb-item>
                <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
            </el-breadcrumb>
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item style="" title="邮政" name="1">
    
    <div style="padding:10px;border: 2px solid #E9EEF3">
            <el-table
    :data="tableData"
    stripe
    >
    <el-table-column
      prop="date"
      label="序号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="发货渠道"
      width="600">
    </el-table-column>
    <el-table-column
    label="状态"
      >
      <template slot-scope="scope">
          <el-switch
        v-model="scope.row.address"
        @change='myswitch(scope.row)'
        >
        </el-switch>
      </template>
    </el-table-column>
  </el-table>
    </div>
  </el-collapse-item>
  <el-collapse-item title="圆通" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </el-collapse-item>
  <el-collapse-item title="顺丰" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </el-collapse-item>
  <el-collapse-item title="韵达" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
  <el-collapse-item title="全峰" name="5">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
  <el-collapse-item title="百世" name="6">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
  <el-collapse-item title="德邦" name="7">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
</el-collapse>
    </div>
</template>

<script>
  export default {
    data() {
      return {
          value1:1,
        activeNames: ['1'],
        tableData: [{
          date: '1',
          name: '邮政(恒华科技)-线下e邮宝-e特快',
          address: false
        }, {
          date: '2',
          name: '邮政(恒华科技)-线下e邮宝-e邮宝',
          address: false
        }, {
          date: '3',
          name: '邮政(恒华科技)-线下小包(航空挂小包)',
          address: true
        }, {
          date: '4',
          name: '邮政(恒华科技)-线下小包(航空跟踪小包)',
          address: true
        }, 
        {
          date: '5',
          name: '邮政(恒华科技)-线下小包(航空跟踪小包)',
          address: true
        }
        ]
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      myswitch(val){
        console.log(val)
      }
    }
  }
</script>
<style >
  .el-collapse-item__header{
    padding-left: 20px;
  }
</style>