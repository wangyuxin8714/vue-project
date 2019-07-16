import { getListData,getCarList } from "../../services/";

const state = {
  listData: {},
  carList:[]
};

const getters = {};
//异步
const actions = {
  async getListData({ commit }) {
    const data = await getListData();
    commit("getLists", data.data);
  },
  async getCarList({commit},payload){
    let res=await getCarList(payload)
    commit("updateCarList",res.data)
    return res
  }
};
//同步
const mutations = {
  getLists(state, payload) {
    var arr = [];
    //过滤数据  获取字母
    payload.forEach(item => {
      const str = item.Spelling.slice(0, 1);
      if (arr.find(item => item === str)) {
        arr = arr;
      } else {
        arr.push(str);
      }
    });

    //添加对象
    var obj = {};
    arr.forEach(item => {
      obj[item] = [];
    });

    //获取字母对应的数据
    for (var i in obj) {
      if (payload.find(item => item.Spelling.slice(0, 1) === i)) {
        obj[i] = [
          ...obj[i],
          ...payload.filter(item => item.Spelling.slice(0, 1) === i)
        ];
      }
    }
    return (state.listData = obj);
  },
  updateCarList(state,payload){
    state.carList=payload
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
