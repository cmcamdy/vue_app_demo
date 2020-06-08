<template>
  <el-main>
    <!-- <div class="lists"> -->
    <div class="blank"></div>
    <ul>
      <li
        @click="goDeatil(movie.id)"
        v-for="movie in moveList"
        :key="movie.id"
        class="movie"
      >
        <div>
          <img :src="movie.images.small" alt="" class="movie-imgs" />
        </div>
        <div class="movie-info">
          <p class="movie-name">影片名称：{{ movie.title }}</p>
          <p>时长：{{ movie.durations[0] }}</p>
          <p class="pingfeng">评分：{{ movie.rating.average }}</p>
          <p>主演：{{ movie.casts[0].name }}</p>
          <p>导演：{{ movie.directors[0].name }}</p>
          <p>{{ movie.showInfo }}</p>
        </div>
      </li>
    </ul>
    <div class="loading" v-show="!tip">
      <img src="@/assets/img/loading.gif" alt="" />
    </div>
    <div v-show="tip" class="tip">
      <h4>已经到底了^-^</h4>
    </div>
    <div class="blank"></div>
  </el-main>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      moveList: [],
      length: 0,
      tip: true,
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
          alert("获取数据失败");
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
.blank {
  height: 50px;
}
.movie-list {
  margin: 1rem 0;
}
.movie {
  display: flex;
  padding: 0.5rem;
  border-bottom: 2px solid #ccc;
  /* position: absolute; */
}
.movie-img {
  flex-grow: 1;
  width: 0;
  margin-right: 0.2rem;
}
.movie-img img {
  width: 100%;
}
.movie-info {
  flex-grow: 3;
  width: 0;
}
.movie-name {
  font-weight: bolder;
}
.loading {
  text-align: center;
}
.tip {
  text-align: center;
}
.pingfeng {
  color: rgb(250, 175, 0);
}
.movie-imgs {
  width: 100px;
}
</style>
