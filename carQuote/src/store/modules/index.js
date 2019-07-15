import {getCarList} from "@/services"
const state={
    carList:[]
}

const getters = {

}
//异步
const actions={
    async getCarList({commit},payload){
        let res=await getCarList(payload)
        console.log(res)
        commit("updateCarList",res.data)
    }
}
//同步
const mutations={
    updateCarList(state,payload){
        state.carList=payload
    }

}


export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}