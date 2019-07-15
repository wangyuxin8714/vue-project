import request from "../utils/request";



export let getCarList = params => {
  return request.get("v2-car-getMakeListByMasterBrandId.html?MasterID="+params);
};

