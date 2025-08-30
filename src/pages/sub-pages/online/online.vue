<template>
  <view class="container">
    <!-- 主体内容区域 -->
    <view class="content">
      <!-- 顶部须知卡片 -->
      <view class="notice-card">
        <image class="card-bg" src="https://placehold.co/702x240/e6f7ff/3c9cff?text=Banner" mode="widthFix"></image>
        <view class="card-header">
          <view class="title">在线调解须知</view>
          <view class="subtitle">事实清楚、法律依据充分的信访诉求</view>
        </view>
      </view>

      <!-- 须知详情区域 -->
      <view class="notice-detail">
        <view class="section">
          <view class="section-title">现在宣读在线调解纪律：</view>
          <view class="section-content">
            <text>
              在线调解活动中申请人、被申请人应保持网络畅通，服从调解员的指挥，遵守在线调解纪律，发言或提问应当经调解员许可，并不得实施下列行为：
            </text>
            <view class="rule-item">(一) 擅自断电、断网、未经调解员允许退出或关闭在线调解系统；</view>
            <view class="rule-item">(二) 脱离摄像头画面采集范围；</view>
            <view class="rule-item">(三) 鼓掌、喧哗、吸烟、进食、拨打或接听电话等扰乱调解秩序的行为；</view>
            <view class="rule-item">(四) 对庭审活动进行录音、录像、拍照或使用移动通信工具等传播调解活动；</view>
            <view class="rule-item">(五) 组织其他未经实名认证的人员观看调解活动；</view>
            <view class="rule-item">(六) 其他破坏调解秩序的行为。对出现上述行为的人员，调解员应当予以警告，对不听警告的人员可以进行训诫；对训诫无效的，调解员可以强制当事人退出在线调解活动，对申请人按照撤回在线调解申请处理，对被申请人按照缺席调解处理。</view>
          </view>
        </view>

        <view class="section">
          <view class="section-title special-title">特别告知：</view>
          <view class="section-content">
            <view class="rule-item">(一) 网上庭审需保持网络畅通，除了查明属技术、网络故障等原因导致调解无法正常进行外，若庭审中申请人擅自退出的，可按撤回调解申请处理；被申请人擅自退出的，可按照缺席调解处理。</view>
            <view class="rule-item">(二) 在线调解全程录音录像，调解参与人或其他人人员违反调解纪律，破坏调解秩序、妨碍或庭审活动顺利进行的，调解录音录像可以作为追究其法律责任的证据。</view>
          </view>
        </view>

        <!-- 同意条款 -->
        <view class="agreement-section">
            <checkbox-group @change="onAgreementChange">
                <label class="agreement-label">
                    <checkbox :value="true" :checked="isAgreed" color="#3c9cff" style="transform:scale(0.8)"/>
                    <text>本人已详细阅读上述须知，并同意遵守上述要求</text>
                </label>
            </checkbox-group>
        </view>
      </view>

      <!-- 底部操作区域 -->
      <view class="action-section">
        <uni-forms-item label="调解码" name="mediationCode" required>
            <uni-easyinput
              type="text"
              v-model="mediationCode"
              placeholder="请输入调解码"
              :inputBorder="false"
              placeholder-style="text-align: right;"
              :styles="{textAlign: 'right'}"
            ></uni-easyinput>
        </uni-forms-item>

        <button class="submit-btn" :disabled="!isAgreed" @click="enterMediation">进入调解</button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 是否同意须知的状态
const isAgreed = ref<boolean>(false);

// 调解码
const mediationCode = ref<string>('');

// 返回按钮事件
const handleLeftClick = () => {
  uni.navigateBack();
};

// 同意协议的复选框状态改变事件
const onAgreementChange = (e: any) => {
    isAgreed.value = e.detail.value.length > 0;
};

// 进入调解按钮点击事件
const enterMediation = () => {
    if (!isAgreed.value) {
        uni.showToast({
            title: '请先阅读并同意须知',
            icon: 'none'
        });
        return;
    }

    if (!mediationCode.value.trim()) {
        uni.showToast({
            title: '请输入调解码',
            icon: 'none'
        });
        return;
    }

    // 在这里处理进入调解的逻辑
    console.log('调解码:', mediationCode.value);
    uni.showToast({
        title: '正在进入调解室...',
        icon: 'loading'
    });
    // uni.navigateTo({ url: '/pages/mediation-room/mediation-room' });
};
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 24rpx;
}

// 顶部须知卡片
.notice-card {
  position: relative;
  height: 240rpx;
  border-radius: 16rpx;
  overflow: hidden;
  color: #ffffff;
  margin-bottom: 24rpx;

  .card-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .card-header {
    position: relative;
    z-index: 2;
    padding: 30rpx;
    .title {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    .subtitle {
      font-size: 26rpx;
      opacity: 0.9;
    }
  }
}

// 须知详情
.notice-detail {
  background-color: #ffffff;
  padding: 30rpx;
  border-radius: 16rpx;
  margin-bottom: 24rpx;

  .section {
    margin-bottom: 30rpx;
  }

  .section-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #303133;
    margin-bottom: 20rpx;
    &.special-title {
        color: #ff9900;
    }
  }

  .section-content {
    font-size: 28rpx;
    color: #606266;
    line-height: 1.8;
  }

  .rule-item {
    margin-top: 10rpx;
  }
}

// 同意条款
.agreement-section {
    margin-top: 40rpx;
    padding-bottom: 20rpx;
    border-bottom: 1px solid #f0f0f0;
}

.agreement-label {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #606266;
}

// 底部操作区域
.action-section {
    background-color: #ffffff;
    padding: 20rpx 30rpx;
    border-radius: 16rpx;

    .submit-btn {
        width: 100%;
        background-color: #3c9cff;
        color: #ffffff;
        font-size: 32rpx;
        border-radius: 50rpx;
        margin-top: 30rpx;

        &[disabled] {
            background-color: #a0cfff;
            color: #ffffff;
        }

        &:after {
            border: none;
        }
    }
}

// 覆盖 uni-ui 表单项样式
::v-deep .uni-forms-item {
    display: flex;
    align-items: center;
    margin-bottom: 0;
}

::v-deep .uni-forms-item__label {
    width: 85px !important;
    color: #303133;
    font-size: 28rpx;
    white-space: nowrap;
}

::v-deep .uni-easyinput__content {
    text-align: right;
}
</style>