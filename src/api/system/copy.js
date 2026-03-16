import request from '@/utils/request'


// 上传合同
export function uploadPDF(formData, contractData) {
  return request({
    url: '/contract/upload',
    method: 'post',
    data: formData,
    params:contractData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}



export function saveContract(query) {
  return request({
    url: '/system/base/saveContract',
    method: 'post',
    data: query
  })
}


// 查询部门镜像列表
export function listCopy(query) {
  return request({
    url: '/system/copy/list',
    method: 'get',
    params: query
  })
}

// 查询部门镜像详细
export function getCopy(deptId) {
  return request({
    url: '/system/copy/' + deptId,
    method: 'get'
  })
}

// 新增部门镜像
export function addCopy(data) {
  return request({
    url: '/system/copy',
    method: 'post',
    data: data
  })
}

// 修改部门镜像
export function updateCopy(data) {
  return request({
    url: '/system/copy',
    method: 'put',
    data: data
  })
}

// 删除部门镜像
export function delCopy(deptId) {
  return request({
    url: '/system/copy/' + deptId,
    method: 'delete'
  })
}
