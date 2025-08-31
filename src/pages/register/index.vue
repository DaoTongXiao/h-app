<script setup lang="ts">
import { ref, reactive } from 'vue'

// 表单数据
const form = reactive({
  name: '',
  gender: '女',
  address: '',
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
  agree: false
})

// 加载状态
const isLoading = ref(false)
const isSendingCode = ref(false)

// 验证码倒计时
const countdown = ref(0)
const timer = ref<number | null>(null)

// 错误状态
const errors = ref({
  name: '',
  phone: '',
  code: '',
  password: '',
  confirmPassword: ''
})

// 性别选择弹窗
const showGenderPicker = ref(false)
const genderOptions = ['男', '女', '其他']

// 地址选择弹窗
const showAddressPicker = ref(false)

// 选择性别
const selectGender = (gender: string) => {
  form.gender = gender
  showGenderPicker.value = false
}

// 选择地址
const selectAddress = () => {
  // 这里可以集成地址选择组件
  uni.showToast({ title: '请选择家庭住址', icon: 'none' })
}

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
    await new Promise(resolve => setTimeout(resolve, 1000))
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

// 表单验证
const validateForm = () => {
  errors.value = { name: '', phone: '', code: '', password: '', confirmPassword: '' }
  let isValid = true

  if (!form.name) {
    errors.value.name = '请输入姓名'
    isValid = false
  }

  if (!form.phone) {
    errors.value.phone = '请输入手机号'
    isValid = false
  } else if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    errors.value.phone = '请输入正确的手机号'
    isValid = false
  }

  if (!form.code) {
    errors.value.code = '请输入验证码'
    isValid = false
  }

  if (!form.password) {
    errors.value.password = '请输入密码'
    isValid = false
  } else if (form.password.length < 6) {
    errors.value.password = '密码长度至少6位'
    isValid = false
  }

  if (form.password !== form.confirmPassword) {
    errors.value.confirmPassword = '两次密码输入不一致'
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

// 提交注册
const submitRegister = async () => {
  if (!validateForm()) {
    return
  }
  if (!form.agree) {
    uni.showToast({ title: '请同意用户协议', icon: 'none' })
    return
  }
  if (isLoading.value) return

  try {
    isLoading.value = true
    // 模拟注册逻辑
    await new Promise(resolve => setTimeout(resolve, 2000))
    uni.showToast({ title: '注册成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/login/index' })
    }, 1500)
  } catch (error) {
    uni.showToast({ title: '注册失败，请重试', icon: 'none' })
  } finally {
    isLoading.value = false
  }
}

// 跳转登录
const goToLogin = () => {
  uni.navigateTo({ url: '/pages/login/index' })
}
</script>

<template>
  <view class="viewport">
    <!-- 返回按钮 -->
    <view
      class="back-btn"
      @click="uni.navigateBack()"
    >
      <text class="back-arrow">
        ‹
      </text>
    </view>

    <!-- 标题区域 -->
    <view class="title-section">
      <view class="title-container">
        <text class="main-title">
          新疆生产建设兵团
        </text>
        <view class="welcome-badge">
          欢迎注册
        </view>
      </view>
      <text class="sub-title">
        第五师双河市
      </text>
    </view>

    <!-- 表单区域 -->
    <view class="form-section">
      <!-- 姓名输入框 -->
      <view class="input-container">
        <input
          v-model="form.name"
          type="text"
          placeholder="请输入姓名"
          class="input-field"
          @focus="clearError('name')"
        >
      </view>

      <!-- 性别选择 -->
      <view
        class="input-container selector-container"
        @click="showGenderPicker = true"
      >
        <view class="selector-field">
          <text class="selector-text">
            {{ form.gender }}
          </text>
          <text class="selector-arrow">
            ›
          </text>
        </view>
      </view>

      <!-- 家庭住址选择 -->
      <view
        class="input-container selector-container"
        @click="selectAddress"
      >
        <view class="selector-field">
          <text
            v-if="!form.address"
            class="selector-text placeholder"
          >
            请选择家庭住址
          </text>
          <text
            v-else
            class="selector-text"
          >
            {{ form.address }}
          </text>
          <text class="selector-arrow">
            ›
          </text>
        </view>
      </view>

      <!-- 手机号输入框 -->
      <view class="input-container">
        <input
          v-model="form.phone"
          type="number"
          placeholder="请输入手机号码"
          class="input-field"
          @focus="clearError('phone')"
        >
      </view>

      <!-- 验证码输入框 -->
      <view class="input-container code-container">
        <input
          v-model="form.code"
          type="number"
          placeholder="请输入手机验证码"
          class="input-field code-field"
          @focus="clearError('code')"
        >
        <button
          class="code-btn"
          :disabled="countdown > 0 || isSendingCode"
          @click="sendCode"
        >
          {{ isSendingCode ? '发送中' : countdown > 0 ? `${countdown}s` : '获取验证码' }}
        </button>
      </view>

      <!-- 登录密码 -->
      <view class="input-container">
        <input
          v-model="form.password"
          type="password"
          placeholder="请输入登录密码"
          class="input-field password-field"
          @focus="clearError('password')"
        >
        <view class="password-toggle">
          <text class="eye-icon">
            👁
          </text>
        </view>
      </view>

      <!-- 确认密码 -->
      <view class="input-container">
        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="请再次输入登录密码"
          class="input-field password-field"
          @focus="clearError('confirmPassword')"
        >
        <view class="password-toggle">
          <text class="eye-icon">
            👁
          </text>
        </view>
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
          <text class="policy-link">
            《用户隐私政策》
          </text>
        </text>
      </view>

      <!-- 注册按钮 -->
      <button
        class="register-button"
        :disabled="isLoading"
        @click="submitRegister"
      >
        {{ isLoading ? '注册中...' : '注册' }}
      </button>

      <!-- 底部链接 -->
      <view class="footer-links">
        <text class="has-account">
          已有账号？
        </text>
        <text
          class="login-link"
          @click="goToLogin"
        >
          去登录 ›
        </text>
      </view>
    </view>

    <!-- 性别选择弹窗 -->
    <view
      v-if="showGenderPicker"
      class="picker-overlay"
      @click="showGenderPicker = false"
    >
      <view
        class="picker-container"
        @click.stop
      >
        <view class="picker-header">
          <text class="picker-title">
            选择性别
          </text>
          <text
            class="picker-close"
            @click="showGenderPicker = false"
          >
            ×
          </text>
        </view>
        <view class="picker-options">
          <view 
            v-for="gender in genderOptions"
            :key="gender"
            class="picker-option"
            @click="selectGender(gender)"
          >
            <text>{{ gender }}</text>
          </view>
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

/* 状态栏样式已移除 */

/* 返回按钮 */
.back-btn {
  position: absolute;
  top: 40rpx;
  left: 40rpx;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  .back-arrow {
    font-size: 48rpx;
    font-weight: 300;
    color: #333;
  }
}

/* 标题区域 */
.title-section {
  margin-top: 80rpx;
  padding: 0 40rpx;
  margin-bottom: 60rpx;
  
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
      background: #52C41A;
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
  padding: 0 40rpx;
  flex: 1;
}

/* 输入框样式 */
.input-container {
  position: relative;
  margin-bottom: 24rpx;
  
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
    
    &.code-field {
      padding-right: 200rpx;
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

/* 选择器样式 */
.selector-container {
  .selector-field {
    width: 100%;
    height: 100rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2rpx 20rpx rgba(0, 0, 0, 0.06);
    
    .selector-text {
      font-size: 32rpx;
      color: #333;
      
      &.placeholder {
        color: #ccc;
      }
    }
    
    .selector-arrow {
      font-size: 32rpx;
      color: #ccc;
      font-weight: 300;
    }
  }
}

/* 验证码容器 */
.code-container {
  .code-btn {
    position: absolute;
    right: 20rpx;
    top: 50%;
    transform: translateY(-50%);
    background: #4A90E2;
    color: #fff;
    font-size: 26rpx;
    padding: 16rpx 24rpx;
    border-radius: 8rpx;
    border: none;
    font-weight: 500;
    
    &:disabled {
      background: #ccc;
    }
  }
}

/* 协议区域 */
.agreement-section {
  display: flex;
  align-items: center;
  margin: 40rpx 0;
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

/* 注册按钮 */
.register-button {
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
  justify-content: center;
  align-items: center;
  padding: 0 10rpx;
  margin-bottom: 40rpx;
  
  .has-account {
    font-size: 28rpx;
    color: #999;
    margin-right: 10rpx;
  }
  
  .login-link {
    font-size: 28rpx;
    color: #4A90E2;
    font-weight: 500;
  }
}

/* 选择器弹窗 */
.picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
  
  .picker-container {
    width: 100%;
    background: #fff;
    border-radius: 24rpx 24rpx 0 0;
    padding: 40rpx;
    
    .picker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;
      
      .picker-title {
        font-size: 36rpx;
        font-weight: 600;
        color: #333;
      }
      
      .picker-close {
        font-size: 48rpx;
        color: #999;
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    
    .picker-options {
      .picker-option {
        padding: 30rpx 0;
        border-bottom: 1rpx solid #f0f0f0;
        font-size: 32rpx;
        color: #333;
        
        &:last-child {
          border-bottom: none;
        }
      }
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