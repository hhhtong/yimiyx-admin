import axios from '@/libs/api.request'
window.axios = axios
/**
 * 获取供货商列表
 */
export function supplierGet (params) {
  return axios.request({
    url: '/api/supplier',
    method: 'get',
    params
  })
}

/**
 * 添加供货商
 */
export function supplierAdd (data) {
  return axios.request({
    url: '/api/supplier/add',
    method: 'post',
    data
  })
}

/**
 * 删除供货商
 */
export function supplierDel (data) {
  return axios.request({
    url: '/api/supplier/delete',
    method: 'post',
    data
  })
}

/**
 * 修改供货商
 */
export function supplierUpdate (data) {
  return axios.request({
    url: '/api/supplier/update',
    method: 'post',
    data
  })
}
