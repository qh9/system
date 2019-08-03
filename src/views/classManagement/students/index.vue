<template>
    <div>
        <h2>学生管理</h2>
        <div class="table-student">
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="student_name">
                    <el-input v-model="ruleForm.student_name" placeholder="输入学生姓名"></el-input>
                </el-form-item>
                <el-form-item prop="student_id">
                    <el-input v-model="ruleForm.student_id" placeholder="输入学生学号"></el-input>
                </el-form-item>
                <el-form-item prop="room_text">
                    <el-select v-model="ruleForm.room_text" placeholder="请选择教室号">
                        <el-option v-for="item in allRoom" :key="item.room_id" :label="item.room_text" :value="item.room_text"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="grade_name">
                    <el-select v-model="ruleForm.grade_name" placeholder="班级名">
                        <el-option  v-for="item in allGrade" :key="item.grade_id" :label="item.grade_name" :value="item.grade_name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="fileList.length ? slicList(fileList.slice((currentPage - 1) * pageSize, currentPage * pageSize)) : slicList(allData.slice((currentPage - 1) * pageSize, currentPage * pageSize))"
                style="width: 100%">
                <el-table-column
                label="姓名"
                prop="student_name"
                >
                </el-table-column>
                <el-table-column
                label="学号"
                prop="student_id"
                >
                </el-table-column>
                <el-table-column
                label="班级"
                prop="grade_name"
                >
                </el-table-column>
                <el-table-column
                label="教室"
                prop="room_text"
                >
                </el-table-column>
                <el-table-column
                label="密码"
                prop="student_pwd"
                >
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-link type="primary"  @click="handleDelete(scope.$index, scope.row)">删除</el-link>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,20,30,40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="fileList.length ? fileList.length : allData.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            ruleForm: {
                student_name: '',
                grade_name: '',
                room_text: '',
                student_id: ''
            },
            rules: {
                student_name: [
                    { required: true, message: '请输入学生姓名', trigger: 'change' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'change' }
                ],
                student_id: [
                    { required: true, message: '请输入学生姓名', trigger: 'change' },
                    { min: 1, max: 20, message: '长度在 1 到 5 个字符', trigger: 'change' }
                ],
                room_text: [
                    { required: true, message: '请选择教室号', trigger: 'change' }
                ],
                grade_name: [
                    { required: true, message: '请选择班级名', trigger: 'change' }
                ]
            },
            tableData: [],
            allRoom: [],
            allGrade: [],
            allData: [],
            fileList: [],
            pageSize: 10,
            currentPage: 1,
            studentId: ''
        }
    },
    computed: {
        slicList () {
            let {currentPage, pageSize} = this
            return list => {
                if (list.length) {
                    return list
                }
                return this.allData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            }
        }
    },
    methods: {
        handleSizeChange (val) {
            this.pageSize = val
        },
        handleCurrentChange (val) {
            this.currentPage = val
        },
        // 删除学生
        handleDelete (index, row) {
            this.studentId = row.student_id
            this.$axios.delete('/api/manger/student/' + this.studentId).then(res => {
                if (res.data.code === 1) {
                    alert(res.data.msg)
                    this.getStudent()
                }
            })
        },
        onSubmit () {
            var obj = JSON.parse(JSON.stringify(this.ruleForm)) // 拷贝
            var arr = []
            // for (var k in obj) {
            //     if (!obj[k]) {
            //         delete obj[k]
            //     }
            // }
            // var arr = this.tableData.filter(item => (
            //     Object.keys(obj).every(el => (
            //         item[el] && item[el] === obj[el]
            //     ))
            // ))
            if (obj.student_name === '' && obj.student_id === '' && obj.room_text === '' && obj.grade_name === '') {
                arr = this.allData
                this.allData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            } else {
                this.allData.filter(item => {
                    if (item.student_id.includes(obj.student_id) && item.student_name.includes(obj.student_name) && item.grade_name.includes(obj.grade_name) && item.room_text.includes(obj.room_text)) {
                        arr.push(item)
                    }
                })
                this.fileList = arr
            }
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        getStudent () {
            this.$axios.get('/api/manger/student').then(res => {
                this.tableData = res.data.data
                this.allData = res.data.data
            })
        }
    },
    created () {
        this.getStudent()
        this.$axios.get('/api/manger/room').then(res => {
            this.allRoom = res.data.data
        })
        this.$axios.get('/api/manger/grade').then(res => {
            this.allGrade = res.data.data
        })
    }
}
</script>

<style scoped>
    .table-student{
        margin-top:20px;
        width: 100%;
    }
    .demo-ruleForm{
        display: flex;
    }
    .block{
        position: relative;
    }
    .el-pagination{
        position: absolute;
        right:20;
    }
</style>
