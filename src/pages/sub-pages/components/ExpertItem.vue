<template>
  <view class="expert-item">
    <image class="avatar" :src="expert.avatar" mode="aspectFill" />
    <view class="info">
      <text class="name">{{ expert.name }}</text>
      <view class="specialty-box">
        <text class="specialty-label">擅长：</text>
        <text class="specialty-text">{{ expert.specialty }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Expert } from '../types/organization';

interface Props {
  expert: Expert;
}
defineProps<Props>();
</script>

<style lang="scss" scoped>
.expert-item {
  display: flex;
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 1px solid #f5f5f5;
  
  &:last-child {
      border-bottom: none;
  }
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}

.specialty-box {
  display: flex;
}

.specialty-label {
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
}

.specialty-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>