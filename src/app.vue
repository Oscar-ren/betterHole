<template>
  <router-view></router-view>
  <!--<transition name="pop-in" >-->
  <!--<keep-alive>-->
  <!--<router-view></router-view>-->
  <!--</keep-alive>-->
  <!--</transition>-->
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style lang="less">
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  html,body {
    position: relative;
    height: 100%;
  }

  body {
    line-height: 1.6;
    background-color: #fbf9fe;
  }

  * {
    margin: 0;
    padding: 0;
  }

  a img {
    border: 0;
  }

  a {
    text-decoration: none;
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
