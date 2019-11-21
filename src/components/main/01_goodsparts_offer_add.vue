<template>
    <div style="text-align:left;background:#fff">
        <el-page-header @back="goBack" content="添加商品配件报价"></el-page-header>
        <el-divider></el-divider>
        <div class="srarch_result">
              <el-input placeholder="请输入品目名称" size="mini" v-model="searchkey" @keyup.enter.native="search" class="input-with-select">
               
                <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
              </el-input>
              <ul v-if='box_show' class="ulstyle">
                  <li v-for="(item,key)  in search_res"  :key='key' @click='liclick(item)'>
                    <span>{{ item.pmbh }}</span> 
                    <span>{{ item.pmmc }}</span>
                    <span>{{ item.pjmc }}</span>
                  </li>
              </ul>
          </div>

        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="品目编号" prop="pmbh">
                <el-input v-model="ruleForm.pmbh" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="品目名称" prop="pmmc">
                <el-input v-model="ruleForm.pmmc" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="型号名称" prop="xhmc">
                <!-- <el-input v-model="ruleForm.xhmc" size="mini"></el-input> -->
                <el-select v-model="ruleForm.xhmc" size="mini" class="myselect" filterable placeholder="请选择" @change='xhmc_xhbh(ruleForm.xhmc)' >
                  <el-option
                    v-for="(item,ley) in xhmc_options"   
                    :key="ley"
                    :label="item.xhmc"
                    :value="item.xhmc">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="型号编号" prop="xhbh">
                <el-input v-model="ruleForm.xhbh" size="mini"></el-input>
            </el-form-item>
            

            <el-form-item label="配件编号" prop="pjbh">
                <el-input v-model="ruleForm.pjbh" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="配件名称" prop="pjmc">
                <el-input v-model="ruleForm.pjmc" size="mini"></el-input>
            </el-form-item>

            <el-form-item label="配件价格" prop="pjjg">
                <el-input  v-model="ruleForm.pjjg" size="mini"></el-input>
            </el-form-item>
            
            <el-form-item style="margin-top:25px" label="修改报价原因" prop="bjyy">
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
                    "pjbh": "", 
                    "pjmc": "", 
                    "pjjg": "", 
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
            
    },
    methods:{
        liclick(value){
            this.box_show=false
            this.ruleForm.pmbh=value.pmbh
            this.ruleForm.pmmc=value.pmmc
            this.ruleForm.pjbh=value.pjbh
            this.ruleForm.pjmc=value.pjmc
            let param = new URLSearchParams()
            param.append('pmbh', value.pmbh)
            this.axios({
                method: 'post',
                url: 'api/search_pmmc',
                data: param
            }).then((res)=>{
                console.log(999,res.data)
                if(res.data.result.length==0){
                    this.$message("暂无数据");
                    this.box_show=false
                }else{
                    this.xhmc_options=res.data.result
                }
            }).catch((res)=>{
                console.log(res)
            })

        },
        xhmc_xhbh(value){
            console.log(111111,value)
            console.log(222222,this.xhmc_options)
            let key_val=value
            let arr=this.xhmc_options
            var newArr = arr.filter(item => item.xhmc==key_val)  
            console.log(newArr)
            this.ruleForm.xhbh=newArr[0].xhbh
        },
        search(){
            let param = new URLSearchParams()
            param.append('pmmc', this.searchkey)
            this.axios({
                method: 'post',
                url: 'api/search_pmmc',
                data: param
            }).then((res)=>{
                console.log(res.data)
                if(res.data.result.length==0){
                    this.$message("暂无数据");
                    this.box_show=false
                }else{
                    this.search_res=res.data.result
                    this.area_options=res.data.xhbh_xhmc
                    this.box_show=true
                }
            }).catch((res)=>{
                console.log(res)
            })
        },
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
                    url: 'api/execute_pj',
                    data: param
                }).then((res)=>{
                    loading.close()
                    console.log(res.data.result)
                    if(res.data.success==1){
                        this.$message({
                          message: res.data.result,
                          type: 'success'
                        });
                        this.$router.push('/main/goodsparts_offer')
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
            window.history.go(-1)
      }
    
    }
}
</script>
<style scoped>

</style>
