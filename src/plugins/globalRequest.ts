import {extend} from 'umi-request'
import {message} from 'antd'
import {history} from '@@/core/history'


const request = extend({
  credentials: 'include',
})

request.interceptors.response.use(async (response): Promise<any> => {
  // 请求成功，返回数据
  const res = await response.clone().json()
  if (res.code !== 0) {
    message.error(res.description ?? res.message)
    // 如果code为40100未登录，或者无权限，跳回登录页面
    if (res.code === 40100 || res.code === 40010) {
      history.push('/user/login')
    }
  }
  return res.data;
})
export  default request;
