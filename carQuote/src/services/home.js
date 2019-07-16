import request from "../utils/request";



export let getListData = () => {
  return request.get("/v2-car-getMasterBrandList.html?_1563177884999");
}


export let getCarList = params => {
  return request.get("v2-car-getMakeListByMasterBrandId.html?MasterID="+params);
};

//获取汽车详情
export let getCarDetail = params => {
  return request.get("/v2-car-getInfoAndListById.html?SerialID="+params);
};

//获取图片列表
export let getImgList = params => {
  return request.get("/v2-car-getImageList.html?SerialID="+params);
};
