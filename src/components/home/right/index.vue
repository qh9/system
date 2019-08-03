<template>
    <div class="right-content">
        <router-view/>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    }
}
</script>

<style  scoped>
    .right-content{
        flex:1;
        overflow-y: auto;
        padding:20px;
        box-sizing: border-box;
        background:#f0f2f5;
    }
</style>

