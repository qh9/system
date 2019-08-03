<template>
  <div class="wrapper">
    <h3>添加考试</h3>
    <main>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="试卷名称：" prop="name">
          <el-input v-model="ruleForm.name" class="el-input-name"></el-input>
        </el-form-item>
        <el-form-item label="选择考试类型：" style="width:60%" prop="region1">
          <el-select v-model="ruleForm.region1" placeholder="请选择考试类型" @change="test">
            <el-option
              v-for="item in options1"
              :key="item.exam_id"
              :value="item.exam_name"
              :label="item.exam_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择课程：" prop="region2">
          <el-select v-model="ruleForm.region2" placeholder="请选择课程" @change="lesson">
            <el-option
              v-for="item in options2"
              :key="item.subject_id"
              :value="item.subject_text"
              :label="item.subject_text"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置题量" prop="number">
          <el-input-number v-model="ruleForm.number" controls-position="right" :min="3" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="考试时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="ruleForm.date1"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
              >‘</el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker
                v-model="ruleForm.date2"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>
<script>
// import { Message } from 'element-ui'
export default {
    data () {
        return {
            ruleForm: {
                name: '',
                region1: '',
                region2: '',
                date1: '',
                date2: '',
                delivery: false
            },
            rules: {
                name: [
                    { required: true, message: '请输入题名', trigger: 'blur' }
                ],
                region1: [
                    { required: true, message: '请选择考试类型', trigger: 'change' }
                ],
                region2: [
                    { required: true, message: '请选择课程', trigger: 'change' }
                ],
                number: [
                    { required: true, message: '请选择题量', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ]
            },
            options1: [],
            options2: [],
            testId: '',
            subjectId: '',
            list: [],
            dataList: []
        };
    },
    methods: {
        test () {
            this.options1.forEach(item => {
                if (item.exam_name === this.ruleForm.region1) {
                    this.testId = item.exam_id;
                }
            })
        },
        lesson () {
            this.options2.forEach(item => {
                if (item.subject_text === this.ruleForm.region2) {
                    this.subjectId = item.subject_id;
                }
            })
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const _this = this
                    if (this.ruleForm.date1 < this.ruleForm.date2) {
                        this.$axios.post('/api/exam/exam', {
                            subject_id: this.subjectId,
                            exam_id: this.testId,
                            title: this.ruleForm.name,
                            number: this.ruleForm.number,
                            start_time: new Date(_this.ruleForm.date1).getTime(),
                            end_time: new Date(_this.ruleForm.date2).getTime()
                        }).then(res => {
                            this.dataList = res.data.data;
                            localStorage.setItem('addList', JSON.stringify(this.dataList))
                            this.list = res.data.data;
                            this.$router.push({
                                path: '/main/establish',
                                query: this.list
                            });
                        })
                    } else {
                        this.$message('警告：结束时间不能小于开始时间')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    created () {
        this.$axios.get('/api/exam/examType').then(res => {
            this.options1 = res.data.data;
        })
        this.$axios.get('/api/exam/subject').then(res => {
            this.options2 = res.data.data;
        })
    }
}

</script>
<style scoped>
.wrapper {
  width: 100%;
  height: auto;
  color: rgb(44, 43, 43);
  background: #f0f2f5;
}
h3 {
  height: 100px;
  line-height: 100px;
  margin-left: 15px;
}
main {
  width: 96%;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  margin-left: 15px;
}
.el-form {
  padding-top: 20px;
}
.el-form-item {
  height: 80px;
}
.el-input-name {
  width: 400px;
}
.el-select {
  width: 200px;
}
.el-input-questions {
  width: 120px;
}
.el-form-item__label {
  width: 300px !important;
}
.el-input__inner {
  margin-left: 50px;
}
</style>
