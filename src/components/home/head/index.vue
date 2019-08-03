<template>
    <div class="head">
        <el-header>
            <p><img src="@/assets/timg.jpeg" alt=""></p>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-submenu index="1">
                    <template slot="title" class="title">
                        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4118748997,3203935939&fm=26&gp=0.jpg" alt="">
                        <span>{{user_name}}</span>
                    </template>
                    <el-menu-item index="1-1">个人中心</el-menu-item>
                    <el-menu-item index="1-2">我的班级</el-menu-item>
                    <el-menu-item index="1-3">设置</el-menu-item>
                    <el-menu-item index="1-4" @click="logOut">退出登录</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
    </div>
</template>

<script>
import cookie from 'js-cookie'
export default {
    data () {
        return {
            user_name: '',
            flag: false,
            activeIndex: '1'
        }
    },
    created () {
        this.user_name = localStorage.getItem('user_name');
    },
    methods: {
        logOut () {
            cookie.remove('token');
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .head{
        width:100%;
        height:60px;
        flex-shrink: 0;
        box-shadow: 0 2px 7px -1px #ccc;
        position: fixed;
        top:0;
        left:0;
        z-index: 9999;
        background: #fff;
    }
    .el-header{
        width:95%;
        height:100%;
        padding:0 3% 0 5%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }
    .el-header p{
        width:130px;
        margin-top:10px;
    }
    .el-header p img{
        width:100%;
        height:90%;
    }
    .el-menu-demo {
        margin-top:1px;
    }
    .el-menu-demo img{
        width:35px;
        margin-right:10px;
        height:35px;
        border-radius: 50%;
        display: inline-block;
    }
    .title{
        display: flex;
        align-items: center;
    }
</style>
