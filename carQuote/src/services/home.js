import request from "../utils/request";



export let getListData = () => {
  return request.get("/v2-car-getMasterBrandList.html?_1563177884999");
};
