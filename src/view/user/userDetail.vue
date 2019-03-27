<template>
  <div style="width: 100%">
    <group>
      <x-input title="基站编号:" v-model="stationData.stationNo" :readonly="editMode"></x-input>
      <x-input title="基站名称:" v-model="stationData.stationName"></x-input>
      <x-input title="基站地址:" v-model="stationData.stationAddress"></x-input>
      <x-input title="基站经度:" v-model="stationData.stationLongitude"></x-input>
      <x-input title="基站纬度:" v-model="stationData.stationLatitude"></x-input>

      <cell title="关联油机:" is-link="true" @click.native="showGeneratorTableDialog" :value="relatedGeneratorListStr"
            v-if="editMode">

      </cell>


      <selector title="客户编号:" :options="customerListDataForSelector" v-model="stationData.customerNo"
                :readonly="userLevel<API_DYNY.UserLevel.Admin.level">

      </selector>
      <x-textarea title="备注:" rows="4" v-model="stationData.remark"></x-textarea>
    </group>
    <commit-button cancelText="返回" :commitText="editMode?'修改':'添加'" style="margin-top: 15px;" @cancel="cancel"
                   @commit="commit"></commit-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username:"",

      }
    }
  }
</script>

<style scoped>

</style>
