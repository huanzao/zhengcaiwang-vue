<template>
    <div style="text-align:left;background:#fff">
        <el-page-header @back="goBack" content="订单物流信息"></el-page-header>
        <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            

            <el-form-item label="订单编号" prop="ddbh">
                <el-input v-model="ruleForm.ddbh" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="是否拆单" prop="sfcd">
                
                <template>
                  <el-radio v-model="ruleForm.sfcd" label="1">否</el-radio>
                  <el-radio v-model="ruleForm.sfcd" label="2">是</el-radio>
                </template>

            </el-form-item>

            <el-form-item label="分拆子订单编号" prop="fczddbh">
                <el-input v-model="ruleForm.fczddbh" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="快递公司" prop="kdgs">
                <el-input v-model="ruleForm.kdgs" size="mini"></el-input>
            </el-form-item>

            <el-form-item label="快递单号" prop="kddh">
                <el-input v-model="ruleForm.kddh" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="快递时间" prop="kdsj">
                <el-date-picker
                  v-model="ruleForm.kdsj"
                  type="datetime"
                  is-range="true"
                  value-format='yyyyMMddHHmmss'
                  placeholder="选择日期时间"
                  align="right"
                >
              </el-date-picker>
            </el-form-item>
            
            <el-form-item label="描述" prop="ms">
                <el-input type="textarea" v-model="ruleForm.ms"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

        </el-form>
    </div>
    </div>
</template>
<script>
import { error } from 'util'
export default {
    data(){
        return{
            fczddbh_must:true,
            ruleForm:{
                    "ddbh": "", 
                    "sfcd": "", 
                    "fczddbh": "", 
                    "kdgs": "", 
                    "kddh": "", 
                    "ms": "", 
                    "kdsj": "",
                    "order_id":""
            },
        rules: {
          
          ddbh: [
            { required: true, message: '请输入品目编号', trigger: 'blur' },
          ],
          sfcd: [
            { required: false, message: '请输入品目名称', trigger: 'blur' },
          ],
          fczddbh: [
            
          ],
          kdgs: [
            { required: true, message: '请输入型号名称', trigger: 'blur' },
          ],
          kddh: [
            { required: true, message: '请输入配件编号', trigger: 'blur' },
          ],
          ms: [
            { required: true, message: '请输入配件编号', trigger: 'blur' },
          ],
          kdsj: [
            { required: true, message: '请输入配件名称', trigger: 'blur' },
          ]
        }
        }
    },
    watch: {
      sfcd:function (val) {
          if(val==1){
             console.log(11111)
          }else{
            console.log(2222)
          }
      }
    },
    mounted(){
        console.log(9999,this.$route.params.row)
        var my_time_ms=""
        var my_time_ms_MS=""
        var my_time_ms_TIME=""

        if(this.$route.params.row.ms_and_time){
            my_time_ms=this.$route.params.row.ms_and_time.split(';').reverse()[0].split(',')
            console.log(my_time_ms)
            my_time_ms_MS=my_time_ms[0]
            my_time_ms_TIME=my_time_ms[1]
        }else{
            my_time_ms_MS=""
            my_time_ms_TIME=""
        }
        this.ruleForm.ddbh=this.$route.params.row.ddbh, 
        this.ruleForm.sfcd=this.$route.params.row.sfcd, 
        this.ruleForm.fczddbh=this.$route.params.row.fczddbh, 
        this.ruleForm.kdgs=this.$route.params.row.kdgs, 
        this.ruleForm.kddh=this.$route.params.row.kddh, 
        this.ruleForm.ms=my_time_ms_MS, 
        this.ruleForm.kdsj=my_time_ms_TIME,
        this.ruleForm.order_id=this.$route.params.row.id
    },
    methods:{
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              
              if(this.ruleForm.sfcd==2 && !this.ruleForm.fczddbh){
                    this.$message.error('要拆单的 分拆子订单编号不能为空');
              }else{
                  console.log(this.ruleForm.sfcd,this.ruleForm.fczddbh,'000000000')
                  const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                  });
                  let param = new URLSearchParams()
                  let obj=this.ruleForm
                  Object.keys(obj).forEach(function(key){
                      param.append(key, obj[key])
                  })
                  this.axios({
                      method: 'post',
                      url: 'api/exeLogistics',
                      data: param
                  }).then((res)=>{
                      loading.close()
                      console.log(res.data.result)
                      if(res.data.success==1){
                          this.$message({
                            message: res.data.result,
                            type: 'success'
                          });
                          this.$router.push('/main/order_check')
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goBack() {
        window.history.go(-1)
      }
    
    }
}
</script>
<style scoped>

</style>
