import request from "../utils/request";

//获取询问时的数据
export let getQuestionData = params => {
  return request.get(
    `/v2-dealer-alllist.html?carId=${params.carId}&cityId=${params.cityId}`
  );
};

//获取城市数据
export let getCityData = () => {
  return request.get("/location-client.html");
};

//获取全部城市接口
export let getAllCity = () => {
  return request.get("/v1-city-alllist.html");
};


//获取点击城市的数据
export let getClickList = params => {
  return request.get(
    `/v1-city-alllist.html?provinceid=${params.provinceid}`
  );
};

//点击按钮的接口--提交
export let submitLower = params => {
  return request.get(
    `/h2-submit-lowprice.html?carid=${params.carid}&mobile=${params.mobile}&dealerids=${params.dealerids}
    &location=${params.location}&carname=${params.carname}&locationid=${params.locationid}&name=${params.name}`
  );
};