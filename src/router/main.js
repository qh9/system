const mainRouters = [{
    path: '/main',
    name: 'main',
    component: () => import('@/views/main'),
    meta: {
        author: ['管理员', '出题者', '浏览者']
    },
    children: [{ // 添加试题
        path: '/main/addQuestions',
        meta: {
            author: ['管理员', '出题者']
        },
        component: () => import('@/views/testQuestion/addTest')
    },
    { // 试题分类
        path: '/main/questionsType',
        meta: {
            author: ['管理员', '出题者']
        },
        component: () => import('@/views/testQuestion/kindTest')
    },
    { // 查看试题
        path: '/main/watchQuestions',
        meta: {
            author: ['管理员', '出题者']
        },
        component: () => import('@/views/testQuestion/lookTest')
    },
    { // 编辑试题
        path: '/main/editQuestions',
        meta: {
            author: ['管理员', '出题者']
        },
        component: () => import('@/views/testQuestion/addTest')
    },
    { // 试题详情页
        path: '/main/questions/detail',
        meta: {
            author: ['出题者']
        },
        component: () => import('@/views/testQuestion/TestDetail')
    },
    { // 添加用户
        path: '/main/addUser',
        meta: {
            author: ['管理员']
        },
        component: () => import('@/views/userManagement/addUser')
    },
    { // 用户展示
        path: '/main/showUser',
        meta: {
            author: ['管理员']
        },
        component: () => import('@/views/userManagement/showUser')
    },
    { // 添加考试
        path: '/main/addExam',
        meta: {
            author: ['管理员', '出题者']
        },
        component: () => import('@/views/examManagement/addExam')
    },
    { // 试卷列表
        path: '/main/testExam',
        meta: {
            author: ['管理员', '出题者']
        },
        component: () => import('@/views/examManagement/testList')
    },
    { // 详情页面
        path: '/main/details',
        name: 'Details',
        meta: {
            author: ['管理员', '出题者']
        },
        component: () => import('@/views/examManagement/details')
    },
    { // 创建页面
        path: '/main/establish',
        meta: {
            author: ['出题者', '管理员']
        },
        component: () => import('@/views/examManagement/establish')
    },
    { // 班级管理
        path: '/main/grade',
        meta: {
            author: ['管理员', '浏览者']
        },
        component: () => import('@/views/classManagement/gradeManagement')
    },
    { // 教室管理
        path: '/main/classroom',
        meta: {
            author: ['管理员', '浏览者']
        },
        component: () => import('@/views/classManagement/classRoom')
    },
    { // 学生管理
        path: '/main/students',
        meta: {
            author: ['管理员']
        },
        component: () => import('@/views/classManagement/students')
    },
    { // 阅卷管理
        path: '/main/examination',
        meta: {
            author: ['管理员', '浏览者']
        },
        component: () => import('@/views/examination/awatingClass')
    },
    { // 批卷
        path: '/main/volume',
        name: 'volume',
        meta: {
            author: ['管理员', '浏览者']
        },
        component: () => import('@/views/examination/volume')
    },
    { // 得分
        path: '/main/score',
        name: 'score',
        meta: {
            author: ['管理员', '浏览者']
        },
        component: () => import('@/views/examination/score')
    }]
}]
export default mainRouters;
