<script setup lang="ts"> 
import { ref, reactive } from 'vue' 
import { postLoginAPI } from '@/api/login'
import { useUserStore } from '@/stores'
import type { LoginParams, LoginResult } from '@/types/global'

// 表单数据
const form = reactive({
  phone: '',
  password: '',
  code: '',
  agree: false
})

// 输入框是否聚焦
const isFocus = ref(false)

// 验证码倒计时
const countdown = ref(0)
const timer = ref<number | null>(null)

// 加载状态
const isLoading = ref(false)
const isSendingCode = ref(false)

// 错误状态
const errors = ref({
  phone: '',
  password: '',
  code: ''
})

// 发送验证码
const sendCode = async () => {
  if (!form.phone) {
    uni.showToast({ title: '请输入手机号', icon: 'none' })
    return
  }
  if (isSendingCode.value) return

  try {
    isSendingCode.value = true
    // 模拟发送验证码逻辑
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟网络请求
    uni.showToast({ title: '验证码已发送', icon: 'success' })
    startCountdown()
  } catch (error) {
    uni.showToast({ title: '发送失败，请重试', icon: 'none' })
  } finally {
    isSendingCode.value = false
  }
}

// 开始倒计时
const startCountdown = () => {
  countdown.value = 60
  timer.value = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer.value!)
      timer.value = null
    }
  }, 1000)
}

// 表单验证函数
const validateForm = () => {
  errors.value = { phone: '', password: '', code: '' }
  let isValid = true

  // 手机号验证
  if (!form.phone) {
    errors.value.phone = '请输入手机号'
    isValid = false
  } else if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    errors.value.phone = '请输入正确的手机号'
    isValid = false
  }

  // 密码验证
  if (!form.password) {
    errors.value.password = '请输入密码'
    isValid = false
  } else if (form.password.length < 6) {
    errors.value.password = '密码长度至少6位'
    isValid = false
  }

  // 验证码验证
  if (!form.code) {
    errors.value.code = '请输入验证码'
    isValid = false
  } else if (form.code.length !== 6) {
    errors.value.code = '验证码为6位数字'
    isValid = false
  }

  return isValid
}

// 清除错误
const clearError = (field: keyof typeof errors.value) => {
  if (errors.value[field]) {
    errors.value[field] = ''
  }
}

// 登录提交
const submitForm = async () => {
  if (!validateForm()) {
    uni.showToast({ title: '表单验证失败', icon: 'none' })
    return
  }
  if (!form.agree) {
    uni.showToast({ title: '请同意用户协议', icon: 'none' })
    return
  }
  if (isLoading.value) return

  try {
    isLoading.value = true
    console.log('开始登录...')
    const res = await postLoginAPI({
      account: form.phone,
      password: form.password,
      code: form.code
    })
    console.log('API响应:', res)
    loginSuccess(res.data)
  } catch (error) {
    console.error('登录失败:', error)
    uni.showToast({ title: '登录失败，请重试', icon: 'none' })
  } finally {
    isLoading.value = false
  }
}

// 登录成功处理
const loginSuccess = (profile: LoginResult) => {
  const userStore = useUserStore()
  userStore.setUserInfo(profile)
  uni.showToast({ icon: 'success', title: '登录成功' })
  setTimeout(() => {
    uni.switchTab({ url: '/pages/home/index' })
  }, 500)
}

// 处理注册点击
const handleRegisterClick = () => {
  console.log('注册按钮被点击')
  try {
    uni.navigateTo({
      url: '/pages/register/index',
      fail: (err) => {
        console.error('导航失败:', err)
        // 尝试其他导航方式
        console.log('尝试使用 uni.reLaunch')
        uni.reLaunch({
          url: '/pages/register/index',
          fail: (reLaunchErr) => {
            console.error('reLaunch 也失败:', reLaunchErr)
            uni.showToast({ title: '页面跳转失败', icon: 'none' })
          }
        })
      },
      success: () => {
        console.log('导航成功')
      }
    })
  } catch (error) {
    console.error('注册跳转错误:', error)
    uni.showToast({ title: '跳转异常', icon: 'none' })
  }
}
</script>

<template>
  <view class="viewport">
    <!-- 标题区域 -->
    <view class="title-section">
      <view class="title-container">
        <text class="main-title">
          新疆生产建设兵团
        </text>
        <view class="welcome-badge">
          欢迎登录
        </view>
      </view>
      <text class="sub-title">
        第五师双河市
      </text>
    </view>

    <!-- 表单区域 -->
    <view class="form-section">
      <!-- 手机号输入框 -->
      <view class="input-container">
        <input
          v-model="form.phone"
          type="number"
          placeholder="请输入手机号"
          class="input-field"
          @focus="clearError('phone')"
        >
        <view
          v-if="form.phone"
          class="clear-btn"
          @click="form.phone = ''"
        >
          <text class="clear-icon">
            ⊗
          </text>
        </view>
      </view>

      <!-- 密码输入框 -->
      <view class="input-container">
        <input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          class="input-field password-field"
          @focus="clearError('password')"
        >
        <view class="password-toggle">
          <text class="eye-icon">
            👁
          </text>
        </view>
      </view>

      <!-- 验证码输入框 -->
      <view class="input-container">
        <input
          v-model="form.code"
          type="number"
          placeholder="请输入手机验证码"
          class="input-field"
          @focus="clearError('code')"
        >
      </view>

      <!-- 协议勾选 -->
      <view class="agreement-section">
        <view
          class="checkbox-container"
          @click="form.agree = !form.agree"
        >
          <view
            class="checkbox"
            :class="{ checked: form.agree }"
          >
            <text
              v-if="form.agree"
              class="check-mark"
            >
              ✓
            </text>
          </view>
        </view>
        <text class="agreement-text">
          我已阅读并同意
          <text
            class="policy-link"
            @click="uni.navigateTo({ url: '/pages/policy/index' })"
          >
            《用户隐私政策》
          </text>
        </text>
      </view>

      <!-- 登录按钮 -->
      <button
        class="login-button"
        :disabled="isLoading"
        @click="submitForm"
      >
        {{ isLoading ? '登录中...' : '登录' }}
      </button>

      <!-- 底部链接 -->
      <view class="footer-links">
        <text
          class="forgot-password"
          @click="uni.navigateTo({ url: '/pages/sub-pages/forget-password/index' })"
        >
          忘记密码？
        </text>
        <view class="register-section">
          <text class="no-account">
            没有账号？
          </text>
          <text
            class="register-link"
            @click.stop="handleRegisterClick"
          >
            立即注册 ›
          </text>
        </view>
      </view>
    </view>

    <!-- 底部指示器 -->
    <view class="bottom-indicator" />
  </view>
</template>

<style lang="scss">
.viewport {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #E8F2FF 0%, #F5F7FA 100%);
  position: relative;
  overflow: hidden;
}
/* 标题区域 */
.title-section {
  margin-top: 140rpx;
  padding: 0 40rpx;
  
  .title-container {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    .main-title {
      font-size: 44rpx;
      font-weight: bold;
      color: #1a1a1a;
      margin-right: 20rpx;
    }
    
    .welcome-badge {
      background: #4A90E2;
      color: #fff;
      font-size: 26rpx;
      padding: 8rpx 24rpx;
      border-radius: 30rpx;
      font-weight: 500;
    }
  }
  
  .sub-title {
    font-size: 36rpx;
    color: #333;
    font-weight: 500;
  }
}

/* 表单区域 */
.form-section {
  margin-top: 80rpx;
  padding: 0 40rpx;
}

/* 输入框样式 */
.input-container {
  position: relative;
  margin-bottom: 30rpx;
  
  .input-field {
    width: 100%;
    height: 100rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 0 30rpx;
    font-size: 32rpx;
    color: #333;
    box-shadow: 0 2rpx 20rpx rgba(0, 0, 0, 0.06);
    border: none;
    
    &::placeholder {
      color: #ccc;
    }
    
    &.password-field {
      padding-right: 80rpx;
    }
  }
  
  .clear-btn {
    position: absolute;
    right: 30rpx;
    top: 50%;
    transform: translateY(-50%);
    width: 40rpx;
    height: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .clear-icon {
      font-size: 32rpx;
      color: #ccc;
    }
  }
  
  .password-toggle {
    position: absolute;
    right: 30rpx;
    top: 50%;
    transform: translateY(-50%);
    width: 40rpx;
    height: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .eye-icon {
      font-size: 32rpx;
      color: #ccc;
    }
  }
}

/* 协议区域 */
.agreement-section {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
  padding: 0 10rpx;
  
  .checkbox-container {
    margin-right: 20rpx;
    
    .checkbox {
      width: 36rpx;
      height: 36rpx;
      border: 3rpx solid #ddd;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      
      &.checked {
        border-color: #4A90E2;
        background: #4A90E2;
        
        .check-mark {
          color: #fff;
          font-size: 20rpx;
          font-weight: bold;
        }
      }
    }
  }
  
  .agreement-text {
    font-size: 28rpx;
    color: #666;
    
    .policy-link {
      color: #4A90E2;
    }
  }
}

/* 登录按钮 */
.login-button {
  width: 100%;
  height: 88rpx;
  background: #4A90E2;
  color: #fff;
  font-size: 34rpx;
  font-weight: 500;
  border-radius: 16rpx;
  border: none;
  margin-bottom: 40rpx;
  
  &:disabled {
    opacity: 0.6;
  }
}

/* 底部链接 */
.footer-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10rpx;
  
  .forgot-password {
    font-size: 28rpx;
    color: #999;
  }
  
  .register-section {
    display: flex;
    align-items: center;
    
    .no-account {
      font-size: 28rpx;
      color: #999;
      margin-right: 10rpx;
    }
    
    .register-link {
      font-size: 28rpx;
      color: #4A90E2;
      font-weight: 500;
    }
  }
}

/* 底部指示器 */
.bottom-indicator {
  position: absolute;
  bottom: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 280rpx;
  height: 8rpx;
  background: #000;
  border-radius: 4rpx;
}
</style>