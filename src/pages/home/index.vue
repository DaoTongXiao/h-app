<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'

// 轮播图数据
interface Banner {
  id: number
  title: string
  subtitle: string
  description: string
  bgColor: string
}

// 服务项数据类型
interface ServiceItem {
  id: string
  title: string
  subtitle?: string
  icon: string
  color: string
}

// 快捷服务数据类型
interface QuickService {
  id: string
  icon: string
  title: string
  color: string
}

const activeTab = ref<number>(0)
const currentBanner = ref<number>(0)

// 获取用户 store
const userStore = useUserStore()

// 轮播图数据
const banners = ref<Banner[]>([
  {
    id: 1,
    title: '政务公开',
    subtitle: '透明政府',
    description: '统计中部重点地区各项公开工作推进情况',
    bgColor: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)'
  }
])

// 快捷入口数据
const quickAccess = ref<QuickService[]>([
  { id: '1', icon: '智', title: '智能咨询', color: '#3B82F6' },
  { id: '2', icon: '政', title: '政策查询', color: '#F59E0B' }
])

// 调解服务数据
const mediationServices = ref<ServiceItem[]>([
  { 
    id: '1', 
    title: '调解服务申请', 
    subtitle: '调解有关各类申请', 
    icon: '📋',
    color: '#3B82F6'
  },
  { 
    id: '2', 
    title: '在线调解', 
    subtitle: '支持在线调解', 
    icon: '▶️',
    color: '#10B981'
  },
  { 
    id: '3', 
    title: '法律援助申请', 
    subtitle: '法律援助相关申请', 
    icon: '🛡️',
    color: '#8B5CF6'
  },
  { 
    id: '4', 
    title: '法律合规申请', 
    subtitle: '企业法律合规申请', 
    icon: '🏢',
    color: '#0D9488'
  }
])

// 其他服务数据
const otherServices = ref<ServiceItem[]>([
  { id: '1', title: '典型案例', icon: '🚗', color: '#6B7280' },
  { id: '2', title: '法律法规查询', icon: '🔍', color: '#6B7280' },
  { id: '3', title: '调解机构', icon: '👥', color: '#6B7280' },
  { id: '4', title: '调解专家', icon: '👨‍⚖️', color: '#6B7280' }
])

// 底部导航数据
const tabBarList = ref([
  { icon: '🏠', label: '首页', active: true },
  { icon: '💬', label: '咨询服务', active: false },
  { icon: '👤', label: '我的', active: false }
])

// 方法
const handleQuickAccess = (item: QuickService) => {
  uni.navigateTo({
    url: 'pages/apply/index'
  })
}

  const handleService = (item: ServiceItem) => {
    if(item.title == '典型案例'){
        uni.navigateTo({
        url: '/pages/sub-pages/case/index'
        })
        return
    } 
    if(item.title == '调解机构' || item.title == '调解专家'){
        uni.navigateTo({
        url: '/pages/sub-pages/resource/index'
        })
        return
    } 
    if(item.title == '法律法规查询'){
        uni.navigateTo({
        url: '/pages/sub-pages/publicity/index'
        })
        return
    }
    uni.navigateTo({
      url: '/pages/apply/index'
    })
}

const switchTab = (index: number) => {
  activeTab.value = index
  tabBarList.value.forEach((tab, i) => {
    tab.active = i === index
  })
  
  if (index === 0) {
    // 首页逻辑
  } else if (index === 1) {
    // 咨询服务逻辑
  } else if (index === 2) {
    // 我的页面逻辑
  }
}

onMounted(() => {
  console.log('政务服务应用初始化完成')

  // 检查登录状态，未登录则跳转到登录页
  if (!userStore.userInfo) {
    console.log('用户未登录，跳转到登录页')
    uni.navigateTo({
      url: '/pages/login/index'
    })
  }
})
</script>

<template>
  <view class="page">
    <scroll-view scroll-y class="scroll-view" enhanced :show-scrollbar="false">
      <!-- 头部轮播区域 -->
      <view class="banner-section">
        <view class="banner-content" :style="{ background: banners[0].bgColor }">
          <view class="banner-header">
            <view class="banner-title">
              <text class="title">{{ banners[0].title }}</text>
              <text class="subtitle">{{ banners[0].subtitle }}</text>
            </view>
          </view>
          
          <view class="banner-info">
            <view class="info-content">
              <view class="dot"></view>
              <text class="description">{{ banners[0].description }}</text>
            </view>
            <text class="arrow"></text>
          </view>
          
          <!-- 页面指示器 -->
          <view class="indicator">
            <view class="dot active"></view>
            <view class="dot"></view>
            <view class="dot"></view>
          </view>
        </view>
      </view>

      <!-- 快捷入口 -->
      <view class="quick-access-card">
        <text class="section-title">咨询服务</text>
        <view class="quick-grid">
          <view 
            v-for="item in quickAccess" 
            :key="item.id"
            class="quick-item"
            @tap="handleQuickAccess(item)"
          >
            <view class="quick-icon" :style="{ backgroundColor: item.color }">
              <text class="icon-text">{{ item.icon }}</text>
            </view>
            <text class="quick-title">{{ item.title }}</text>
          </view>
        </view>
      </view>

      <!-- 调解帮助引导 -->
      <view class="mediation-guide">
        <view class="guide-content">
          <view class="guide-left">
            <view class="guide-header">
              <text class="guide-title">调解帮助引导</text>
              <view class="beta-tag">
                <text class="beta-text">BETA</text>
              </view>
            </view>
            <text class="guide-subtitle">调解服务</text>
          </view>
          <view class="guide-icon">
            <text class="icon">💬</text>
          </view>
        </view>
      </view>

      <!-- 调解服务网格 -->
      <view class="service-section">
        <text class="section-title">调解服务</text>
        <view class="service-grid">
          <view 
            v-for="item in mediationServices" 
            :key="item.id"
            class="service-card"
            @tap="handleService(item)"
          >
            <view class="service-header">
				<view class="service-content">
				  <text class="service-title">{{ item.title }}</text>
				  <text class="service-subtitle">{{ item.subtitle }}</text>
				</view>
              <view class="service-icon-wrapper">
                <text class="service-icon">{{ item.icon }}</text>
              </view>
  
            </view>
          </view>
        </view>
      </view>

      <!-- 其他服务 -->
      <view class="other-section">
        <text class="section-title">其他服务</text>
        <view class="other-grid">
          <view 
            v-for="item in otherServices" 
            :key="item.id"
            class="other-card"
            @tap="handleService(item)"
          >
            <view class="other-content">
              <view class="other-icon-wrapper">
                <text class="other-icon">{{ item.icon }}</text>
              </view>
              <text class="other-title">{{ item.title }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部占位 -->
      <view class="bottom-placeholder"></view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
// 全局样式重置
* {
  box-sizing: border-box;
}

// 根元素
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f8;
}

// 滚动容器
.scroll-view {
  flex: 1;
  height: 100vh;
}

// 头部轮播区域
.banner-section {
  position: relative;
  
  .banner-content {
    padding: 48rpx 32rpx;
    color: white;
    
    .banner-header {
      margin-bottom: 32rpx;
      
      .banner-title {
        .title {
          display: block;
          font-size: 40rpx;
          font-weight: bold;
          margin-bottom: 8rpx;
        }
        
        .subtitle {
          font-size: 28rpx;
          opacity: 0.9;
        }
      }
    }
    
    .banner-info {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 16rpx;
      padding: 24rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32rpx;
      
      .info-content {
        display: flex;
        align-items: center;
        flex: 1;
        
        .dot {
          width: 8rpx;
          height: 8rpx;
          background-color: white;
          border-radius: 50%;
          margin-right: 16rpx;
        }
        
        .description {
          font-size: 28rpx;
          flex: 1;
        }
      }
      
      .arrow {
        font-size: 32rpx;
        margin-left: 16rpx;
      }
    }
    
    .indicator {
      display: flex;
      justify-content: center;
      gap: 16rpx;
      
      .dot {
        width: 16rpx;
        height: 16rpx;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        
        &.active {
          background-color: white;
        }
      }
    }
  }
}

// 快捷入口卡片
.quick-access-card {
  background: white;
  margin: -48rpx 32rpx 32rpx;
  border-radius: 24rpx;
  padding: 32rpx;
  position: relative;
  z-index: 10;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  
  .section-title {
    color: #666;
    font-size: 28rpx;
    margin-bottom: 24rpx;
    display: block;
  }
  
  .quick-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24rpx;
    
    .quick-item {
      display: flex;
      align-items: center;
      padding: 16rpx;
      
      .quick-icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 24rpx;
        
        .icon-text {
          color: white;
          font-size: 32rpx;
          font-weight: bold;
        }
      }
      
      .quick-title {
        color: #1a1a1a;
        font-size: 32rpx;
        font-weight: 500;
      }
    }
  }
}

// 调解帮助引导
.mediation-guide {
  padding: 0 32rpx;
  margin-bottom: 32rpx;
  
  .guide-content {
    background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
    border-radius: 24rpx;
    padding: 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      right: -32rpx;
      top: -32rpx;
      width: 160rpx;
      height: 160rpx;
      background: rgba(99, 102, 241, 0.1);
      border-radius: 50%;
    }
    
    &::before {
      content: '';
      position: absolute;
      right: -64rpx;
      bottom: -64rpx;
      width: 128rpx;
      height: 128rpx;
      background: rgba(79, 70, 229, 0.1);
      border-radius: 50%;
    }
    
    .guide-left {
      flex: 1;
      
      .guide-header {
        display: flex;
        align-items: center;
        margin-bottom: 8rpx;
        
        .guide-title {
          color: #4F46E5;
          font-size: 32rpx;
          font-weight: bold;
          margin-right: 16rpx;
        }
        
        .beta-tag {
          background: #3B82F6;
          color: white;
          font-size: 20rpx;
          padding: 4rpx 12rpx;
          border-radius: 8rpx;
          
          .beta-text {
            font-weight: 500;
          }
        }
      }
      
      .guide-subtitle {
        color: #6B7280;
        font-size: 28rpx;
      }
    }
    
    .guide-icon {
      width: 128rpx;
      height: 128rpx;
      background: rgba(59, 130, 246, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .icon {
        font-size: 48rpx;
      }
    }
  }
}

// 服务区域
.service-section {
  padding: 0 32rpx;
  margin-bottom: 32rpx;
  
  .section-title {
    color: #1a1a1a;
    font-size: 32rpx;
    font-weight: 500;
    margin-bottom: 24rpx;
    display: block;
  }
  
  .service-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24rpx;
    
    .service-card {
      background: white;
	  display: flex;
	  align-items: center;
	  align-content: center;
      border-radius: 24rpx;
      padding: 32rpx;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
      
      .service-header {
        display: flex;
        align-items: flex-start;
        gap: 24rpx;
        
        .service-icon-wrapper {
          padding: 16rpx;
          background: #F9FAFB;
          border-radius: 16rpx;
          .service-icon {
            font-size: 40rpx;
          }
        }
        
        .service-content {
          flex: 1;
          .service-title {
            display: block;
            color: #1a1a1a;
            font-size: 22rpx;
            font-weight: 500;
            margin-bottom: 8rpx;
          }
          
          .service-subtitle {
            color: #6B7280;
            font-size: 18rpx;
            line-height: 1.4;
          }
        }
      }
    }
  }
}

// 其他服务
.other-section {
  padding: 0 32rpx;
  margin-bottom: 32rpx;
  
  .section-title {
    color: #1a1a1a;
    font-size: 32rpx;
    font-weight: 500;
    margin-bottom: 24rpx;
    display: block;
  }
  
  .other-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24rpx;
    
    .other-card {
      background: white;
      border-radius: 24rpx;
      padding: 32rpx;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
      
      .other-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .other-icon-wrapper {
          padding: 16rpx;
          background: #F9FAFB;
          border-radius: 16rpx;
          
          .other-icon {
            font-size: 40rpx;
          }
        }
        
        .other-title {
          flex: 1;
          color: #1a1a1a;
          font-size: 22rpx;
          font-weight: 500;
          margin-left: 24rpx;
        }
      }
    }
  }
}

// 底部占位
.bottom-placeholder {
  height: 10rpx;
  min-height: 10rpx;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>