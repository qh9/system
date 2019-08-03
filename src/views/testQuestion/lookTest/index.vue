<template>
    <div class="looktest">
        <Card title="查看试卷">
            <White>
                <p>
                    <span>课程类型：</span>
                    <span>All</span>
                    <span class="spanList" v-for="(item, index) in subjectList" :key="index" @click="getChangeBg(item.subject_id)" :class="item.subject_id==subject_id?'active':''">{{item.subject_text}}</span>
                </p>
                <div class="dropdwons">
                    <h6 style="font-size:16px">考试类型：</h6>
                    <el-select v-model="exam_id" placeholder="请选择" style="margin-right:20px">
                        <el-option
                        v-for="(item,index) in examType"
                        :key="index"
                        :label="item.exam_name"
                        :value="item.exam_id">
                        </el-option>
                    </el-select>
                    <h6 style="font-size:16px">题目类型：</h6>
                    <el-select v-model="questions_type_id" placeholder="请选择" style="margin-right:20px">
                        <el-option
                        v-for="(item,index) in questionsType"
                        :key="index"
                        :label="item.questions_type_text"
                        :value="item.questions_type_id">
                        </el-option>
                    </el-select>
                    <h6 style="font-size:16px">出题人：</h6>
                    <el-select v-model="user_id" placeholder="请选择" style="margin-right:20px">
                        <el-option
                        v-for="(item,index) in questionsSetter"
                        :key="index"
                        :label="item.user_name"
                        :value="item.user_id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                </div>
            </White>
            <White>
                <TestList v-if="TestList.length > 0" :TestList = 'TestList' @todetail="todetail" @editdetail="editdetail"></TestList>
                <div v-else style="text-align:center">暂无数据</div>
            </White>
        </Card>
    </div>
</template>
<script>
import Card from '../components/Card'
import White from '../components/White'
import TestList from './components/TestList'
export default {
    components: {
        Card,
        White,
        TestList
    },
    data () {
        return {
            subjectList: [], // 所有的课程类型
            examType: [], // 所有的考试类型
            questionsType: [], // 题目类型
            questionsSetter: [], // 用户权限
            TestList: [], // 试题列表
            questions_type_id: '', // 题目类型的value
            exam_id: '', // 考试类型的value
            user_id: '', // 出题人的value
            subject_id: '',
            id: null
        }
    },
    methods: {
        /**
         * 获取所有的课程类型
         */
        getSubjectList () {
            this.$axios.get('/api/exam/subject').then(res => {
                if (res.data.code === 1) {
                    this.subjectList = res.data.data
                }
            })
        },
        /**
         * 获取所有的考试类型
         */
        getExamType () {
            this.$axios.get('/api/exam/examType').then(res => {
                if (res.data.code === 1) {
                    this.examType = res.data.data
                }
            })
        },
        /**
         * 获取所有的题目类型
         */
        getQuestionsType () {
            this.$axios.get('/api/exam/getQuestionsType').then(res => {
                if (res.data.code === 1) {
                    this.questionsType = res.data.data
                }
            })
        },
        /**
         * 获取出题人
         */
        getIdentity () {
            this.$axios.get('/api/user/user').then(res => {
                if (res.data.code === 1) {
                    this.questionsSetter = res.data.data
                }
            })
        },
        /**
         * 详情页
         */
        todetail (item) {
            this.$router.push({
                path: '/main/questions/detail',
                query: {
                    id: item.json_path
                }
            })
        },
        /**
         * 编辑页
         */
        editdetail (item) {
            this.$router.push({
                path: '/main/editQuestions',
                query: {
                    id: item.questions_id
                }
            })
        },
        /**
         * 搜索功能(按条件查询)
         */
        search () {
            this.$axios.get('/api/exam/questions/new').then(res => {
                if (res.data.code === 1) {
                    if (this.exam_id !== '' && this.subject_id !== '' && this.questions_type_id !== '' && this.user_id !== '') { // 所有条件都满足
                        let arr = res.data.data.filter(item => {
                            if (item.user_id === this.user_id && item.exam_id === this.exam_id && item.subject_id === this.subject_id && item.questions_type_id === this.questions_type_id) {
                                return item
                            }
                        })
                        this.TestList = arr
                    } else if (this.exam_id === '' && this.subject_id === '' && this.questions_type_id === '' && this.user_id !== '') { // 只有出题人满足
                        let arr = res.data.data.filter(item => {
                            if (item.user_id === this.user_id) {
                                return item
                            }
                        })
                        this.TestList = arr
                    } else if (this.exam_id === '' && this.subject_id !== '' && this.questions_type_id === '' && this.user_id !== '') { // 只有课程,出题人满足
                        let arr = res.data.data.filter(item => {
                            if (item.user_id === this.user_id && item.subject_id === this.subject_id) {
                                return item
                            }
                        })
                        this.TestList = arr
                    } else if (this.exam_id !== '' && this.subject_id === '' && this.questions_type_id === '' && this.user_id !== '') { // 只有考试,出题人满足
                        let arr = res.data.data.filter(item => {
                            if (item.user_id === this.user_id && item.exam_id === this.exam_id) {
                                return item
                            }
                        })
                        this.TestList = arr
                    } else if (this.exam_id === '' && this.subject_id === '' && this.questions_type_id !== '' && this.user_id !== '') { // 只有题目,出题人满足
                        let arr = res.data.data.filter(item => {
                            if (item.user_id === this.user_id && item.questions_type_id === this.questions_type_id) {
                                return item
                            }
                        })
                        this.TestList = arr
                    } else { // 课程,考试,题目任意满足（除出题人）
                        let obj = {}
                        if (this.questions_type_id !== '') {
                            obj.questions_type_id = this.questions_type_id
                        }
                        if (this.subject_id !== '') {
                            obj.subject_id = this.subject_id
                        }
                        if (this.exam_id !== '') {
                            obj.exam_id = this.exam_id
                        }
                        this.$axios.get('/api/exam/questions/condition', obj).then(res => {
                            if (res.data.code === 1) {
                                this.TestList = res.data.data
                            }
                        })
                    }
                }
            })
        },
        /**
         * 更改课程背景
         */
        getChangeBg (subjectId) {
            this.subject_id = subjectId
        },
        /**
         * 获取试题列表
         * 相同名字的放在一起
         */
        getTextList () {
            this.$axios.get('/api/exam/questions/new').then(res => {
                if (res.data.code === 1) {
                    let arr = [];// 原数组
                    let newArr = [];// 新数组
                    res.data.data.map(item => {
                        if (arr.indexOf(item.user_name) === -1) {
                            arr.push(item.user_name)
                        }
                    })
                    arr.map(el => {
                        res.data.data.map(item => {
                            if (el === item.user_name) {
                                newArr.push(item)
                            }
                        })
                    })
                    this.TestList = newArr
                }
            })
        }
    },
    created () {
        this.getSubjectList()// 获取所有的课程类型
        this.getExamType()// 获取所有的题目类型
        this.getQuestionsType()// 获取所有的课程类型
        this.getTextList()// 获取所有的试题列表
        this.getIdentity()// 获取身份
    }
}
</script>
<style scoped>
.looktest{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #f0f2f5;
}
.spanList{
    margin:0 3px;
    padding:3px 4px;
}
.dropdwons{
    display: flex;
    align-items: center;
    margin:20px 0;
}
.active{
    color: #fff;
    background: blue;
    border-radius: 5px;
}
</style>
