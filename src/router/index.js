import Vue from "vue";
import VueRouter from "vue-router";
import Movie from "@/components/movie/Movie";
import MovieList from "@/components/movie/MovieList";
import MovieDetail from "@/components/movie/MovieDetail";
import Music from "@/components/music/Music";
import MusicList from "@/components/music/MusicList";
import MusicAlnums from "@/components/music/MusicAlnums";
import personalCenter from "@/components/pcenter/PersonalCenter"
import BookSearch from "@/components/search/BookSearch"
Vue.use(VueRouter);
const routes = [{
    path: "/",
    redirect: "/movie/movieList"
  },{
    path: "/movie",
    name: "movie",
    component: Movie,
    children: [{
        path: "movieList",
        component: MovieList
        // component:() => import(/* webpackChunkName: "about" */ "@/movie/MovieList")
      },
      {
        path: "movieDetail/:movieId",
        component: MovieDetail
      }
    ]
  },{
    path: "/music",
    name: "music",
    component: Music,
    children: [{
        path: "musicList",
        component: MusicList
        // component:() => import(/* webpackChunkName: "about" */ "@/components/music/MusicList")
      },
      {
        path: "musicAlnums/:musicId",
        name: "MusicAlnums",
        component: MusicAlnums
        // component:() => import(/* webpackChunkName: "about" */ "@/components/music/MusicAlnums")
      }
    ]
  },{
    path: "/personalCenter",
    name: "pcenter",
    component: personalCenter,
  },{
    path: "/BookSearch",
    name: "BookSearch",
    component: BookSearch,
    // component:() => import(/* webpackChunkName: "about" */ "@/components/search/BookSearch")
    
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;