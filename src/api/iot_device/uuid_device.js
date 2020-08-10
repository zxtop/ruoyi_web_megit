import request from '@/utils/request'

// 查询用户接入的设备列表
export function listUuid_device(query) {
  return request({
    url: '/iot_device/uuid_device/list',
    method: 'get',
    params: query
  })
}

// 查询用户接入的设备详细
export function getUuid_device(id) {
  return request({
    url: '/iot_device/uuid_device/' + id,
    method: 'get'
  })
}

// 新增用户接入的设备
export function addUuid_device(data) {
  return request({
    url: '/iot_device/uuid_device',
    method: 'post',
    data: data
  })
}

// 修改用户接入的设备
export function updateUuid_device(data) {
  return request({
    url: '/iot_device/uuid_device',
    method: 'put',
    data: data
  })
}

// 删除用户接入的设备
export function delUuid_device(id) {
  return request({
    url: '/iot_device/uuid_device/' + id,
    method: 'delete'
  })
}

// 导出用户接入的设备
export function exportUuid_device(query) {
  return request({
    url: '/iot_device/uuid_device/export',
    method: 'get',
    params: query
  })
}