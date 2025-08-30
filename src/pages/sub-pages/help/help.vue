<template>
  <view class="help-guide-container">
    <!-- 头部区域 -->
    <view class="header-section">
      <view class="header-content">
        <text class="main-title">如何使用纠纷调解系统</text>
        <text class="subtitle">您是否遇到了以下问题</text>
      </view>
      <image
        class="header-image"
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZC1ibHVlIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOThDRkZGO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0E5RDVGRjtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZC1wdXJwbGUiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4RThFRkY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojQkRDNUZGO3N0b3Atb3BhY2l0eToxIiAvPjwvZGVmcz48ZyBmaWx0ZXI9InVybCgjZHJvcFNoYWRvdykiPjxwYXRoIGQ9Ik03MCAzMEM1NyAzMCA0NyA0MCA0NyA1M0M0NyA2NiA1NyA3NiA3MCA3NkM4MyA3NiA5MyA2NiA5MyA1M0M5MyA0MCA4MyAzMCA3MCAzMFoiIGZpbGw9InVybCgjZ3JhZC1wdXJwbGUpIiBvcGFjaXR5PSIwLjgiLz48cGF0aCBkPSJNNDAgMjBDMjcgMjAgMTcgMzAgMTcgNDNDMTcgNTYgMjcgNjYgNDAgNjZDNTMgNjYgNjMgNTYgNjMgNDNDNjMgMzAgNTMgMjAgNDAgMjBaIiBmaWxsPSJ1cmwoI2dyYWQtYmx1ZSkiLz48Y2lyY2xlIGN4PSIzNCIgY3k9IjQzIiByPSIyIiBmaWxsPSIjMzMzIi8+PGNpcmNsZSBjeD0iNDYiIGN5PSI0MyIgcj0iMiIgZmlsbD0iIzMzMyIvPjxwYXRoIGQ9Ik0zNiA1MSBDMzggNTUgNDIgNTUgNDQgNTEiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+PC9zdmc+"
        mode="aspectFit"
      ></image>
    </view>

    <!-- 列表卡片 -->
    <view class="list-card">
      <view
        v-for="(item, index) in helpItems"
        :key="item.id"
        class="list-item"
        @click="goToDetail(item)"
        hover-class="item-hover"
      >
        <text :class="['item-number', 'color-' + (index + 1)]">{{
          index + 1
        }}</text>
        <text class="item-title">{{ item.title }}</text>
        <view class="arrow-icon"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

// 帮助项目接口定义
interface HelpItem {
  id: number;
  title: string;
}

const helpItems = reactive<HelpItem[]>([
  { id: 1, title: '调解服务申请流程' },
  { id: 2, title: '法律援助申请流程' },
  { id: 3, title: '在线调解流程' },
  { id: 4, title: '法律咨询申请流程' },
  { id: 5, title: '心理服务申请流程' },
  { id: 6, title: '在线确认流程' },
  { id: 7, title: '司法确认流程' },
]);

// 跳转到详情页
const goToDetail = (item: HelpItem) => {
  console.log('Navigating to detail for:', item.title);
  // 在实际应用中，你可能会使用 uni.navigateTo
  // uni.navigateTo({
  //   url: `/pages/help/detail?id=${item.id}&title=${item.title}`
  // });
};
</script>

<style scoped>
.help-guide-container {
  min-height: 100vh;
  background-color: #f4f7fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 头部区域 */
.header-section {
  position: relative;
  height: 280rpx;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  background: linear-gradient(135deg, #e0f2ff 0%, #f0f5ff 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  color: #333;
}

.main-title {
  font-size: 40rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 15rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #888;
}

.header-image {
  width: 200rpx;
  height: 160rpx;
  opacity: 0.9;
}

/* 列表卡片 */
.list-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  margin: -60rpx 30rpx 30rpx;
  padding: 20rpx 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.list-item:last-child {
  border-bottom: none;
}

.item-hover {
  background-color: #fafafa;
}

.item-number {
  font-size: 32rpx;
  font-weight: bold;
  font-style: italic;
  width: 50rpx;
}

.item-title {
  flex: 1;
  font-size: 30rpx;
  color: #333;
  padding-left: 10rpx;
}

.arrow-icon {
  width: 16rpx;
  height: 16rpx;
  border-top: 4rpx solid #ccc;
  border-right: 4rpx solid #ccc;
  transform: rotate(45deg);
}

/* 数字颜色 */
.color-1 { color: #d9534f; }
.color-2 { color: #f0ad4e; }
.color-3 { color: #5bc0de; }
.color-4 { color: #337ab7; }
.color-5 { color: #5cb85c; }
.color-6 { color: #8a6d3b; }
.color-7 { color: #6f5499; }
</style>
