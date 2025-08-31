<script setup lang="ts">
import { ref, reactive } from 'vue'

// 类型定义
interface CaseInfo {
  caseNumber: string
  registerDate: string
  status: string
}

interface RespondentInfo {
  name: string
  gender: string
  phone: string
  idNumber: string
  address: string
}

interface DisputeInfo {
  date: string
  location: string
  description: string
}

interface AttachmentFile {
  name: string
  type: string
}

interface DisputeDetail {
  respondent: RespondentInfo
  dispute: DisputeInfo
  attachments: AttachmentFile[]
}

interface ResultInfo {
  resolveDate: string
  organization: string
  resolution: string
}

interface ProcessRecord {
  time: string
  title: string
  description?: string
  operator?: string
  status: 'completed' | 'processing' | 'pending'
}

interface FailureResultInfo {
  resolveDate: string
  organization: string
  resolution: string
}

interface EvaluationInfo {
  isEvaluated: boolean
  rating: number
  comment: string
  evaluateTime: string
}

// 响应式数据
const activeTab = ref(0)
const currentRating = ref(0)
const evaluationComment = ref('')

const tabs = reactive([
  { name: '事项详情', hasNotification: false },
  { name: '办理记录', hasNotification: false },
  { name: '办理结果', hasNotification: true },
  { name: '事件评价', hasNotification: false }
])

const caseInfo = reactive<CaseInfo>({
  caseNumber: 'WT202307220000000',
  registerDate: '2024-01-11',
  status: '已办结' // '已办结', '办理中'
})

const processRecords = reactive<ProcessRecord[]>([
  {
    time: '2024-01-11 09:30',
    title: '案件受理',
    description: '案件已被受理，开始办理流程',
    operator: '张三',
    status: 'completed'
  },
  {
    time: '2024-01-12 14:20',
    title: '现场调查',
    description: '工作人员前往现场进行实地调查，了解纠纷详情',
    operator: '李四',
    status: 'completed'
  },
  {
    time: '2024-01-15 10:15',
    title: '双方调解',
    description: '组织双方当事人进行调解谈判',
    operator: '王五',
    status: 'completed'
  },
  {
    time: '2024-01-16 16:45',
    title: '达成协议',
    description: '双方达成一致意见，签署调解协议书',
    operator: '张三',
    status: 'completed'
  }
])

const failureProcessRecords = reactive<ProcessRecord[]>([
  {
    time: '2024-07-08 09:30',
    title: '案件受理',
    description: '案件已被受理，开始办理流程',
    operator: '刘素',
    status: 'completed'
  },
  {
    time: '2024-07-10 14:20',
    title: '现场调查',
    description: '工作人员前往现场进行实地调查',
    operator: '刘素',
    status: 'completed'
  },
  {
    time: '2024-07-15 10:15',
    title: '第一次调解',
    description: '组织双方进行第一次调解，未达成一致',
    operator: '刘素',
    status: 'completed'
  },
  {
    time: '2024-07-20 15:30',
    title: '第二次调解',
    description: '再次组织调解，双方仍存在分歧',
    operator: '刘素',
    status: 'completed'
  },
  {
    time: '2024-08-01 11:00',
    title: '调解失败',
    description: '经多次调解，双方无法达成一致，调解结束',
    operator: '刘素',
    status: 'completed'
  }
])

const failureResultInfo = reactive<FailureResultInfo>({
  resolveDate: '2024-01-11',
  organization: '双河市调解组织——刘素',
  resolution: '化解情况化解情况化解情况化解情况化解情况化解情况化解情况'
})

const disputeInfo = reactive<DisputeDetail>({
  respondent: {
    name: '施淳美',
    gender: '男',
    phone: '19998564285',
    idNumber: '140321000000000000',
    address: '新疆生产建设兵团第五师双河市'
  },
  dispute: {
    date: '2025-03-08',
    location: '新疆生产建设兵团第五师双河市',
    description: '居民楼七楼和八楼住户因漏水问题产生矛盾。七楼住户认为八楼产生噪音影响到自己，八楼住户则称自己尽量注意，还因七楼反映的阳台漏水问题花费一万多修理，之后七楼说厨房漏水，无法正常居住。'
  },
  attachments: [
    { name: '邻里纠纷事件材料.pdf', type: 'pdf' },
    { name: '邻里纠纷事件材料.jpeg', type: 'image' }
  ]
})

const resultInfo = reactive<ResultInfo>({
  resolveDate: '2024-01-11',
  organization: '调解组织——张三',
  resolution: '在双方协调一致的情况下，已达成最终和解。'
})

const evaluationInfo = reactive<EvaluationInfo>({
  isEvaluated: true,
  rating: 2,
  comment: '对调解部门工作人员的服务态度、工作作风和工作效率很满意',
  evaluateTime: '2024-05-29'
})

// 方法
const goBack = () => {
  uni.navigateBack()
}

const switchTab = (index: number) => {
  activeTab.value = index
  // 根据案件状态和标签页切换数据
  if (index === 1) { // 办理记录
    if (caseInfo.status === '已办结') {
      // 使用成功案例的处理记录
      processRecords.splice(0, processRecords.length, ...processRecords)
    } else {
      // 使用失败案例的处理记录
      processRecords.splice(0, processRecords.length, ...failureProcessRecords)
    }
  }
}

const getStatusClass = (status: string) => {
  switch (status) {
    case '已办结': return 'completed'
    case '办理中': return 'processing'
    default: return ''
  }
}

const getFileIcon = (type: string) => {
  return type === 'pdf' ? '📄' : '🖼️'
}

const getFileIconClass = (type: string) => {
  return type === 'pdf' ? 'pdf-icon' : 'image-icon'
}

const getRatingText = (rating: number) => {
  const texts = ['', '基本满意', '基本满意', '非常满意']
  return texts[rating] || ''
}

const setRating = (rating: number) => {
  currentRating.value = rating
}

const handleDispute = () => {
  console.log('处理纠纷')
}

const previewFile = (file: AttachmentFile) => {
  console.log('预览文件:', file.name)
}

const deleteCase = () => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除此案件吗？',
    success: (res) => {
      if (res.confirm) {
        console.log('删除案件')
      }
    }
  })
}

const editCase = () => {
  console.log('编辑案件')
}

const viewAgreement = () => {
  console.log('查看调解协议书')
}

const submitEvaluation = () => {
  if (currentRating.value === 0) {
    uni.showToast({
      title: '请选择评分',
      icon: 'none'
    })
    return
  }
  
  evaluationInfo.isEvaluated = true
  evaluationInfo.rating = currentRating.value
  evaluationInfo.comment = evaluationComment.value
  evaluationInfo.evaluateTime = new Date().toISOString().split('T')[0]
  
  uni.showToast({
    title: '评价提交成功',
    icon: 'success'
  })
}
</script>

<template>
  <view class="container">
    <!-- 事件基本信息 -->
    <view class="case-header">
      <view class="case-info">
        <text class="case-label">
          事件编号：
        </text>
        <text class="case-value">
          {{ caseInfo.caseNumber }}
        </text>
        <view
          v-if="caseInfo.status === '邻里纠纷'"
          class="case-tag"
        >
          邻里纠纷
        </view>
      </view>
      <view class="case-meta">
        <text class="meta-item">
          登记日期：{{ caseInfo.registerDate }}
        </text>
        <text class="meta-item">
          事件状态：
          <text
            class="status"
            :class="getStatusClass(caseInfo.status)"
          >
            {{ caseInfo.status }}
          </text>
        </text>
      </view>
    </view>

    <!-- 标签页导航 -->
    <view class="tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index" 
        class="tab-item" 
        :class="{ active: activeTab === index }"
        @click="switchTab(index)"
      >
        <text>{{ tab.name }}</text>
        <view
          v-if="tab.hasNotification"
          class="tab-dot"
        />
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 事项详情 -->
      <view
        v-if="activeTab === 0"
        class="tab-content"
      >
        <view class="info-section">
          <view class="section-title">
            被申请人信息
          </view>
          <view class="info-item">
            <text class="info-label">
              姓名
            </text>
            <text class="info-value">
              {{ disputeInfo.respondent.name }}
            </text>
            <text class="gender-tag">
              {{ disputeInfo.respondent.gender }}
            </text>
          </view>
          <view class="info-item">
            <text class="info-label">
              手机号码
            </text>
            <text class="info-value">
              {{ disputeInfo.respondent.phone }}
            </text>
          </view>
          <view class="info-item">
            <text class="info-label">
              证件号码
            </text>
            <text class="info-value">
              {{ disputeInfo.respondent.idNumber }}
            </text>
          </view>
          <view class="info-item">
            <text class="info-label">
              家庭住址
            </text>
            <text class="info-value">
              {{ disputeInfo.respondent.address }}
            </text>
          </view>
        </view>

        <view class="info-section">
          <view class="section-title">
            纠纷信息
            <text
              class="section-action"
              @click="handleDispute"
            >
              邻里纠纷
            </text>
          </view>
          <view class="info-item">
            <text class="info-label">
              纠纷日期
            </text>
            <text class="info-value">
              {{ disputeInfo.dispute.date }}
            </text>
          </view>
          <view class="info-item">
            <text class="info-label">
              纠纷属地
            </text>
            <text class="info-value">
              {{ disputeInfo.dispute.location }}
            </text>
          </view>
          <view class="info-item">
            <text class="info-label">
              诉求内容
            </text>
            <text class="info-value description">
              {{ disputeInfo.dispute.description }}
            </text>
          </view>
        </view>

        <view class="info-section">
          <view class="section-title">
            附件信息
          </view>
          <view class="attachment-list">
            <view 
              v-for="(file, index) in disputeInfo.attachments" 
              :key="index" 
              class="attachment-item"
              @click="previewFile(file)"
            >
              <view
                class="file-icon"
                :class="getFileIconClass(file.type)"
              >
                <text>{{ getFileIcon(file.type) }}</text>
              </view>
              <text class="file-name">
                {{ file.name }}
              </text>
            </view>
          </view>
        </view>

        <!-- 操作按钮 -->
        <view class="action-buttons">
          <view
            class="btn-secondary"
            @click="deleteCase"
          >
            删除
          </view>
          <view
            class="btn-primary"
            @click="editCase"
          >
            修改
          </view>
        </view>
      </view>

      <!-- 办理记录 -->
      <view
        v-if="activeTab === 1"
        class="tab-content"
      >
        <view class="process-records">
          <view class="timeline">
            <view 
              v-for="(record, index) in processRecords" 
              :key="index" 
              class="timeline-item"
            >
              <view
                class="timeline-dot"
                :class="record.status"
              />
              <view class="timeline-content">
                <view class="timeline-time">
                  {{ record.time }}
                </view>
                <view class="timeline-title">
                  {{ record.title }}
                </view>
                <view
                  v-if="record.description"
                  class="timeline-desc"
                >
                  {{ record.description }}
                </view>
                <view
                  v-if="record.operator"
                  class="timeline-operator"
                >
                  操作人：{{ record.operator }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 办理结果 -->
      <view
        v-if="activeTab === 2"
        class="tab-content"
      >
        <!-- 成功案例 -->
        <view
          v-if="caseInfo.status === '已办结'"
          class="result-success"
        >
          <view class="result-icon">
            <view class="icon-wrapper success">
              <text class="checkmark">
                ✓
              </text>
            </view>
          </view>
          <view class="result-title">
            解纠成功
          </view>
          <view class="result-details">
            <view class="result-item">
              <text class="result-label">
                化解日期：
              </text>
              <text class="result-value">
                {{ resultInfo.resolveDate }}
              </text>
            </view>
            <view class="result-item">
              <text class="result-label">
                创建单位：
              </text>
              <text class="result-value">
                {{ resultInfo.organization }}
              </text>
            </view>
            <view class="result-item">
              <text class="result-label">
                化解情况：
              </text>
              <text class="result-value">
                {{ resultInfo.resolution }}
              </text>
            </view>
            <view class="result-item">
              <text class="result-label">
                化解附件：
              </text>
              <view
                class="result-link"
                @click="viewAgreement"
              >
                <text class="file-icon">
                  📄
                </text>
                <text class="link-text">
                  调解协议书
                </text>
              </view>
            </view>
          </view>
        </view>

        <!-- 失败案例 -->
        <view
          v-if="caseInfo.status === '办理中'"
          class="result-failure"
        >
          <view class="result-icon">
            <view class="icon-wrapper failure">
              <text class="cross">
                ✕
              </text>
            </view>
          </view>
          <view class="result-title">
            解纠失败
          </view>
          <view class="result-details">
            <view class="result-item">
              <text class="result-label">
                化解日期：
              </text>
              <text class="result-value">
                {{ failureResultInfo.resolveDate }}
              </text>
            </view>
            <view class="result-item">
              <text class="result-label">
                创建单位：
              </text>
              <text class="result-value">
                {{ failureResultInfo.organization }}
              </text>
            </view>
            <view class="result-item">
              <text class="result-label">
                化解情况：
              </text>
              <text class="result-value failure-text">
                {{ failureResultInfo.resolution }}
              </text>
            </view>
            <view class="result-item">
              <text class="result-label">
                化解附件：
              </text>
              <view
                class="result-link"
                @click="viewAgreement"
              >
                <text class="file-icon">
                  📄
                </text>
                <text class="link-text">
                  调解协议书
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 事件评价 -->
      <view
        v-if="activeTab === 3"
        class="tab-content"
      >
        <!-- 已评价状态 -->
        <view
          v-if="evaluationInfo.isEvaluated"
          class="evaluation-completed"
        >
          <text class="evaluation-prompt">
            已对调解部门工作人员的服务态度、工作作风和工作效率做出评价
          </text>
          
          <view class="rating-display">
            <view class="stars">
              <text 
                v-for="index in 3" 
                :key="index"
                class="star" 
                :class="{ active: index < evaluationInfo.rating }"
              >
                ★
              </text>
            </view>
            <text class="rating-text">
              {{ getRatingText(evaluationInfo.rating) }}
            </text>
          </view>

          <view class="evaluation-content">
            <text>{{ evaluationInfo.comment }}</text>
          </view>

          <view class="evaluation-time">
            评价时间：{{ evaluationInfo.evaluateTime }}
          </view>
        </view>

        <!-- 待评价状态 -->
        <view
          v-else
          class="evaluation-form"
        >
          <text class="evaluation-question">
            您对调解部门工作人员的服务态度、工作作风和工作效率是否满意？
          </text>
          
          <view class="rating-selector">
            <view class="stars">
              <text 
                v-for="index in 3" 
                :key="index"
                class="star" 
                :class="{ active: index < currentRating }"
                @click="setRating(index + 1)"
              >
                ★
              </text>
            </view>
            <text class="rating-text">
              {{ getRatingText(currentRating) }}
            </text>
          </view>

          <view class="comment-input">
            <textarea 
              v-model="evaluationComment"
              placeholder="请输入评价内容..."
              maxlength="100"
            />
            <text class="char-count">
              {{ evaluationComment.length }}/100
            </text>
          </view>

          <view
            class="submit-btn"
            @click="submitEvaluation"
          >
            提交
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 0 32rpx;
  background-color: #b8d4f0;
  color: #333;
  
  .nav-left {
    width: 60rpx;
    
    .nav-back {
      font-size: 48rpx;
      font-weight: bold;
    }
  }
  
  .nav-title {
    font-size: 36rpx;
    font-weight: 500;
  }
  
  .nav-right {
    display: flex;
    gap: 24rpx;
    
    .nav-menu, .nav-record {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32rpx;
    }
  }
}

.case-header {
  padding: 32rpx;
  background-color: #b8d4f0;
  
  .case-info {
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;
    
    .case-label {
      color: #666;
      font-size: 28rpx;
    }
    
    .case-value {
      color: #333;
      font-size: 28rpx;
      margin-right: 16rpx;
    }
    
    .case-tag {
      background-color: #52c41a;
      color: white;
      padding: 8rpx 16rpx;
      border-radius: 8rpx;
      font-size: 24rpx;
    }
  }
  
  .case-meta {
    display: flex;
    gap: 48rpx;
    
    .meta-item {
      font-size: 28rpx;
      color: #666;
      
      .status {
        &.completed {
          color: #1890ff;
        }
        
        &.processing {
          color: #1890ff;
        }
      }
    }
  }
}

.tabs {
  display: flex;
  background-color: white;
  border-bottom: 1rpx solid #e8e8e8;
  
  .tab-item {
    flex: 1;
    text-align: center;
    padding: 32rpx 0;
    position: relative;
    
    &.active {
      color: #1890ff;
      border-bottom: 4rpx solid #1890ff;
    }
    
    .tab-dot {
      position: absolute;
      top: 24rpx;
      right: 20%;
      width: 16rpx;
      height: 16rpx;
      background-color: #ff4d4f;
      border-radius: 50%;
    }
  }
}

.content {
  flex: 1;
  
  .tab-content {
    padding: 32rpx;
  }
}

.info-section {
  background-color: white;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  
  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 32rpx;
    padding-bottom: 16rpx;
    border-bottom: 1rpx solid #f0f0f0;
    
    .section-action {
      color: #1890ff;
      font-size: 28rpx;
    }
  }
  
  .info-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 24rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .info-label {
      width: 150rpx;
      font-size: 28rpx;
      color: #666;
      flex-shrink: 0;
    }
    
    .info-value {
      flex: 1;
      font-size: 28rpx;
      color: #333;
      
      &.description {
        line-height: 1.6;
      }
    }
    
    .gender-tag {
      background-color: #1890ff;
      color: white;
      padding: 4rpx 12rpx;
      border-radius: 8rpx;
      font-size: 24rpx;
      margin-left: 16rpx;
    }
  }
}

.attachment-list {
  .attachment-item {
    display: flex;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .file-icon {
      width: 64rpx;
      height: 64rpx;
      margin-right: 24rpx;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.pdf-icon {
        color: #ff4d4f;
      }
      
      &.image-icon {
        color: #52c41a;
      }
    }
    
    .file-name {
      font-size: 28rpx;
      color: #1890ff;
    }
  }
}

.action-buttons {
  display: flex;
  gap: 24rpx;
  margin-top: 64rpx;
  
  .btn-secondary, .btn-primary {
    flex: 1;
    height: 88rpx;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
  }
  
  .btn-secondary {
    background-color: #f5f5f5;
    color: #666;
  }
  
  .btn-primary {
    background-color: #1890ff;
    color: white;
  }
}

.timeline {
  position: relative;
  padding-left: 60rpx;
  
  .timeline-item {
    position: relative;
    padding-bottom: 48rpx;
    
    &:not(:last-child)::before {
      content: '';
      position: absolute;
      left: -51rpx;
      top: 32rpx;
      width: 2rpx;
      height: calc(100% - 16rpx);
      background-color: #e8e8e8;
    }
    
    .timeline-dot {
      position: absolute;
      left: -60rpx;
      top: 8rpx;
      width: 16rpx;
      height: 16rpx;
      border-radius: 50%;
      background-color: #d9d9d9;
      
      &.completed {
        background-color: #52c41a;
      }
      
      &.processing {
        background-color: #1890ff;
      }
      
      &.pending {
        background-color: #d9d9d9;
      }
    }
    
    .timeline-content {
      background-color: white;
      border-radius: 12rpx;
      padding: 24rpx;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
      
      .timeline-time {
        font-size: 24rpx;
        color: #999;
        margin-bottom: 8rpx;
      }
      
      .timeline-title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 8rpx;
      }
      
      .timeline-desc {
        font-size: 28rpx;
        color: #666;
        line-height: 1.5;
        margin-bottom: 8rpx;
      }
      
      .timeline-operator {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}

.result-success, .result-failure {
  background-color: white;
  border-radius: 16rpx;
  padding: 48rpx 32rpx;
  text-align: center;
  
  .result-icon {
    margin: 0 auto 32rpx;
    
    .icon-wrapper {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 64rpx;
      color: white;
      position: relative;
      
      &.success {
        background: linear-gradient(135deg, #52c41a, #73d13d);
        box-shadow: 0 8rpx 24rpx rgba(82, 196, 26, 0.3);
      }
      
      &.failure {
        background: linear-gradient(135deg, #ff4d4f, #ff7875);
        box-shadow: 0 8rpx 24rpx rgba(255, 77, 79, 0.3);
      }
      
      .checkmark, .cross {
        font-weight: bold;
      }
    }
  }
  
  .result-title {
    font-size: 36rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 48rpx;
  }
  
  .result-details {
    text-align: left;
    
    .result-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 24rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .result-label {
        width: 150rpx;
        font-size: 28rpx;
        color: #666;
        flex-shrink: 0;
      }
      
      .result-value {
        flex: 1;
        font-size: 28rpx;
        color: #333;
        line-height: 1.5;
        
        &.failure-text {
          color: #333;
        }
      }
      
      .result-link {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #1890ff;
        
        .file-icon {
          margin-right: 8rpx;
          font-size: 32rpx;
          color: #ff4d4f;
        }
        
        .link-text {
          color: #1890ff;
        }
      }
    }
  }
}

.evaluation-completed {
  background-color: white;
  border-radius: 16rpx;
  padding: 32rpx;
  
  .evaluation-prompt {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 32rpx;
  }
  
  .rating-display {
    display: flex;
    align-items: center;
    margin-bottom: 32rpx;
    
    .stars {
      display: flex;
      gap: 8rpx;
      margin-right: 24rpx;
      
      .star {
        font-size: 48rpx;
        color: #d9d9d9;
        
        &.active {
          color: #fadb14;
        }
      }
    }
    
    .rating-text {
      font-size: 28rpx;
      color: #666;
    }
  }
  
  .evaluation-content {
    background-color: #f9f9f9;
    padding: 24rpx;
    border-radius: 8rpx;
    margin-bottom: 32rpx;
    font-size: 28rpx;
    color: #333;
    line-height: 1.6;
  }
  
  .evaluation-time {
    font-size: 24rpx;
    color: #999;
    text-align: right;
  }
}

.evaluation-form {
  background-color: white;
  border-radius: 16rpx;
  padding: 32rpx;
  
  .evaluation-question {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 32rpx;
    line-height: 1.6;
  }
  
  .rating-selector {
    display: flex;
    align-items: center;
    margin-bottom: 48rpx;
    
    .stars {
      display: flex;
      gap: 8rpx;
      margin-right: 24rpx;
      
      .star {
        font-size: 48rpx;
        color: #d9d9d9;
        
        &.active {
          color: #fadb14;
        }
      }
    }
    
    .rating-text {
      font-size: 28rpx;
      color: #666;
    }
  }
  
  .comment-input {
    position: relative;
    margin-bottom: 48rpx;
    
    textarea {
      width: 100%;
      min-height: 200rpx;
      padding: 24rpx;
      border: 1rpx solid #d9d9d9;
      border-radius: 8rpx;
      font-size: 28rpx;
      line-height: 1.6;
      resize: none;
    }
    
    .char-count {
      position: absolute;
      bottom: 16rpx;
      right: 16rpx;
      font-size: 24rpx;
      color: #999;
    }
  }
  
  .submit-btn {
    width: 100%;
    height: 88rpx;
    background-color: #1890ff;
    color: white;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
  }
}
</style>