<template>
        <div class="wrap">
            <Head></Head>
            <div class="content">
                <Left></Left>
                <Right></Right>
            </div>
            <!-- <router-view></router-view> -->
        </div>
</template>

<script>
import Head from '@/components/home/head/index'
import Left from '@/components/home/left/index'
import Right from '@/components/home/right/index'
export default {
    data () {
        return {

        }
    },
    components: {
        Left,
        Right,
        Head
    }
}
</script>

<style scoped>
    .wrap{
        width:100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .content{
        flex:1;
        display: flex;
        padding-top: 60px;
    }
</style>
