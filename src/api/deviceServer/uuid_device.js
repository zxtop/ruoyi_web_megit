import request from '@/utils/request';
// http://192.168.10.8/dev-api/deviceServer/uuid_device?device_num=2

//用户接入设备
export function getUuid(query){
  return request({
    url:'/iot_device/uuid_device/list',
    method:'get',
    params:query
  })
}


// 查询timing列表
export function listTiming(query) {
  return request({
    url: '/iot_device/timing/list',
    method: 'get',
    params: query
  })
}

