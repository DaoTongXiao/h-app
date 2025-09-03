<template>
  <view class="container">
    <view class="title-wrapper">
      <view class="main-title">
        <text>矛盾纠纷化解系统</text>
        <text class="tag">忘记密码</text>
      </view>
      <view class="sub-title"><!--第五师双河市--></view>
    </view>

    <view class="form-wrapper">
      <view class="form-item">
        <input
          class="input-field"
          type="number"
          v-model="formData.phone"
          placeholder="请输入手机号码"
          placeholder-class="placeholder"
          maxlength="11"
        />
      </view>
      <view class="form-item verification-code">
        <input
          class="input-field"
          type="number"
          v-model="formData.code"
          placeholder="请输入手机验证码"
          placeholder-class="placeholder"
          maxlength="6"
        />
        <button
          class="code-button"
          @click="getVerificationCode"
          :disabled="isCountingDown"
          :class="{ 'is-disabled': isCountingDown }"
        >
          {{ codeButtonText }}
        </button>
      </view>
      <view class="form-item">
        <input
          class="input-field"
          type="password"
          v-model="formData.password"
          placeholder="请输入新密码"
          placeholder-class="placeholder"
        />
      </view>
      <view class="form-item">
        <input
          class="input-field"
          type="password"
          v-model="formData.confirmPassword"
          placeholder="请再次输入新密码"
          placeholder-class="placeholder"
        />
      </view>

      <button class="submit-button" @click="handleSubmit">提交</button>
    </view>

    <view class="footer-link">
      <text>已有账号？</text>
      <text class="link-text" @click="goToLogin">去登录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// 表单数据
const formData = reactive({
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
});

// 验证码按钮相关状态
const countdown = ref(60);
const isCountingDown = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

const codeButtonText = computed(() => {
  return isCountingDown.value ? `${countdown.value}s 后重试` : '获取验证码';
});

// 获取验证码
const getVerificationCode = () => {
  // 1. 验证手机号
  if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
    uni.showToast({
      title: '请输入有效的手机号',
      icon: 'none',
    });
    return;
  }

  // 2. 开始倒计时
  isCountingDown.value = true;
  countdown.value = 60;

  // 3. (模拟)发送API请求
  console.log(`向手机号 ${formData.phone} 发送验证码`);
  uni.showLoading({
    title: '发送中...'
  });

  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '验证码已发送',
      icon: 'success',
    });

    // 4. 启动定时器
    timer = setInterval(() => {
      if (countdown.value > 1) {
        countdown.value--;
      } else {
        isCountingDown.value = false;
        if(timer) clearInterval(timer);
      }
    }, 1000);
  }, 500); // 模拟网络延迟
};

// 提交表单
const handleSubmit = () => {
  const { phone, code, password, confirmPassword } = formData;

  if (!phone) {
    return uni.showToast({ title: '请输入手机号码', icon: 'none' });
  }
  if (!code) {
    return uni.showToast({ title: '请输入验证码', icon: 'none' });
  }
  if (!password) {
    return uni.showToast({ title: '请输入新密码', icon: 'none' });
  }
  if (password.length < 6) {
    return uni.showToast({ title: '密码长度不能少于6位', icon: 'none' });
  }
  if (password !== confirmPassword) {
    return uni.showToast({ title: '两次输入的密码不一致', icon: 'none' });
  }

  // (模拟) 提交API请求
  uni.showLoading({
    title: '正在提交...',
  });

  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '密码重置成功',
      icon: 'success',
    });
    console.log('提交的数据:', formData);
    
    // 成功后可以跳转到登录页
    setTimeout(() => {
        goToLogin();
    }, 1500);

  }, 1000);
};

// 跳转到登录页
const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/index', // 请替换为你的登录页面路径
  });
};

// 返回上一页
const goBack = () => {
    uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding: 0 40rpx;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.status-bar {
  height: var(--status-bar-height);
}

.back-arrow {
  padding: 20rpx 0;
}

.title-wrapper {
  margin-top: 40rpx;
  margin-bottom: 80rpx;
}

.main-title {
  display: flex;
  align-items: center;
  font-size: 44rpx;
  font-weight: bold;
  color: #333;
}

.tag {
  background-color: #ff9900;
  color: #ffffff;
  font-size: 24rpx;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  margin-left: 20rpx;
  font-weight: normal;
}

.sub-title {
  font-size: 32rpx;
  color: #666;
  margin-top: 10rpx;
}

.form-wrapper {
  .form-item {
    margin-bottom: 30rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    
    .input-field {
      width: 100%;
      height: 100rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      color: #333;
    }
    
    .placeholder {
      color: #cccccc;
    }
  }

  .verification-code {
    display: flex;
    align-items: center;
    padding-right: 20rpx;

    .input-field {
      flex: 1;
    }

    .code-button {
      flex-shrink: 0;
      width: 200rpx;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 26rpx;
      color: #ffffff;
      background-color: #007aff;
      border-radius: 12rpx;
      margin: 0;
      padding: 0;
      
      &::after {
          border: none;
      }

      &.is-disabled {
        background-color: #c8c8c8;
        color: #ffffff;
      }
    }
  }
}

.submit-button {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  background: linear-gradient(90deg, #4da2ff, #007aff);
  color: #ffffff;
  border-radius: 45rpx;
  font-size: 32rpx;
  margin-top: 60rpx;
  
  &::after {
      border: none;
  }
}

.footer-link {
  margin-top: 40rpx;
  text-align: center;
  font-size: 26rpx;
  color: #999;

  .link-text {
    color: #007aff;
    margin-left: 10rpx;
  }
}
</style>