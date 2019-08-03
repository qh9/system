<template>
    <div class="addUser">
        <h3>添加用户</h3>
        <ul>
            <li class="lis">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="添加用户" name="first">
                        <el-form :model="ruleForms" :rules="rules" ref="ruleForms" class="demo-ruleForm">
                            <el-form-item prop="userName">
                                <el-input v-model="ruleForms.userName" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item prop="pwd">
                                <el-input v-model="ruleForms.pwd" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="identityId">
                                <el-select v-model="ruleForms.identityId" placeholder="请选择身份id">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.identity_id"
                                    :label="item.identity_text"
                                    :value="item.identity_text">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :plain="true" @click="addUserBtn('ruleForms')">确定</el-button>
                                <el-button @click="resetUserBtn('ruleForms')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="更新用户" name="second">
                        <el-form :model="ruleForms1" :rules="rules" ref="ruleForms1" class="demo-ruleForm">
                            <el-form-item prop="updateUserVaule">
                                <el-select v-model="ruleForms1.updateUserVaule" placeholder="请选择身份id">
                                    <el-option
                                    v-for="item in updateUser"
                                    :key="item.user_id"
                                    :label="item.user_name"
                                    :value="item.user_name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="user_name">
                                <el-input v-model="ruleForms1.user_name" placeholder="请输入账号"></el-input>
                            </el-form-item>
                            <el-form-item prop="user_pwd">
                                <el-input v-model="ruleForms1.user_pwd" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="updateUserInput">
                                <el-select v-model="ruleForms1.updateUserInput" placeholder="请选择身份id">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.identity_id"
                                    :label="item.identity_text"
                                    :value="item.identity_text">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :plain="true" @click="toUpdate('ruleForms1')">立即创建</el-button>
                                <el-button @click="resetUpdate('ruleForms1')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </li>
            <li class="lis">
                <div class="tag-group">
                    <el-tag effect="plain">添加身份</el-tag>
                </div>
                <el-form :model="ruleForms2" :rules="rules" ref="ruleForms2" class="demo-ruleForm">
                    <el-form-item prop="identity">
                        <el-input v-model="ruleForms2.identity" placeholder="请输入身份名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :plain="true" @click="addIdentity('ruleForms2')">确定</el-button>
                        <el-button @click="resetAddIdentity('ruleForms2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </li>
            <li class="lis">
                <div class="tag-group">
                    <el-tag effect="plain">添加api接口权限</el-tag>
                </div>
                <el-form :model="ruleForms3" :rules="rules" ref="ruleForms3" class="demo-ruleForm">
                    <el-form-item prop="interfaceName">
                        <el-input v-model="ruleForms3.interfaceName" placeholder="请输入api接口权限名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="interfaceUrl">
                        <el-input v-model="ruleForms3.interfaceUrl" placeholder="请输入api接口权限url"></el-input>
                    </el-form-item>
                    <el-form-item prop="interfaceMethod">
                        <el-input v-model="ruleForms3.interfaceMethod" placeholder="请输入api接口权限方法"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :plain="true" @click="interfaceBtn('ruleForms3')">确定</el-button>
                        <el-button @click="resetInterface('ruleForms3')">重置</el-button>
                    </el-form-item>
                </el-form>
            </li>
            <li class="lis">
                <div class="tag-group">
                    <el-tag effect="plain">添加视图接口权限</el-tag>
                </div>
                <el-form :model="ruleForms4" :rules="rules" ref="ruleForms4" class="demo-ruleForm">
                    <el-form-item prop="viewPermissionsValue1">
                        <el-select v-model="ruleForms4.viewPermissionsValue1" placeholder="请选择已有视图">
                            <el-option
                            v-for="item in viewPermissions"
                            :key="item.view_authority_id"
                            :label="item.view_authority_text"
                            :value="item.view_authority_text">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :plain="true" @click="viewPermissionsBtn('ruleForms4')">确定</el-button>
                        <el-button @click="resetViewPermissions('ruleForms4')">重置</el-button>
                    </el-form-item>
                </el-form>
            </li>
            <li class="lis">
                <div class="tag-group">
                    <el-tag effect="plain">给身份设置api接口权限</el-tag>
                </div>
                <el-form :model="ruleForms5" :rules="rules" ref="ruleForms5" class="demo-ruleForm">
                    <el-form-item prop="identityInterfaceInput">
                        <el-select v-model="ruleForms5.identityInterfaceInput" placeholder="请选择身份id">
                            <el-option
                            v-for="item in identityInterface"
                            :key="item.api_authority_text"
                            :label="item.api_authority_text"
                            :value="item.api_authority_text">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="identityInterfaceValue">
                        <el-select v-model="ruleForms5.identityInterfaceValue" placeholder="请选择api接口权限">
                            <el-option
                            v-for="item in options"
                            :key="item.identity_id"
                            :label="item.identity_text"
                            :value="item.identity_text">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :plain="true" @click="identityInterfaceBtn('ruleForms5')">确定</el-button>
                        <el-button @click="resetIdentityInterface('ruleForms5')">重置</el-button>
                    </el-form-item>
                </el-form>
            </li>
            <li class="lis">
                <div class="tag-group">
                    <el-tag effect="plain">给身份设置视图权限</el-tag>
                </div>
                <el-form :model="ruleForms6" :rules="rules" ref="ruleForms6" class="demo-ruleForm">
                    <el-form-item prop="viewPermissionsInput">
                        <el-select v-model="ruleForms6.viewPermissionsInput" placeholder="请选择身份id">
                            <el-option
                            v-for="item in options"
                            :key="item.identity_id"
                            :label="item.identity_text"
                            :value="item.identity_text">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="viewPermissionsValue">
                        <el-select v-model="ruleForms6.viewPermissionsValue" placeholder="请选择视图权限id">
                            <el-option
                            v-for="item in viewPermissions"
                            :key="item.view_authority_id"
                            :label="item.view_authority_text"
                            :value="item.view_authority_text">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :plain="true" @click="viewPermissionsBtns('ruleForms6')">确定</el-button>
                        <el-button @click="resetViewPermission('ruleForms6')">重置</el-button>
                    </el-form-item>
                </el-form>
            </li>
        </ul>
    </div>
</template>
<script>
import axiosMethods from '@/utils/axiosMethods';
export default {
    data () {
        return {
            ruleForms: {
                userName: '', // 添加用户——添加用户名
                pwd: '', // 添加用户——添加密码
                identityId: '' // 获取身份id
            },
            ruleForms1: {
                updateUserVaule: '', // 更新用户的身份
                user_name: '', // 更新用户——用户名
                user_pwd: '', // 更次用户——密码
                updateUserInput: '' // 更新用户的身份id
            },
            ruleForms2: {
                identity: '' // 添加身份
            },
            ruleForms3: {
                interfaceName: '', // 添加api接口权限
                interfaceUrl: '',
                interfaceMethod: ''
            },
            ruleForms4: {
                viewPermissionsValue1: '' // 添加api接口权限数据
            },
            ruleForms5: {
                identityInterfaceInput: '',
                identityInterfaceValue: ''
            },
            ruleForms6: {
                viewPermissionsInput: '',
                viewPermissionsValue: ''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '您的密码应该最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符', trigger: 'blur' }
                ],
                identityId: [
                    { required: true, message: '请输入身份id', trigger: 'blur' }
                ],
                updateUserVaule: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                user_name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                user_pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                updateUserInput: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                identity: [
                    { required: true, message: '请输入身份名称', trigger: 'blur' }
                ],
                interfaceName: [
                    { required: true, message: '请输入api接口权限名称', trigger: 'blur' }
                ],
                interfaceUrl: [
                    { required: true, message: '请输入api接口权限url', trigger: 'blur' }
                ],
                interfaceMethod: [
                    { required: true, message: '请输入api接口权限方法', trigger: 'blur' }
                ],
                viewPermissionsValue1: [
                    { required: true, message: '请选择已有视图', trigger: 'blur' }
                ],
                identityInterfaceInput: [
                    { required: true, message: '请选择身份id', trigger: 'blur' }
                ],
                identityInterfaceValue: [
                    { required: true, message: '请选择api接口权限', trigger: 'blur' }
                ],
                viewPermissionsInput: [
                    { required: true, message: '请选择身份id', trigger: 'blur' }
                ],
                viewPermissionsValue: [
                    { required: true, message: '请选择视图权限id', trigger: 'blur' }
                ]
            },
            arr: ['添加用户', '更新用户'],
            ind: 0,
            activeName: 'first',
            options: '', // 身份id
            updateUser: '', // 更新用户的数据，
            viewPermissions: '', // 给身份设置视图权限数据
            identityInterface: '' // 给身份设置api接口权限数据
        }
    },
    mounted () {
        // 身份id
        axiosMethods.get('/api/user/identity').then(res => {
            this.options = res.data.data;
        })
        // 更新用户的身份，
        axiosMethods.get('/api/user/user').then(res => {
            this.updateUser = res.data.data;
        })
        // 给身份设置视图权限
        axiosMethods.get('/api/user/view_authority').then(res => {
            this.viewPermissions = res.data.data;
        })
        // 给身份设置api接口权限
        axiosMethods.get('/api/user/api_authority').then(res => {
            this.identityInterface = res.data.data;
        })
    },
    methods: {
        addUserBtn (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axiosMethods.post('/api/user', {
                        user_name: this.ruleForms.userName,
                        user_pwd: this.ruleForms.pwd,
                        identity_id: this.ruleForms.identityId
                    }).then(res => {
                        console.log(res.data.msg)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetUserBtn (formName) {
            this.$refs[formName].resetFields();
        },
        toUpdate (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axiosMethods.put('/api/user/user', {
                        user_id: this.ruleForms1.user_name,
                        user_name: this.ruleForms1.updateUserVaule,
                        user_pwd: this.ruleForms1.user_pwd,
                        identity_id: this.ruleForms1.updateUserInput
                    }).then(res => {
                        console.log(res.data.msg)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetUpdate (formName) {
            this.$refs[formName].resetFields();
        },
        addIdentity (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axiosMethods.get('/api/user/identity/edit', {
                        identity_text: this.ruleForms2.identity
                    }).then(res => {
                        console.log(res.data.msg)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetAddIdentity (formName) {
            this.$refs[formName].resetFields();
        },
        interfaceBtn (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axiosMethods.get('/api/user/authorityApi/edit', {
                        api_authority_text: this.ruleForms3.interfaceName,
                        api_authority_url: this.ruleForms3.interfaceUrl,
                        api_authority_method: this.ruleForms3.interfaceMethod
                    }).then(res => {
                        console.log(res.data.msg)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetInterface (formName) {
            this.$refs[formName].resetFields();
        },
        viewPermissionsBtn (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axiosMethods.get('/api/user/authorityView/edit', {
                        view_authority_text: this.ruleForms4.viewPermissionsValue1,
                        view_id: 'xpz8cf-xoyd7n'
                    }).then(res => {
                        console.log(res.data.msg)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetViewPermissions (formName) {
            this.$refs[formName].resetFields();
        },
        identityInterfaceBtn (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axiosMethods.post('/api/user/setIdentityApi', {
                        identity_id: this.ruleForms5.identityInterfaceInput,
                        api_authority_id: this.ruleForms5.identityInterfaceValue
                    }).then(res => {
                        console.log(res.data.msg)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetIdentityInterface (formName) {
            this.$refs[formName].resetFields();
        },
        viewPermissionsBtns (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axiosMethods.post('/api/user/setIdentityView', {
                        identity_id: this.ruleForms6.viewPermissionsInput,
                        view_authority_id: this.ruleForms6.viewPermissionsValue
                    }).then(res => {
                        console.log(res.data.msg)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetViewPermission (formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style scoped>
.addUser{
    width:100%;
    height:100%;
}
.addUser ul{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
}
.addUser .lis{
    width:33.2%;
    display: inline-block;
    display: flex;
    flex-direction: column;
    padding:1% 2% 0 1%;
    border:solid 0.5px #bbb;
}
.tag-group {
    margin-bottom:10px;
}
h3{
    padding:20px 0 20px 0;
}
</style>
