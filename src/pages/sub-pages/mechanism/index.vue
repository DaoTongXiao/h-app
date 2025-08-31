<script setup lang="ts">
import { ref } from 'vue'
import ExpertItem from '../components/ExpertItem.vue'
import type { OrganizationDetails, Expert } from '@/types/app'

// 模拟机构详情数据
const orgDetails = ref<OrganizationDetails>({
  name: '新疆生产建设兵团第五师中心团场八十三团一连人民调解委员会',
  memberCount: 5,
  address: '新疆博乐第五师中心团场八十三团九连',
  personInCharge: '李锡江',
  phone: '13779015989',
  establishmentDate: '1986-01-01',
  description: '值班法律服务人员应就群众提出的法律难题加以解决'
})

// 模拟专家列表数据
const expertList = ref<Expert[]>([
  {
    id: 1,
    name: '席婉红',
    avatar: '/static/avatar-male-1.png',
    specialty: '继承纠纷、生产经营、纠纷赔偿纠纷 纠纷赔偿纠纷等'
  },
  {
    id: 2,
    name: '席婉红',
    avatar: '/static/avatar-male-2.png',
    specialty: '继承纠纷、生产经营、纠纷赔偿纠纷 纠纷赔偿纠纷等'
  },
  {
    id: 3,
    name: '席婉红',
    avatar: '/static/avatar-female-1.png',
    specialty: '继承纠纷、生产经营、纠纷赔偿纠纷 纠纷赔偿纠纷等'
  }
])

// 拨打电话方法
const callPhone = (phoneNumber: string) => {
  uni.makePhoneCall({
    phoneNumber: phoneNumber,
    fail: (err) => {
      console.error('API 调用失败', err)
      uni.showToast({
        title: '拨号功能不可用',
        icon: 'none'
      })
    }
  })
}
</script>

<template>
  <view class="page-container">
    <view class="header-section">
      <view class="header-icon-wrapper">
        <uni-icons
          type="list"
          size="30"
          color="#409eff"
        />
      </view>
      <view class="header-info">
        <text class="org-name">
          {{ orgDetails.name }}
        </text>
        <text class="member-tag">
          {{ orgDetails.memberCount }}人
        </text>
      </view>
    </view>

    <view class="info-card">
      <view class="card-title">
        机构信息
      </view>
      <view class="info-list">
        <view class="info-row">
          <text class="info-label">
            联系地址
          </text>
          <text class="info-value link">
            {{ orgDetails.address }}
          </text>
        </view>
        <view class="info-row">
          <text class="info-label">
            负责人
          </text>
          <text class="info-value">
            {{ orgDetails.personInCharge }}
          </text>
        </view>
        <view
          class="info-row"
          @tap="callPhone(orgDetails.phone)"
        >
          <text class="info-label">
            联系电话
          </text>
          <view class="phone-value">
            <text class="info-value link">
              {{ orgDetails.phone }}
            </text>
            <uni-icons
              type="phone-filled"
              size="18"
              color="#409eff"
            />
          </view>
        </view>
        <view class="info-row">
          <text class="info-label">
            成立日期
          </text>
          <text class="info-value">
            {{ orgDetails.establishmentDate }}
          </text>
        </view>
        <view class="info-row">
          <text class="info-label">
            机构简介
          </text>
          <text class="info-value">
            {{ orgDetails.description }}
          </text>
        </view>
      </view>
    </view>

    <view class="info-card">
      <view class="card-title">
        调解专家
      </view>
      <ExpertItem
        v-for="expert in expertList"
        :key="expert.id"
        :expert="expert"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 自定义导航栏样式 (可复用) */
.custom-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 44px 15px 10px 10px; // 适配状态栏高度
  background-color: #fff;
  .navbar-left {
    display: flex;
    align-items: center;
  }
  .navbar-title {
    font-size: 18px;
    font-weight: bold;
    margin-left: 10px;
  }
  .navbar-right {
    display: flex;
    align-items: center;
    .icon-more {
      margin-right: 15px;
    }
  }
}

.header-section {
  display: flex;
  align-items: flex-start;
  padding: 20px 15px;
  background-color: #fff;
}

.header-icon-wrapper {
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

.header-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.org-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
}

.member-tag {
  background-color: #fef0e4;
  color: #f79c5c;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
  white-space: nowrap;
}

.info-card {
  background-color: #fff;
  margin: 12px 15px;
  padding: 15px;
  border-radius: 8px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  padding-left: 10px;
  border-left: 4px solid #409eff;
  margin-bottom: 15px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
}

.info-label {
  color: #999;
  flex-shrink: 0;
  margin-right: 20px;
}

.info-value {
  color: #333;
  text-align: right;
  &.link {
    color: #409eff;
  }
}

.phone-value {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
