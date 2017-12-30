<template>
  <div id="app">
    <router-view></router-view>
    <!--<transition name="pop-in" >-->
      <!--<keep-alive>-->
        <!--<router-view></router-view>-->
      <!--</keep-alive>-->
    <!--</transition>-->
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

  .pop-in-enter-active,
  .pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
