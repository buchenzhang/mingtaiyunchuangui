import request from '@/utils/request'

// 查询审计结果列表
export function listResult(query) {
  return request({
    url: '/system/result/list',
    method: 'get',
    params: query
  })
}

// 查询审计结果详细
export function getResult(id) {
  return request({
    url: '/system/result/' + id,
    method: 'get'
  })
}

// 新增审计结果
export function addResult(data) {
  return request({
    url: '/system/result',
    method: 'post',
    data: data
  })
}

// 修改审计结果
export function updateResult(data) {
  return request({
    url: '/system/result',
    method: 'put',
    data: data
  })
}

// 删除审计结果
export function delResult(id) {
  return request({
    url: '/system/result/' + id,
    method: 'delete'
  })
}
