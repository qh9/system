<template>
    <div>
        <h2>教室管理</h2>
        <div class="table-classroom">
            <el-button type="primary" icon="el-icon-plus"  @click="dialogForm">添加教室</el-button>
            <el-table
                :data="tableData"
                style="width: 100%"
                >
                <el-table-column
                label="教室号"
                id="room_id"
                prop="room_text">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-link type="primary"  @click="handleDelete(scope.$index, scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="添加班级" :visible.sync="dialogFormVisible">
               <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="密码" prop="pass">
                        <el-input type="text" v-model="numberValidateForm.age" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
            dialogTableVisible: false,
            dialogFormVisible: false,
            numberValidateForm: {
                age: ''
            },
            rules: {
                age: [
                    { validator: 'checkAge', trigger: 'blur' }
                ]
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        handleDelete (index, row) {
            this.$axios.delete('/api/manger/room/delete', {
                room_id: row.room_id
            }).then(res => {
                if (res.data.code === 1) {
                    alert(res.data.msg)
                    this.getData()
                }
            })
        },
        submitForm (formName) {
            this.$axios.post('/api/manger/room', {
                room_text: this.numberValidateForm.age
            }).then(res => {
                if (res.data.code === 1) {
                    alert(res.data.msg)
                    this.getData()
                }
            })
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    this.dialogFormVisible = false
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            // this.dialogFormVisible = false
        },
        dialogForm () {
            this.dialogFormVisible = true
        },
        getData () {
            this.$axios.get('/api/manger/room').then(res => {
                this.tableData = res.data.data
            })
        }
    },
    created () {
        this.getData()
    }
}
</script>

<style scoped>
    .table-classroom{
        padding:20px;
        box-sizing: border-box;
        background:#fff;
        margin-top:20px;
        border-radius:10px;
    }
</style>
