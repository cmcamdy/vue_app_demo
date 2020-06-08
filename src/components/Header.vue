<template>
  <div>
    <!-- <i class="el-icon-s-home"></i> -->
    <el-button type="primary" icon="el-icon-s-home"></el-button>
    <h2 class="title">movie</h2>
  </div>
</template>

<script>
export default {};
</script>

<style>
.el-icon-s-home {
  height: 10px;
  /* margin-left: 10px; */
}
.header {
  /* position: fixed;*/
  z-index: 2;
  height: 1rem;
  background-color: rgb(33, 150, 243);
  position: fixed;
  width: 100%;
  line-height: 1rem;
}
.home {
  color: #fff;
}
.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}
</style>
