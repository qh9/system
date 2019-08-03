<template>
    <div class="card">
        <header>{{title}}</header>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ['title']
}
</script>
<style scoped>
.card{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding:20px 20px;
}
header{
    height: 50px;
    line-height: 50px;
    font-size: 22px;
    color: #22293F;
    font-family: '幼圆'
}
</style>
