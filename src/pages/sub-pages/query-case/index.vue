<template>
  <view class="page-container">
    <view v-if="showResult" class="result-container">
      <view v-if="caseDetails" class="result-card">
        <view class="card-header">
          <image class="header-icon" src="/static/query-success-icon.svg"></image>
          <text>查询结果</text>
        </view>
        <view class="card-body">
          <view class="info-row">
            <text class="info-label">办理状态</text>
            <text class="info-value status" :class="caseDetails.statusClass">{{ caseDetails.status }}</text>
          </view>
          <view class="info-row">
            <text class="info-label">办理单位</text>
            <text class="info-value">{{ caseDetails.handlingUnit }}</text>
          </view>
          <view class="info-row column">
            <text class="info-label">办理结果</text>
            <text class="info-value result-text">{{ caseDetails.finalResult }}</text>
          </view>
          
          <view class="process-timeline">
            <text class="info-label">办理过程</text>
            <view class="timeline-item" v-for="(item, index) in caseDetails.process" :key="index" :class="{active: index === 0}">
              <view class="timeline-node"></view>
              <view class="timeline-content">
                <view class="process-title">{{ item.title }}</view>
                <view class="process-time">{{ item.time }}</view>
                <view class="process-details">{{ item.content }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <view v-else class="empty-state">
        <image class="empty-icon" src="/static/empty-icon.svg"></image>
        <text class="empty-text">未查询到相关记录</text>
        <text class="empty-subtext">请核对您输入的查询码和身份证号码</text>
      </view>

      <button class="back-btn" @click="handleGoBack">返 回 查 询</button>
    </view>

    <view v-else class="query-container">
      <view class="banner">
        <image class="banner-img" src="/static/query-banner.svg" mode="widthFix"></image>
        <view class="banner-title">一案一码查询</view>
        <view class="banner-subtitle">输入查询码，跟踪事件处理进度</view>
      </view>

      <view class="form-card">
        <view class="form-field">
          <image class="field-icon" src="/static/code-icon.svg"></image>
          <input
            v-model="queryData.code"
            type="number"
            :maxlength="6"
            placeholder="请输入6位查询码"
            class="input"
          />
        </view>
        <view class="form-field">
          <image class="field-icon" src="/static/id-icon.svg"></image>
          <input
            v-model="queryData.idCard"
            type="idcard"
            placeholder="请输入您的身份证号码"
            class="input"
          />
        </view>
        <button class="submit-btn" :loading="isLoading" :disabled="isLoading" @click="handleQuery">
          {{ isLoading ? '查询中...' : '立即查询' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// --- TypeScript 类型定义 ---
interface ProcessStep {
  time: string;
  title: string;
  content: string;
}

interface CaseDetails {
  queryCode: string;
  status: '已办结' | '处理中' | '已受理';
  statusClass: 'completed' | 'processing' | 'accepted';
  handlingUnit: string;
  finalResult: string;
  process: ProcessStep[];
}

// --- 组件状态定义 ---
const queryData = reactive({
  code: '',
  idCard: '',
});

const showResult = ref(false);
const isLoading = ref(false);
const caseDetails = ref<CaseDetails | null>(null);


/**
 * 模拟API请求，根据查询码和身份证号获取案件详情
 * @param code - 6位查询码
 * @param idCard - 身份证号码
 */
const fetchCaseDetailsAPI = (code: string, idCard: string): Promise<CaseDetails | null> => {
  console.log(`正在查询: code=${code}, idCard=${idCard}`);
  return new Promise(resolve => {
    setTimeout(() => {
      // 模拟一个成功查询的例子
      if (code === '123456' && idCard === '110101199003077777') {
        resolve({
          queryCode: '123456',
          status: '已办结',
          statusClass: 'completed',
          handlingUnit: '市场监督管理局',
          finalResult: '经调解，双方已达成和解协议。商家承诺为消费者更换全新商品，并补偿200元代金券。消费者对此结果表示满意。',
          process: [
            { time: '2025-08-28 10:00', title: '已办结', content: '案件处理完成，双方确认无异议。' },
            { time: '2025-08-26 14:30', title: '处理中', content: '工作人员组织双方进行现场调解。' },
            { time: '2025-08-25 11:05', title: '转交处理', content: '诉求已成功转交至 [市场监督管理局] 进行处理。' },
            { time: '2025-08-25 09:15', title: '已受理', content: '您的诉求已成功受理，平台将尽快为您分配处理单位。' },
          ]
        });
      } else {
        // 模拟查询不到结果
        resolve(null);
      }
    }, 1500); // 模拟1.5秒的网络延迟
  });
};


/**
 * 处理查询按钮点击事件
 */
const handleQuery = async () => {
  if (queryData.code.length !== 6) {
    return uni.showToast({ title: '请输入6位查询码', icon: 'none' });
  }
  if (!queryData.idCard.trim()) {
    return uni.showToast({ title: '请输入身份证号码', icon: 'none' });
  }

  isLoading.value = true;
  const result = await fetchCaseDetailsAPI(queryData.code, queryData.idCard);
  
  caseDetails.value = result;
  showResult.value = true;
  isLoading.value = false;
};

/**
 * 处理返回按钮点击事件，重置页面状态
 */
const handleGoBack = () => {
  showResult.value = false;
  caseDetails.value = null;
  queryData.code = '';
  queryData.idCard = '';
};

</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

// --- 查询表单样式 ---
.query-container {
  .banner {
    background: linear-gradient(180deg, #4d80f0 0%, #3a75e9 100%);
    text-align: center;
    padding: 60rpx 30rpx;
    .banner-img {
      width: 400rpx;
      margin-bottom: 20rpx;
    }
    .banner-title {
      font-size: 44rpx;
      color: #fff;
      font-weight: bold;
    }
    .banner-subtitle {
      font-size: 28rpx;
      color: #fff;
      opacity: 0.8;
      margin-top: 10rpx;
    }
  }
  .form-card {
    background-color: #fff;
    margin: -80rpx 30rpx 0;
    padding: 40rpx;
    border-radius: 16rpx;
    box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.05);
    position: relative;
  }
  .form-field {
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #ebeef5;
    padding: 20rpx 0;
    margin-bottom: 30rpx;
    .field-icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 20rpx;
    }
    .input {
      flex: 1;
      font-size: 30rpx;
    }
  }
  .submit-btn {
    background: linear-gradient(90deg, #4d80f0 0%, #3a75e9 100%);
    color: white;
    font-size: 32rpx;
    border-radius: 50rpx;
    height: 90rpx;
    line-height: 90rpx;
    margin-top: 40rpx;
    box-shadow: 0 8rpx 20rpx rgba(60, 127, 238, 0.3);
    &:after { border: none; }
  }
}

// --- 查询结果样式 ---
.result-container {
  padding: 30rpx;
}
.result-card {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.05);
  .card-header {
    display: flex;
    align-items: center;
    padding: 30rpx;
    background-color: #f0faff;
    font-size: 32rpx;
    color: #303133;
    font-weight: bold;
    .header-icon {
      width: 44rpx;
      height: 44rpx;
      margin-right: 16rpx;
    }
  }
  .card-body {
    padding: 30rpx;
  }
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 28rpx;
    margin-bottom: 30rpx;
    &.column {
      flex-direction: column;
      .info-label { margin-bottom: 16rpx; }
    }
  }
  .info-label {
    color: #909399;
  }
  .info-value {
    color: #303133;
    text-align: right;
    &.status {
      font-weight: bold;
      &.completed { color: #67c23a; }
      &.processing { color: #e6a23c; }
      &.accepted { color: #409eff; }
    }
    &.result-text {
      text-align: left;
      line-height: 1.6;
    }
  }
}

// 时间轴样式
.process-timeline {
  .info-label { display: block; margin-bottom: 20rpx; }
  .timeline-item {
    position: relative;
    padding-left: 40rpx;
    padding-bottom: 40rpx;
    border-left: 2rpx solid #e4e7ed;
    &:last-child {
      border-left-color: transparent;
      padding-bottom: 0;
    }
    &.active .timeline-node {
      background-color: #409eff;
      transform: translate(-50%, -50%) scale(1.5);
    }
    &.active .process-title { color: #409eff; }
  }
  .timeline-node {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 18rpx;
    height: 18rpx;
    background-color: #dcdfe6;
    border-radius: 50%;
    transition: all 0.3s;
  }
  .timeline-content {
    position: relative;
    top: -12rpx;
  }
  .process-title {
    font-size: 28rpx;
    color: #303133;
    font-weight: 500;
  }
  .process-time {
    font-size: 24rpx;
    color: #909399;
    margin: 8rpx 0;
  }
  .process-details {
    font-size: 26rpx;
    color: #606266;
    line-height: 1.5;
  }
}

// 空状态样式
.empty-state {
  text-align: center;
  padding: 100rpx 50rpx;
  .empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
  }
  .empty-text {
    font-size: 32rpx;
    color: #303133;
    display: block;
    margin-bottom: 16rpx;
  }
  .empty-subtext {
    font-size: 26rpx;
    color: #909399;
  }
}

.back-btn {
  background-color: #fff;
  color: #3c7fee;
  font-size: 32rpx;
  border-radius: 50rpx;
  height: 90rpx;
  line-height: 90rpx;
  margin-top: 40rpx;
  border: 1rpx solid #3c7fee;
  &:after { border: none; }
}

</style>