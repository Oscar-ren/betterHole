<template>
  <div id="app">
    <header>
      <div class="markup">
        <i class="operate icon-user" @click="changeRoute"></i>
      </div>
    </header>
    <div class="wrapper">
      <section class="profile">
        <i class="avatar"></i>
        <span>我的头像</span>
      </section>
      <div class="detail">
        <group>
          <selector title="座次" :options="buildings" v-model="building" @on-change="changeBuilding"></selector>
          <selector title="楼层" :options="floors" v-model="floor" @on-change="changeFloor"></selector>
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
      changeBuilding(building) {
        UserService.updateUserInfo({
          building
        })
      },
      changeFloor(floor) {
        UserService.updateUserInfo({
          floor
        })
      },
      changeRoute() {
        this.$router.push('/home');
      }
    },
    mounted() {
      UserService.getUserInfo().then(userInfo => {
        console.log(userInfo)
        if (!userInfo.sex) {
          this.$router.push('/');
        }
        this.building = userInfo.building;
        this.floor = userInfo.floor;
      });
    }
  }
</script>

<style scoped>
  header {
    & .markup {
      display: inline-block;
      position: relative;
      background: rgba(162, 236, 244, 0.12);
      height: 11vw;
      width: 9vw;
      margin-top: 12vw;
      border-right: 6vw solid transparent;
      border-top-right-radius: 6vw;
      border-bottom-right-radius: 6vw;

      & .operate {
        display: inline-block;
        background: url('/assets/images/back.png');
        background-size: contain;
        height: 7vw;
        width: 7vw;
        margin: 1.9vw 0 2vw 5vw;;
        position: relative;
      }
    }
  }

  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar {
    background: #eeeeee;
    background: url('/assets/images/avatar.png');
    background-size: contain;
    display: inline-block;
    text-indent: -999vw;
    margin-bottom: 20px;
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
