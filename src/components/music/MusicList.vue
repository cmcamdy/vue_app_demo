<template>
  <div class="musiclist">
    <el-row id="search">
      <div class="search">
        <div class="search-input">
          <img src="../../assets/icon-search.png" alt="搜索" />
          <form @submit.prevent="search()">
            <input
              type="text"
              placeholder="搜索 歌曲/专辑/歌手"
              ref="getsongs"
            />
          </form>
        </div>
        <div class="search-cancel" @click="search()">
          搜索
        </div>
      </div>
    </el-row>
    <el-row v-for="it in musicLists" :key="it.id" class="list">
      <div @click="routerTo(it)">
        <img :src="it.author.img1v1Url" alt="" />
        <p class="dissname">
          歌名：<strong ref="dissname">{{ it.name }}</strong>
        </p>
        <p ref="name" class="name">歌手：{{ it.author.name }}</p>
      </div>
    </el-row>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      musicLists: [],
      artists: [],
      key: "",
    };
  },
  mounted() {
    // console.log("aaaaa");
    this.loadData("", "");
    //监听滚动事件
    window.onscroll = () => {
      let clientHeight = document.documentElement.clientHeight;
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      // console.log("clientHeight+scrollTop:" + (clientHeight + scrollTop));
      // console.log("scrollHeight:" + scrollHeight);
      if (clientHeight + scrollTop + 18 >= scrollHeight) {
        // console.log("到底了");
        // console.log(this.tip);
        // console.log(this.key,0);
        this.loadData(this.key, this.musicLists.length);
      }
    };
  },
  methods: {
    loadData(key, start) {
      console.log(key, start);
      if (key == "") {
        key = "达拉崩吧";
      }
      if (start == "") {
        start = 0;
      }
      // let url = "https://autumnfish.cn/search?limit=6&keywords="+key+"&start="+start;
      let url =
        "http://139.224.252.90:8004/search?limit=" +
        (start + 6) +
        "&keywords=" +
        key;
      console.log(url);
      console.log(key);
      Axios.get(url).then((res) => {
        console.log(res.data.result);
        this.musicLists = res.data.result.songs;
        // for (let i = this.musicLists.length; i < this.musicLists.length+6; i++) {
        //   this.musicLists[i] = res.data.result.songs[i-this.musicLists.length];
        //   this.musicLists[i].author = res.data.result.songs[i].artists[0];
        // }
        for (let i = 0; i < this.musicLists.length; i++) {
          this.musicLists[i].author = res.data.result.songs[i].artists[0];
        }
      });
    },
    search() {
      // alert(this.$refs.getsongs.value);
      this.key = this.$refs.getsongs.value;
      this.loadData(this.key, 0);
    },
    routerTo(it) {
      // :to="'/music/musicAlnums/' + it.id"
      console.log(it);
      this.$router.push({
        name: "MusicAlnums",
        params: {
          img_url: it.author.img1v1Url,
          music_id: it.id,
          artist_name: it.author.name,
          diss_name: it.name,
        },
      });
    },
  },
};
</script>

<style>
.musiclist {
  margin-top: 50px;
}
.list li {
  float: left;
  padding: 0.3rem 0 0.3rem 0.3rem;
  width: 44%;
}
.dissname {
  margin-left: 20px;
  font-size: x-small;
  color: black;
}
.name {
  margin-left: 20px;
  font-size: xx-small;
  color: rgb(153, 153, 153);
}

.search {
  width: 100%;
  height: 60px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 1;
}

.search-input {
  width: 100%;
  background: #eee;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.search-input img {
  height: 30px;
  width: 30px;
  display: inline-block;
  margin: 0 5px;
}

.search-input form,
.search-input input {
  width: 100%;
  height: 100%;
  border: none;
  background: #eee;
  font-size: medium;
  flex-grow: 1;
  border-radius: 5px;
  outline: none;
}

.search-cancel {
  height: 40px;
  width: 50px;
  margin: 10px auto;
  line-height: 40px;
  overflow: hidden;
  transition: width 0.3s;
  cursor: pointer;
}
.hotkey {
  margin-top: 60px;
  margin-bottom: 50px;
  background: #eeeeee;
  display: flex;
  flex-direction: column;
}
</style>
