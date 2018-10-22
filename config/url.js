import env from './env'

const DEV_URL = ''
const PRO_URL = '/'
// const PRO_URL = 'http://erp.haohaihongtong.com/'

export default env === 'development' ? DEV_URL : PRO_URL
