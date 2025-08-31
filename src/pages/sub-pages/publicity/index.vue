<script setup lang="ts">
import { ref } from 'vue'
// 导入复用的组件
import CaseItem from '../components/CaseItem.vue'
// 导入复用的类型定义
import type { ServiceItem } from '@/types/app.ts'

// 模拟新的“宣传服务”数据
const serviceList = ref<ServiceItem[]>([
  {
    id: 1,
    description: '国务院关于进一步优化政务服务提升行政效能推动“高效办成一件事”的指导意见',
    images: ['/static/images/bg1.png'],
    date: '2024-07-10',
    tag: '邻里关系'
  },
  {
    id: 2,
    description: '国务院关于进一步优化政务服务提升行政效能推动“高效办成一件事”的指导意见',
    images: ['/static/images/bg1.png', '/static/images/bg1.png', '/static/images/bg1.png'],
    date: '2024-07-10',
    tag: '邻里关系'
  },
  {
    id: 3,
    description: '国务院关于进一步优化政务服务提升行政效能推动“高效办成一件事”的指导意见',
    images: [], // 没有图片
    date: '2024-07-10',
    tag: '邻里关系'
  },
  {
    id: 4,
    description: '国务院关于进一步优化政务服务提升行政效能推动“高效办成一件事”的指导意见',
    images: ['/static/images/bg1.png', '/static/images/bg1.png', '/static/images/bg1.png'],
    date: '2024-07-10',
    tag: '邻里关系'
  }
])

const search = (e: any) => {
  console.log('搜索内容:', e.value)
  // 在这里处理搜索逻辑
}
</script>

<template>
  <view class="page-container">
    <view class="search-bar-container">
      <uni-search-bar
        placeholder="请输入关键词进行搜索"
        bg-color="#F5F5F5"
        :radius="100"
        cancel-button="none"
        @confirm="search"
      />
    </view>

    <scroll-view
      scroll-y
      class="list-container"
    >
      <view
        v-for="item in serviceList"
        :key="item.id"
      >
        <CaseItem :case-data="item" />
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
/* 样式与第一个页面完全相同，可以直接复制或提取为全局样式 */
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
}

.custom-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 44px 15px 10px 10px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;

  .navbar-left {
    display: flex;
    align-items: center;
  }

  .navbar-title {
    font-size: 18px;
    font-weight: bold;
    margin-left: 10px;
  }

  .navbar-right {
    display: flex;
    align-items: center;
    .icon-more {
      margin-right: 15px;
    }
  }
}

.search-bar-container {
  padding: 10px 15px;
}

.list-container {
  flex: 1;
  overflow-y: auto;
}
</style>
