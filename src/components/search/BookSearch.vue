<template>
  <el-container>
    <common-header class="header">
      <span slot="title">BookSearch</span>
    </common-header>
    <h3 class="center">这是一个书籍搜索页面</h3>

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

<style>
.center{
    width: 100%;
    margin:80% 20%;
    color: #000;
}
</style>