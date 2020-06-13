<template footer>
  <nav class="mui-bar mui-bar-tab " style="background-color: rgb(194, 212, 228);">
    <router-link class="mui-tab-item" to="/">
      <span class="mui-icon el-icon-monitor"></span>
      <span class="mui-tab-label">电影</span>
    </router-link>
    <router-link class="mui-tab-item" to="/music/musicList">
      <span class="mui-icon el-icon-headset"></span>
      <span class="mui-tab-label">音乐</span>
    </router-link>
    <router-link class="mui-tab-item" to="/personalCenter">
      <span class="mui-icon el-icon-user"> </span>
      <span class="mui-tab-label">我的</span>
    </router-link>
    <router-link class="mui-tab-item" to="/BookSearch">
      <span class="mui-icon mui-icon-search"></span>
      <span class="mui-tab-label">搜索</span>
    </router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.icon {
  margin-top: 20px;
  height: 40px;
  width: 90px;
  align-items: center;
  justify-content: center;
}
.footer {
  background-color: rgb(164, 199, 230);
  /* background-color: rgb(23, 109, 179); */
}
.footer li {
  flex-grow: 1;
  text-align: center;
  color: #fff;
}
.footer li a {
  color: #cccccc;
}
.footer a.router-link-active {
  color: #ffffff;
  font-size: larger;
  font-weight: bold;
}
</style>
