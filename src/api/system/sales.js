import request from '@/utils/request'

// 查询销售记录列表
export function listSales(query) {
  return request({
    url: '/system/sales/list',
    method: 'get',
    params: query
  })
}

// 查询销售记录详细
export function getSales(id) {
  return request({
    url: '/system/sales/' + id,
    method: 'get'
  })
}

// 新增销售记录
export function addSales(data) {
  return request({
    url: '/system/sales',
    method: 'post',
    data: data
  })
}

// 修改销售记录
export function updateSales(data) {
  return request({
    url: '/system/sales',
    method: 'put',
    data: data
  })
}

// 删除销售记录
export function delSales(id) {
  return request({
    url: '/system/sales/' + id,
    method: 'delete'
  })
}
