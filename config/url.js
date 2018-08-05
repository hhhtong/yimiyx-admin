import env from './env'

// const DEV_URL = 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/'
const DEV_URL = 'http://localhost:8080/'
const PRO_URL = 'http://erp.haohaihongtong.com/'

export default env === 'development' ? DEV_URL : PRO_URL
