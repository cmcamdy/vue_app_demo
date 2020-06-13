<template>
  <div>
    <el-button
      class="hbutton"
      style="margin-top:5px;"
      type="primary"
      icon="el-icon-s-home"
      ><span @click="backTo">返回</span></el-button
    >
    <h2 class="title">
      <slot name="title">默认值</slot>
    </h2>
  </div>
</template>

<script>
export default {
  methods: {
    backTo() {
      this.$router.go(-1); //返回上一层
    },
  },
};
</script>

<style>
.hbutton {
  margin-top: 10px;
  margin-left: 10px;
  background-color: rgb(33, 150, 243);
}
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
