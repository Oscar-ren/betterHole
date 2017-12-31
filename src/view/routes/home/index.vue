<template>
  <div id="app">
    <header>
      <div class="markup">
        <x-button class="operate" link="/userInfo"></x-button>
      </div>
    </header>
    <swipe class="swipe-box" :defaultIndex="0"
           showIndicators :continuous="false" :auto="0">
      <swipe-item class="swipe-item">

      </swipe-item>
      <swipe-item class="swipe-item">

      </swipe-item>
    </swipe>
  </div>
</template>

<script>
  import 'vue-swipe/dist/vue-swipe.css';
  import {Checker, CheckerItem, Picker, XButton, Cell} from 'vux';
  import { Swipe, SwipeItem } from 'vue-swipe';
  import UserService from '../../service/user';


  let floors = [];
  for (let i = 1; i <= 17; i++) {
    i < 10 ? i = `0${i}` : `${i}`;
    floors.push({
      name: i + '层',
      value: i
    });
  }

  export default {
    components: {
      Swipe,
      SwipeItem,
      Checker,
      CheckerItem,
      Picker,
      XButton,
      Cell
    },
    data () {
      return {
        form: {
          sex: '',
          building: '',
          floor: ['07'],
        },
        floors: [floors],
      };
    },
    methods: {

    }
  };
</script>

<style>
  .mint-swipe-indicators {
    bottom: 5vh;

    & .mint-swipe-indicator {
      opacity: 1;
      width: 6px;
      height: 6px;
      margin: 0 8px;
      background: transparent;
      border: 1px solid #fff;

      &.is-active {
        background: #fff;
        border: 1px solid #fff;
      }
    }
  }
</style>

<style scoped>
  header {
    z-index: 10;
    & .markup {
      display: inline-block;
      position: absolute;
      background: #fff;
      height: 12vw;
      width: 10vw;
      top: 12vw;
      right: 0;
      border-left: 6vw solid #fff;
      border-top-left-radius: 6vw;
      border-bottom-left-radius: 6vw;

      & .operate {
        display: inline-block;
        background: #000000;
        height: 10vw;
        width: 10vw;
        border-radius: 50%;
        margin: 1vw 0 1vw -4vw;
      }
    }
  }
</style>
