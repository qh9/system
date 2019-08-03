<template>
    <div class="login">
        <img src="http://img.zcool.cn/community/038c0a855c49a7b32f8755e66518ec6.gif" alt="">
        <div class="userInfo">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
                <el-input v-model="ruleForm.passWord" type="password"></el-input>
            </el-form-item>
            <div class="check">
                <div @click="rememberNP">
                    <input type="checkbox" :checked="flag" name="" id="">
                    <span>记住密码</span>
                </div>
                <a href="#">忘记密码</a>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
            </el-form>
         </div>
    </div>
</template>

<script>
// import axios from 'axios'
import axios from '@/utils/axiosT'
import cookie from 'js-cookie'
export default {
    data () {
        return {
            restaurants: [],
            ruleForm: {
                userName: '',
                passWord: ''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 2, message: '请输入不少于2个字符', trigger: 'blur' }
                ]
            },
            flag: false
        }
    },
    methods: {
        submitForm (formName) {
            if (this.flag) {
                let arr = {
                    userName: this.ruleForm.userName,
                    passWord: this.ruleForm.passWord
                };
                localStorage.setItem('rememberNP', JSON.stringify(arr));
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('/api/user/login', {
                        user_name: this.ruleForm.userName,
                        user_pwd: this.ruleForm.passWord
                    }).then(res => {
                        cookie.set('token', res.data.token);
                        localStorage.setItem('user_name', this.ruleForm.userName);
                        this.$router.push('/main');
                        this.$store.dispatch('getUserInfo')
                    })
                } else {
                    alert('账号或密码错误');
                    console.log('error submit!!');
                }
            });
        },
        rememberNP () {
            this.flag = !this.flag
        }
    },
    created () {
        if (localStorage.getItem('rememberNP')) {
            let namePwd = JSON.parse(localStorage.getItem('rememberNP'));
            this.ruleForm.userName = namePwd.userName;
            this.ruleForm.passWord = namePwd.passWord;
            this.flag = true;
        } else {
            this.flag = false;
        }
    }
}
</script>

<style scoped>
    .login{
        width:100%;
        height:100%;
        position: relative;
    }
    .login img{
        width:100%;
        height:100%;
        display: block;
    }
    .userInfo{
        width:460px;
        height:310px;
        background: rgba(241, 238, 238,.9);
        position: absolute;
        right:20%;
        top:30%;
        display: flex;
        flex-direction: column;
        padding:40px 0;
    }
    .check,button{
        margin:12px 0;
        margin:25px 0;
    }
    .check{
        width:100%;
        display: flex;
        justify-content: space-between;
    }
    .el-input__inner{
        background: rgb(219, 242, 250);
    }
    .el-input__inner::-webkit-input-placeholder{
        color:rgb(97, 91, 91);
    }
    button{
        width:100%;
        height:35px;
        border:0;
        outline: none;
        background: #1465ba;
        color:#fff;
        border-radius: 5px;
    }
    .el-form{
        width:80%;
        margin:0 10%;
    }
</style>
