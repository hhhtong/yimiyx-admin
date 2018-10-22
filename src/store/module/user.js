import { login, logout, getUserInfo } from '@/api/user'
import { setToken, setCsrfToken, getToken, getCsrfToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    csrfToken: getCsrfToken(),
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, { token, csrf }) {
      state.token = token
      setToken(token)
      setCsrfToken(csrf)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          if (res.code === 50000) {
            resolve(res.data)
          } else {
            reject(new Error(res.msg))
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', { token: '', csrf: '' })
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', { token: '', csrf: '' })
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          if (res.code === 50000) {
            const data = res.data
            commit('setAvator', data.avator)
            commit('setUserName', data.userName)
            commit('setUserId', data.userId)
            commit('setAccess', data.access || ['super_admin', 'admin']) // - mock
            resolve(data)
          } else {
            resolve(data)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
