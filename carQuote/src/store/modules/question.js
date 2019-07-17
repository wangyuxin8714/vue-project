import { getQuestionData, getCityData } from "../../services/";

const state = {
  questionObj: {},
  cityStr: ""
};

const getters = {};
//异步
const actions = {
  async getQuestionData({ commit }, payload) {
    const data = await getQuestionData(payload);
    commit("getQuestions", data.data);
  },
  async getCityData({ commit }) {
    const data = await getCityData();
    commit("getCitys", data.data);
  }
};
//同步
const mutations = {
  getQuestions(state, payload) {
    return (state.questionObj = { ...payload });
  },
  getCitys(state, payload) {
    return (state.cityStr = payload.CityName);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
