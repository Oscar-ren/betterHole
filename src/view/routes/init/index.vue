<template>
  <div id="app">
    <swipe class="swipe-box" :disabled="swipeDisable" :defaultIndex="0"
           showIndicators :continuous="false" :auto="0" ref="swipe">
      <swipe-item class="swipe-item">
        <header>Step:请选择性别</header>
        <section class="checker">
          <checker v-model="form.sex" @on-change="next"
                   default-item-class="checker-item" selected-item-class="checker-item-selected">
            <checker-item value="male">男</checker-item>
            <checker-item value="female">女</checker-item>
          </checker>
        </section>
      </swipe-item>
      <swipe-item class="swipe-item">
        <header>Step:请选择A/B座</header>
        <section class="checker">
          <checker v-model="form.building" @on-change="next"
                   default-item-class="checker-item" selected-item-class="checker-item-selected">
            <checker-item value="A">A座</checker-item>
            <checker-item value="B">B座</checker-item>
          </checker>
        </section>
      </swipe-item>
      <swipe-item class="swipe-item">
        <header>Step:请选择楼层</header>
        <section class="picker">
          <picker :data='floors' v-model='form.floor' :fixed-columns="3"></picker>
        </section>
        <footer>
          <x-button type="primary" class="confirm" @click.native="submit">开启寻坑之旅</x-button>
        </footer>
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
        swipeDisable: true
      };
    },
    methods: {
      prev() {
        this.$refs.swipe.prev();
      },
      next() {
        if (this.form.building) {
          this.swipeDisable = false;
        }
        this.$refs.swipe.next();
      },
      submit() {
        UserService.updateUserInfo(this.form);
        this.$router.push('/home');
      }
    }
  };
</script>

<style lang="postcss">
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

  .scroller-component {
    width: 44% !important;
    margin: 0 auto;

    & .scroller-mask {
      background-image: linear-gradient(to bottom, rgba(255,255,255,0) 0% , rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%) !important;
      background-size: auto;
      opacity: .5;
    }

    & .scroller-indicator {
      width: 80%;
      left: 10%;
      top: 72px;
      height: 4.5rem;
      background-image: none;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }

    & .scroller-item {
      color: #fff;
      font-size: 1.5rem;
      height: 4.5rem;
      line-height: 4.5rem;
    }
  }
</style>

<style lang="postcss" scoped>
  header {
    height: 20vh;
    text-align: center;
    font-size: 1.2rem;
    line-height: 25vh;
  }

  footer {
    & button.confirm {
      margin-top: 8vh;
      width: 40vw;
    }
  }

  section .vux-checker-box {
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  section.picker {
    margin-top: 10vh;
  }

  .swipe-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .swipe-item {
    height: 100%;
  }

  .checker-item {
    width: 40vw;
    height: 40vw;
    line-height: 40vw;
    border: 1px solid #ccc;
    display: block;
    margin: 5vh 0;
    border-radius: 50%;
    text-align: center;
  }

  .checker-item-selected {
    border-color: green;
  }
</style>
