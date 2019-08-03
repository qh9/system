<template>
    <div>
        <h2>阅卷</h2>
        <div class="content">
            <div class="content-left">
                <div v-for="(items,ind) in list.questions" :key="ind" class="items">
                <p class="text">{{items.title}} <span>{{items.questions_type_text}}</span></p>
                <p class="stem">{{items.questions_stem}}</p>
                <div class="anwser">
                   <div>
                       <p>学生答案</p>
                       <p class="color">请输入答案</p>
                    </div>
                    <div>
                        <p>标准答案</p>
                        <P class="color">{{items.questions_answer}}</P>
                    </div>
                </div>
            </div>
            </div>
            <div  class="content-right">
                <p>{{list.student_name}}</p>
                <p>得分：{{value}}</p>
                <el-slider v-model="value"></el-slider>
                <el-button type="primary" @click="centerDialogVisible = true">确定</el-button>
                <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
                <span>
                    确定提交阅卷结果？
                    分数值是{{value}}
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sure">确 定</el-button>
                </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            list: [],
            value: 0,
            centerDialogVisible: false
        }
    },
    created () {
        this.$axios.get('/api/exam/student/' + this.$route.query.id).then(res => {
            this.list = res.data.data
        })
    },
    methods: {
        sure () {
            this.centerDialogVisible = false
            this.$axios.put('/api/exam/student/' + this.$route.query.id, {
                score: this.value
            }).then(res => {
                console.log(res)
                // this.list = res.data.data
            })
        }
    }
}
</script>

<style scoped>
    .content {
        width:100%;
        height:100%;
        display: flex;
    }
    .content-left{
        height: auto;
        width:70%;
    }
    .anwser{
        display: flex;
        width:100%;
        height:auto;
        margin-top: 20px;
    }
    .anwser div{
        width:50%;
    }
    .text{
        line-height: 50px;
    }
    .stem{
      line-height: 40px;
    }
    .items{
        margin-top: 20px;
    }
    .color{
        color:slategrey;
        line-height: 40px;
    }
   .content-right{
       width: 30%;
       height: 300px;
       background: #fff;
       border-radius: 20px;
   }
</style>
