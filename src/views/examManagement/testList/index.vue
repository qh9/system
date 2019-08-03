<template>
  <div class="listPage">
    <h3>试卷列表</h3>
    <main>
      <div class="list_kind">
        <div>
          <span>考试类型：</span>
          <el-select placeholder="请选择" v-model="examName">
            <el-option v-for="item in options1" :key="item.exam_id" :value="item.exam_id" :label="item.exam_name"></el-option>
          </el-select>
        </div>
        <div>
          <span>课程：</span>
          <el-select placeholder="请选择" v-model="subjectName">
            <el-option v-for="item in options2" :key="item.subject_id" :value="item.subject_id" :label="item.subject_text"></el-option>
          </el-select>
        </div>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <div class="list_table">
        <div class="list_title">
          <span class="list_span">试卷列表</span>
          <div>
            <el-button class="list_but" v-for="(item,index) in arrList" :key="index" @click="listPush(index)">{{item}}</el-button>
          </div>
        </div>
        <div class="list_content">
          <el-table :data="tableData" style="width: 100%" :default-sort = "{prop: 'start_time', order: 'descending'}">
            <el-table-column prop="title" label="试卷信息"></el-table-column>
            <el-table-column prop="grade_name" label="班级"></el-table-column>
            <el-table-column prop="user_name" label="创建人"></el-table-column>
            <el-table-column prop="start_time" label="开始时间" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="end_time" label="结束时间" :formatter="dateFormat"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                 <el-button @click="deleteRow(scope.row)" type="text" :style="{'marginLeft':'0', 'width':'0'}">
                                详情
                            </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
    data () {
        return {
            tableData: [],
            options1: [], // 考试类型数据
            examName: '', // 考试类型
            options2: [], // 课程数据
            subjectName: '', // 课程类型
            addList: [],
            addId: '',
            arrList: ['全部', '进行中', '一结束'],
            options3: [],
            ind: 0,
            class: ''
        };
    },
    methods: {
        listPush (index) {
            this.ind = index;
            let times = new Date().getTime()
            if (this.ind === 0) {
                this.tableData = this.options3
            } else if (this.ind === 1) {
                let listOne = this.options3.filter(val => {
                    return val.start_time < times && val.end_time > times
                })
                this.tableData = listOne
            } else if (this.ind === 2) {
                let listTwo = this.options3.filter(val => {
                    return val.start_time < times && val.end_time < times
                })
                this.tableData = listTwo
            }
        },
        deleteRow (row) {
            console.log(row)
            this.$router.push({
                name: 'Details',
                params: {
                    aa: row.exam_exam_id
                }
            })
        },
        search () {
            this.$axios.get('/api/exam/exam', {
                subject_id: this.subjectName
            }).then(res => {
                this.tableData = res.data.exam;
                this.examName = '';
                this.subjectName = '';
            })
        },
        dateFormat (row, column) {
            const daterc = row[column.property]
            if (daterc != null) {
                const dateMat = new Date(parseInt(daterc.replace('/Date(', '').replace(')/', ''), 10));
                const year = dateMat.getFullYear();
                const month = dateMat.getMonth() + 1;
                const day = dateMat.getDate();
                const hh = dateMat.getHours();
                const mm = dateMat.getMinutes();
                const timeFormat = year + '-' + month + '-' + day + ' ' + hh + ':' + mm;
                return timeFormat;
            }
        }
    },
    created () {
        this.$axios.get('/api/exam/exam').then(res => {
            this.options3 = res.data.exam;
            this.tableData = this.options3;
            console.log(this.tableData, this.options3)
        })
        this.$axios.get('/api/exam/examType').then(res => {
            this.options1 = res.data.data;
        })
        this.$axios.get('/api/exam/subject').then(res => {
            this.options2 = res.data.data;
        })
        this.addList = JSON.parse(localStorage.getItem('addList'));
    }
};
</script>

<style scoped>
.listPage {
  width: 100%;
  height: 100%;
  color: rgb(44, 43, 43);
  background: rgb(226, 224, 224);
}
h3 {
  height: 100px;
  line-height: 100px;
  margin-left: 15px;
}
main {
  width: 96%;
  height: 100%;
  margin-left: 15px;
}
.list_kind {
  display: flex;
  height: 120px;
  background: #fff;
  border-radius: 10px;
}
.list_kind > div {
  margin: 30px;
}
.el-button {
  width: 150px;
  height: 40px;
  margin-top: 30px;
}
.list_table {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #fff;
  margin-top: 20px;
}
.list_title {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
}
.list_span {
  padding-left: 20px;
}
.list_but {
  width: 80px;
  height: 45px;
  text-align: center;
}
.list_content{
  margin-top: 30px;
}
.list_color{
  color:blue;
}
.el-table th, .el-table tr{
  height: 100px;
}

</style>
