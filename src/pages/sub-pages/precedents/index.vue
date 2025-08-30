<template>
  <view class="page-container">
    <view class="search-bar-container">
      <uni-search-bar
        placeholder="请输入关键词进行搜索"
        bgColor="#F5F5F5"
        :radius="100"
        cancelButton="none"
        @confirm="search"
      ></uni-search-bar>
    </view>

    <scroll-view scroll-y class="case-list-container">
      <view v-for="item in caseList" :key="item.id">
        <CaseItem :case-data="item" />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CaseItem from '../components/CaseItem.vue';
import type { Case } from './types';

// 模拟案例数据
const caseList = ref<Case[]>([
  {
    id: 1,
    description: '在小区店区苹果园大街苹果园路东口遮南20米处,李某某驾驶自行车由南向北行驶时,适有代某某驾驶重...',
    images: ['/static/images/case.png'],
    date: '2024-07-10',
    tag: '邻里关系',
  },
  {
    id: 2,
    description: '在小区店区苹果园大街苹果园路东口遮南20米处,李某某驾驶自行车由南向北行驶时,适有代某某驾驶重...',
    images: ['/static/images/case.png', '/static/images/case.png', '/static/images/case.png'],
    date: '2024-07-10',
    tag: '邻里关系',
  },
  {
    id: 3,
    description: '在小区店区苹果园大街苹果园路东口遮南20米处,李某某驾驶自行车由南向北行驶时,适有代某某驾驶重...',
    images: [], // 没有图片的情况
    date: '2024-07-10',
    tag: '邻里关系',
  },
  {
    id: 4,
    description: '在小区店区苹果园大街苹果园路东口遮南20米处,李某某驾驶自行车由南向北行驶时,适有代某某驾驶重...',
    images: ['/static/images/case.png', '/static/images/case.png', '/static/images/case.png'],
    date: '2024-07-10',
    tag: '邻里关系',
  },
]);

const search = (e: any) => {
  console.log('搜索内容:', e.value);
  // 在这里处理搜索逻辑
};
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
}

/* 自定义导航栏样式 */
.custom-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 44px 15px 10px 10px; // 适配状态栏高度
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

/* 搜索栏容器 */
.search-bar-container {
  padding: 10px 15px;
}

/* 列表容器 */
.case-list-container {
  flex: 1;
  overflow-y: auto;
}
</style>