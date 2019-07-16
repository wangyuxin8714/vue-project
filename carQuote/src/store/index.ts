import Vue from "vue"
import Vuex from "vuex"
import createLogger from "vuex/dist/logger"

import index from "./modules/index";
import detail from "./modules/detail";
import img from "./modules/img";
import question from "./modules/question";

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        index,
        detail,
        img,
        question
    },
    state:{
       
    },
    mutations:{
       
    },
    plugins:[createLogger()]
})
