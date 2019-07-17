import { getCarDetail } from "../../services/";

const state = {
    carDetail:{},
    yearList:["全部"],
    carlist:[],
    yearData:[]
};

const getters = {};
//异步
const actions = {
  //获取汽车详情
  async getCarDetail({ commit }, payload) {
    const res = await getCarDetail(payload);
    commit("updateCarDetail", res.data);
      return res
    },
  
};
//同步
const mutations = {
    updateCarDetail(state,payload){
        state.carDetail=payload
        state.carDetail.list.forEach((item)=>{
          state.yearList.push(item.market_attribute.year)
        })
        state.yearList=[...new Set(state.yearList)]
        state.yearData=state.yearList.slice(1)
        window.localStorage.setItem("yearData", JSON.stringify(state.yearData));
    },
    getYearTab(state,payload){
      console.log("payload",payload)
      let arr={}
      arr={...arr,...state.carDetail}
      if(payload!=="全部"){
        console.log("111111")
        arr.list=arr.list.filter(item=>item.market_attribute.year===payload)
      }
      state.carlist=[]
      arr.list.forEach((item)=>{
        console.log("222222")
        let ind=state.carlist.findIndex(val=>val.title===(item.exhaust_str+"/"+item.max_power_str+" "+item.inhale_type))
        if(ind===-1){
          state.carlist.push({
            exhaust_str:parseFloat(item.exhaust_str),
            title:item.exhaust_str+"/"+item.max_power_str+" "+item.inhale_type,
            contlist:[{
              tit:item.market_attribute.year+"款 "+item.car_name,
              title:item.horse_power+"马力"+item.gear_num+"档"+item.trans_type,
              dealer_price_max:item.market_attribute.official_refer_price,
              dealer_price_min:item.market_attribute.dealer_price_min,
              car_id:item.car_id,
              year:item.market_attribute.year
            }]
          })
        }else{
          state.carlist[ind].contlist.push({
              tit:item.market_attribute.year+"款 "+item.car_name,
              title:item.horse_power+"马力"+item.gear_num+"档"+item.trans_type,
              dealer_price_max:item.market_attribute.official_refer_price,
              dealer_price_min:item.market_attribute.dealer_price_min,
              car_id:item.car_id,
              year:item.market_attribute.year
          })
        }
      })
      state.carlist=state.carlist.sort((a,b)=>a.exhaust_str-b.exhaust_str)
      window.localStorage.setItem("carlist", JSON.stringify(state.carlist));
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
