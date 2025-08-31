<script setup lang="ts">
import type { Case } from '../types/case' // 引入类型定义

// 使用 defineProps 定义 props 类型
interface Props {
  caseData: Case;
}
defineProps<Props>()
</script>

<template>
  <view class="case-item">
    <text class="description">
      {{ caseData.description }}
    </text>

    <view
      v-if="caseData.images && caseData.images.length > 0"
      class="image-section"
    >
      <view
        v-if="caseData.images.length === 1"
        class="single-image-container"
      >
        <image
          :src="caseData.images[0]"
          class="image single-image"
          mode="aspectFill"
        />
      </view>
      <view
        v-else
        class="multi-image-container"
      >
        <image
          v-for="(img, index) in caseData.images"
          :key="index"
          :src="img"
          class="image multi-image"
          mode="aspectFill"
        />
      </view>
    </view>

    <view class="meta-info">
      <text class="date-text">
        {{ caseData.date }}
      </text>
      <text class="tag">
        {{ caseData.tag }}
      </text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.case-item {
  padding: 15px;
  border-bottom: 8px solid #f5f5f5;
}

.description {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* 限制显示两行 */
  -webkit-box-orient: vertical;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.image-section {
  margin-top: 10px;
}

.image {
  border-radius: 6px;
  background-color: #eee;
}

.single-image-container {
  width: 100%;
  .single-image {
    width: 100%;
    height: 150px;
  }
}

.multi-image-container {
  display: flex;
  gap: 8px; /* 图片之间的间距 */
  .multi-image {
    width: calc((100% - 16px) / 3);
    height: 80px;
  }
}

.meta-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.date-text {
  font-size: 12px;
  color: #999;
}

.tag {
  background-color: #eef3ff;
  color: #409eff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>