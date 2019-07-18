import Vue from "vue";
import Router from "vue-router";

//loading组件

const Home = () => import("@/views/Home.vue");
const CarDetail = () => import("@/views/cardetail.vue");
const Img = () => import("@/views/img.vue");
const Question = () => import("@/views/myAskprice.vue");
const TypeChoose = () => import("@/views/typechoose.vue");
const Color = () => import("@/views/carColor.vue");
const Type = () => import("@/views/type.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/typechoose",
      name: "typechoose",
      component: TypeChoose
    },
    {
      path: "/type",
      name: "type",
      component: Type
    },
    {
      path: "/color",
      name: "color",
      component: Color
    },
    {
      path: "/question",
      name: "question",
      component: Question
    },
    {
      path: "/img",
      name: "img",
      component: Img
    },
    {
      path: "/cardetail",
      name: "cardetail",
      component: CarDetail
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
