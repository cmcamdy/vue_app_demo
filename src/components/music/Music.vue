<template>
  <el-container>
    <common-header class="header">
      <span slot="title">Music</span>
    </common-header>
    <!-- <Search></Search> -->
    <el-row><router-view></router-view></el-row>
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
