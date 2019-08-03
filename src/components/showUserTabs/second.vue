<template>
    <el-table
      :data="data"
      :row-style="tableRowStyle">
      <el-table-column
        prop="identity_text"
        label="身份名称">
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
