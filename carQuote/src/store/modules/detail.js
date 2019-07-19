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
    //获取汽车详情
    updateCarDetail(state,payload){
        state.yearList=["全部"];
        state.yearData=[];
        state.carDetail=payload
        //处理图片路径
        if(state.carDetail.CoverPhoto.search(/\{0\}/)!==-1){
          state.carDetail.CoverPhoto=state.carDetail.CoverPhoto.slice(0,state.carDetail.CoverPhoto.search(/\{0\}/))+state.carDetail.CoverPhotoSize+".jpg"
        }
        //过滤出年份
        state.carDetail.list.forEach((item)=>{
          state.yearList.push(item.market_attribute.year)
        })
        state.yearList=[...new Set(state.yearList)]
        state.yearList.sort((a,b)=>b-a)
        state.yearData=state.yearList.slice(1)
        window.localStorage.setItem("yearData", JSON.stringify(state.yearData));
    },
    //通过年份过滤详情数据，处理数据
    getYearTab(state,payload){
      let arr={}
      arr={...arr,...state.carDetail}
      if(payload!=="全部"){
        arr.list=arr.list.filter(item=>item.market_attribute.year===payload)
      }
      state.carlist=[]
      //处理数据
      arr.list.forEach((item)=>{
        let ind=state.carlist.findIndex(val=>val.title===(item.exhaust_str+"/"+item.max_power_str+" "+item.inhale_type))
        if(ind===-1){
          state.carlist.push({
            exhaust_str:parseFloat(item.exhaust_str),
            max_power_str:parseFloat(item.max_power_str),
            inhale_type:item.inhale_type,
            title:item.exhaust_str+"/"+item.max_power_str+" "+item.inhale_type,
            contlist:[{
              tit:item.market_attribute.year+"款 "+item.car_name,
              title:item.horse_power+"马力"+item.gear_num+"档"+item.trans_type,
              dealer_price_max:item.market_attribute.official_refer_price,
              dealer_price_min:item.market_attribute.dealer_price_min,
              car_id:item.car_id,
              year:Number(item.market_attribute.year)
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
      // 排序规则：1.排量升序 2.发动机功率升序 3.吸气方式（涡轮增压>自然吸气）4.年份降序
      //通过油量排序
      state.carlist=state.carlist.sort((a,b)=>a.exhaust_str-b.exhaust_str)
      // 发动机功率升序
      state.carlist=state.carlist.sort((a,b)=>{
        if(parseFloat(a.exhaust_str)===parseFloat(b.exhaust_str)){
          return parseFloat(a.max_power_str)-parseFloat(b.max_power_str)
        }
      })
      // 吸气方式（涡轮增压>自然吸气）
      state.carlist.sort((a, b)=>{
        return (a.inhale_type).localeCompare(b.inhale_type, 'zh-CN');
      })
      // 年份降序
      state.carlist.map(item=>{
        item.contlist.sort((a,b)=>parseFloat(b.year)-parseFloat(a.year))
      })
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
