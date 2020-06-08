<template>
  <el-container>
    <common-header class="header"></common-header>
    <router-view></router-view>
    <common-footer></common-footer>
  </el-container>
</template>

<script>
import CommonHeader from "../components/Header";
import CommonFooter from "../components/Footer";

export default {
  components: {
    CommonHeader,
    CommonFooter,
  },
};
</script>

<style></style>
