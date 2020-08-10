import request from '@/utils/request'

// 查询用户手持入库列表
export function listUuid_line(query) {
  return request({
    url: '/iot_device/uuid_line/list',
    method: 'get',
    params: query
  })
}

// 查询用户手持入库详细
export function getUuid_line(id) {
  return request({
    url: '/iot_device/uuid_line/' + id,
    method: 'get'
  })
}

// 新增用户手持入库
export function addUuid_line(data) {
  return request({
    url: '/iot_device/uuid_line',
    method: 'post',
    data: data
  })
}

// 修改用户手持入库
export function updateUuid_line(data) {
  return request({
    url: '/iot_device/uuid_line',
    method: 'put',
    data: data
  })
}

// 删除用户手持入库
export function delUuid_line(id) {
  return request({
    url: '/iot_device/uuid_line/' + id,
    method: 'delete'
  })
}

// 导出用户手持入库
export function exportUuid_line(query) {
  return request({
    url: '/iot_device/uuid_line/export',
    method: 'get',
    params: query
  })
}