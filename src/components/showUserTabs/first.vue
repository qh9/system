<template>
    <el-table
      :data="data"
      style="width: 100%"
      :row-style="tableRowStyle">
      <el-table-column
        prop="user_name"
        width="150"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="user_pwd"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="identity_text"
        width="200"
        label="身份">
      </el-table-column>
    {{data}}
    </el-table>
</template>
<script>
export default {
    props: ['data'],
    data () {
        return {}
    },
    methods: {
        tableRowStyle () {
            return 'background-color: #f0f2f5'
        }
    }
}
</script>
<style scoped>

</style>
