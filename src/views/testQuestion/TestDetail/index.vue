<template>
    <div class="detail">
        <Card title='试题详情' class="layout">
            <div class="box">
                <White>
                    <p style="color:#595959;margin-bottom:10px">出题人：{{item.user_name}}</p>
                    <h4>题目信息</h4>
                    <p style="margin:15px 0">
                        <el-button type="primary" size="mini" style="color:#189DFF;background:#E6F7FF;border:1px solid #189DFF">{{item.questions_type_text}}</el-button>
                        <el-button type="primary" size="mini" style="color:#DEB0EC;background:#F0F5FF;border:1px solid #DEB0EC">{{item.subject_text}}</el-button>
                        <el-button type="primary" size="mini" style="color:#FCA916;background:#FFF7E6;border:1px solid #FCA916">{{item.exam_name}}</el-button>
                    </p>
                    <p style="margin-bottom:10px">
                        {{item.title}}
                    </p>
                    <div style="color:#333">
                        {{item.questions_stem}}
                    </div>
                </White>
                <White>
                    <h4>答案信息：</h4>
                    {{item.questions_answer}}
                </White>
            </div>
        </Card>
    </div>
</template>
<script>
import Card from '../components/Card'
import White from '../components/White'
export default {
    components: {
        Card,
        White
    },
    data () {
        return {
            item: {}
        }
    },
    created () {
        let jsonPath = this.$route.query.id;
        this.$axios.get('/api/exam/questions/new').then(res => {
            if (res.data.code === 1) {
                let item = res.data.data.filter(item => {
                    if (item.json_path === jsonPath) {
                        return item
                    }
                })
                this.item = item[0]
            }
        })
    }
}
</script>
<style scoped>
.detail{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #f0f2f5;
}
.box{
    width:100%;
    display: flex;
    justify-content: space-around;
}
</style>
