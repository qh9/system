<template>
    <div class="volume">
        <div class="forms">
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="room_text">
                    <el-select v-model="ruleForm.room_text" placeholder="请选择教室号">
                        <el-option v-for="item in allGrade" :key="item.room_id" :label="item.room_text" :value="item.room_text"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="grade_name">
                    <el-select v-model="ruleForm.grade_name" placeholder="班级名">
                        <el-option  v-for="item in allGrade" :key="item.grade_id" :label="item.grade_name" :value="item.grade_name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">查询</el-button>
                    <!-- <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-table
            :data="tabled.tableData.slice((tabled.currentPage-1) * tabled.pageSize,tabled.currentPage*tabled.pageSize)">
                <el-table-column
                label="班级">
                {{className}}
                </el-table-column>
                <el-table-column
                label="姓名"
                prop="student_name">
                </el-table-column>
                <el-table-column
                label="阅卷状态"
                prop="status">
                </el-table-column>
                <el-table-column
                label="开始时间"
                prop="start_time">
                </el-table-column>
                <el-table-column
                label="结束时间"
                prop="end_time">
                </el-table-column>
                <el-table-column
                label="成材率"
                prop="score"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-link type="primary"  @click="handleDelete(scope.$index, scope.row)">批卷</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Pagination :tabled="tabled" @currentPageBtn="currentPageBtns" @pageSizeBtn="pageSizeBtns"></Pagination>
    </div>
</template>
<script>
import Pagination from '@/components/pagination/index'
import axiosMethods from '@/utils/axiosMethods'
export default {
    components: {
        Pagination
    },
    data () {
        return {
            allRoom: [],
            allGrade: [],
            tabled: {
                tableData: [],
                currentPage: 1,
                pageSize: 10
            },
            ruleForm: {
                student_name: '',
                grade_name: '',
                room_text: ''
            },
            arr: [],
            className: '',
            grade_id: '',
            room_id: '',
            rules: {
                student_name: [
                    { required: true, message: '请输入学生姓名', trigger: 'change' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'change' }
                ],
                room_text: [
                    { required: true, message: '请选择教室号', trigger: 'change' }
                ],
                grade_name: [
                    { required: true, message: '请选择班级名', trigger: 'change' }
                ]
            },
            studentId: ''
        }
    },
    methods: {
        handleDelete (index, row) {
            this.$router.push({
                path: '/main/score',
                query: {
                    id: row.exam_student_id
                }
            })
        },
        onSubmit () {
            this.getStudent();
            if (this.ruleForm.room_text === '' && this.ruleForm.grade_name !== '') {
                this.getStudent();
            } else if (this.ruleForm.room_text !== '' && this.ruleForm.grade_name === '') {
                this.tabled.tableData = [];
                axiosMethods.get('/api/exam/student', {
                    pageSize: 1000
                }).then(res => {
                    res.data.exam.map(item => {
                        if (item.grade_id === this.grade_id) {
                            this.tabled.tableData.push(item);
                        }
                    })
                })
            } else if (this.ruleForm.room_text !== '' && this.ruleForm.grade_name !== '') {
                this.tabled.tableData = [];
                axiosMethods.get('/api/exam/student', {
                    pageSize: 1000
                }).then(res => {
                    res.data.exam.map(item => {
                        if (item.grade_id === this.grade_id && item.exam_exam_id === this.room_id) {
                            this.tabled.tableData.push(item);
                        }
                    })
                })
            } else {
                this.getStudent();
            }
        },
        // resetForm (formName) {
        //     this.$refs[formName].resetFields();
        // },
        getStudent () {
            this.tabled.tableData = [];
            axiosMethods.get('/api/exam/student', {
                pageSize: 1000
            }).then(res => {
                res.data.exam.map(item => {
                    if (item.grade_id === this.grade_id) {
                        this.tabled.tableData.push(item);
                    }
                })
            })
        },
        pageSizeBtns (data) {
            this.tabled.pageSize = data;
        },
        currentPageBtns (data) {
            this.tabled.currentPage = data;
        }
    },
    mounted () {
        this.getStudent();
        this.grade_id = this.$route.params.grade_id; // 班级号id
        this.className = this.$route.params.room_text; // 教室号
        this.room_id = this.$route.params.room_id; // 教室号id
        axiosMethods.get('/api/manger/grade').then(res => {
            this.allGrade = res.data.data;
        })
    }
}
</script>
<style scoped>
    .volume {
        width:100%;
        display: flex;
        flex-direction: column;
        background: #f0f2f5;
    }
    .forms{
        width:100%;
        padding:30px 0 30px 40px;
        background: #fff;
        border-radius: 10px;
        margin:5% 0% 1.5% 0%;
        flex-shrink: 0;
    }
    .table{
        width:100%;
        flex: 1;
        border-radius: 10px;
    }
    .el-table{
        border-radius: 10px;
    }
    .el-pagination.is-background .btn-next.disabled, .el-pagination.is-background .btn-next:disabled, .el-pagination.is-background .btn-prev.disabled, .el-pagination.is-background .btn-prev:disabled, .el-pagination.is-background .el-pager li.disabled{
        width:100px;
    }
    .pages{
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
    }
</style>
