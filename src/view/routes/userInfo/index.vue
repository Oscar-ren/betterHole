<template>
  <div>
    <div class="goBack">返回</div>
    <div class="info">
      <div class="avatar">
        头像
      </div>
      <div class="detail">
        <group>
          <selector ref="defaultValueRef" title="省份" :options="list" v-model="defaultValue"></selector>
        </group>
        <group>
          <selector ref="defaultValueRef" title="省份" :options="list" v-model="defaultValue"></selector>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
  import { Selector, Group, Cell, CellBox, XButton } from 'vux'

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
        defaultValue: '',
        list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
        list2: [{key: true, value: '是'}, {key: false, value: '否'}],
      }
    },
  }
</script>

<style>

</style>
