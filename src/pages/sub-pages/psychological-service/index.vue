<template>
  <view class="page-container">
    <view class="hint-box">
      <view class="hint-icon">!</view>
      <text>提示信息：填写表单时请注意纠纷诉求、信息的真实性</text>
    </view>

    <view class="form-card">
      <view class="form-section">
        <view class="section-title">基本信息</view>
        <view class="form-item">
          <label class="item-label required">姓名</label>
          <input
            v-model="formData.name"
            class="item-input"
            placeholder="请输入姓名"
            placeholder-class="placeholder"
          />
        </view>
        <view class="form-item">
          <label class="item-label required">手机号码</label>
          <input
            v-model="formData.phone"
            type="number"
            maxlength="11"
            class="item-input"
            placeholder="请输入联系电话"
            placeholder-class="placeholder"
          />
        </view>
        <view class="form-item">
          <label class="item-label">婚姻状况</label>
          <radio-group @change="maritalStatusChange" class="radio-group">
            <label class="radio-label">
              <radio value="是" :checked="formData.isMarried === '是'" color="#3c7fee" />
              <text>是</text>
            </label>
            <label class="radio-label">
              <radio value="否" :checked="formData.isMarried === '否'" color="#3c7fee" />
              <text>否</text>
            </label>
          </radio-group>
        </view>
      </view>

      <view class="form-section">
        <view class="section-title">咨询情况</view>
        <view class="form-item column">
          <label class="item-label required">咨询概述</label>
          <view class="textarea-wrapper">
            <textarea
              v-model="formData.consultationText"
              placeholder="请输入咨询内容"
              placeholder-class="placeholder"
              :maxlength="50"
              class="textarea-field"
            />
            <view class="char-counter">{{ formData.consultationText.length }}/50</view>
          </view>
        </view>
      </view>
    </view>

    <view class="footer">
      <button class="submit-btn" @click="handleSubmit">提 交</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

// 定义表单数据的接口
interface ApplicationForm {
  name: string;
  phone: string;
  isMarried: '是' | '否';
  consultationText: string;
}

// 表单响应式数据，并设置默认值
const formData = reactive<ApplicationForm>({
  name: '',
  phone: '',
  isMarried: '否', // 默认选中“否”
  consultationText: '',
});

/**
 * 监听婚姻状况单选框变化
 * @param event - 事件对象
 */
const maritalStatusChange = (event: any) => {
  formData.isMarried = event.detail.value;
};

/**
 * 校验手机号码格式
 * @param phone - 手机号字符串
 */
const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * 处理表单提交
 */
const handleSubmit = () => {
  // 1. 数据校验
  if (!formData.name.trim()) {
    return uni.showToast({ title: '请输入姓名', icon: 'none' });
  }
  if (!formData.phone.trim()) {
    return uni.showToast({ title: '请输入手机号码', icon: 'none' });
  }
  if (!validatePhone(formData.phone)) {
    return uni.showToast({ title: '手机号码格式不正确', icon: 'none' });
  }
  if (!formData.consultationText.trim()) {
    return uni.showToast({ title: '请输入咨询概述', icon: 'none' });
  }

  console.log('提交的表单数据:', JSON.parse(JSON.stringify(formData)));
  uni.showLoading({ title: '正在提交...' });

  // 2. 模拟API调用
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '提交成功', icon: 'success' });
    
    // 3. 重置表单
    resetForm();
  }, 1500);
};

/**
 * 重置表单
 */
const resetForm = () => {
  formData.name = '';
  formData.phone = '';
  formData.isMarried = '否';
  formData.consultationText = '';
};

</script>

<style lang="scss" scoped>
.page-container {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 180rpx; // 为底部按钮留出空间
}

// 顶部提示
.hint-box {
  display: flex;
  align-items: center;
  background-color: #eaf2ff;
  color: #3c7fee;
  padding: 20rpx 30rpx;
  font-size: 26rpx;
  line-height: 1.5;

  .hint-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%;
    border: 2rpx solid #3c7fee;
    margin-right: 16rpx;
    font-size: 24rpx;
    font-weight: bold;
  }
}

// 表单卡片
.form-card {
  background-color: #ffffff;
  margin: 24rpx;
  border-radius: 16rpx;
  padding: 10rpx 30rpx;
}

.form-section {
  padding: 20rpx 0;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
  padding: 20rpx 0;
  position: relative;
  padding-left: 20rpx;
  
  // 标题前的蓝色竖线
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6rpx;
    height: 30rpx;
    background-color: #3c7fee;
    border-radius: 4rpx;
  }
}

.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
  
  // 适用于textarea的垂直布局
  &.column {
    flex-direction: column;
    align-items: flex-start;
  }
}

.item-label {
  font-size: 30rpx;
  color: #303133;
  width: 180rpx; // 固定标签宽度
  flex-shrink: 0;

  // 必填项星号
  &.required::before {
    content: '*';
    color: #f56c6c;
    margin-right: 6rpx;
  }
}

.item-input {
  flex: 1;
  font-size: 30rpx;
  text-align: right;
  color: #303133;
}

.placeholder {
  color: #c0c4cc;
}

.radio-group {
  display: flex;
  .radio-label {
    display: flex;
    align-items: center;
    margin-left: 60rpx; // 选项间距
    font-size: 30rpx;
    color: #303133;
    
    // 隐藏默认的radio样式，自定义
    radio ::v-deep .uni-radio-input {
      width: 36rpx;
      height: 36rpx;
    }
  }
}

.textarea-wrapper {
  width: 100%;
  background-color: #f5f7fa;
  border-radius: 8rpx;
  padding: 20rpx;
  margin-top: 20rpx;
  box-sizing: border-box;
  position: relative;

  .textarea-field {
    width: 100%;
    height: 150rpx;
    font-size: 28rpx;
    line-height: 1.6;
    color: #303133;
  }
  
  .char-counter {
    position: absolute;
    bottom: 10rpx;
    right: 20rpx;
    font-size: 24rpx;
    color: #909399;
  }
}

// 底部按钮
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.submit-btn {
  background-color: #3c7fee;
  color: white;
  font-size: 32rpx;
  border-radius: 50rpx;
  height: 90rpx;
  line-height: 90rpx;
  &:after {
    border: none;
  }
  &:active {
    background-color: #2b65d9;
  }
}
</style>