<template>
  <view class="page-container">
    <view class="form-wrapper">
      <view class="form-item">
        <view class="item-label">
          <text class="required-star">*</text>
          <text>事件标题</text>
        </view>
        <input
          v-model="formData.title"
          class="input-field"
          placeholder="请输入事件的简要标题"
          placeholder-style="color:#C0C4CC"
        />
      </view>

      <view class="form-item">
        <view class="item-label"><text>上报时间</text></view>
        <view class="info-text">{{ formData.reportTime }}</view>
      </view>

      <view class="form-item">
        <view class="item-label"><text>上报人</text></view>
        <view class="info-text">{{ formData.reporter }}</view>
      </view>

      <view class="form-item">
        <view class="item-label">
          <text class="required-star">*</text>
          <text>上报内容</text>
        </view>
        <view class="textarea-wrapper">
          <textarea
            v-model="formData.content"
            placeholder-style="color:#C0C4CC"
            placeholder="请详细描述事件的起因、经过、现状等..."
            :maxlength="1000"
            auto-height
          />
          <view class="char-counter">{{ formData.content.length }}/1000</view>
        </view>
      </view>
      
      <view class="form-item">
        <view class="item-label"><text>处理结果</text></view>
        <view class="textarea-wrapper">
          <textarea
            v-model="formData.result"
            placeholder-style="color:#C0C4CC"
            placeholder="请输入初步处理结果或情况说明..."
            :maxlength="500"
            auto-height
          />
          <view class="char-counter">{{ formData.result.length }}/500</view>
        </view>
      </view>

      <view class="form-item">
        <view class="item-label"><text>现场照片</text></view>
        <view class="image-grid">
          <view v-for="(image, index) in imageList" :key="index" class="image-item">
            <image
              :src="image"
              class="thumbnail"
              mode="aspectFill"
              @click="handlePreviewImage(index)"
            />
            <view class="delete-icon" @click.stop="handleRemoveImage(index)"></view>
          </view>
          <view
            v-if="imageList.length < MAX_IMAGE_COUNT"
            class="upload-trigger"
            @click="handleChooseImage"
          >
            <view class="upload-icon">+</view>
            <text>添加照片</text>
          </view>
        </view>
        <view class="upload-tip">最多可上传{{ MAX_IMAGE_COUNT }}张照片</view>
      </view>
    </view>

    <view class="footer">
      <button class="submit-btn" @click="handleSubmit">立 即 上 报</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 定义表单数据接口
interface EventFormData {
  title: string;
  reportTime: string;
  reporter: string;
  content: string;
  result: string;
}

const MAX_IMAGE_COUNT = 9; // 最大上传图片数量

// 表单响应式数据
const formData: EventFormData = reactive({
  title: '',
  reportTime: '',
  reporter: '',
  content: '',
  result: '',
});

// 已上传的图片路径列表
const imageList = ref<string[]>([]);

// 页面加载时自动填充信息
onLoad(() => {
  // 模拟获取当前登录用户信息
  formData.reporter = '网格员-张三'; 
  // 格式化当前时间
  const now = new Date();
  formData.reportTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
});

/**
 * 处理选择图片
 */
const handleChooseImage = () => {
  const remainingCount = MAX_IMAGE_COUNT - imageList.value.length;
  if (remainingCount <= 0) return;

  uni.chooseImage({
    count: remainingCount,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePaths = res.tempFilePaths as string[];
      imageList.value = [...imageList.value, ...tempFilePaths];
    },
    fail: (err) => {
      console.error('选择图片失败:', err);
    }
  });
};

/**
 * 预览图片
 * @param index - 要预览的图片索引
 */
const handlePreviewImage = (index: number) => {
  uni.previewImage({
    urls: imageList.value,
    current: index,
  });
};

/**
 * 移除已选择的图片
 * @param index - 要移除的图片索引
 */
const handleRemoveImage = (index: number) => {
  imageList.value.splice(index, 1);
};


/**
 * 提交事件上报
 */
const handleSubmit = () => {
  // 1. 数据校验
  if (!formData.title.trim()) {
    return uni.showToast({ title: '请输入事件标题', icon: 'none' });
  }
  if (!formData.content.trim()) {
    return uni.showToast({ title: '请输入上报内容', icon: 'none' });
  }

  // 2. 准备提交到后台的数据
  const submissionData = {
    ...formData,
    photos: imageList.value, // 图片文件路径
  };
  
  console.log('准备上报的数据:', submissionData);
  uni.showLoading({ title: '正在上报...' });

  // 3. 模拟后台API调用
  // 在真实应用中，你需要使用 uni.uploadFile 循环上传图片，并将返回的URL与其他表单数据一同提交
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '上报成功', icon: 'success' });

    // 重置表单
    formData.title = '';
    formData.content = '';
    formData.result = '';
    imageList.value = [];
  }, 1500);
};
</script>

<style lang="scss" scoped>
.page-container {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 20rpx;
  box-sizing: border-box;
}

.form-wrapper {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 10rpx 30rpx;
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

.input-field {
  width: 100%;
  height: 80rpx;
  font-size: 28rpx;
  color: #303133;
}

.info-text {
  font-size: 30rpx;
  color: #606266;
}

.textarea-wrapper {
  background-color: #f5f7fa;
  border-radius: 8rpx;
  padding: 20rpx;
  position: relative;
  width: 100%;
  box-sizing: border-box;

  textarea {
    width: 100%;
    min-height: 160rpx;
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

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}

.image-item {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%; // 保持1:1的宽高比
  
  .thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
  }
  
  .delete-icon {
    position: absolute;
    top: -10rpx;
    right: -10rpx;
    width: 36rpx;
    height: 36rpx;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTcgN2wxMCAxMG0tMTAgMEwxNyA3IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==');
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 2;
  }
}

.upload-trigger {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  background-color: #f5f7fa;
  border: 1rpx dashed #dcdfe6;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 24rpx;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10rpx;
  }

  .upload-icon {
    font-size: 60rpx;
    color: #c0c4cc;
    line-height: 1;
  }
}
.upload-tip {
  font-size: 24rpx;
  color: #909399;
  margin-top: 16rpx;
}


.footer {
  margin-top: 40rpx;
  padding: 0 0 40rpx;
}
.submit-btn {
  background: linear-gradient(90deg, #4d80f0 0%, #3a75e9 100%);
  color: white;
  font-size: 32rpx;
  border-radius: 50rpx;
  height: 90rpx;
  line-height: 90rpx;
  box-shadow: 0 8rpx 20rpx rgba(60, 127, 238, 0.3);
  &:after {
    border: none;
  }
  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }
}
</style>