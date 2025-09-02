<template>
  <view class="page-container">
    <view class="banner-section">
      <view class="banner-content">
        <view class="main-title">问题咨询留言板</view>
        <view class="sub-title">说说在事件纠纷中遇到的问题</view>
      </view>
      <image class="banner-image" src="/static/banner-illustration.svg" mode="aspectFit"></image>
    </view>

    <view class="form-wrapper">
      <view class="form-item">
        <view class="item-label">
          <text class="required-star">*</text>
          <text>留言类型</text>
        </view>
        <view class="type-tags">
          <text
            v-for="type in messageTypes"
            :key="type"
            class="tag"
            :class="{ active: formData.type === type }"
            @click="formData.type = type"
          >
            {{ type }}
          </text>
        </view>
      </view>

      <view class="form-item">
        <view class="item-label">
           <text class="required-star">*</text>
           <text>咨询内容</text>
        </view>
        <view class="textarea-wrapper">
          <textarea
            v-model="formData.content"
            placeholder-style="color:#C0C4CC"
            placeholder="请详细描述您遇到的问题或建议..."
            :maxlength="500"
            auto-height
          />
          <view class="char-counter">{{ formData.content.length }}/500</view>
        </view>
      </view>

      <view class="form-item">
        <view class="item-label">
          <text>附件上传</text>
        </view>
        <view class="file-list">
          <view v-for="(file, index) in fileList" :key="index" class="file-item">
            <image class="file-icon" src="/static/file-icon.svg"></image>
            <text class="file-name">{{ file.name }}</text>
            <view class="delete-icon" @click="handleRemoveFile(index)"></view>
          </view>
        </view>
        <view class="upload-trigger" @click="handleChooseFile">
          <view class="upload-icon">+</view>
          <text>点击上传</text>
        </view>
        <view class="upload-tip">附件大小不能超过2M</view>
      </view>
    </view>

    <view class="footer">
       <button class="submit-btn" @click="handleSubmit">提 交</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// 定义上传文件的接口类型
interface UploadFile {
  name: string;
  size: number;
  path: string; // 本地临时路径
}

// 留言类型选项
const messageTypes = ref([
  '系统使用建议',
  '部门改进建议',
  '政府工作建议',
  '法律咨询',
  '心理咨询',
  '纠纷咨询',
]);

// 表单响应式数据
const formData = reactive({
  type: '法律咨询', // 默认选中项
  content: '',
});

// 已上传的文件列表
const fileList = ref<UploadFile[]>([]);
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

/**
 * 处理文件选择
 */
const handleChooseFile = () => {
  uni.chooseFile({
    count: 1, // 当前仅支持单文件上传，可修改为多文件
    success: (res) => {
      // res.tempFiles 是一个文件对象数组
      const file = (res.tempFiles as UniApp.ChooseFileSuccessCallbackResultFile[])[0];
      
      // 校验文件大小
      if (file.size > MAX_FILE_SIZE) {
        uni.showToast({
          title: '文件大小不能超过2M',
          icon: 'none',
        });
        return;
      }
      
      fileList.value.push({
        name: file.name,
        size: file.size,
        path: file.path,
      });
    },
    fail: (err) => {
      console.error('选择文件失败:', err);
    },
  });
};

/**
 * 移出已选择的文件
 * @param index - 要移除文件的索引
 */
const handleRemoveFile = (index: number) => {
  fileList.value.splice(index, 1);
};


/**
 * 处理表单提交
 */
const handleSubmit = () => {
  // 1. 数据校验
  if (!formData.type) {
    uni.showToast({ title: '请选择留言类型', icon: 'none' });
    return;
  }
  if (!formData.content.trim()) {
    uni.showToast({ title: '请输入咨询内容', icon: 'none' });
    return;
  }

  // 2. 准备提交到后台的数据
  const submissionData = {
    messageType: formData.type,
    messageContent: formData.content,
    submissionTime: new Date().toISOString(), // ISO 8601 格式时间戳
    attachments: fileList.value, // 文件列表
  };

  console.log('准备提交的数据:', submissionData);
  uni.showLoading({ title: '正在提交...' });

  // 3. 模拟后台API调用
  // 在实际应用中，您需要使用 uni.uploadFile 将文件和表单数据一起上传
  // 这里用 setTimeout 模拟网络请求
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '提交成功',
      icon: 'success',
    });
    
    // 提交成功后清空表单
    formData.type = '法律咨询';
    formData.content = '';
    fileList.value = [];

    // 可选：延迟1.5秒后返回上一页
    // setTimeout(() => uni.navigateBack(), 1500);

  }, 1500);
};
</script>

<style lang="scss" scoped>
.page-container {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 180rpx;
}

// 顶部区域
.banner-section {
  position: relative;
  height: 280rpx;
  background: linear-gradient(180deg, #4d80f0 0%, #3a75e9 100%);
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .main-title {
    font-size: 44rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
  }
  .sub-title {
    font-size: 28rpx;
    opacity: 0.9;
  }
  .banner-image {
    width: 200rpx;
    height: 200rpx;
    opacity: 0.8;
  }
}

// 表单区域
.form-wrapper {
  background-color: #ffffff;
  border-radius: 16rpx;
  margin: -60rpx 30rpx 0;
  padding: 20rpx 30rpx;
  position: relative;
  z-index: 10;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.form-item {
  padding: 30rpx 0;
  border-bottom: 1rpx solid #ebeef5;
  &:last-child {
    border-bottom: none;
  }
}

.item-label {
  font-size: 30rpx;
  color: #303133;
  margin-bottom: 20rpx;
  display: block;
  font-weight: 500;
  .required-star {
    color: #f56c6c;
    margin-right: 8rpx;
  }
}

// 类型标签
.type-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  .tag {
    background-color: #f4f4f5;
    color: #606266;
    padding: 12rpx 28rpx;
    border-radius: 30rpx;
    font-size: 26rpx;
    transition: all 0.3s;
    &.active {
      background-color: #e9f2ff;
      color: #3c7fee;
      font-weight: bold;
    }
  }
}

// 文本输入框
.textarea-wrapper {
  background-color: #f5f7fa;
  border-radius: 8rpx;
  padding: 20rpx;
  position: relative;
  textarea {
    width: 100%;
    height: 200rpx;
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


// 附件上传
.upload-trigger {
  width: 160rpx;
  height: 160rpx;
  background-color: #f5f7fa;
  border: 1rpx dashed #dcdfe6;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 24rpx;
  .upload-icon {
    font-size: 60rpx;
    color: #c0c4cc;
    line-height: 1;
    margin-bottom: 10rpx;
  }
}
.upload-tip {
  font-size: 24rpx;
  color: #909399;
  margin-top: 16rpx;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 20rpx;
}
.file-item {
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  padding: 16rpx;
  border-radius: 8rpx;
  font-size: 26rpx;
  color: #606266;

  .file-icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 16rpx;
  }
  .file-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .delete-icon {
    width: 32rpx;
    height: 32rpx;
    margin-left: 16rpx;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGZpbGw9IiM5MDkzOTkiIGQ9Ik01MTIgMEMyMjkuMiAwIDAgMjI5LjIgMCA1MTJzMjI5LjIgNTEyIDUxMiA1MTJzNTEyLTIyOS4yIDUxMi01MTJTjc5NC44IDAgNTEyIDB6bTAgOTQ3LjJjLTI0MC40IDAtNDM1LjItMTk0LjgtNDM1LjItNDM1LjJTMjcxLjYgNzYuOCA1MTIgNzYuOHM0MzUuMiAxOTQuOCA0MzUuMiA0MzUuMlM3NTIuNCA5NDcuMiA1MTIgOTQ3LjJ6Ii8+PHBhdGggZmlsbD0iIzkwOTM5OSIgZD0iTTcwNC4xIDMyMy45TDY5MCAzMTBsLTE3OCAxNzguMS0xNzgtMTc4LjEtMTQuMSAxMy45IDE3OC4xIDE3OC4xLTE3OC4xIDE3OCAxNC4xIDE0LjEgMTc4LTE3OC4xIDE3OCAxNzguMSAxNC4xLTE0LjEtMTc4LjEtMTc4LjF6Ii8+PC9zdmc+');
    background-size: contain;
    cursor: pointer;
  }
}

// 底部提交按钮
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
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