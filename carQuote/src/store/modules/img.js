import { getImgList } from "../../services";

const state = {
  imgList:[]
};

const getters = {};
//异步
const actions = {
  async getImgList({ commit },payload) {
    const res = await getImgList(payload);
    console.log(res)
    commit("getimg", res.data);
    return res
  },
};
//同步
const mutations = {
  getimg(state,payload){
    state.imgList=payload
    state.imgList.forEach(val=>{
      val.List.forEach(item=>{
        item.Url=item.Url.slice(0,item.Url.search(/\{0\}/))+item.LowSize+".jpg"
      })
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
