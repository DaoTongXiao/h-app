import type { LoginResult, LoginParams } from '@/types/global'
import { http } from '@/utils/http'

type LoginWXParams = {
  code: string
  encryptedData: string
  iv: string
}

// 定义 API 响应类型
type LoginResponse = {
  code: string
  msg: string
  result: LoginResult
}
/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data: LoginWXParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

/**
 * 小程序登录_内测版
 * @param phoneNumber 模拟手机号码
 */
export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
/**
 * 网页登录
 */
export const postLoginAPI = (data: LoginParams) => {
  // 开发模式下模拟登录成功，返回与http结构一致的数据
  return (async () => {
    await new Promise(resolve => setTimeout(resolve, 800)) // 模拟网络延迟
    return {
      code: '200',
      msg: '登录成功',
      data: {
        id: 123,
        avatar: 'https://example.com/avatar.jpg',
        account: data.account,
        nickname: '测试用户',
        mobile: data.account,
        token: 'test_token_' + Date.now(),
      }
    }
  })()

  // 生产环境下的真实API调用（已注释）
  // return http<LoginResult>({
  //   method: 'POST',
  //   url: '/login',
  //   data,
  // })
}
