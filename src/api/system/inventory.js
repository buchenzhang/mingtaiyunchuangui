import request from '@/utils/request'

// 查询库存管理列表
export function listInventory(query) {
  return request({
    url: '/system/inventory/list',
    method: 'get',
    params: query
  })
}

// 查询库存管理详细
export function getInventory(id) {
  return request({
    url: '/system/inventory/' + id,
    method: 'get'
  })
}

// 新增库存管理
export function addInventory(data) {
  return request({
    url: '/system/inventory',
    method: 'post',
    data: data
  })
}

// 修改库存管理
export function updateInventory(data) {
  return request({
    url: '/system/inventory',
    method: 'put',
    data: data
  })
}

// 删除库存管理
export function delInventory(id) {
  return request({
    url: '/system/inventory/' + id,
    method: 'delete'
  })
}

// 库存调整
export function adjustInventory(data) {
  return request({
    url: '/system/inventory/adjust',
    method: 'post',
    data: data
  })
}
