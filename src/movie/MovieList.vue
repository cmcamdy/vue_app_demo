<template>
  <div class="lists">
    <!-- <div class="blank"></div> -->
    <li
      @click="goDeatil(movie.id)"
      v-for="movie in moveList"
      :key="movie.id"
      class="movie"
    >
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <img :src="movie.images.small" alt="" class="movie-imgs" /></div
        ></el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <p class="movie-name">影片名称：{{ movie.title }}</p>
            <p>时长：{{ movie.durations[0] }}</p>
            <el-rate
              v-model="movie.rating.average / 2"
              allow-half
              disabled
              text-color="#ff9900"
              >评分：
            </el-rate>
            <!-- <p class="pingfeng">评分：{{ movie.rating.average }}</p> -->
            <p>主演：{{ movie.casts[0].name }}</p>
            <p>导演：{{ movie.directors[0].name }}</p>
            <p>{{ movie.showInfo }}</p>
          </div></el-col
        >
      </el-row>
    </li>

    <div class="loading" v-show="!tip">
      <img src="@/assets/img/loading.gif" alt="" />
    </div>
    <div v-show="tip" class="tip">
      <h4>已经到底了^-^</h4>
    </div>
    <div class="blank"></div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      moveList: [],
      length: 0,
      tip: true,
      max: 5,
      allow_half: true,
    };
  },
  mounted() {
    this.loadData();
    //监听滚动事件
    window.onscroll = () => {
      let clientHeight = document.documentElement.clientHeight;
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      if (clientHeight + scrollTop == scrollHeight) {
        // console.log("到底了");
        // console.log(this.tip);
        if (!this.tip) {
          this.loadData();
        }
      }
    };
  },
  methods: {
    loadData() {
      let url =
        API_PROXY +
        "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=" +
        (this.length + 3);
      console.log(url);
      Axios.get(url)
        .then((res) => {
          //   console.log(res);
          this.loadingShow = false;
          let list = res.data.subjects;
          this.moveList = list;
          //   console.log(this.moveList.length);
          //   console.log(this.length);
          if (this.moveList.length == this.length + 3) {
            this.tip = false;
            this.length += 3;
          } else {
            this.tip = true;
          }
          //   console.log(this.moveList);
          //   console.log(this.moveList[0].images.small);
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: "很抱歉数据加载失败~请检查网络设置",
            type: "error",
          });
        });
    },
    goDeatil(movieId) {
      console.log(movieId);
      this.$router.push("/movie/movieDetail/" + movieId);
    },
  },
};
</script>

<style>
.lists {
  margin-top: 50px;
}
.blank {
  height: 80px;
}
.loading {
  text-align: center;
}
.tip {
  text-align: center;
}
.movie {
  display: flex;
  padding: 0.5rem;
  border-bottom: 2px solid #ccc;
}
</style>
