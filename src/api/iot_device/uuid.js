import request from '@/utils/request'

// 查询用（安装APP 的手机）列表
export function listUuid(query) {
  return request({
    url: '/iot_device/uuid/list',
    method: 'get',
    params: query
  })
}

// 查询用（安装APP 的手机）详细
export function getUuid(id) {
  return request({
    url: '/iot_device/uuid/' + id,
    method: 'get'
  })
}

// 新增用（安装APP 的手机）
export function addUuid(data) {
  return request({
    url: '/iot_device/uuid',
    method: 'post',
    data: data
  })
}

// 修改用（安装APP 的手机）
export function updateUuid(data) {
  return request({
    url: '/iot_device/uuid',
    method: 'put',
    data: data
  })
}

// 删除用（安装APP 的手机）
export function delUuid(id) {
  return request({
    url: '/iot_device/uuid/' + id,
    method: 'delete'
  })
}

// 导出用（安装APP 的手机）
export function exportUuid(query) {
  return request({
    url: '/iot_device/uuid/export',
    method: 'get',
    params: query
  })
}