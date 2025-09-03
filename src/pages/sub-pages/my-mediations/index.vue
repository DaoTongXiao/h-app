<template>
  <view class="page-container">
    <view class="header-section">
      <view class="search-bar">
        <uni-icons type="search" size="20" color="#909399" class="search-icon"></uni-icons>
        <input
          v-model="searchKeyword"
          class="search-input"
          placeholder="请输入关键词进行搜索"
          placeholder-class="placeholder"
        />
      </view>
      <view class="filter-button" @click="handleFilter">
        <uni-icons type="tune-filled" size="24" color="#606266"></uni-icons>
      </view>
    </view>

    <scroll-view scroll-y class="case-list-container">
      <view v-if="caseList.length > 0" class="case-list">
        <view
          v-for="item in caseList"
          :key="item.id"
          class="case-item"
          @click="goToDetail(item.id)"
        >
          <view class="status-bar" :class="getStatusInfo(item.status).className"></view>
          
          <view class="case-content">
            <view class="content-header">
              <text class="case-id">{{ item.id }}</text>
              <text class="case-tag">{{ item.tag }}</text>
            </view>
            
            <view class="summary">
              <text class="summary-label">概况信息</text>
              <text class="summary-text">{{ item.summary }}</text>
            </view>
            
            <view class="content-footer">
              <view class="date-info">
                <uni-icons type="calendar" size="16" color="#909399"></uni-icons>
                <text class="date-text">{{ item.date }}</text>
              </view>
              <view class="status-action">
                <text class="status-text" :class="getStatusInfo(item.status).className">
                  {{ getStatusInfo(item.status).text }}
                </text>
                <uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="empty-state">
        <text>暂无调解记录</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// --- TypeScript 类型定义 ---
// 定义案件状态的联合类型
type CaseStatus = 'pending_evaluation' | 'in_progress' | 'evaluated';

// 定义案件对象的接口
interface MediationCase {
  id: string;
  tag: string;
  summary: string;
  date: string;
  status: CaseStatus;
}

// --- 组件状态定义 ---
const searchKeyword = ref('');
const caseList = ref<MediationCase[]>([]);

// --- 逻辑处理 ---

/**
 * 根据案件状态返回对应的显示文本和CSS类名
 * @param status - 案件状态
 */
const getStatusInfo = (status: CaseStatus) => {
  switch (status) {
    case 'pending_evaluation':
      return { text: '办结待评价', className: 'status-pending' };
    case 'in_progress':
      return { text: '处理中', className: 'status-progress' };
    case 'evaluated':
      return { text: '已评价', className: 'status-evaluated' };
    default:
      return { text: '未知', className: '' };
  }
};

/**
 * 模拟从API获取案件列表数据
 */
const fetchCaseList = () => {
  // 模拟数据，与截图中的数据保持一致
  const mockData: MediationCase[] = [
    {
      id: 'WT2023072200001',
      tag: '邻里纠纷',
      summary: '陈家与周家是某市某小区的楼上楼下...',
      date: '2024-10-21',
      status: 'pending_evaluation',
    },
    {
      id: 'WT2023072200002',
      tag: '邻里纠纷',
      summary: '原告邱某与被告赖某市某村的村民，双,...',
      date: '2024-10-21',
      status: 'in_progress',
    },
    {
      id: 'WT2023072200006',
      tag: '邻里纠纷',
      summary: '谭某与黄某是邻居，双方因道路通行、树...',
      date: '2024-10-21',
      status: 'evaluated',
    },
    {
      id: 'WT2023072200005',
      tag: '邻里纠纷',
      summary: '罗某发现自家厨房管道有漏水现象，且地...',
      date: '2023-12-29',
      status: 'in_progress',
    },
  ];
  caseList.value = mockData;
};

// --- 事件处理 ---

/**
 * 处理筛选按钮点击事件
 */
const handleFilter = () => {
  uni.showToast({ title: '筛选功能待实现', icon: 'none' });
};

/**
 * 跳转到案件详情页
 * @param id - 案件ID
 */
const goToDetail = (id: string) => {
  console.log('跳转到详情页，ID:', id);
  uni.navigateTo({
    url: `/pages/mediation-detail/index?id=${id}`, // 请替换为您的详情页路径
  });
};

// 组件挂载时获取数据
onMounted(() => {
  fetchCaseList();
});
</script>

<style lang="scss" scoped>
// 页面整体布局
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f7fa;
}

// 顶部区域
.header-section {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #ebeef5;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
  .search-icon {
    margin-right: 10rpx;
  }
  .search-input {
    width: 100%;
    font-size: 28rpx;
  }
  .placeholder {
    color: #c0c4cc;
  }
}

.filter-button {
  margin-left: 20rpx;
  padding: 10rpx;
}

// 列表区域
.case-list-container {
  flex: 1;
  overflow-y: auto;
}
.case-list {
  padding: 24rpx;
}

// 卡片项
.case-item {
  display: flex;
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  overflow: hidden; // 确保圆角生效
}

// 状态颜色竖条
.status-bar {
  width: 12rpx;
  flex-shrink: 0;
  &.status-pending { background-color: #18b566; }
  &.status-progress { background-color: #3c7fee; }
  &.status-evaluated { background-color: #f9ae3d; }
}

.case-content {
  flex: 1;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx; // 使用gap设置间距
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .case-id {
    font-size: 30rpx;
    font-weight: bold;
    color: #303133;
  }
  .case-tag {
    background-color: #e9f2ff;
    color: #3c7fee;
    font-size: 24rpx;
    padding: 6rpx 16rpx;
    border-radius: 20rpx;
  }
}

.summary {
  font-size: 28rpx;
  color: #606266;
  line-height: 1.6;
  // 多行文本溢出显示省略号
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  
  .summary-label {
    color: #303133;
    font-weight: 500;
    margin-right: 16rpx;
  }
}

.content-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.date-info {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #909399;
  .date-text {
    margin-left: 8rpx;
  }
}

.status-action {
  display: flex;
  align-items: center;
  .status-text {
    font-size: 28rpx;
    font-weight: 500;
    margin-right: 8rpx;
    &.status-pending { color: #18b566; }
    &.status-progress { color: #3c7fee; }
    &.status-evaluated { color: #f9ae3d; }
  }
}

.empty-state {
  text-align: center;
  padding-top: 200rpx;
  color: #909399;
  font-size: 28rpx;
}
</style>