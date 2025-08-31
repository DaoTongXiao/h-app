<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// 咨询类型
const consultationTypes = reactive([
  '预约律师审核相关法律文书',
  '委托律师承办案件',
  '简单法律问题咨询',
  '预约律师咨询解答',
  '其他'
])

const selectedType = ref('简单法律问题咨询') // 默认选中一项

// 表单数据
const formData = reactive({
  name: '',
  phone: '',
  description: ''
})

// 计算咨询概述的字数
const descriptionLength = computed(() => formData.description.length)

// 选择咨询类型
const selectType = (type: string) => {
  selectedType.value = type
}

// 提交表单
const submitForm = () => {
  if (!formData.name) {
    uni.showToast({ title: '请输入姓名', icon: 'none' })
    return
  }
  if (!formData.phone || !/^1[3-9]\d{9}$/.test(formData.phone)) {
    uni.showToast({ title: '请输入正确的手机号码', icon: 'none' })
    return
  }
  if (!formData.description) {
    uni.showToast({ title: '请输入咨询概述', icon: 'none' })
    return
  }

  const submission = {
    type: selectedType.value,
    ...formData
  }

  console.log('Form Submitted:', submission)

  uni.showToast({
    title: '提交成功',
    icon: 'success'
  })

  // 实际项目中，这里会调用 API 发送数据
}
</script>

<template>
  <view class="form-container">
    <!-- 提示信息 -->
    <view class="info-banner">
      <text>提示信息：填写表单时请注意纠纷诉求、信息的真实性</text>
    </view>

    <!-- 申请信息卡片 -->
    <view class="form-card">
      <view class="card-header">
        <view class="header-indicator" />
        <text class="header-title">
          申请信息
        </text>
      </view>

      <!-- 咨询类型标签 -->
      <view class="tag-section">
        <text
          v-for="tag in consultationTypes"
          :key="tag"
          :class="['consultation-tag', { active: selectedType === tag }]"
          @click="selectType(tag)"
        >
          {{ tag }}
        </text>
      </view>

      <!-- 表单项 -->
      <view class="form-item">
        <text class="item-label required">
          姓名
        </text>
        <input
          v-model="formData.name"
          class="item-input"
          placeholder="请输入姓名"
          placeholder-class="placeholder"
        >
      </view>
      <view class="form-item">
        <text class="item-label required">
          手机号码
        </text>
        <input
          v-model="formData.phone"
          class="item-input"
          type="number"
          maxlength="11"
          placeholder="请输入联系电话"
          placeholder-class="placeholder"
        >
      </view>
      <view class="form-item-column">
        <text class="item-label required">
          咨询概述
        </text>
        <view class="textarea-wrapper">
          <textarea
            v-model="formData.description"
            class="item-textarea"
            placeholder="请输入咨询内容"
            placeholder-class="placeholder"
            maxlength="50"
          />
          <text class="char-counter">
            {{ descriptionLength }}/50
          </text>
        </view>
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-button-wrapper">
      <button
        class="submit-button"
        @click="submitForm"
      >
        提交
      </button>
    </view>
  </view>
</template>

<style scoped>
.form-container {
  min-height: 100vh;
  background-color: #f4f7fa;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
}

/* 提示信息 */
.info-banner {
  background-color: #e0f2ff;
  color: #337ab7;
  padding: 20rpx;
  border-radius: 12rpx;
  font-size: 26rpx;
  margin-bottom: 30rpx;
}

/* 表单卡片 */
.form-card {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.header-indicator {
  width: 8rpx;
  height: 32rpx;
  background-color: #337ab7;
  border-radius: 4rpx;
  margin-right: 15rpx;
}

.header-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

/* 咨询类型标签 */
.tag-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-bottom: 20rpx;
}

.consultation-tag {
  background-color: #f0f0f0;
  color: #555;
  padding: 12rpx 24rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  transition: all 0.2s;
}

.consultation-tag.active {
  background-color: #e0f2ff;
  color: #337ab7;
  font-weight: 500;
}

/* 表单项 */
.form-item,
.form-item-column {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}
.form-item-column {
  flex-direction: column;
  align-items: flex-start;
}
.item-label {
  font-size: 30rpx;
  color: #333;
  width: 180rpx;
}
.item-label.required::before {
  content: '*';
  color: #d9534f;
  margin-right: 6rpx;
}

.item-input {
  flex: 1;
  text-align: right;
  font-size: 30rpx;
  color: #333;
}

.placeholder {
  color: #bbb;
}

.textarea-wrapper {
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-top: 20rpx;
  box-sizing: border-box;
}

.item-textarea {
  width: 100%;
  height: 150rpx;
  font-size: 28rpx;
  color: #333;
  line-height: 1.5;
}

.char-counter {
  text-align: right;
  font-size: 24rpx;
  color: #aaa;
  width: 100%;
  display: block;
}

/* 提交按钮 */
.submit-button-wrapper {
  margin-top: 60rpx;
  padding: 0 10rpx;
}

.submit-button {
  background-color: #409eff;
  color: white;
  font-size: 32rpx;
  border-radius: 50rpx;
  height: 90rpx;
  line-height: 90rpx;
}
.submit-button::after {
  border: none;
}
</style>
