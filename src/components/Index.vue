<template>
  <grid :cols="3" :show-vertical-dividers="false">
    <grid-item label="全站地图" :link="{ path: '/generatorLocations'}" class="grid-item">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/map.png">
    </grid-item>
    <grid-item label="油机列表" :link="{ path: '/generatorTable'}" class="grid-item">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/generator.png">
    </grid-item>
    <grid-item label="基站列表" :link="{ path: '/stationTable'}" class="grid-item">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/station_index.png">
    </grid-item>
    <grid-item label="油量记录" :link="{ path: '/fuelTable'}" class="grid-item">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/table.png">
    </grid-item>
    <grid-item label="发电记录" :link="{ path: '/generateTable'}" class="grid-item">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/table.png">
    </grid-item>
    <grid-item label="告警记录" :link="{ path: '/alarmTable'}" class="grid-item">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/table.png">
    </grid-item>
    <grid-item label="保养记录" :link="{ path: '/maintainTable'}" class="grid-item">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/table.png">
    </grid-item>
    <grid-item label="联系人列表" :link="{ path: '/contactTable'}" class="grid-item">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/contact_index.png">
    </grid-item>
    <grid-item label="客户列表 " :link="{ path: '/customerTable'}" class="grid-item"
               v-if="userLevel>=API_DYNY.UserLevel.Admin.level">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/customer_index.png">
    </grid-item>
    <grid-item label="用户列表" :link="{ path: '/userTable'}" class="grid-item">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/user_index.png">
    </grid-item>
    <grid-item label="单位列表" :link="{ path: '/unitTable'}" class="grid-item">
      <img slot="icon" class="grid-item-img" src="http://www.dy-iot.net/unit_index.png">
    </grid-item>

  </grid>
</template>

<script>

  export default {
    data() {
      return {
        userLevel: sessionStorage.getItem("userLevel"),

      }
    },
    mounted: function () {
    },
    methods: {}
  }
</script>

<style scoped>
  .iconfont {
    font-size: 40px;
  }


</style>
