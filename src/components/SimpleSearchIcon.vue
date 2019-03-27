<template>
  <div>
    <img slot="icon" src="http://www.dy-iot.net/search.png" class="search-img">
  </div>
</template>

<script>

  export default {
    name: "SimpleSearchIcon",
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
  .search-img {
    float: right;
    /*z-index: 99;*/
    background-color: #10aeff;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    position: fixed;
    right: 15px;
    bottom: 70px;
    padding: 10px;
  }
</style>
