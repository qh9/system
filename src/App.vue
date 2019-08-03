<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
  *{
    margin:0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
    font-weight: 400;
    cursor: pointer;
  }
  html,body,#app{
    width:100%;
    height:100%;
  }
</style>

