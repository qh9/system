import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import error from '@/components/error'
import Login from '@/views/Login'
// import Main from '@/views/main'
// import addQuestion from '@/views/testQuestion/addTest'
// import kindQuestion from '@/views/testQuestion/kindTest'
// import lookQuestion from '@/views/testQuestion/lookTest'
// import addUser from '@/views/userManagement/addUser'
// import showUser from '@/views/userManagement/showUser'
// import addExam from '@/views/examManagement/addExam'
// import testExam from '@/views/examManagement/testList'
// import grade from '@/views/classManagement/gradeManagement'
// import classRoom from '@/views/classManagement/classRoom'
// import students from '@/views/classManagement/students'
// import examination from '@/views/examination/awatingClass'
// import Details from '@/views/examManagement/details'
// import TestDetail from '@/views/testQuestion/TestDetail'// 试题跳转详情页
// import EditTest from '@/views/testQuestion/EditTest'// 试题跳转编辑页
// import Establish from '@/views/examManagement/establish'
// import volume from '@/views/examination/volume'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/error',
            name: 'error',
            component: error
        },
        // {
        //     path: '/main',
        //     name: 'main',
        //     component: Main,
        //     children: [
        //         // 添加试题
        //         {
        //             path: '/main/main-addQuestions',
        //             component: addQuestion
        //         },
        //         // 试题分类
        //         {
        //             path: '/main/main-questionsType',
        //             component: kindQuestion
        //         },
        //         // 查看试题
        //         {
        //             path: '/main/main-watchQuestions',
        //             component: lookQuestion
        //         },
        //         // 编辑试题
        //         {
        //             path: '/main/editQuestions',
        //             component: addQuestion
        //         },
        //         // 试题详情页
        //         {
        //             path: '/main/questions/detail',
        //             component: TestDetail
        //         },
        //         // 添加用户
        //         {
        //             path: '/main/main-addUser',
        //             component: addUser
        //         },
        //         // 用户展示
        //         {
        //             path: '/main/main-showUser',
        //             component: showUser
        //         },
        //         // 添加考试
        //         {
        //             path: '/main/main-addExam',
        //             component: addExam
        //         },
        //         // 试卷列表
        //         {
        //             path: '/main/main-testExam',
        //             component: testExam
        //         },
        //         // 详情页面
        //         {
        //             path: '/main/main-details',
        //             name: 'Details',
        //             component: Details
        //         },
        //         // 创建页面
        //         {
        //             path: '/main/main-establish',
        //             component: Establish
        //         },
        //         // 班级管理
        //         {
        //             path: '/main/main-grade',
        //             component: grade
        //         },
        //         // 教室管理
        //         {
        //             path: '/main/main-classroom',
        //             component: classRoom
        //         },
        //         // 学生管理
        //         {
        //             path: '/main/main-students',
        //             component: students
        //         },
        //         // 阅卷管理
        //         {
        //             path: '/main/main-examination',
        //             component: examination
        //         },
        //         {
        //             path: '/error',
        //             component: Error
        //         },
        //         {
        //             path: '/main/volume',
        //             name: 'volume',
        //             component: volume
        //         }
        //     ]
        // },
        {
            path: '/error',
            component: error
        }
    ]
})
