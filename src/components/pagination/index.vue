<template>
    <div class="pages">
        <i></i>
        <div>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tabled.currentPage"
            :page-sizes="[10,20,30,40]"
            :page-size="tabled.pageSize"
            layout="total, prev, pager, next, sizes, jumper"
            :total="tabled.tableData.length">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props: ['tabled'],
    data () {
        return {
            tableds: {}
            // currentPage: '',
            // pageSizes: ''
        }
    },
    methods: {
        handleSizeChange (val) {
            this.$emit('pageSizeBtn', val)
        },
        handleCurrentChange (val) {
            this.$emit('currentPageBtn', val)
        }
    },
    watch: {
        tabled: function (newVal) {
            console.log(newVal);
            this.tableds = newVal;
        }
    }
}
</script>
<style scoped>

</style>
