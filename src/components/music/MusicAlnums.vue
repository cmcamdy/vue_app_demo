<template>
  <div class="albums">
    <div class="albums-content">
      <div class="albums-img">
        <img src="https://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bst32v6o80vMuV6vhefmusxxuRe6o8KrM8lA/600?n=1"alt=""/>
      </div>
      <div class="albums-info">
        <h5>{{this.$route.params.diss_name}}</h5>
        <p>{{this.$route.params.artist_name}}</p>
        <h6>播放量：399.8万</h6>
      </div>
    </div>
    <a-player v-if="isShow" :autoplay="true" :showLrc="true" theme="rgb(63,55,49)" :music="songs" :list="list" ref="player"></a-player>
    <div class="jianjie">
      <h4>歌单简介</h4>
      <p>
        <br/>
        这里写一点歌曲的介绍，或者放点别的什么的东西，可惜网易云这个API啥都没有，连个图片都是统一的缺省。。。<br/>
       <br/>
        几首歌，几段时光。跟我听歌吧！~<br/><br/><br/><br/>
        顺便来背背不定积分！~<br/>
        <img src="https://img-blog.csdn.net/20181009101454118?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3llbGxvd19oaWxs/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="">
        <img src="https://img-blog.csdn.net/20181009101305550?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3llbGxvd19oaWxs/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70://img-blog.csdn.net/20181009094210361?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3llbGxvd19oaWxs/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="">
      </p>
    </div>
  </div>
</template>

<script>
import VueAplayer from "vue-aplayer";
import Axios from "axios";

export default {
  data() {
    return {
      songs: {
        title: "",
        artist: "",
        src: "",
        pic: "../../../static/img/cyx.jpg",
        lrc: "",
      },
      list: [],
      isShow: false,
    };
  },
  components: {
    "a-player": VueAplayer,
  },
  async mounted() {
    await this.getMP3();
  },
  methods: {
    async getMP3() {
      let url1 ="http://www.cmcandy.com:8000/song/url?id=" +this.$route.params.music_id;
      console.log("url1:"+url1);
      await Axios.get(url1)
        .then((res) => {
          // this.songs.lrc = res.data.lrc.lyric;
          this.songs.src = res.data.data[0].url;
          console.log(res.data.data[0].url);
        }).catch();
      let url2 = "http://www.cmcandy.com:8000/lyric?id=" + this.$route.params.music_id;
      await Axios.get(url2)
        .then((res) => {
          this.songs.lrc = res.data.lrc.lyric;
          // console.log("this.songs"+this.songs);
          this.isShow = true;
        }).catch();
        this.songs.pic = this.$route.params.img_url;
        this.songs.title = this.$route.params.diss_name;
        this.songs.author = this.$route.params.artist_name;
        console.log(this.songs);
    },
  },
};
</script>

<style scoped>
.albums {
  margin: 1rem 0;
  width: 100%;
}
.albums-content {
  display: flex;
  background-color: rgb(63, 55, 49);
  padding: 0.3rem 0.3rem;
}
.albums-img {
  flex-grow: 1;
  width: 0;
  margin-right: 0.3rem;
}
.albums-info {
  flex-grow: 1.5;
  width: 0;
  color: #ffffff;
}
.albums-info h6 {
  font-weight: lighter;
}
.jianjie {
  color: #777777;
  padding: 0.25rem;
}
.jianjie h3 {
  padding: 0 37%;
}
</style>
