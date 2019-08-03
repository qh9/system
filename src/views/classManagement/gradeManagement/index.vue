
<template>
    <div>
        <h2 class="class">班级管理</h2>
        <div class="table-addClass">
        <el-button type="primary" icon="el-icon-plus"  @click="handleEdit(null,'add')">添加班级</el-button>
        <el-dialog title="添加班级" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="班级名" prop="name">
                    <el-input v-model="ruleForm.name" :disabled="disable"></el-input>
                </el-form-item>
                <el-form-item label="教室号" prop="room_text">
                    <el-select v-model="ruleForm.room_text" placeholder="请选择教室号">
                        <el-option v-for="item in list" :key="item.room_id" :label="item.room_text" :value="item.room_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程名" prop="regions">
                    <el-select v-model="ruleForm.regions" placeholder="请选择课程名">
                        <el-option v-for="item in subject" :key="item.subject_id" :label="item.subject_text" :value="item.subject_id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </div>
        </el-dialog>
         <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                id="grade_id"
                label="班级名"
                prop="grade_name"
                width="180">
            </el-table-column>
            <el-table-column
                id="subject_id"
                label="课程名"
                prop="subject_text"
                width="400">
            </el-table-column>
            <el-table-column
                id="room_id"
                label="教室号"
                prop="room_text"
                width="200">
            </el-table-column>
            <el-table-column label="操作" width="150">
            <template slot-scope="scope">
                <el-link type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-link>|
                <el-link type="primary"  @click="handleDelete(scope.$index, scope.row)">删除</el-link>
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
            tableData: [],
            list: [],
            subject: [],
            lists: [],
            dialogTableVisible: false,
            dialogFormVisible: false,
            disable: false,
            ruleForm: {
                name: '',
                room_text: '',
                regions: ''
            },
            value: '',
            grade_id: '',
            room_id: '',
            subject_id: '',
            grade_name: '',
            room: '',
            subjects: '',
            flag: false,
            formLabelWidth: '120px',
            rules: {
                name: [
                    { required: true, message: '请输入班级名', trigger: 'change' },
                    { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'change' }
                ],
                room_text: [
                    { required: true, message: '请选择教室号', trigger: 'change' }
                ],
                regions: [
                    { required: true, message: '请选择课程名', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        dialogFormvis () {
            this.dialogFormVisible = true;
        },
        submitForm (formName) {
            this.subjects = this[formName].regions
            this.room = this[formName].room_text
            if (!this.flag) {
                this.$axios.post('/api/manger/grade', {
                    grade_name: this.ruleForm.name,
                    subject_id: this.subjects,
                    room_id: this.room
                }).then(res => {
                    if (res.data.code === 1) {
                        alert(res.data.msg)
                        this.getData()
                    }
                })
            } else {
                this.$axios.put('/api/manger/grade/update', {
                    grade_id: this.grade_id,
                    grade_name: this.grade_name,
                    subject_id: this.subjects,
                    room_id: this.room
                }).then(res => {
                    console.log(res)
                    if (res.data.code === 1) {
                        alert(res.data.msg)
                        this.getData()
                    }
                })
            }
            this.dialogFormVisible = false
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleEdit (index, row) {
            if (row === 'add') {
                this.disable = false
            } else {
                this.disable = true
                this.ruleForm.name = row.grade_name
                this.ruleForm.room_text = row.room_text
                this.ruleForm.regions = row.subject_text
                this.grade_id = row.grade_id
                this.room_id = row.room_id
                this.subject_id = row.subject_id
                this.grade_name = row.grade_name
                this.flag = true
            }
            this.dialogFormVisible = true
        },
        handleDelete (index, row) {
            this.$axios.delete('/api/manger/grade/delete', {
                grade_id: row.grade_id
            }).then(res => {
                alert(res.data.msg)
                this.getData()
            })
        },
        getData () {
            this.$axios.get('/api/manger/grade').then(res => {
                this.tableData = res.data.data
            })
        }
    },
    mounted () {
        this.getData()
        this.$axios.get('/api/manger/room').then(res => {
            this.list = res.data.data
        })
        this.$axios.get('/api/exam/subject').then(res => {
            this.subject = res.data.data
        })
    }
}
</script>

<style scoped>
    .table-addClass{
        padding:20px;
        box-sizing: border-box;
        background:#fff;
        margin-top:20px;
        border-radius:10px;
    }
</style>

