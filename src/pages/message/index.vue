<script setup lang="ts">
// --- script 部分与上一版相同，逻辑非常完善，无需改动 ---
import { ref, computed, onMounted } from 'vue'

interface MessageItem { id: string; title: string; content: string; time: string; isRead: boolean; type: 'event' | 'system' | 'notice'; }
interface MessageCategory { id: 'event' | 'system' | 'notice'; title: string; icon: string; count: number; }

const activeTab = ref<'event' | 'system' | 'notice'>('event')

const messageList = ref<MessageItem[]>([
  ...Array.from({ length: 12 }, (_, i) => ({ id: `evt-${i + 1}`, title: '您有一件正在办理中的事件...', content: '调解员正在处理该事件，已出具事件调处协...', time: '2024-07-10', isRead: false, type: 'event' as const })),
  { id: 'sys-1', title: '系统维护通知', content: '为了提供更好的服务，系统将于今晚23:00进行升级。', time: '2024-07-09', isRead: true, type: 'system' },
  { id: 'ntc-1', title: '在线确认通知示例', content: '您有一份新的文件需要在线确认，请及时处理。', time: '2024-07-08', isRead: true, type: 'notice' }
])

const messageCategories = ref<MessageCategory[]>([
  { id: 'event', title: '事件消息', icon: 'list', count: 0 },
  { id: 'system', title: '系统消息', icon: 'gear-filled', count: 0 },
  { id: 'notice', title: '在线确认通知', icon: 'chat-filled', count: 0 }
])

const activeCategoryTitle = computed(() => messageCategories.value.find(c => c.id === activeTab.value)?.title || '消息列表')
const unreadCount = computed(() => filteredMessages.value.filter(msg => !msg.isRead).length)
const filteredMessages = computed(() => messageList.value.filter(msg => msg.type === activeTab.value).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime() || (a.isRead ? 1 : -1)))

const updateCategoryCounts = () => {
  messageCategories.value.forEach(category => {
    category.count = messageList.value.filter(msg => msg.type === category.id && !msg.isRead).length
  })
}

const handleCategoryClick = (categoryId: 'event' | 'system' | 'notice') => { activeTab.value = categoryId }

const handleMessageClick = (message: MessageItem) => {
  if (!message.isRead) {
    const targetMessage = messageList.value.find(m => m.id === message.id)
    if (targetMessage) {
      targetMessage.isRead = true
      updateCategoryCounts()
    }
  }
  // uni.showToast({ title: `查看消息: ${message.title}`, icon: 'none' })
  uni.navigateTo({
    url: '/pages/sub-pages/order/detail'
  })
}

const markAllAsRead = () => {
  filteredMessages.value.forEach(msg => { if (!msg.isRead) { msg.isRead = true } })
  updateCategoryCounts()
  uni.showToast({ title: '已全部设为已读', icon: 'success' })
}

onMounted(() => { updateCategoryCounts() })
</script>

<template>
  <view class="message-page">
    <scroll-view
      scroll-y
      class="scroll-container"
    >
      <view class="nav-bar-placeholder" />

      <view class="content-wrapper">
        <view class="category-section">
          <view
            v-for="category in messageCategories"
            :key="category.id"
            class="category-item"
            :class="{ active: activeTab === category.id }"
            @tap="handleCategoryClick(category.id)"
          >
            <view class="category-icon-wrapper">
              <uni-icons 
                :type="category.icon" 
                size="26" 
                :color="activeTab === category.id ? '#007AFF' : '#666'"
              />
              <view
                v-if="category.count > 0"
                class="badge"
              >
                <text class="badge-text">
                  {{ category.count > 99 ? '99+' : category.count }}
                </text>
              </view>
            </view>
            <text class="category-title">
              {{ category.title }}
            </text>
          </view>
        </view>

        <view class="list-container">
          <view class="list-header">
            <text class="list-title">
              {{ activeCategoryTitle }}
            </text>
            <view
              v-if="unreadCount > 0"
              class="read-all-btn"
              @tap="markAllAsRead"
            >
              <text class="read-all-text">
                全部已读
              </text>
            </view>
          </view>

          <view class="message-list">
            <template v-if="filteredMessages.length > 0">
              <view
                v-for="message in filteredMessages"
                :key="message.id"
                class="message-item"
                :class="{ 'unread': !message.isRead }"
                @tap="handleMessageClick(message)"
              >
                <view class="message-icon">
                  <view class="icon-wrapper">
                    <uni-icons
                      type="notification-filled"
                      size="22"
                      color="#007AFF"
                    />
                  </view>
                </view>
                
                <view class="message-content">
                  <text class="message-title">
                    {{ message.title }}
                  </text>
                  <text class="message-desc">
                    {{ message.content }}
                  </text>
                </view>
                
                <view class="message-meta">
                  <text class="message-time">
                    {{ message.time }}
                  </text>
                  <view
                    v-if="!message.isRead"
                    class="unread-dot"
                  />
                </view>
              </view>
            </template>
            
            <view
              v-else
              class="empty-state"
            >
              <image
                class="empty-icon"
                src="/static/empty-box.svg"
                mode="aspectFit"
              />
              <text class="empty-text">
                暂无此类消息
              </text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
// 页面整体背景，保持顶部有渐变色
.message-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #e6f0ff 0%, #f5f8fa 40%);
  display: flex;
  flex-direction: column;
}

.scroll-container {
  flex: 1;
  box-sizing: border-box;
}

.nav-bar-placeholder {
  height: var(--status-bar-height);
  // 如果您使用自定义导航栏，这里可能需要额外的高度
}

// 关键改动：全宽内容背景
.content-wrapper {
  flex: 1; // 让白色背景充满剩余空间
  background-color: #fff;
  margin-top: 20rpx;
  // 关键改动：只设置顶部圆角，实现铺满效果
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  // 关键改动：为内部所有元素提供统一的左右和底部边距
  padding: 0 32rpx;
  padding-bottom: 40rpx; // 实现列表和Tab栏的间隔
}

// 消息分类区域
.category-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 40rpx 0;
  
  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    transition: opacity 0.2s ease;
    
    &:active { opacity: 0.7; }
    
    .category-icon-wrapper {
      position: relative;
      margin-bottom: 16rpx;
      
      .badge {
        position: absolute;
        top: -8rpx;
        right: -18rpx;
        min-width: 36rpx;
        height: 36rpx;
        padding: 0 8rpx;
        background-color: #ff3b30;
        border-radius: 18rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2rpx solid white;
        box-shadow: 0 4rpx 10rpx rgba(255, 59, 48, 0.3);
        
        .badge-text { color: white; font-size: 22rpx; font-weight: bold; line-height: 1; }
      }
    }
    
    .category-title { font-size: 26rpx; color: #666; font-weight: 500; transition: color 0.2s ease; }
    &.active { .category-title { color: #007AFF; font-weight: 600; } }
  }
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
  // 为列表标题和分类区创造间隔
  padding-top: 16rpx;
  
  .list-title { font-size: 34rpx; font-weight: bold; color: #333; }
  
  // 关键改动：调整为文字按钮样式
  .read-all-btn {
    padding: 8rpx; // 增加点击区域
    &:active { opacity: 0.7; }
    .read-all-text { color: #007AFF; font-size: 28rpx; font-weight: 500; }
  }
}

// 消息列表项
.message-list {
  .message-item {
    background-color: #fff; // 白底
    border-radius: 20rpx;
    padding: 24rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: flex-start;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    // 关键改动：使用更柔和的阴影
    box-shadow: 0 8rpx 30rpx rgba(100, 100, 150, 0.08);

    &:last-child { margin-bottom: 0; }
    &:active { transform: scale(0.98); box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08); }
    
    .message-icon {
      margin-right: 24rpx;
      flex-shrink: 0;
      .icon-wrapper { width: 80rpx; height: 80rpx; background-color: #e5f2ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    }
    
    .message-content {
      flex: 1; min-width: 0; padding-right: 24rpx;
      .message-title { font-size: 30rpx; color: #333; font-weight: 500; line-height: 1.4; margin-bottom: 8rpx; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .message-desc { font-size: 26rpx; color: #888; line-height: 1.5; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden; }
    }
    
    .message-meta {
      display: flex; flex-direction: column; align-items: flex-end; flex-shrink: 0;
      .message-time { font-size: 24rpx; color: #999; white-space: nowrap; margin-bottom: 12rpx; }
      .unread-dot { width: 16rpx; height: 16rpx; background-color: #ff3b30; border-radius: 50%; }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
  
  .empty-icon { width: 180rpx; height: 180rpx; margin-bottom: 24rpx; opacity: 0.7; }
  .empty-text { font-size: 28rpx; color: #999; }
}
</style>