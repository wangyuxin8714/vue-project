import Fly from "flyio/dist/npm/wx";

export let fly = new Fly();

//设置超时
fly.config.timeout = 10000;
//设置请求基地址
fly.config.baseURL = "https://upapi.jinaup.com/";
// fly.config.baseURL = "http://123.206.55.50:7001/"
// fly.config.baseURL = "http://169.254.12.68:7001/"
// fly.config.baseURL = 'http://127.0.0.1:7001/'

const HOST = "https://127.0.0.1"; // 更改
//添加请求拦截器
fly.interceptors.request.use(request => {
  // 把openid放在请求头部
  let openid = wx.getStorageSync("openid");
  if (openid) {
    request.headers["openid"] = openid;
  }

  request.headers['Cookie']=""
  request.headers['trackId']="F649B34989975F26EDBA4EFF3E2F9A3459BF2874A6E5851B3A973F20136F74B563CF7986C6E454AE4A90F682FD742511E85A5E24F876BB7475FF4B3E32A8803934CD0CD4E7CD5143743CCF6F83668C78717420FF1EAC30DDAF2AE4FDE7E45F31"
  request.headers['content-type']="application/x-www-form-urlencoded"
  // 给所有请求添加自定义header
  // request.headers["Cookie"] = map(cookies, (v, k) => k + '=' + v).join(';')

  //打印出请求体
  // console.log(request.body)
  //终止请求
  //var err=new Error("xxx")
  //err.request=request
  //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    if (response.request.url.indexOf(HOST) == 0) {
      let hcks =
        response.headers["set-cookie"] || response.headers["Set-Cookie"];
      if (hcks != null) {
        hcks.forEach(v => {
          let ck = v.split(";")[0].split("=");
          cookies[ck[0]] = ck[1];
        });
      }
    }
    //只将请求结果的data字段返回
    return response.data;
  },
  err => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
);

export default fly;
