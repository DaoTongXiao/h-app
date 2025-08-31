<script setup lang="ts">
import { ref } from 'vue'
import OrganizationItem from '../components/OrganizationItem.vue'
import ExpertItem from '../components/ExpertItem.vue'
import type { Organization, Expert } from '@/types/app'

// --- 数据区 ---
const activeTab = ref(0)

// 模拟机构数据
const organizationList = ref<Organization[]>([
  { id: 1, name: '新疆生产建设兵团第五师中心团场八十三团一连人民调解委员会', phone: '13000000000', memberCount: 4, address: '新疆博乐第五师八十三团中心团场一连' },
  { id: 2, name: '新疆生产建设兵团第五师八十一团七连调委会', phone: '13000000000', memberCount: 4, address: '新疆博乐第五师八十三团中心团场一连' },
  { id: 3, name: '第五师八十一团劳动争议人民调解委员会', phone: '13000000000', memberCount: 4, address: '新疆博乐第五师八十三团中心团场一连' },
  { id: 4, name: '新疆生产建设兵团第五师中心团场八十三团九连人民调解委员会', phone: '13000000000', memberCount: 4, address: '新疆博乐第五师八十三团中心团场一连' }
])

// 模拟专家数据 (需要处理成 uni-indexed-list 的格式)
const expertList: Expert[] = [
  { id: 101, name: '韦佳玉', avatar: '/static/avatar-male-1.png', casesMediated: 123, organization: '新疆生产建设兵团第五师中心团...', specialty: '继承纠纷、生产经营、纠纷赔偿纠...' },
  { id: 102, name: '马永盛', avatar: '/static/avatar-male-2.png', casesMediated: 123, organization: '新疆生产建设兵团第五师中心团...', specialty: '继承纠纷、生产经营、纠纷赔偿纠...' },
  { id: 103, name: '席婉红', avatar: '/static/avatar-female-1.png', casesMediated: 123, organization: '新疆生产建设兵团第五师中心团...', specialty: '继承纠纷、生产经营、纠纷赔偿纠...' },
  { id: 104, name: '张嘉伟', avatar: '/static/avatar-male-1.png', casesMediated: 123, organization: '新疆生产建设兵团第五师中心团...', specialty: '继承纠纷、生产经营、纠纷赔偿纠...' }
]


// --- 方法区 ---
const switchTab = (index: number) => {
  activeTab.value = index
}
</script>

<template>
  <view class="page-container">
    <view class="tabs">
      <view
        class="tab-item"
        :class="{ active: activeTab === 0 }"
        @click="switchTab(0)"
      >
        调解机构
      </view>
      <view
        class="tab-item"
        :class="{ active: activeTab === 1 }"
        @click="switchTab(1)"
      >
        调解专家
      </view>
    </view>

    <view class="search-section">
      <uni-search-bar
        class="search-bar"
        placeholder="请输入关键词进行搜索"
        bg-color="#F5F5F5"
        :radius="100"
        cancel-button="none"
      />
      <uni-icons
        type="settings"
        size="22"
        color="#666"
      />
    </view>

    <view class="content-area">
      <scroll-view
        v-show="activeTab === 0"
        scroll-y
        class="list-scroll"
      >
        <OrganizationItem
          v-for="org in organizationList"
          :key="org.id"
          :organization="org"
        />
      </scroll-view>

      <view
        v-show="activeTab === 1"
        class="indexed-list-wrapper"
      >
        <ExpertItem
          v-for="expert in expertList"
          :key="expert.id"
          :expert="expert"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// --- 整体布局 ---
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}
.content-area {
  flex: 1;
  overflow: hidden;
  background-color: #fff;
}
.list-scroll, .indexed-list-wrapper {
  height: 100%;
}

// --- 导航栏和搜索栏 ---
.custom-navbar { /* ... 样式与之前页面相同，此处省略 ... */ }
.tabs {
  display: flex;
  background-color: #fff;
  padding: 0 15px;
  gap: 30px;
}
.tab-item {
  padding: 10px 5px;
  font-size: 16px;
  color: #666;
  position: relative;
  &.active {
    color: #409eff;
    font-weight: bold;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 3px;
      background-color: #409eff;
      border-radius: 2px;
    }
  }
}
.search-section {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px 15px;
  .search-bar {
    flex: 1;
  }
}

// --- 自定义索引列表项样式 ---
.expert-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 12px;
    flex-shrink: 0;
  }
  .expert-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow: hidden;
  }
  .name-line {
    display: flex;
    align-items: center;
    .name {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
    .case-tag {
      background-color: #eef3ff;
      color: #409eff;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 12px;
      margin-left: 8px;
    }
  }
  .meta-info {
    font-size: 13px;
    color: #999;
  }
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>