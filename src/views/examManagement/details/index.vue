<template>
    <div class="details">
    <h3>试卷详情</h3>
    <main>
 <div v-for="item in detailAll.questions" :key="item.questions_id" :id="item.questions_id" class="esta-content">
              <p class="esta_p">{{item.title}}</p>
              <div class="size">{{item.questions_stem}}</div>
        </div>
    </main>
    </div>
</template>
<script>
export default {
    mounted () {
        let id = this.$route.params.aa
        this.$axios.get('/api/exam/exam/' + id).then(res => {
            this.detailAll = res.data.data
            console.log(this.detailAll)
        })
    },
    data () {
        return {
            detailAll: []
        }
    }
}
</script>
<style scoped>
.details{
  width: 100%;
  height: 100%;
  color: rgb(44, 43, 43);
  background: #f0f2f5;
  overflow-y: scroll;
}
.esta-content{
  border:solid 1px #ccc;
  margin-top: 18px;

}
h3{
  height: 100px;
  line-height: 100px;
  margin-left: 15px;
}
main {
  width: 96%;
  height: 100%;
  margin-left: 15px;
}
p{
    height: 50px;
    line-height: 50px;
}
.size{
    line-height: 50px;
}
main {
  width: 96%;
  height: auto;
  background: #fff;
  border-radius: 10px;
  margin-left: 15px;
}
</style>
