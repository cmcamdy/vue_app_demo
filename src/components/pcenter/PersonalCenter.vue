<template>
  <div>
      <common-header class="header">
        <span slot="title">PersonalInfo</span>
    </common-header>
    <el-row>
      <el-col :span="8"><img class="photo" src="../../assets/hereisaphoto.png" alt=""></el-col>
      <el-col :span="16" class="baseBox" >
          <p class="baseInfo">姓名：<strong>陈焕</strong></p>
          <p class="baseInfo">班级：17计科2班</p>
          <p class="baseInfo">笔名：<strong>椰子奶糖</strong></p>
      </el-col>
    </el-row>
    <el-row> 
    <el-col :span="4">
        <div></div>
    </el-col>
    <el-collapse  accordion >
      <el-collapse-item title="欢迎访问我的GitHub" name="1">
        <div>
            <h4 class="self_introduction">
              <a href="https://github.com/ch98road">这是椰子奶糖的GitHub</a>
            </h4>
        </div>
      </el-collapse-item>
      <el-collapse-item title="欢迎访问我的博客" name="2">
        <div>
            <h4 class="self_introduction">
              <a href="http://blog.csdn.net/symuamua">这是椰子奶糖的个人博客</a>
            </h4>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Leetcode题解" name="3">
        <div>
            <h4 class="self_introduction">
              <a href="https://blog.csdn.net/symuamua/article/details/105543470">欢迎与我交流Leetcode算法</a>
            </h4>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Jetson NANO" name="4">
        <div>
            <h4 class="self_introduction">
            <a href="https://blog.csdn.net/symuamua/article/details/105543195">欢迎与我交流老黄家的真香小板子</a>
            </h4>
        </div>
      </el-collapse-item>
      <el-collapse-item title="自我满意度" name="5">
        <div>
            <h4 style="margin-left:40%">
                59分
            </h4>
        </div>
      </el-collapse-item>
    </el-collapse>
    </el-row>
    <p class="small_font">以上，纯手打~</p>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from "../common/Header";
import CommonFooter from "../common/Footer";
export default {
  name: "Home",
  components: {
      CommonHeader,
      CommonFooter
      },
};
</script>

<style scoped>
.baseBox{
    margin-top: 120px;
}
.baseInfo{
    font: 20px large;
    margin-left: 50px;
    font-family:"微软雅黑";
}
.small_font{
    font:10px Small;
    margin-left: 40%;
    margin-top: 20%;

}
.self_introduction{
    margin-left: 60px;
}
.photo{
    margin-top: 100px;
    margin-left: 20%;
    border-radius: 50px;
}
</style>
