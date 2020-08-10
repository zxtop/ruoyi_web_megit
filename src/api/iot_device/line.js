import request from '@/utils/request'

// 查询设备各路状态（iot_device子）列表
export function listLine(query) {
  return request({
    url: '/iot_device/line/list',
    method: 'get',
    params: query
  })
}

// 查询设备各路状态（iot_device子）详细
export function getLine(id) {
  return request({
    url: '/iot_device/line/' + id,
    method: 'get'
  })
}

// 新增设备各路状态（iot_device子）
export function addLine(data) {
  return request({
    url: '/iot_device/line',
    method: 'post',
    data: data
  })
}

// 修改设备各路状态（iot_device子）
export function updateLine(data) {
  return request({
    url: '/iot_device/line',
    method: 'put',
    data: data
  })
}

// 删除设备各路状态（iot_device子）
export function delLine(id) {
  return request({
    url: '/iot_device/line/' + id,
    method: 'delete'
  })
}

// 导出设备各路状态（iot_device子）
export function exportLine(query) {
  return request({
    url: '/iot_device/line/export',
    method: 'get',
    params: query
  })
}