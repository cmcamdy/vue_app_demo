import Vue from "vue";
import VueRouter from "vue-router";
import Movie from "@/movie/Movie";
import MovieList from "@/movie/MovieList";
import MovieDetail from "@/movie/MovieDetail";

Vue.use(VueRouter);
const routes = [{
    path: "/",
    redirect: "/movie/movieList"
  },
  {
    path: "/movie",
    name: "movie",
    component: Movie,
    children: [{
        path: "movieList",
        component: MovieList
        // component:() => import(/* webpackChunkName: "about" */ '@/movie/MovieList')
      },
      {
        path: "movieDetail/:movieId",
        component: MovieDetail
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;