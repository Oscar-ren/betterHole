<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  html,body {
    position: relative;
    height: 100%;
  }

  body {
    background-color: #fbf9fe;
  }

  #app {
    display: flex;
    position: relative;
    height: 100%;
    flex-direction: column;
    color: #fff;
    background: linear-gradient(#0d161f, #77b8bf)
  }
</style>
