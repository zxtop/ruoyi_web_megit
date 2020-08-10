import request from '@/utils/request'

// 查询timing列表
export function listTiming(query) {
  return request({
    url: '/iot_device/timing/list',
    method: 'get',
    params: query
  })
}

// 查询timing详细
export function getTiming(id) {
  return request({
    url: '/iot_device/timing/' + id,
    method: 'get'
  })
}

// 新增timing
export function addTiming(data) {
  return request({
    url: '/iot_device/timing',
    method: 'post',
    data: data
  })
}

// 修改timing
export function updateTiming(data) {
  return request({
    url: '/iot_device/timing',
    method: 'put',
    data: data
  })
}

// 删除timing
export function delTiming(id) {
  return request({
    url: '/iot_device/timing/' + id,
    method: 'delete'
  })
}

// 导出timing
export function exportTiming(query) {
  return request({
    url: '/iot_device/timing/export',
    method: 'get',
    params: query
  })
}