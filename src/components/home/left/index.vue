<template>
    <div class="left-content">
      <el-aside width="200px">
            <el-menu
              class="el-menu-vertical-demo"
              background-color="#2b2a2a"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i><span>试卷管理</span></template>
              <el-menu-item-group>
                <router-link to="/main/addQuestions" tag="p">
                    添加试题
                </router-link>
              </el-menu-item-group>
              <el-menu-item-group>
                <router-link to="/main/questionsType" tag="p">
                    试题分类
                </router-link>
              </el-menu-item-group>
              <el-menu-item-group>
                <router-link to="/main/watchQuestions" tag="p">
                    查看试题
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i><span>用户管理</span></template>
              <el-menu-item-group>
                <router-link to="/main/addUser" tag="p">
                    添加用户
                </router-link>
              </el-menu-item-group>
              <el-menu-item-group>
                <router-link to="/main/showUser" tag="p">
                    用户展示
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i><span>考试管理</span></template>
              <el-menu-item-group>
                <router-link to="/main/addExam" tag="p">
                    添加考试
                </router-link>
              </el-menu-item-group>
              <el-menu-item-group>
                <router-link to="/main/testExam" tag="p">
                    试卷列表
                </router-link>
              </el-menu-item-group>
            </el-submenu>
              <el-submenu index="4">
              <template slot="title"><i class="el-icon-camera"></i><span>班级管理</span></template>
              <el-menu-item-group>
                <router-link to="/main/grade" tag="p">
                    班级管理
                </router-link>
              </el-menu-item-group>
              <el-menu-item-group>
                <router-link to="/main/classroom" tag="p">
                    教室管理
                </router-link>
              </el-menu-item-group>
              <el-menu-item-group>
                <router-link to="/main/students" tag="p">
                    学生管理
                </router-link>
              </el-menu-item-group>
            </el-submenu>
              <el-submenu index="5">
              <template slot="title"><i class="el-icon-star-off"></i><span>阅卷管理</span></template>
              <el-menu-item-group>
                <router-link to="/main/examination" tag="p">
                    待批试卷
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
      </el-aside>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    created () {
    // view_authority
    },
    methods: {}
}
</script>

<style scoped>
  .left-content{
    width:200px;
    height: 100%;
    flex-shrink: 0;
    background:#2b2a2a;
  }
  span{
    color:white;
  }
  p{
    text-align: center;
    line-height: 50px;
    color:#fff;
  }
  .el-menu{
    background:#d89696;
  }
  .router-link-active{
    background: #3b3b3b;
    color: #ffd04b;
  }
</style>
