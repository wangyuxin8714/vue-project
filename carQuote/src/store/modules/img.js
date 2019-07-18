import { getImgList,getAllImgList,getColor,colorSelect,getCarModelImg } from "../../services";

const state = {
  imgList:[],
  imgAllList:{},
  carColor:[],
  name:"",
  carModel:""
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
  //车款选择
  async getCarModelImg({ commit },payload) {
    let res = await getCarModelImg(payload);
    commit("getimg", res.data);
    return res
  },
};
//同步
const mutations = {
  //车款名保存
  saveCarModel(state,payload){
    state.carModel=payload
  },
  //颜色名保存
  nameSave(state,payload){
    state.name=payload
  },
  //获取图片列表
  getimg(state,payload){
    state.imgList=payload
    state.imgList.forEach(val=>{
      val.List.forEach(item=>{
        //处理图片路径
        item.Url=item.Url.slice(0,item.Url.search(/\{0\}/))+item.LowSize+".jpg"
      })
    })
  },
  //获取全部图片列表
  getAllImg(state,payload){
    payload.List.forEach(item=>{
      //处理图片路径
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
