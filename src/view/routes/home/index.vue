<template>
  <div id="app">
    <header>
      <div class="markup">
        <i class="operate" @click="changeRoute"></i>
      </div>
    </header>
    <swipe v-if="defaultIndex !== undefined" class="swipe-box" :defaultIndex="defaultIndex" :continuous="false"
           :auto="0" ref="swipe" showIndicators @change="changeIndex">
      <swipe-item class="swipe-item">
        <ul>
          <li v-for="(item, index) in revertToilets" :class="`card floor${item}-A`">
            <div class="floorInfo">{{`F${item < 10 ? '0' + item : item}-A`}}</div>
            <div class="toilets">
              <ul>
                <li v-for="(val, key, index) in toilets[item]">
                  <div :class="`toilet ${val.stall_state}`"></div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </swipe-item>
      <swipe-item class="swipe-item">
        <ul>
          <li v-for="(item, index) in revertToilets" :class="`card floor${item}-B`">
            <div class="floorInfo">{{`F${item < 10 ? '0' + item : item}-B`}}</div>
            <div class="toilets">
              <ul>
                <li v-for="(val, key, index) in toilets[item]">
                  <div :class="`toilet ${val.stall_state}`"></div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </swipe-item>
    </swipe>
  </div>
</template>

<script>
  import 'vue-swipe/dist/vue-swipe.css';
  import {Checker, CheckerItem, Picker, XButton, Cell} from 'vux';
  import { Swipe, SwipeItem } from 'vue-swipe';
  import UserService from '../../service/user';
  import ToiletService from '../../service/toliets';


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
        defaultIndex: undefined,
        currentIndex: 0,
        toilets: {},
        revertToilets: [],
        timer: null
      };
    },
    methods: {
      scrollToFloor (index) {
        let wrapper = document.querySelector('.mint-swipe-items-wrap');
        let vh = document.body.offsetHeight / 100;
        let floor = document.querySelector(`.floor${index}-${this.currentIndex === 0 ? 'A' : 'B'}`);
        wrapper.scrollTop = (floor && floor.getClientRects()[0]) ? floor.getClientRects()[0].top - 20 * vh : 0;
      },
      changeIndex (index) {
        this.currentIndex = index;
        this.getToilets(index === 0 ? 'A' : 'B')
      },
      changeRoute() {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.$router.push('/userInfo');
      },
      getToilets (building) {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
          ToiletService.getToilets(building).then(result => {
            this.revertToilets = Object.keys(result).sort((a, b) => b - a);
            this.toilets = result;
          })
        }, 5000);
        return ToiletService.getToilets(building).then(result => {
          this.revertToilets = Object.keys(result).sort((a, b) => b - a);
          this.toilets = result;
        });
      }
    },
    mounted() {
      UserService.getUserInfo().then(userInfo => {
        if (userInfo.building === 'B') {
          this.defaultIndex = 1;
          this.currentIndex = 1;
        } else {
          this.defaultIndex = 0;
        }
        this.getToilets(userInfo.building).then(() => {
          this.$nextTick(() => {
            this.scrollToFloor(userInfo.floor);
          })
        });
      })
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

  .mint-swipe-items-wrap {
    height: 70%;
    margin: 3vh 0;
    overflow-y: scroll;
    position: relative;
  }
</style>

<style scoped>
  header {
    height: 20vh;
    z-index: 10;
    & .markup {
      display: inline-block;
      position: absolute;
      background: rgba(162, 236, 244, 0.12);
      height: 11vw;
      width: 9vw;
      top: 12vw;
      right: 0;
      border-left: 6vw solid transparent;
      border-top-left-radius: 6vw;
      border-bottom-left-radius: 6vw;

      & .operate {
        display: inline-block;
        background: url('/assets/images/user.png');
        background-size: contain;
        height: 8vw;
        width: 8vw;
        margin: 1.5vw 0 1.5vw -4vw;
        position: relative;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: inline-block;
  }

  .card {
    display: flex;
    padding: 2.3vh 3vh 0 3vh;
  }

  .floorInfo, .toilets {
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
  }

  .floorInfo {
    width: 20vw;
    line-height: 1.8;
    text-align: right;
  }

  .toilets {
    flex: 1;
    margin-left: 4vw;

    & .toilet {
      display: inline-block;
      width: 13vw;
      height: 13vw;
      margin: 0 2vw 1vh 0;
      background: #000000;

      &.occupied {
        background: url('/assets/images/no.png');
        background-size: contain;
      }

      &.vacant {
        background: #fff;
        background: url('/assets/images/yes.png');
        background-size: contain;
      }
    }
  }
</style>
