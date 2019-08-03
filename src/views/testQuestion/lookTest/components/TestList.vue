<template>
    <div>
       <div class="testlist" v-for="(item,index) in TestList" :key="index" @click="todetail($event,item)">
            <h4 style="font-size:14px;color:#333">{{item.title}}</h4>
            <p>
                <el-button type="primary" size="mini" style="color:#189DFF;background:#E6F7FF;border:1px solid #189DFF">{{item.questions_type_text}}</el-button>
                <el-button type="primary" size="mini" style="color:#DEB0EC;background:#F0F5FF;border:1px solid #DEB0EC">{{item.subject_text}}</el-button>
                <el-button type="primary" size="mini" style="color:#FCA916;background:#FFF7E6;border:1px solid #FCA916">{{item.exam_name}}</el-button>
            </p>
            <p id="item.user_id" class="person">
               {{item.user_name}}&nbsp;&nbsp;发布
            </p>
            <el-button type="text" size="mini" class="button">编辑</el-button>
       </div>
    </div>
</template>
<script>

export default {
    props: ['TestList'],
    methods: {
        todetail (e, item) {
            if (e.target.innerHTML === '编辑') {
                this.$emit('editdetail', item)
            } else {
                this.$emit('todetail', item)
            }
        }
    }
}
</script>
<style scoped>
.testlist{
    width: 100%;
    padding:5px 0;
    border-bottom: 1px solid #ccc;
    position: relative;
}
.button{
    position: absolute;
    right: 20px;
    top:40%;
    font-size: 16px;
}
.person{
    color: #189DFF;
    font-size: 14px;
}
</style>
