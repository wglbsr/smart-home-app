<template>
  <div>
    <datetime v-model="startDate" format="YYYY-MM-DD" @on-change="change" title="开始时间:"></datetime>
    <datetime v-model="endDate" format="YYYY-MM-DD" @on-change="change" title="结束时间:"></datetime>
  </div>
</template>

<script>
  export default {
    name: "BetweenDatesPicker",
    data() {
      return {
        startDate: "",
        endDate: ""
      }
    },
    methods: {
      change: function () {
        let args = {};
        if (this.startDate) {
          args.startDate = (Date.parse(new Date(this.startDate + " 00:00:00"))) / 1000;
        }
        if (this.endDate) {
          args.endDate = (Date.parse(new Date(this.endDate + " 23:59:59"))) / 1000;
        }
        this.$emit("dateChange", args);
      },
    }
  }
</script>

<style scoped>

</style>
