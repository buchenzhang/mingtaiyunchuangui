import request from '@/utils/request'

// 查询出货管理列表
export function listShipment(query) {
  return request({
    url: '/system/shipment/list',
    method: 'get',
    params: query
  })
}

// 查询出货管理详细
export function getShipment(id) {
  return request({
    url: '/system/shipment/' + id,
    method: 'get'
  })
}

// 新增出货管理
export function addShipment(data) {
  return request({
    url: '/system/shipment',
    method: 'post',
    data: data
  })
}


export function Ship(data) {
  return request({
    url: '/system/shipment/ship',
    method: 'put',
    data: data
  })
}

// 修改出货管理
export function updateShipment(data) {
  return request({
    url: '/system/shipment',
    method: 'put',
    data: data
  })
}

// 删除出货管理
export function delShipment(id) {
  return request({
    url: '/system/shipment/' + id,
    method: 'delete'
  })
}
