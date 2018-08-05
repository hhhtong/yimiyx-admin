import axios from '@/libs/api.request'

/**
 * 获取商品分类列表
 */
export function categoryGet (params) {
  return axios.request({
    url: '/goodsCategory',
    method: 'get',
    params
  })
}

/**
 * 删除商品分类
 */
export function categoryDel (data) {
  return axios.request({
    url: '/goodsCategory/delete',
    method: 'post',
    data
  })
}

/**
 * 修改商品分类
 */
export function categorySave (data) {
  return axios.request({
    url: '/goodsCategory/save',
    method: 'post',
    data
  })
}
