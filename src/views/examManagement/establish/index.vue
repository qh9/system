<template>
  <div class="add-establish">
    <h3>创建页面</h3>
    <main>
      <div class="addBut">
        <button @click="addHide">添加新题</button>
      </div>
      <div class="esta-list">
          <p>{{arr.title}}</p>
          <p>考试时间：1小时30分钟 监考人：刘宇 开始时间：{{arr.start_time}} 阅卷人：刘宇</p>
      </div>
        <div v-for="(item, index) in arr" :key="index" :id="item.questions_id" class="esta-content">
              <p class="esta_p"><span>{{item.title}}</span><span @click="deleted(index)" class="color">删除</span></p>
              <div class="size">{{item.questions_stem}}</div>
        </div>
      <button @click="estaList">创建试卷</button>
    </main>
    <div class="show" v-if="flag" @click="hide"></div>
    <div class="show-arr" v-if="flag">
      <div
        class="allTi"
        v-for="item in allList"
        :key="item.questions_id"
        :id="item.questions_type_id"
      >
        <p class="esta_p">
          <span>{{item.title}}</span>
          <span class="color" @click="addted(item)">添加</span>
        </p>
        <div class="content">{{item.questions_stem}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            flag: false,
            inds: '',
            arr: []
        }
    },
    methods: {
        addHide () {
            if (this.flag === true) {
            } else {
                this.flag = true;
            }
        },
        hide () {
            this.flag = false
        },
        deleted (index) {
            this.arr.splice(index, 1);
        },
        estaList () {
            this.$router.push('/main/testExam')
        },
        addted (item) {
            this.arr.push(item)
        }
    },
    mounted () {
        this.arr = this.$route.query.questions;
        let that = this;
        this.$axios.get('/api/exam/questions/new').then(res => {
            that.allList = res.data.data;
        })
    }
}
</script>
<style scoped>
.add-establish {
  width: 100%;
  height: 100%;
  color: rgb(44, 43, 43);
  background: rgb(226, 224, 224);
  overflow-y: scroll;
}
h3 {
  height: 100px;
  line-height: 100px;
  margin-left: 15px;
}
main {
  width: 96%;
  height: auto;
  background: #fff;
  border-radius: 10px;
  margin-left: 15px;
}
.addBut {
  height: 60px;
}
button {
  width: 100px;
  height: 40px;
  margin: 10px;
}
.show {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #ccc;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 9999;
}
.show-arr {
  width: 700px;
  height: 1000px;
    overflow-y: scroll;
  border-left: solid 1px #ccc;
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99999;
}
.esta-list{
        height: 100px;
        text-align: center;
        margin-top: 20px;
    }
    .esta-list p{
   font-size: 16px;
    }
.esta-content {
  width: 80%;
  height: auto;
  border: solid 1px #ccc;
  margin: 0 auto;
}
.size{
    line-height: 40px;
}
.content {
  width: 60%;
  line-height: 40px;
  margin: 0 auto;
}
.esta_p {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.color {
  color: blue;
}
</style>
