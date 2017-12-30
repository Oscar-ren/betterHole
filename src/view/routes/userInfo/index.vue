<template>
  <div>
    <div class="goBack">返回</div>
    <div class="info">
      <section class="profile">
        <i class="avatar"></i>
        <span>我的头像</span>
      </section>
      <div class="detail">
        <group>
          <selector title="座次" :options="buildings" v-model="building"></selector>
        </group>
        <group>
          <selector title="楼层" :options="floors" v-model="floor"></selector>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
  import { Selector, Group, Cell, CellBox, XButton } from 'vux'
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

<style>
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
</style>
