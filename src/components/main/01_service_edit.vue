<template>
    <div style="text-align:left;background:#fff">
        <el-page-header @back="goBack" content="增值服务重新报价"></el-page-header>
        <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="品目编号" prop="pmbh">
                <el-input v-model="ruleForm.pmbh" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="品目名称" prop="pmmc">
                <el-input v-model="ruleForm.pmmc" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="型号名称" prop="xhmc">
                <el-input v-model="ruleForm.pmmc" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="型号编号" prop="xhbh">
                <el-input v-model="ruleForm.xhbh" size="mini"></el-input>
            </el-form-item>
            

            <el-form-item label="服务编号" prop="fwbh">
                <el-input v-model="ruleForm.fwbh" size="mini"></el-input>
            </el-form-item>

            <el-form-item label="服务名称" prop="fwmc">
                <el-input v-model="ruleForm.fwmc" size="mini"></el-input>
            </el-form-item>

            <el-form-item label="服务价格" prop="fwjg">
                <el-input  v-model="ruleForm.fwjg" size="mini"></el-input>
            </el-form-item>
            
            <el-form-item label="修改报价原因" prop="bjyy">
                <el-input type="textarea" v-model="ruleForm.bjyy"></el-input>
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
            search_res:"",
            searchkey:'',
            xhmc_options:'',
            box_show:false,
            ruleForm:{
                    "pmbh": "", 
                    "pmmc": "", 
                    "xhbh": "", 
                    "xhmc": "", 
                    "fwbh": "", 
                    "fwmc": "", 
                    "fwjg": "", 
                    "bjyy": "" 
            },
        rules: {
          
          pmbh: [
            { required: true, message: '请输入品目编号', trigger: 'blur' },
          ],
          pmmc: [
            { required: true, message: '请输入品目名称', trigger: 'blur' },
          ],
          xhbh: [
            { required: true, message: '请输入型号编号', trigger: 'blur' },
          ],
          xhmc: [
            { required: true, message: '请输入型号名称', trigger: 'blur' },
          ],
          pjbh: [
            { required: true, message: '请输入配件编号', trigger: 'blur' },
          ],
          pjmc: [
            { required: true, message: '请输入配件名称', trigger: 'blur' },
          ],
          pjjg:[
              { required: true, message: '请输入配件价格', trigger: 'blur' },
          ],
          bjyy:[
              {  message: '请输入变价原因', trigger: 'blur' },
          ]
        }
        }
    },
    mounted(){
        this.ruleForm=this.$route.params.row
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

                console.log(this.ruleForm)
                let param = new URLSearchParams()
                let obj=this.ruleForm
                Object.keys(obj).forEach(function(key){
                    param.append(key, obj[key])
                })
                this.axios({
                    method: 'post',
                    url: 'api/execute_zzfw',
                    data: param
                }).then((res)=>{
                    loading.close()
                    if(res.data.success==1){
                        this.$message({
                          message: res.data.result,
                          type: 'success'
                        });
                        this.$router.push('/main/service')
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
