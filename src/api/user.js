import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/api/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/api/user',
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: '/api/logout',
    method: 'post'
  })
}
