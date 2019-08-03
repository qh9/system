<template>
    <div class="fenlei">
        <h4>试题分类</h4>
        <div class="content">
           <el-button type="primary text" icon="el-icon-plus" @click="open">添加类型</el-button>
           <el-table
            :data="testList"
            style="width: 100%">
                <el-table-column
                    prop="questions_type_id"
                    label="类型ID"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="questions_type_text"
                    label="类型名称"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="questions_type_sort"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="small"
                        type="danger"
                        @click.native.prevent="deleteRow(scope.row)">删除</el-button>
                        </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            testList: [], // 试题类型列表
            sort: 0 // 添加的试题序号
        }
    },
    methods: {
        /**
         * 弹出框
         */
        open () {
            this.$prompt('请输入类型名称', '创建新类型', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: '',
                inputErrorMessage: ''
            }).then(({ value }) => {
                if (value === null) {
                    alert('类型不能为空')
                } else {
                    this.getData()
                    this.sort++
                    this.$axios.get('/api/exam/insertQuestionsType', { text: value, sort: this.sort }).then(res => {
                        this.getData()
                        if (res.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '已添加新类型: ' + value
                            });
                        }
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        /**
         * 请求试题类型接口
         */
        getData () {
            this.$axios.get('/api/exam/getQuestionsType').then((res) => {
                this.testList = res.data.data
                this.sort = res.data.data.length
            })
        },
        /**
         * 删除指定的试题类型
         */
        deleteRow (row) {
            // console.log(row.questions_type_id);
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/api/exam/delQuestionsType', { id: row.questions_type_id }).then(res => {
                    this.getData()
                    if (res.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    created () {
        this.getData()
    },
    mounted () {

    }
}
</script>
<style scoped>
    .fenlei{
        width: 100%;
        height: auto;
        background: #f0f2f5;
        padding:20px 20px;
        display: flex;
        flex-direction: column;
    }
    h4{
        height: 50px;
        line-height: 50px;
        font-size: 22px;
        font-family: '幼圆';
    }
    .content{
        height: auto;
        background: #fff;
        padding:20px 20px;
        border-radius: 10px;
    }
    .add{
        padding:10px 10px;
        width:150px;
        height: 50px;
        background: rgb(77, 77, 248);
        border-radius: 5px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .add>span:nth-of-type(1){
        margin-right: 10px;
        font-size: 14px;
    }
    .el-button{
        margin-bottom: 30px;
    }
    .el-message-box {
        height: 250px;
    }
    .el-button--text {
        font-size: 14px;
    }
</style>
