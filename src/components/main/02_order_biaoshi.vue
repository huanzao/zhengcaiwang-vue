<template>
    <div  style="text-align:left;background:#fff">
        <el-page-header @back="goBack" content="订单物流信息"></el-page-header>
        <el-divider></el-divider>
        <el-table
    :data="mess_list"
    style="width: 100%">
    <el-table-column
      label="型号名称"
      prop='XHMC'
      width="250">
    </el-table-column>
    <el-table-column
      label="唯一标识"
      prop='ID'
      width="300">
    </el-table-column>
    <el-table-column
      label="品牌名称"
      prop='PPMC'
      width="180">
    </el-table-column>
    <el-table-column
      label="是否推送"
      width="180">
      <template slot-scope="scope" >
                {{ is_tuisong[scope.$index] | tuisong(is_tuisong[scope.$index]) }}
            </template>
    </el-table-column>

    <el-table-column
      label="配件"
      width="180">
            <template slot-scope="scope" v-if="pj_list[scope.$index]">
                <el-popover trigger="hover" placement="left" >
                    <el-table
                    :data="pj_list[scope.$index]"
                    style="width: 100%">
                    <el-table-column
                        prop="PJMC"
                        label="配件名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="PJJG"
                        label="配件价格"
                        width="180">
                    </el-table-column>
                    </el-table>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium"><span>共</span> {{ pj_list[scope.$index].length }} <span>个配件</span> </el-tag>
                    </div>
                </el-popover>
            </template>
            <template slot-scope="scope" v-if="!pj_list[scope.$index]">无</template>
    </el-table-column>
    <el-table-column
      label="服务"
      width="180">
            <template slot-scope="scope" v-if="fw_list[scope.$index]">
                <el-popover trigger="hover" placement="left">
                    <el-table
                    :data="fw_list[scope.$index]"
                    style="width: 100%">
                    <el-table-column
                        prop="FWMC"
                        label="服务名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="FWJG"
                        label="服务价格"
                        width="180">
                    </el-table-column>
                
                    </el-table>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium"><span>共</span> {{ fw_list[scope.$index].length }} <span>个服务</span> </el-tag>
                    </div>
                </el-popover>
            </template>
            <template slot-scope="scope" v-if="!fw_list[scope.$index]">无</template>
    </el-table-column>


    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type='success' @click="handlePush(scope.$index, scope.row)">推送</el-button>
      </template>
    </el-table-column>
  </el-table> 









    <el-dialog title="请选择上传图片" :visible.sync="dialogFormVisible">
  <el-form>
      <el-form-item label="选择图片" >
          <input type="file" id="upimg">
      </el-form-item>
    <!-- <el-form-item label="收款标志" >
        <el-upload
  class="upload-demo"
  action="https://192.168.0.116:8000/execTsWybs"
  :on-change="handleChange"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item> -->

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="MY_dialogFormVisible">确 定</el-button>
  </div>
</el-dialog>

    </div>
    
</template>
<script>
import { stringify } from 'querystring'
export default {
    
    data(){
        return{
            imgbase:'',
            fw_list:[],
            pj_list:[],
            mess_list:[],
            is_tuisong_show:'',
            is_tuisong:'',
            dialogFormVisible: false,
            click_index:"",
            upform:{
                ddbh:"",
                xhbh:"",
                wybs:""
            }
        }
    },
    mounted(){
        let param = new URLSearchParams()
          param.append('order_id', this.$route.params.id)
          this.axios({
              method: 'post',
              url: 'api/mess_wybs',
              data: param
          }).then((res)=>{
              console.log(res.data)
              this.mess_list=res.data.mess_list
              this.fw_list=res.data.fw_list
              this.pj_list=res.data.pj_list
              if(res.data.is_tuisong){
                  this.is_tuisong=res.data.is_tuisong.split("")
              }  
          })
    },
    filters:{
        tuisong(val){
            if(val==1){
                return '已推送'
            }else if(val==0){
                return '未推送'
            }else{
                return '格式错误'
            }
        }
    },
    methods:{
        edit(value){
            console.log(value)
        },
        handlePush(index, row){
            this.dialogFormVisible=true
            this.click_index=index
            console.log(this.is_tuisong,this.$route.params.ddbh,this.$route.params.id)
            this.upform.ddbh=this.$route.params.ddbh,
            this.upform.xhbh=row.XHBH,
            this.upform.wybs=row.id
        },
       
        MY_dialogFormVisible(){
            this.is_tuisong[this.click_index]=1
            console.log('***************',this.is_tuisong)
            let upload=""

            for(let item of this.is_tuisong){
                upload+=item
            }
            console.log('0000**-提交',upload)
            var img=document.getElementById('upimg')
            console.log('img--input',img.files[0])
            let file = img.files[0];
            if(img.files.lenght!=0){
            let imgbase=this
            var reader = new FileReader();
            let imgkao=""
            reader.onload = ((file)=>{
                console.log(this)
                let that=this
                return function () {
                    var datainfo = this.result;
                    that.$data.imgbase=this.result
                    console.log('666666',datainfo)
                    imgkao=this.result
                        let param = new URLSearchParams()
                        param.append('ddbh', that.$data.upform.ddbh)
                        param.append('xhbh', that.$data.upform.xhbh)
                        param.append('order_id', that.$route.params.id)
                        param.append('is_tuisong', upload)
                        param.append('wybs', that.$data.upform.xhbh)
                        param.append('img',that.$data.imgbase)
                        that.axios({
                            method: 'post',
                            url: 'api/execTsWeybs',
                            data: param
                        }).then((res)=>{
                            that.$data.dialogFormVisible=false
                            if(res.data.success==1){
                                that.$message({
                                message: res.data.result,
                                type: 'success'
                                });
                            }else{
                                that.$message.error(res.data.result);
                            }
                        })
                };
            })(file)
            reader.readAsDataURL(file);
            
            }else{
                 this.dialogFormVisible=false
                 this.$message.error('请选中一个图片');
            }
          


            //   this.axios.post(
            //     'api/execTsWybs', 
            //     this.qs.stringify({
            //         'ddbh':this.upform.ddbh,
            //         'xhbh':this.upform.xhbh,
            //         'order_id':this.$route.params.id,
            //         'is_tuisong':this.is_tuisong,
            //         'wybs':this.upform.xhbh,
            //         'img':'65263'
            //     })
            // ).then((res)=>{
            //     console.log(res)
            //     console.log(999999999)
            // })


        },
        goBack(){
            window.history.go(-1)
        }
    }
}
</script>
<style scoped>
   
</style>
