<template>
  <el-main class=" bg-purple">
     <el-carousel class="top" height="200px" :interval="5000" arrow="always">
        <el-carousel-item v-for="pic in banners" :key="pic.index">
          <el-image  style="width: 380px; height: 200px; " :src="pic.uri" :fit="fit" alt=""></el-image>
        </el-carousel-item>
      </el-carousel>
    <el-row  :gutter="20">
      <el-col :span="12"><img class="movie_img" :src="movie.image" alt=""/></el-col>
      <el-col :span="12">
        <p><strong>电影名称：</strong><h3 style="margin-bottom:40px">{{ movie.title }}</h3> </p>
        <p><strong>上映年份：</strong>{{ movie.year }}</p>
        <p><strong>期待人数：</strong>{{ movie.wish_count }}</p>
        <a type="success" icon="el-icon-d-arrow-right" src="https://movie.douban.com/subject/30261964/" >了解更多</a>
      </el-col>
    </el-row>
    <el-row :span="8" ><h3>影片介绍:</h3></el-row>
    <el-row class="card"  :gutter="20" >
      <el-col :span="2"><br></el-col>
      <el-col :span="22">
        <el-collapse-transition>
          <p>{{ "\t"+movie.summary[0] }}
              <el-link type="success" v-show="sumShow" @click="readmore()" icon="el-icon-s-unfold" content="点击查看更多" >查看全部</el-link>
              <el-link type="success" v-show="!sumShow" @click="fold()" icon="el-icon-s-fold" content="点击收起">收起</el-link>
          </p>
        </el-collapse-transition>
      </el-col>
    </el-row>

    <el-row :span="8" ><h3>热门评论:</h3></el-row>
      <el-row class="card" v-for="coms in comments" :key="coms.id">
        
          <el-col :span="7" >
            <el-row>
              <img  class="hphoto" :src="coms.author.avatar"/>
            </el-row>
            <el-row style="margin-left:15px">
              {{coms.author.name.substring(0,8)}}
            </el-row>
          </el-col>
          <el-col :span="17">
            <el-row>{{coms.created_at}}</el-row>
            <p >{{coms.content}}
              <el-link type="success" v-show="coms.content2.length>50" @click="coms.show=ReadOrFoldComments(coms.index)" icon="el-icon-s-unfold" content="点击查看更多" >......</el-link>
              <!-- <el-link type="success" v-show="coms.show" @click="coms.show=ReadOrFoldComments(coms.index)" icon="el-icon-s-fold" content="点击收起">收起</el-link> -->
            </p>
            
        </el-col>
      </el-row>
    <div class="loading" v-show="!tip">
      <img src="@/assets/img/loading.gif" alt="" />
    </div>
    <div v-show="tip"  class="tip">
      <h4>已经到底了^-^</h4>
    </div>
    <!-- <div class="blank"></div> -->
  </el-main>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      comments: [],
      length: 0,
      shows:[],
      fit:"cover",
      movie: {
        title: "",
        summary: [],
        image: "",
        wish_count: "",
        share_url: "",
        year: "",
       
      },
      banners:[{
                  id: 1,
                  // uri: 'http://img0.imgtn.bdimg.com/it/u=1292571282,473977860&fm=27&gp=0.jpg'
                  uri: 'http://img1.imgtn.bdimg.com/it/u=2345964138,2156090285&fm=27&gp=0.jpg'
              },
              {
                  id: 2,
                  uri: 'http://img1.imgtn.bdimg.com/it/u=2345964138,2156090285&fm=27&gp=0.jpg'

              },
              {
                  id: 3,
                  // uri: 'http://img1.imgtn.bdimg.com/it/u=2345964138,2156090285&fm=27&gp=0.jpg'
                  uri: 'http://img1.imgtn.bdimg.com/it/u=2345964138,2156090285&fm=27&gp=0.jpg'


              },],
      sumShow: true,
      tip: false,
    };
  },
  mounted() {
    // Indicator.open('加载中...');
    this.loading();
  },
  methods: {
    
    loading(){
      console.log("this.$route.params.movieId="+this.$route.params.movieId)
      let url1 = API_PROXY +"https://api.douban.com/v2/movie/subject/" +this.$route.params.movieId +"?apikey=0df993c66c0c636e29ecbb5344252a4a";
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
            this.shows[i] = 0;
            this.comments[i].index = i;
            this.comments[i].content2 = res.data.popular_comments[i].content;
            this.comments[i].content = res.data.popular_comments[i].content.substring(0,50);
        }
        this.length = this.shows.length;
        console.log(this.comments);
        this.tip = true;
      });
    },
    readmore(){
      this.movie.summary[0] +=this.movie.summary[1]; 
      this.sumShow = false;
      console.log(this.movie.summary[0])
    },fold(){
      this.movie.summary[0] = this.movie.summary[0].substring(0,99);
      this.sumShow = true;
    },ReadOrFoldComments(index){
      console.log("index = "+index);
      console.log(this.comments[index]);
      // console.log(this.comments[index].content);

      if(this.shows[index]==0){
        this.comments[index].content = this.comments[index].content2;
        this.shows[index] = 1;
        // this.$set(comments[index].show,0);
      }else{
        this.comments[index].content = this.comments[index].content2.substring(0,50);
        this.shows[index] = 0;
      }
    }
  },
};
</script>

<style>
.hphoto{
  width: 50px; height: 50px; border-radius:50px;margin-left:20px;margin-top:20px;
}

.top {
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 30px;
  box-shadow: 1px 0px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.movie_img{
  border-radius: 30px;
}
.card {
  border-radius: 30px;
  box-shadow: 0px -30px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.el-row {
  margin-bottom: 20px;
  transition: height 0.3s;
}
.el-col {
  border-radius: 4px;
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
