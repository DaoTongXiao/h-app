<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const currentStep = ref(1)
const nationArray = reactive(['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '其他'])
const nationIndex = ref(0)

const formData = reactive({
  name: '',
  idCard: '',
  nation: '汉族',
  phone: '',
  reason: ''
})

const reasonLength = computed(() => formData.reason.length)

const bindPickerChange = (e: any) => {
    nationIndex.value = e.detail.value
    formData.nation = nationArray[nationIndex.value]
}

const nextStep = () => {
    // Basic validation
    if (!formData.name || !formData.idCard || !formData.phone || !formData.reason) {
        uni.showToast({ title: '请填写所有必填项', icon: 'none' })
        return
    }
    currentStep.value = 2
}

const prevStep = () => {
    currentStep.value = 1
}

const submitApplication = () => {
    console.log('Final Submission:', formData)
    uni.showToast({ title: '申请提交成功', icon: 'success' })
    // API call would go here
}
</script>

<template>
  <view class="page-container">
    <!-- 步骤条 -->
    <view class="stepper">
      <view :class="['step', { active: currentStep === 1 }]">
        <view class="step-number">
          1
        </view>
        <text class="step-title">
          基本信息
        </text>
      </view>
      <view class="step-line" />
      <view :class="['step', { active: currentStep === 2 }]">
        <view class="step-number">
          2
        </view>
        <text class="step-title">
          材料上传
        </text>
      </view>
    </view>

    <!-- 步骤一：基本信息 -->
    <view
      v-if="currentStep === 1"
      class="form-wrapper"
    >
      <view class="form-card">
        <view class="card-header">
          <view class="header-indicator" />
          <text class="header-title">
            基本信息
          </text>
        </view>
        <view class="info-note">
          <text>注：* 为必填项（提示：您所提交的材料务必保证真实合法，凡涉嫌虚假材料的，将追究责任。扫描件、照片均可上传。）</text>
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
            身份证号
          </text>
          <input
            v-model="formData.idCard"
            class="item-input"
            placeholder="请输入身份证号"
            placeholder-class="placeholder"
          >
        </view>
        <view class="form-item">
          <text class="item-label required">
            民族
          </text>
          <picker
            :value="nationIndex"
            :range="nationArray"
            @change="bindPickerChange"
          >
            <view class="picker-input">
              {{ nationArray[nationIndex] }} <text class="arrow-icon" />
            </view>
          </picker>
        </view>
        <view class="form-item">
          <text class="item-label required">
            联系电话
          </text>
          <input
            v-model="formData.phone"
            class="item-input"
            type="number"
            placeholder="请输入联系电话"
            placeholder-class="placeholder"
          >
        </view>
        <view class="form-item-column">
          <text class="item-label required">
            案情及申请理由
          </text>
          <view class="textarea-wrapper">
            <textarea
              v-model="formData.reason"
              class="item-textarea"
              placeholder="请输入概况信息"
              placeholder-class="placeholder"
              maxlength="100"
            />
            <text class="char-counter">
              {{ reasonLength }}/100
            </text>
          </view>
        </view>
      </view>
      <view class="button-wrapper">
        <button
          class="submit-button"
          @click="nextStep"
        >
          下一步
        </button>
      </view>
    </view>

    <!-- 步骤二：材料上传 -->
    <view
      v-if="currentStep === 2"
      class="form-wrapper"
    >
      <view class="upload-note">
        <text>注：1.您所提交的材料务必保证真实合法，凡涉嫌虚假材料的，将追究责任。2.所上传的材料要求必须清晰、完整。经济情况证明、法律援助预约委托书提供模版下载。如经法律援助机构工作人员初步审查您的案件和材料符合法援要求，还需您携带材料原件到指定的法律援助机构正式申请并进行材料核验。</text>
      </view>
      <view class="upload-card">
        <view class="upload-item">
          <text class="item-label required">
            身份证上传 <text class="support-text">
              (支持jpg、png、jpeg文件)
            </text>
          </text>
          <view class="id-uploader">
            <view class="id-box">
              <image
                class="placeholder-icon"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjY2NjIiBkPSJNMTIgMTRhNCA0IDAgMSAxIDAtOCA0IDQgMCAwIDEgMCA4Wm0wLTZhMiAyIDAgMSAwIDAgNCAyIDIgMCAwIDAtMC00WiIvPjxwYXRoIGZpbGw9IiNjY2MiIGQ9Ik0xOS4wNjcgOEg1OS4wNjdjLjMzIDAgLjY0LjE0LjguMzdjLjE5LjI2LjI0LjU4LjEzLjg4bC0yLjgzIDcuMDhjLS4yMS41My0uNzMgMS4xLTEuMzQgMS4xSDguMThjLS42MS0uMDQtMS4xMy0uNTctMS4zNC0xLjFsLTIuODMtNy4wN2MtLjExLS4zLS4wNi0uNjMuMTMtLjg4Yy4xNi0uMjMuNDctLjM3LjgtLjM3aDIuNzdhMy4wMSAzLjAxIDAgMCAxIDUuMjUtMi4xM2wxLjU1IDIuMTNoMi4wNjdabS0xLjU1IDJoLTYuNTM0bC0uOTUtMS4zYTEuMDEgMS4wMSAwIDAgMC0xLjc2IDBsLS45NSAxLjNIOHY3aDlsLTEuODYtNC42N2MtLjE4LS40NC0uNjYtLjgtMS4xOC0uOGgtMy4zNWMtLjUxIDAtLjk4LjM0LTEuMTcuOGwtLjkyIDIuMjdIMTVsMi41MS02LjI4WiIvPjwvc3ZnPg=="
              />
              <text class="placeholder-text">
                姓名 性别 出生 住址 公民身份证号
              </text>
            </view>
            <view class="id-box">
              <image
                class="placeholder-icon-small"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZjA1MDUwIiBkPSJNMjEgNmgtM2EyIDIgMCAwIDAtMi0yaC04YTIgMiAwIDAgMC0yIDJINWMtMS4xMSAwLTIgLjktMiAydjExYzAgMS4xLjg5IDIgMiAyaDE2YzEuMTEgMCAyLS45IDItMlY4YzAtMS4xLS44OS0yLTItMlpNOCA1aDJ2MUg4Wm00IDBoMnYxSDEyWk02IDVhMSAxIDAgMSAxIDAgMiAxIDEgMCAwIDEgMC0yWm0xNS41IDEwSDMuMjZhLjUuNSAwIDAgMS0uMzUtLjg5bDQuMzQtMy42NmEuNS41IDAgMCAxIC43Ni42NWwtMy40NCAyLjloMTIuODhhLjUuNSAwIDAgMSAuMzUuODlsLTQuMzQgMy42NmEuNS41IDAgMCAxLS43Ni0uNjVsMy40NC0yLjl6Ii8+PC9zdmc+"
              />
              <text class="placeholder-text small">
                中华人民共和国 居民身份证
              </text>
            </view>
          </view>
        </view>
        <view class="upload-item file-item">
          <view class="file-info">
            <image
              class="pdf-icon"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZDUwMDBkIiBkPSJNNCAyYTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0yVjhhLjc2Ljc2IDAgMCAwLS4yNC0uNTdsLTYtNmEuNzQuNzQgMCAwIDAtLjU1LS4yN0g1YTQgNCAwIDAgMC0xIDBaTTguNSA5YTEgMSAwIDAgMSAxIDFhMSAxIDAgMCAxLTEgMUgxMHYxLjVhLjUuNSAwIDAgMS0xIDBWMTFIOEEuNS41IDAgMCAxIDggOS41VjloLjVabTcgMGEuNS41IDAgMCAxIC41LjVoM2EuNS41IDAgMCAxIDAgMWgtM3YxLjVhLjUuNSAwIDAgMS0xIDBWOUEuNS41IDAgMCAxIDE1LjUgOVptLTcgM2ExIDEgMCAwIDEgMSAxaDJhMSAxIDAgMCAxIDEgMXYxLjVhMSAxIDAgMCAxLTEgMWgtMmExIDEgMCAwIDEtMS0xdi0xLjVhMSAxIDAgMCAxIDEtMWgxVjEzSDkuNWExIDEgMCAwIDEtMS0xWm04IDBhMSAxIDAgMSAxIDAgMiAxIDEgMCAwIDEgMC0yWm0yLjc1IDEuNWEuNzUuNzUgMCAxIDAtMS41IDAgLjc1Ljc1IDAgMCAwIDEuNSAwbTEuNS0xLjI1YTEuMjUgMS4yNSAwIDEgMC0yLjUgMCAxLjI1IDEuMjUgMCAwIDAgMi41IDBaIi8+PC9zdmc+"
            />
            <text class="item-label required">
              法律援助申请表
            </text>
          </view>
          <button class="upload-button">
            <image
              class="upload-icon"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMzM3YWI3IiBkPSJNMTQgMTNWNUg5djhsLTMuNS0zLjVMNCAxMy41TDEwLjUgMjBoOWwtMS41LTEuNUwxNCAxMFoiLz48L3N2Zz4="
            />
          </button>
        </view>
      </view>
      <view class="button-group">
        <button
          class="secondary-button"
          @click="prevStep"
        >
          上一步
        </button>
        <button
          class="submit-button"
          @click="submitApplication"
        >
          提交
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f4f7fa;
  padding: 30rpx;
  box-sizing: border-box;
}

/* Stepper */
.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
  padding: 20rpx 0;
}
.step {
  display: flex;
  align-items: center;
  color: #999;
}
.step.active .step-number, .step.active .step-title {
  color: #337ab7;
}
.step-number {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 2rpx solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10rpx;
  font-size: 24rpx;
  transition: all 0.3s;
}
.step.active .step-number {
  border-color: #337ab7;
  background-color: #e0f2ff;
}
.step-title {
  font-size: 28rpx;
}
.step-line {
  flex: 1;
  height: 2rpx;
  background-color: #ccc;
  margin: 0 20rpx;
}

/* Form */
.form-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 10rpx 30rpx 30rpx;
}
.card-header {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
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
}
.info-note {
  background-color: #fef9e7;
  color: #8a6d3b;
  padding: 20rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  line-height: 1.5;
  margin-bottom: 20rpx;
}

/* Form Items */
.form-item, .form-item-column {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}
.form-item-column { flex-direction: column; align-items: flex-start; }
.item-label {
  font-size: 30rpx;
  color: #333;
  width: 220rpx;
}
.item-label.required::before { content: '*'; color: #d9534f; margin-right: 6rpx; }
.item-input { flex: 1; text-align: right; font-size: 30rpx; }
.picker-input { font-size: 30rpx; color: #333; display: flex; align-items: center; }
.arrow-icon {
  width: 16rpx;
  height: 16rpx;
  border-top: 4rpx solid #ccc;
  border-right: 4rpx solid #ccc;
  transform: rotate(45deg);
  margin-left: 10rpx;
}

.textarea-wrapper {
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-top: 20rpx;
  box-sizing: border-box;
}
.item-textarea { width: 100%; height: 180rpx; font-size: 28rpx; }
.char-counter { text-align: right; font-size: 24rpx; color: #aaa; width: 100%; display: block; }

/* Step 2: Upload */
.upload-note {
  background-color: #fef9e7;
  color: #8a6d3b;
  padding: 20rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  line-height: 1.6;
  margin-bottom: 30rpx;
}
.upload-card {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
}
.upload-item { padding-bottom: 30rpx; margin-bottom: 30rpx; border-bottom: 1rpx solid #f0f0f0; }
.upload-item:last-child { border-bottom: none; margin-bottom: 0;}
.support-text { font-size: 24rpx; color: #999; margin-left: 10rpx;}
.id-uploader { display: flex; gap: 30rpx; margin-top: 20rpx; }
.id-box {
    flex: 1;
    height: 180rpx;
    border: 2rpx dashed #ccc;
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    padding: 10rpx;
    box-sizing: border-box;
}
.placeholder-icon { width: 60rpx; height: 60rpx; }
.placeholder-icon-small { width: 40rpx; height: 40rpx; }
.placeholder-text { font-size: 20rpx; color: #aaa; text-align: center; margin-top: 10rpx; line-height: 1.3;}
.placeholder-text.small { font-size: 22rpx;}

.file-item { display: flex; justify-content: space-between; align-items: center; padding: 20rpx 0;}
.file-info { display: flex; align-items: center; }
.pdf-icon { width: 40rpx; height: 40rpx; margin-right: 15rpx; }
.upload-button { 
  background-color: #e0f2ff;
  border-radius: 50%;
  width: 60rpx; height: 60rpx;
  display: flex; align-items: center; justify-content: center;
  padding: 0; margin: 0;
}
.upload-button::after { border: none;}
.upload-icon { width: 40rpx; height: 40rpx; }


/* Buttons */
.button-wrapper { margin-top: 60rpx; }
.button-group { display: flex; gap: 30rpx; margin-top: 40rpx; }
.submit-button, .secondary-button {
  flex: 1;
  background-color: #409eff;
  color: white;
  font-size: 32rpx;
  border-radius: 50rpx;
  height: 90rpx;
  line-height: 90rpx;
}
.secondary-button {
    background-color: #fff;
    color: #409eff;
    border: 2rpx solid #409eff;
}
.submit-button::after, .secondary-button::after { border: none; }
</style>
