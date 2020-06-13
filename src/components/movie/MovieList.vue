<template>
  <div class="lists bg-purple">
      <div @click="goDeatil(movie.id)" v-for="movie in moveList" :key="movie.id" class="movie" :gutter="20" style="margin-bottom:0px">
        <el-col :span="10">
            <img :src="movie.images.small" alt="" class="movie-imgs" :fit="fit"></img>
        </el-col>
        <el-col :span="14">
          <div class="grid-content ">
            <el-row class="movie-name"
              ><el-col :span="6">片名：</el-col
              ><el-col :span="18"
                ><strong>{{ movie.title }}</strong></el-col
              ></el-row
            >
            <p>时长：{{ movie.durations[0] }}</p>
            <el-row
              ><el-col :span="6">评分：</el-col
              ><el-col :span="16"
                ><el-rate
                  v-model="movie.rating.average / 2"
                  allow-half
                  disabled
                  text-color="#ff9900"
                ></el-rate></el-col
            ></el-row>
            <p>主演：{{ movie.casts[0].name }}</p>
            <p>导演：{{ movie.directors[0].name }}</p>
            <p>{{ movie.showInfo }}</p>
          </div>
        </el-col>
      </div>

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
      fit:"contain",
    };
  },
  mounted() {
    this.loadData();
    //监听滚动事件
    window.onscroll = () => {
      let clientHeight = document.documentElement.clientHeight;
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      // console.log("clientHeight+scrollTop:"+(clientHeight+scrollTop));
      // console.log("scrollHeight:"+scrollHeight);
      if (clientHeight + scrollTop + 18 >= scrollHeight) {
        // console.log("到底了");
        console.log(this.tip);
        if (!this.tip) {
          console.log("data");
          this.loadData();
        }
      }
    };
  },
  methods: {
    loadData() {
      // let url =
      //   API_PROXY +
      //   "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=" +
      //   (this.length + 3);
      // let url = API_PROXY +"https://douban.uieee.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=" +(this.length + 3);
      let url =
        API_PROXY +
        "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=" +
        (this.length + 4);
      console.log(url);
      Axios.get(url)
        .then((res) => {
          this.loadingShow = false;
          let list = res.data.subjects;
          this.moveList = list;
          //   console.log(this.moveList.length);
          //   console.log(this.length);
          if (this.moveList.length == this.length + 4) {
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
.movie-name {
  margin-top: 20px;
}
.movie-imgs {
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 14px;
  width: 120px;
  height: 180px;
}
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
  border-radius: 40px;
  display: flex;
  border-bottom: 5px solid #ccc;
  box-shadow: 0 -20px 12px 0 rgba(27, 3, 3, 0.1);
}
</style>
