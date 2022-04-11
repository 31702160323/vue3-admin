declare namespace API {
  /** 登录参数 */
  type LoginParams = {
    // 验证码
    captcha: string;
    // 验证码ID
    captchaId: string;
    // 密码
    password: string;
    // 用户名
    username: string;
  };

  /** 登录成功结果 */
  type LoginResult = {
    user: any;
    token: string;
  };
}
