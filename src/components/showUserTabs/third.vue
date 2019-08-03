<template>
    <el-table
      :data="data"
      :row-style="tableRowStyle">
      <el-table-column
        prop="api_authority_text"
        label="api权限名称">
      </el-table-column>
      <el-table-column
        prop="api_authority_url"
        label="api权限url">
      </el-table-column>
      <el-table-column
        prop="api_authority_method"
        label="api权限方法">
      </el-table-column>
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
