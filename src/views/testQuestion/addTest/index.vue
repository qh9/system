<template>
    <div class="add">
        <Card title="添加试题">
            <White>
                <div class="examcont">
                    <h5 style="font-size:18px">题目信息</h5>
                    <h6>题干</h6>
                    <el-input class="title" v-model="title" placeholder="请输入题目标题,不超过20个字"></el-input>
                    <h6>题目主题</h6>
                    <quill-editor v-model="questions_stem"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="onEditorChangeStem($event)">
                    </quill-editor>
                    <!--考试类型-->
                    <h6>请选择考试类型</h6>
                    <el-select v-model="exam_id" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in testType"
                        :key="index"
                        :label="item.exam_name"
                        :value="item.exam_id">
                        </el-option>
                    </el-select>
                    <!--课程类型-->
                    <h6>请选择课程类型</h6>
                    <el-select v-model="subject_id" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in subjectType"
                        :key="index"
                        :label="item.subject_text"
                        :value="item.subject_id">
                        </el-option>
                    </el-select>
                    <!--题目类型-->
                    <h6>请选择题目类型</h6>
                    <el-select v-model="questions_type_id" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in questionsType"
                        :key="index"
                        :label="item.questions_type_text"
                        :value="item.questions_type_id">
                        </el-option>
                    </el-select>
                    <!--答案信息-->
                    <h6>答案信息</h6>
                    <quill-editor v-model="questions_answer"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="onEditorChangeAnswer($event)">
                    </quill-editor>
                    <!--提交按钮-->
                    <el-button type="primary" style="margin-top:20px" @click="open">提交</el-button>
                </div>
            </White>
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
            title: '',
            questions_stem: '',
            questions_answer: '',
            editorOption: {
                modules: {
                    toolbar: [
                        [{'header': 1}, {'header': 2}], //  标题，键值对的形式；1、2表示字体大小
                        [{'color': []}, {'background': []}], // 字体颜色，字体背景颜色
                        [{'align': []}], // 对齐方式
                        ['clean'], // 清除字体样式
                        ['link', 'image', 'video'] // 上传图片、上传视频
                    ]
                }
            },
            testType: [], // 考试类型
            exam_id: '',
            subjectType: [], // 课程类型
            subject_id: '',
            questionsType: [], // 题目类型
            questions_type_id: '',
            user_id: '', // 用户id
            questions_id: '',
            num: 1// 告诉页面是添加页面
        }
    },
    computed: {
        editor () {
            return this.$refs.myQuillEditor.quill
        }
    },
    methods: {
        /**
         * 提交按钮
         */
        open () {
            if (this.questions_type_id !== '' && this.questions_stem !== '' && this.subject_id !== '' && this.exam_id !== '' && this.user_id !== '' && this.questions_answer !== '' && this.title !== '') {
                const h = this.$createElement;
                this.$msgbox({
                    title: '你确定要添加这道试题吗?',
                    message: h('p', null, [
                        h('span', null, '真的要添加吗?')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            if (this.num === 1) { // 告诉页面是添加页面
                                let obj = {
                                    questions_type_id: this.questions_type_id,
                                    questions_stem: this.questions_stem,
                                    subject_id: this.subject_id,
                                    exam_id: this.exam_id,
                                    user_id: this.user_id,
                                    questions_answer: this.questions_answer,
                                    title: this.title
                                };
                                /**
                                 * 添加试题
                                 */
                                this.$axios.post('/api/exam/questions', obj).then(res => {
                                    if (res.data.code === 1) {
                                        instance.confirmButtonLoading = true;
                                        setTimeout(() => {
                                            done();
                                            setTimeout(() => {
                                                instance.confirmButtonLoading = false;
                                            }, 300);
                                        }, 3000);
                                        alert(res.data.msg);
                                        this.$message({
                                            message: res.data.msg,
                                            type: 'success'
                                        });
                                    }
                                });
                            } else if (this.num === 2) { // 告诉页面是编辑页面
                                let obj = {
                                    questions_id: this.questions_id,
                                    title: this.title,
                                    questions_type_id: this.questions_type_id,
                                    subject_id: this.subject_id,
                                    questions_stem: this.questions_stem,
                                    questions_answer: this.questions_answer,
                                    exam_id: this.exam_id
                                };
                                /**
                                 * 更新试题
                                 */
                                this.$axios.put('/api/exam/questions/update', obj).then(res => {
                                    if (res.data.code === 1) {
                                        instance.confirmButtonLoading = true;
                                        setTimeout(() => {
                                            done(res.data);
                                            setTimeout(() => {
                                                instance.confirmButtonLoading = false;
                                            }, 300);
                                        }, 3000);
                                        alert(res.data.msg);
                                    } else if (res.data.code === 0) {
                                        setTimeout(() => {
                                            done(res.data.data);
                                            setTimeout(() => {
                                                instance.confirmButtonLoading = false;
                                            }, 300);
                                        }, 3000);
                                        this.$message({
                                            message: res.data.msg,
                                            type: 'warning'
                                        });
                                    }
                                });
                            }
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$message({
                        type: 'info',
                        message: 'action: ' + action
                    });
                });
            } else {
                alert('参数不能为空')
            }
        },
        onEditorChangeStem ({ text }) {
            // console.log('editor change!', quill, html, text)
            this.questions_stem = text
        },
        onEditorChangeAnswer ({ text }) {
            // console.log('editor change!', quill, html, text)
            this.questions_answer = text
        },
        // onEditorChange (e, str) {
        //     // 编辑器文本发生变化
        //     // this.content可以实时获取到当前编辑器内的文本内容
        //     // console.log('editor change!', quill, html, text)
        //     // console.log(e.text, str)
        //     if (str === 'step') {
        //         this.questions_stem = e.text;
        //     } else if (str === 'answer') {
        //         this.questions_answer = e.text;
        //     }
        // },
        /**
         * 考试类型
         */
        getTestType () {
            this.$axios.get('/api/exam/examType').then(res => {
                if (res.data.code === 1) {
                    this.testType = res.data.data
                }
            })
        },
        /**
         * 课程类型
         */
        getSubjectType () {
            this.$axios.get('/api/exam/subject').then(res => {
                if (res.data.code === 1) {
                    this.subjectType = res.data.data
                }
            })
        },
        /**
         * 题目类型
         */
        getQuestionType () {
            this.$axios.get('/api/exam/getQuestionsType').then(res => {
                if (res.data.code === 1) {
                    this.questionsType = res.data.data
                }
            })
        },
        /**
         * 获取用户id,得到登录的用户
         */
        getUserId () {
            this.$axios.get('/api/user/userInfo').then(res => {
                if (res.data.code === 1) {
                    this.user_id = res.data.data.user_id
                }
            })
        },
        /**
         * 编辑页面
         */
        getEditTest () {
            this.$axios.get('/api/exam/questions/new').then(res => {
                if (res.data.code === 1) {
                    let test = res.data.data.filter(item => {
                        if (item.questions_id === this.$route.query.id) {
                            return item
                        }
                    })
                    let every = test[0]// 当前试题
                    this.questions_id = every.questions_id
                    this.questions_type_id = every.questions_type_id
                    this.questions_stem = every.questions_stem
                    this.subject_id = every.subject_id
                    this.exam_id = every.exam_id
                    this.user_id = every.user_id
                    this.questions_answer = every.questions_answer
                    this.title = every.title
                    this.num = 2
                }
            })
        }
    },
    created () {
        this.getTestType()
        this.getSubjectType()
        this.getQuestionType()
        this.getUserId()
        this.getEditTest()
    }
}
</script>
<style scoped>
.add{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #f0f2f5;
}
.ql-container{
    height: 200px!important;
}
.el-message{
    top: 200px;
}

h6{
    font-size: 16px;
    height: 50px;
    line-height: 50px;
}
</style>
