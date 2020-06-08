<template>
  <el-main>
    <el-row class="top" :gutter="20">
      <el-col :span="12"><img :src="movie.image" alt=""/></el-col>
      <el-col :span="12">
        <p><strong>电影名称：</strong><h2>{{ movie.title }}</h2></p>
        <p><strong>上映年份：</strong>{{ movie.year }}</p>
        <p><strong>期待人数： </strong>{{ movie.wish_count }}</p>
        <el-link type="success" icon="el-icon-d-arrow-right">了解更多</el-link>
      </el-col>
    </el-row>
    <el-col :span="8" ><h3>影片介绍:</h3></el-col>
    <el-row class="top"  :gutter="20" >
      <el-col :span="2"><br></el-col>
      <el-col :span="22">
        <!-- 这里很奇怪，落下效果没有出现 -->
        <el-collapse-transition>
          <p>{{ "\t"+movie.summary[0] }}
              <el-link type="success" v-show="sumShow" @click="readmore()" icon="el-icon-s-unfold" content="点击查看更多" >查看全部</el-link>
              <el-link type="success" v-show="!sumShow" @click="fold()" icon="el-icon-s-fold" content="点击收起">收起</el-link>
          </p>
        </el-collapse-transition>
      </el-col>
    </el-row>

    <el-row :span="8" ><h3>热门评论:</h3></el-row>
      <el-row class="top" v-for="coms in comments" :key="coms.id">
          <el-col :span="7" >
            <el-row>
              <strong>{{coms.author.name}}</strong>
            </el-row>
            <el-row>
              <el-image
                  style="width: 90px; height: 90px"
                  :src="coms.author.avatar"
                  ></el-image>
            </el-row>
          </el-col>
          <el-col :span="17">
            <el-row>发表时间：{{coms.created_at}}</el-row>
            <p >{{coms.content}}
              <el-link type="success" v-show="coms.content2.length>50" @click="coms.show=ReadOrFoldComments(coms.index)" icon="el-icon-s-unfold" content="点击查看更多" >......</el-link>
              <!-- <el-link type="success" v-show="coms.show" @click="coms.show=ReadOrFoldComments(coms.index)" icon="el-icon-s-fold" content="点击收起">收起</el-link> -->
            </p>
            
        </el-col>
      </el-row>
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
      comments: [],
      movie: {
        title: "",
        summary: [],
        image: "",
        wish_count: "",
        share_url: "",
        year: "",
      },
      sumShow: true,
      tip: false,
    };
  },
  mounted() {
    this.loading();
  },
  methods: {
    loading(){
      let url1 =
      API_PROXY +
      "https://api.douban.com/v2/movie/subject/" +
      this.$route.params.movieId +
      "?apikey=0df993c66c0c636e29ecbb5344252a4a";
      Axios.get(url1).then((res) => {
        // console.log(res);
        // this.detail = res.data.cinemas;
        // this.movie = res.data.detailMovie;
        //   console.log(res.data.title);
        //   console.log(res.data.summary);
        //   console.log(res.data.images.small);
        //   console.log(res.data.popular_comments);
        this.movie.title = res.data.title;
        if(res.data.summary.length>100){
          // console.log(res.data.summary.substring(0,100));
          this.movie.summary[0] = res.data.summary.substring(1,100);
          this.movie.summary[1] = res.data.summary.substring(100,);
        }
        this.movie.image = res.data.images.small;
        this.movie.wish_count = res.data.wish_count;
        this.movie.year = res.data.year;
        this.movie.share_url = res.data.share_url;
        this.comments = res.data.popular_comments;
        for( var i = 0;i<res.data.popular_comments.length;i++){
            this.comments[i].show = 0;
            this.comments[i].index = i;
            this.comments[i].content2 = res.data.popular_comments[i].content;
            this.comments[i].content = res.data.popular_comments[i].content.substring(0,50);
        }
        console.log(this.comments);
        this.tip = true;
      });
    },
    next() {
      this.$router.push("/movie/MovieDetail2");
    },
    readmore(){
      this.movie.summary[0] +=this.movie.summary[1]; 
      this.sumShow = false;
      console.log(this.movie.summary[0])
    },fold(){
      this.movie.summary[0] = this.movie.summary[0].substring(0,99);
      this.sumShow = true;
    },ReadOrFoldComments(index){
      console.log(this.comments[index]);
      console.log(this.comments[index].content);
      console.log(this.comments[index].show);

      if(this.comments[index].show==0){
        this.comments[index].content = this.comments[index].content2;
        this.comments[index].show = 1;
      }else{
        this.comments[index].content = this.comments[index].content2.substring(0,50);
        this.comments[index].show = 0;
      }
    }
  },
};
</script>

<style>

.top {
  margin-top: 60px;
  margin-bottom: 60px;
  border-radius: 30px;
  box-shadow: 0 20px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
