<template>
    <div class="showUser">
        <h3>用户展示</h3>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="width:100%;">
            <el-tab-pane label="用户数据" name="first">
                <h2>用户数据</h2>
                <Firsts :data="tabled.tableData.slice((tabled.currentPage-1) * tabled.pageSize,tabled.currentPage*tabled.pageSize)"></Firsts>
            </el-tab-pane>
            <el-tab-pane label="身份数据" name="second">
                <h2>身份数据</h2>
                <Seconds :data="tabled.tableData.slice((tabled.currentPage-1) * tabled.pageSize,tabled.currentPage*tabled.pageSize)"></Seconds>
            </el-tab-pane>
            <el-tab-pane label="api接口权限" name="third">
                <h2>api接口权限</h2>
                <Thirds :data="tabled.tableData.slice((tabled.currentPage-1) * tabled.pageSize,tabled.currentPage*tabled.pageSize)"></Thirds>
            </el-tab-pane>
            <el-tab-pane label="身份和api接口关系" name="fourth">
                <h2>身份和api接口关系</h2>
                <Fourths :data="tabled.tableData.slice((tabled.currentPage-1) * tabled.pageSize,tabled.currentPage*tabled.pageSize)"></Fourths>
            </el-tab-pane>
            <el-tab-pane label="视图接口权限" name="fifth">
                <h2>视图接口权限</h2>
                <Fifths :data="tabled.tableData.slice((tabled.currentPage-1) * tabled.pageSize,tabled.currentPage*tabled.pageSize)"></Fifths>
            </el-tab-pane>
            <el-tab-pane label="身份和视图权限关系" name="sixths">
                <h2>身份和视图权限关系</h2>
                <Sixths :data="tabled.tableData.slice((tabled.currentPage-1) * tabled.pageSize,tabled.currentPage*tabled.pageSize)"></Sixths>
            </el-tab-pane>
        </el-tabs>
        <Pagination :tabled="tabled" @currentPageBtn="currentPageBtns" @pageSizeBtn="pageSizeBtns"></Pagination>
    </div>
</template>
<script>
import Firsts from '@/components/showUserTabs/first'
import Seconds from '@/components/showUserTabs/second'
import Thirds from '@/components/showUserTabs/third'
import Fourths from '@/components/showUserTabs/fourth'
import Fifths from '@/components/showUserTabs/fifth'
import Sixths from '@/components/showUserTabs/sixths'
import axiosMethods from '@/utils/axiosMethods';
import Pagination from '@/components/pagination'
export default {
    data () {
        return {
            activeName: 'first',
            tabled: {
                tableData: [],
                currentPage: 1,
                pageSize: 10
            }
        }
    },
    components: {
        Firsts, Seconds, Thirds, Fourths, Fifths, Sixths, Pagination
    },
    methods: {
        handleClick (val) {
            switch (Number(val.index)) {
            case 0:
                axiosMethods.get('/api/user/user').then(res => {
                    if (res.data.code === 1) {
                        this.tabled.tableData = res.data.data
                    }
                })
                break;
            case 1:
                axiosMethods.get('/api/user/identity').then(res => {
                    if (res.data.code === 1) {
                        this.tabled.tableData = res.data.data
                    }
                })
                break;
            case 2:
                axiosMethods.get('/api/user/api_authority').then(res => {
                    if (res.data.code === 1) {
                        this.tabled.tableData = res.data.data
                    }
                })
                break;
            case 3:
                axiosMethods.get('/api/user/identity_api_authority_relation').then(res => {
                    if (res.data.code === 1) {
                        this.tabled.tableData = res.data.data
                    }
                })
                break;
            case 4:
                axiosMethods.get('/api/user/view_authority').then(res => {
                    if (res.data.code === 1) {
                        this.tabled.tableData = res.data.data
                    }
                })
                break;
            case 5:
                axiosMethods.get('/api/user/identity_view_authority_relation').then(res => {
                    if (res.data.code === 1) {
                        this.tabled.tableData = res.data.data
                    }
                })
                break;
            default:
                break;
            }
        },
        handleSizeChange (val) {
            this.tabled.pageSize = val;
        },
        handleCurrentChange (val) {
            this.tabled.currentPage = val;
        },
        pageSizeBtns (data) {
            this.tabled.pageSize = data;
        },
        currentPageBtns (data) {
            this.tabled.currentPage = data;
        }
    },
    mounted () {
        axiosMethods.get('/api/user/user').then(res => {
            if (res.data.code === 1) {
                this.tabled.tableData = res.data.data
            }
        })
    }
}
</script>
<style scoped>
    .showUser{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
    }
    h3{
        padding:2% 2% 0 2%;
        font-size: 20px;
        flex-shrink: 0;
    }
    h2{
        font-size: 25px;
        margin-bottom:10px;
    }
    .el-tabs{
        flex: 1;
    }
    .showUser >div{
        width:100%;
        flex-shrink: 0;
        padding:20px 2% 40px 2%;
    }
    .pages{
        display: flex;
        justify-content: space-between;
    }
    .el-pagination.is-background .btn-next.disabled, .el-pagination.is-background .btn-next:disabled, .el-pagination.is-background .btn-prev.disabled, .el-pagination.is-background .btn-prev:disabled, .el-pagination.is-background .el-pager li.disabled{
        width:100px;
    }
    .el-tabs__header{
        margin:0;
    }
</style>




