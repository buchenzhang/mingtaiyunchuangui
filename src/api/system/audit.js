import request from '@/utils/request'



export function getContractPdf(id) {
  return request({
    url: '/system/audit/nextcontractid',
    method: 'get'

  })
}


export function nextcontractid() {
  return request({
    url: '/system/audit/nextcontractid',
    method: 'get'
  })
}



// 删除审计
export function acceptAudit(id) {
  return request({
    url: '/system/audit/accept/' + id,
    method: 'delete'
  })
}

// 查询审计列表
export function listAudit(query) {
  return request({
    url: '/system/audit/list',
    method: 'get',
    params: query
  })
}

// 查询审计详细
export function getAudit(id) {
  return request({
    url: '/system/audit/' + id,
    method: 'get'
  })
}

// 新增审计
export function addAudit(data) {
  return request({
    url: '/system/audit',
    method: 'post',
    data: data
  })
}

// 修改审计
export function updateAudit(data) {
  return request({
    url: '/system/audit',
    method: 'put',
    data: data
  })
}


// 删除审计
export function delAudit(id) {
  return request({
    url: '/system/audit/' + id,
    method: 'delete'
  })
}
