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

//获取全部图片列表
export let getAllImgList = params => {
  return request.get(`/v2-car-getCategoryImageList.html?SerialID=${params.SerialID}&ImageID=${params.ImageID}&Page=${params.Page}&PageSize=${params.PageSize}`);
};

//获取颜色
export let getColor = params => {
  return request.get("/v2-car-getModelImageYearColor.html?SerialID="+params);
};

//颜色选择
export let colorSelect = params => {
  return request.get(`/v2-car-getImageList.html?SerialID=${params.SerialID}&ColorID=${params.ColorID}`);
};
