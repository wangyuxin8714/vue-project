import {
  getQuestionData,
  getCityData,
  getAllCity,
  getClickList,
  submitLower
} from "../../services/";

const state = {
  questionObj: {},
  cityObj: {},
  allCity: [],
  clickData: [],
  showCity: false,
  submitCode: 0
};

const getters = {};
//异步
const actions = {
  //获取询问时的数据
  async getQuestionData({ commit }, payload) {
    if (payload.carId !== "undefind") {
      const data = await getQuestionData(payload);
      commit("getQuestions", data.data);
    }
  },

  //获取城市数据
  async getCityData({ commit }) {
    const data = await getCityData();
    commit("getCitys", data.data);
  },

  //获取全部城市接口
  async getAllCity({ commit }) {
    const data = await getAllCity();
    commit("getAllCitys", data.data);
  },

  //获取点击城市的数据
  async getClickList({ commit }, payload) {
    const data = await getClickList(payload);
    commit("getClicks", data.data);
  },

  //获取点击城市的数据
  async submitLower({ commit }, payload) {
    const data = await submitLower(payload);
    // console.log(data);
    commit("submitData", data.code === 1 ? 1 : -1);
  }
};
//同步
const mutations = {
  getQuestions(state, payload) {
    //添加每条数据的选中状态
    payload.list =
      payload.list &&
      payload.list.map((item, index) => {
        if (index < 3) {
          item.flag = true;
        } else {
          item.flag = false;
        }
        return item;
      });
    return (state.questionObj = { ...payload });
  },
  //点击单选  改变flag
  changeFlag(state, { flag, index }) {
    const data = state.questionObj.list[index];
    data.flag = !data.flag;
  },
  getCitys(state, payload) {
    return (state.cityObj = payload);
  },
  getAllCitys(state, payload) {
    return (state.allCity = payload);
  },
  getClicks(state, payload) {
    return (state.clickData = payload);
  },
  changeShowCity(state, payload) {
    state.showCity = payload;
  },
  submitData(state, payload) {
    state.submitCode = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
