import request from '@/utils/request'

// 查询物联网设备列表
export function listDevice(query) {
  return request({
    url: '/iot_device/device/list',
    method: 'get',
    params: query
  })
}

// 查询物联网设备详细
export function getDevice(id) {
  return request({
    url: '/iot_device/device/' + id,
    method: 'get'
  })
}

// 新增物联网设备
export function addDevice(data) {
  return request({
    url: '/iot_device/device',
    method: 'post',
    data: data
  })
}

// 修改物联网设备
export function updateDevice(data) {
  return request({
    url: '/iot_device/device/editDevice',
    method: 'post',
    data: data
  })
}

// 删除物联网设备
export function delDevice(id) {
  return request({
    url: '/iot_device/device/deleteDevice/'+id,
    method: 'post'
  })
}

// 导出物联网设备
export function exportDevice(query) {
  return request({
    url: '/iot_device/device/export',
    method: 'get',
    params: query
  })
}

