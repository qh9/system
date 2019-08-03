<template>
    <div class="awatingClass">
        <h2>待批班级</h2>
        <div class="table">
            <el-table
                :data="tabled.tableData.slice((tabled.currentPage-1) * tabled.pageSize,tabled.currentPage*tabled.pageSize)">
                <el-table-column
                label="班级名"
                prop="grade_name">
                </el-table-column>
                <el-table-column
                label="课程名"
                prop="subject_text">
                </el-table-column>
                <el-table-column
                label="阅卷状态">
                </el-table-column>
                <el-table-column
                label="课程名"
                prop="subject_text">
                </el-table-column>
                <el-table-column
                label="教室号"
                prop="room_text">
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
import axiosMethods from '@/utils/axiosMethods';
import Pagination from '@/components/pagination'
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
            currentPage4: 1,
            studentId: ''
        }
    },
    methods: {
        handleDelete (index) {
            this.$router.push({
                name: 'volume',
                params: this.tabled.tableData[index]
            })
        },
        // 十个台阶，两种情况：一次一个台阶，一个两个台阶，跳到十个台阶的所有情况
        onSubmit () {},
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        getStudent () {
            axiosMethods.get('/api/manger/grade').then(res => {
                this.tabled.tableData = res.data.data
            })
        },
        pageSizeBtns (data) {
            this.tabled.pageSize = data;
        },
        currentPageBtns (data) {
            this.tabled.currentPage = data;
        }
    },
    created () {
        this.getStudent()
    }
}
</script>

<style scoped>
    .awatingClass{
        width:100%;
        height:100%;
        background: #f0f2f5;
        display: flex;
        flex-direction: column;
    }
    h2{
        padding:2% 0;
        flex-shrink: 0;
    }
    .table{
        flex: 1;
        width:100%;
        display: inline-block;
        border-radius: 15px;
    }
    .el-table{
        padding:2%;
        border-radius: 15px;
    }
    .el-table-column{
        height:30px;
    }
    .pages{
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        margin:20px 30px 60px 0;
    }
</style>
