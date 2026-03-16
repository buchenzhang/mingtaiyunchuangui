import request from '@/utils/request'

// 查询生产看板列表
export function listStatus(query) {
  return request({
    url: '/system/status/list',
    method: 'get',
    params: query
  })
}

// 查询生产看板详细
export function getStatus(id) {
  return request({
    url: '/system/status/' + id,
    method: 'get'
  })
}

// 新增生产看板
export function addStatus(data) {
  return request({
    url: '/system/status',
    method: 'post',
    data: data
  })
}

// 修改生产看板
export function updateStatus(data) {
  return request({
    url: '/system/status',
    method: 'put',
    data: data
  })
}

// 删除生产看板
export function delStatus(id) {
  return request({
    url: '/system/status/' + id,
    method: 'delete'
  })
}
