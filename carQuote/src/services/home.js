import request from "../utils/request";



export let tabList = data => {
  return request.post("/api/open/product/category/sub/1?parentId=" + data);
};

