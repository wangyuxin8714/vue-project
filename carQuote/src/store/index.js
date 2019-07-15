import Vue from "vue"
import Vuex from "vuex"
import createLogger from "vuex/dist/logger"

import homes from "./modules/index"

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        homes
    },
    state:{
       
    },
    mutations:{
       
    },
    plugins:[createLogger()]
})
