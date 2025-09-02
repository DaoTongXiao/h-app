<script setup lang="ts">
import { ref } from 'vue'

// 模拟用户数据
const user = ref({
  name: '杜欣吉',
  phone: '13000000000',
  avatarUrl: '/static/icons/my/tuxiang.png', // 请替换为您的头像路径
  stats: {
    mediations: 10,
    aids: 10,
    consults: 10
  },
  inProgressCases: 4
})

// 主要功能入口数据
const primaryActions = ref([
  { text: '我的调解', icon: '/static/icons/my/1-1.png', path: '/pages/mediation/list' },
  { text: '我的咨询', icon: '/static/icons/my/1-2.png', path: '/pages/consult/list' },
  { text: '法律援助', icon: '/static/icons/my/1-3.png', path: '/pages/aid/list' },
  { text: '服务评价', icon: '/static/icons/my/1-4.png', path: '/pages/evaluation/list' }
])

// 其他功能数据
const otherFunctions = ref([
  { text: '个人信息', icon: '/static/icons/my/2-1.png', path: '/pages/profile/info' },
  { text: '实名认证', icon: '/static/icons/my/2-2.png', path: '/pages/auth/index' },
  { text: '修改密码', icon: '/static/icons/my/2-3.png', path: '/pages/sub-pages/reset-password/index' },
  { text: '操作手册', icon: '/static/icons/my/2-4.png', path: '/pages/manual/index' },
  { text: '账号管理', icon: '/static/icons/my/2-5.png', path: '/pages/profile/account' }
])

// --- 方法 ---

// 通用页面跳转
const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}

// 功能点击事件
const handleActionClick = (action: { text: string; path: string }) => {
  // uni.showToast({
  //   title: `点击了 "${action.text}"`,
  //   icon: 'none'
  // })
  navigateTo(action.path) // 在实际项目中取消此行注释
}

// 退出登录
const logout = () => {
  uni.showModal({
    title: '提示',
    content: '您确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        console.log('用户点击确定')
        // 在此执行退出登录的逻辑
        uni.showToast({ title: '已退出登录', icon: 'success' })
      }
    }
  })
}
</script>

<template>
  <view class="profile-page">
    <scroll-view
      scroll-y
      class="scroll-container"
    >
      <view class="profile-header">
        <view class="header-bg" />
        <view class="header-content">
          <view class="user-info">
            <text class="user-name">
              {{ user.name }}
            </text>
            <text class="user-phone">
              电话: {{ user.phone }}
            </text>
          </view>
          <view class="avatar-section">
            <image
              class="avatar-image"
              :src="user.avatarUrl"
              mode="aspectFill"
            />
            <view class="edit-icon">
              <uni-icons
                type="compose"
                size="14"
                color="#fff"
              />
            </view>
          </view>
        </view>
        <view class="stats-block">
          <view class="stat-item">
            <text class="stat-value">
              {{ user.stats.mediations }}件
            </text>
            <text class="stat-label">
              我的调解
            </text>
          </view>
          <view class="stat-item">
            <text class="stat-value">
              {{ user.stats.aids }}件
            </text>
            <text class="stat-label">
              我的援助
            </text>
          </view>
          <view class="stat-item">
            <text class="stat-value">
              {{ user.stats.consults }}次
            </text>
            <text class="stat-label">
              我的咨询
            </text>
          </view>
        </view>
      </view>

      <view
        class="in-progress-card"
        @tap="navigateTo('/pages/cases/index')"
      >
        <text class="card-text">
          正在进行中的案件——{{ user.inProgressCases }}件
        </text>
        <view class="card-button">
          <text>立即查看</text>
        </view>
      </view>

      <view class="action-card">
        <view class="action-grid">
          <view
            v-for="action in primaryActions"
            :key="action.text"
            class="action-item"
            @tap="handleActionClick(action)"
          >
            <image
              class="action-icon"
              :src="action.icon"
              mode="aspectFit"
            />
            <text class="action-text">
              {{ action.text }}
            </text>
          </view>
        </view>
      </view>

      <view class="other-functions-section">
        <text class="section-title">
          其他功能
        </text>
        <view class="action-card">
          <view class="action-grid">
            <view
              v-for="action in otherFunctions"
              :key="action.text"
              class="action-item"
              @tap="handleActionClick(action)"
            >
              <image
                class="action-icon"
                :src="action.icon"
                mode="aspectFit"
              />
              <text class="action-text">
                {{ action.text }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="logout-btn-wrapper">
        <button
          class="logout-btn"
          @tap="logout"
        >
          退出
        </button>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
// 页面整体背景
.profile-page {
  background-color: #f5f8fa;
  min-height: 100vh;
}

.scroll-container {
  height: 100vh;
}

// --- 1. 顶部用户信息 ---
.profile-header {
  position: relative;
  padding: 40rpx 40rpx 80rpx 40rpx;
  color: #fff;
  
  // 使用伪元素制作波浪背景
  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, #81befd 0%, #4a89ff 100%);
    // 使用 border-radius 模拟底部弧形
    border-bottom-left-radius: 50% 20%;
    border-bottom-right-radius: 50% 20%;
  }
  
  .header-content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
    .user-name {
      font-size: 48rpx;
      font-weight: bold;
      margin-bottom: 8rpx;
    }
    .user-phone {
      font-size: 28rpx;
      opacity: 0.8;
    }
  }
  
  .avatar-section {
    position: relative;
    .avatar-image {
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      border: 4rpx solid rgba(255, 255, 255, 0.5);
    }
    .edit-icon {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 40rpx;
      height: 40rpx;
      background-color: #4a89ff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2rpx solid #fff;
    }
  }

  .stats-block {
    position: relative;
    display: flex;
    justify-content: space-around;
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .stat-value {
        font-size: 36rpx;
        font-weight: bold;
      }
      .stat-label {
        font-size: 24rpx;
        opacity: 0.8;
      }
    }
  }
}

// --- 2. 进行中案件卡片 ---
.in-progress-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40rpx 32rpx 32rpx 32rpx; // 关键：使用负 margin 使其上浮
  padding: 32rpx;
  border-radius: 20rpx;
  background: linear-gradient(90deg, #6a9cff 0%, #4c82ff 100%);
  color: #fff;
  box-shadow: 0 10rpx 30rpx rgba(74, 137, 255, 0.3);
  
  .card-text {
    font-size: 30rpx;
    font-weight: 500;
  }
  
  .card-button {
    background: #ffc94d;
    color: #8c5b0c;
    border-radius: 30rpx;
    padding: 12rpx 24rpx;
    font-size: 26rpx;
    font-weight: bold;
  }
}

// --- 3 & 4. 功能卡片通用样式 ---
.action-card {
  background-color: #fff;
  border-radius: 20rpx;
  margin: 0 32rpx 32rpx 32rpx;
  padding: 32rpx 0;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.04);
  
  .action-grid {
    display: flex;
    flex-wrap: wrap;
    
    .action-item {
      flex: 0 0 25%; // 4列布局
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 32rpx;
      
      .action-icon {
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 16rpx;
      }
      
      .action-text {
        font-size: 26rpx;
        color: #333;
      }
      &:active {
        opacity: 0.7;
      }
    }
  }
}

.other-functions-section {
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    padding: 0 40rpx;
    margin-bottom: 24rpx;
  }
  // 第2行只有1个，清除最后一个元素的下边距
  .action-item:last-child {
      margin-bottom: 0;
  }
}

// --- 5. 退出按钮 ---
.logout-btn-wrapper {
  padding: 20rpx 32rpx;
  .logout-btn {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #4a89ff;
    background-color: #fff;
    border: 1rpx solid #dcdfe6;
    border-radius: 45rpx;
    box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.04);
    
    // uni-app button 样式重置
    &::after {
      border: none;
    }
    &:active {
      background-color: #f5f8fa;
    }
  }
}
</style>