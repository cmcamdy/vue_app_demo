<template>
  <el-container>
    <common-header class="header">
      <span slot="title">Movie</span>
    </common-header>
    <router-view></router-view>
    <common-footer></common-footer>
  </el-container>
</template>

<script>
import CommonHeader from "../common/Header";
import CommonFooter from "../common/Footer";

export default {
  components: {
    CommonHeader,
    CommonFooter,
  },
};
</script>

<style></style>
