<template>
  <el-footer class="footer">
    <el-button class = "icon" type="primary" icon="el-icon-video-camera-solid" circle>电影</el-button>
    <el-button class = "icon" type="primary" icon="el-icon-s-home" circle>音乐</el-button>
    <el-button class = "icon" type="primary" icon="el-icon-reading" circle>书籍</el-button>
    <el-button class = "icon" type="primary" icon="el-icon-picture-outline-round" circle>图片</el-button>
  </el-footer>
</template>

<script>
export default {};
</script>

<style>
.icon{
  margin-top: 20px;
  height: 40px;
  width: 90px;
  align-items:center;
  justify-content:center;
}
.footer {
  height: 1rem;
  background-color: rgb(23, 109, 179);
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  line-height: 1rem;
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
