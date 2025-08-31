<template>
  <view class="org-item">
    <view class="icon-wrapper">
      <uni-icons type="list" size="24" color="#409eff"></uni-icons>
    </view>
    <view class="info">
      <view class="name-line">
        <text class="name">{{ organization.name }}</text>
        <text class="member-tag">{{ organization.memberCount }}人</text>
      </view>
      <text class="meta-info">电话：{{ organization.phone }}</text>
      <text class="meta-info">地址：{{ organization.address }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Organization } from '@/types/app';

interface Props {
  organization: Organization;
}
defineProps<Props>();
</script>

<style lang="scss" scoped>
.org-item {
  display: flex;
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: #eef3ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.name {
  font-size: 16px;
  color: #333;
  line-height: 1.4;
  font-weight: 500;
}

.member-tag {
  background-color: #fef0e4;
  color: #f79c5c;
  font-size: 12px;
  padding: 1px 6px;
  border-radius: 10px;
  margin-left: 8px;
  white-space: nowrap;
}

.meta-info {
  font-size: 13px;
  color: #999;
}
</style>