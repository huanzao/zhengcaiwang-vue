<template>
    <div style="text-align:left;background:#fff">
        <el-page-header @back="goBack" content="订单物流信息"></el-page-header>
        <div style="width:60%;padding:20px 0 20px 0">
        
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            

            <el-form-item label="订单编号" prop="ddbh">
                <el-input v-model="ruleForm.ddbh" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="是否拆单" prop="sfcd">
                <el-input v-model="ruleForm.sfcd" size="mini"></el-input>
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
                <el-input  v-model="ruleForm.kdsj" size="mini"></el-input>
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
export default {
    data(){
        return{
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
            { required: true, message: '请输入品目名称', trigger: 'blur' },
          ],
          fczddbh: [
            { required: true, message: '请输入型号编号', trigger: 'blur' },
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
    mounted(){
        console.log(this.$route)
        this.ruleForm.ddbh=this.$route.params.row.ddbh, 
        this.ruleForm.sfcd=this.$route.params.row.sfcd, 
        this.ruleForm.fczddbh=this.$route.params.row.fczddbh, 
        this.ruleForm.kdgs=this.$route.params.row.kdgs, 
        this.ruleForm.kddh=this.$route.params.row.kddh, 
        this.ruleForm.ms=this.$route.params.row.ms, 
        this.ruleForm.kdsj=this.$route.params.row.kdsj,
        this.ruleForm.order_id=this.$route.params.row.id
    },
    methods:{
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
                        this.$router.push('/main/order')
                    }else{
                        this.$message.error(res.data.result);
                    }
                }).catch(()=>{
                    this.$notify.error({
                      title: '错误',
                      message: '政府网站崩溃，请稍后再试'
                    })
                })
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
        this.$router.push({name: 'goods'})
      }
    
    }
}
</script>
<style scoped>

</style>
