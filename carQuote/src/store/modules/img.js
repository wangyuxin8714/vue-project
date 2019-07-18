import { getImgList,getAllImgList,getColor,colorSelect } from "../../services";

const state = {
  imgList:[],
  imgAllList:{},
  carColor:[],
  name:"颜色"
};

const getters = {};
//异步
const actions = {
  //获取图片列表
  async getImgList({ commit },payload) {
    const res = await getImgList(payload);
    commit("getimg", res.data);
    return res
  },
  //获取全部图片列表
  async getAllImgList({ commit },payload) {
    const res = await getAllImgList(payload);
    commit("getAllImg", res.data);
    return res
  },
  //获取颜色
  async getColor({ commit },payload) {
    const res = await getColor(payload);
    commit("getCarColor", res.data);
    return res
  },
  //颜色选择
  async colorSelect({ commit },payload) {
    let res = await colorSelect(payload);
    commit("getimg", res.data);
    return res
  },
};
//同步
const mutations = {
  nameSave(state,payload){
    state.name=payload
  },
  //获取图片列表
  getimg(state,payload){
    state.imgList=payload
    state.imgList.forEach(val=>{
      val.List.forEach(item=>{
        item.Url=item.Url.slice(0,item.Url.search(/\{0\}/))+item.LowSize+".jpg"
      })
    })
  },
  //获取全部图片列表
  getAllImg(state,payload){
    payload.List.forEach(item=>{
      item.Url=item.Url.slice(0,item.Url.search(/\{0\}/))+item.LowSize+".jpg"
    })
    if(payload.Page===2){
      state.imgAllList=payload
    }else{
      state.imgAllList.List=[...state.imgAllList.List,...payload.List]
    }
  },
  //获取颜色
  getCarColor(state,payload){
    for(var k in payload){
      state.carColor.push({
        year:k,
        colorArr:payload[k]
      })
    }
    state.carColor=state.carColor.reverse()
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
