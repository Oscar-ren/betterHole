<template>
  <div id="app">
    <header>
      <div class="markup">
        <x-button class="operate" link="/home"></x-button>
      </div>
    </header>
    <div class="wrapper">
      <section class="profile">
        <i class="avatar"></i>
        <span>我的头像</span>
      </section>
      <div class="detail">
        <group>
          <selector title="座次" :options="buildings" v-model="building"></selector>
          <selector title="楼层" :options="floors" v-model="floor"></selector>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
  import { Selector, Group, Cell, CellBox, XButton, XHeader } from 'vux'
  import UserService from '../../service/user';

  let floors = [];
  for (let i = 1; i <= 17; i++) {
    floors.push({
      key: i,
      value: i < 10 ? `0${i}层` : `${i}层`
    })
  }

  export default {
    components: {
      Group,
      Selector,
      Cell,
      CellBox,
      XButton
    },
    data () {
      return {
        building: '',
        floor: '',
        buildings: [{key: 'A', value: 'A座'}, {key: 'B', value: 'B座'}],
        floors: floors,
      }
    },
    methods: {

    },
    mounted() {
      let userInfo = UserService.getUserInfo();
      if (!userInfo.sex) {
        this.$router.push('/');
      }
      this.building = userInfo.building;
      this.floor = userInfo.floor;
    }
  }
</script>

<style scoped>
  header {
    & .markup {
      display: inline-block;
      position: relative;
      background: #fff;
      height: 12vw;
      width: 10vw;
      margin-top: 12vw;
      border-right: 6vw solid #fff;
      border-top-right-radius: 6vw;
      border-bottom-right-radius: 6vw;

      & .operate {
        display: inline-block;
        background: #000000;
        height: 10vw;
        width: 10vw;
        border-radius: 50%;
        margin: 1vw 0 1vw 4vw;
      }
    }
  }

  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar {
    display: inline-block;
    text-indent: -999vw;
    margin-bottom: 20px;
    background: #eeeeee;
    width: 30vw;
    height: 30vw;
    border-radius: 50%;
  }
  .detail {
    color: #000;

    & >>> .weui-select {
      text-indent: 80%;
      color: #6e6a6a;
    }
  }
</style>
