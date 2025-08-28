<template>
  <view class="container">
    <view class="content">
      <view class="hint-bar">
        <text>提示信息：填写表单时请注意纠纷诉求、信息的真实性</text>
      </view>

      <view class="form-wrapper">
        <uni-forms :modelValue="form" ref="formRef" label-width="85">
          <view class="section-block">
            <view class="form-section">
              <view class="section-title-bar"></view>
              <text class="section-title">申请人信息</text>
            </view>
            <uni-forms-item label="姓名" name="applicant.name" required>
              <uni-easyinput type="text" v-model="form.applicant.name" placeholder="请输入姓名" :inputBorder="false" placeholder-style="text-align: right;" :styles="{textAlign: 'right'}"></uni-easyinput>
            </uni-forms-item>
            <uni-forms-item label="手机号码" name="applicant.phone" required>
              <uni-easyinput type="number" v-model="form.applicant.phone" placeholder="请输入联系电话" :inputBorder="false" placeholder-style="text-align: right;" :styles="{textAlign: 'right'}"></uni-easyinput>
            </uni-forms-item>
            <uni-forms-item label="家庭住址" name="applicant.address" required>
              <view class="picker-container" @click="openAddressPicker('applicant')">
                <text :class="{'placeholder': !form.applicant.address}">{{ form.applicant.address || '请选择' }}</text>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
              </view>
            </uni-forms-item>
          </view>

          <view class="section-block">
            <view class="form-section">
              <view class="section-title-bar"></view>
              <text class="section-title">被申请人信息</text>
            </view>
            <uni-forms-item label="类型" name="respondent.type" required>
              <view class="radio-group-wrapper">
                <uni-data-checkbox v-model="form.respondent.type" :localdata="respondentTypes"></uni-data-checkbox>
              </view>
            </uni-forms-item>
            <uni-forms-item label="姓名" name="respondent.name" required>
              <uni-easyinput type="text" v-model="form.respondent.name" placeholder="请输入姓名" :inputBorder="false" placeholder-style="text-align: right;" :styles="{textAlign: 'right'}"></uni-easyinput>
            </uni-forms-item>
            <uni-forms-item label="手机号码" name="respondent.phone">
              <uni-easyinput type="number" v-model="form.respondent.phone" placeholder="请输入联系电话" :inputBorder="false" placeholder-style="text-align: right;" :styles="{textAlign: 'right'}"></uni-easyinput>
            </uni-forms-item>
            <uni-forms-item label="住址" name="respondent.address">
              <view class="picker-container" @click="openAddressPicker('respondent')">
                <text :class="{'placeholder': !form.respondent.address}">{{ form.respondent.address || '请选择住址' }}</text>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
              </view>
            </uni-forms-item>
          </view>

          <view class="section-block">
            <view class="form-section">
              <view class="section-title-bar"></view>
              <text class="section-title">事项信息</text>
            </view>
            <uni-forms-item label="纠纷日期" name="caseInfo.date" required>
              <view class="picker-container" @click="openDatePicker">
                <text :class="{'placeholder': !form.caseInfo.date}">{{ form.caseInfo.date || '请选择日期' }}</text>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
              </view>
            </uni-forms-item>
            <uni-forms-item label="纠纷属地" name="caseInfo.location" required>
              <view class="picker-container" @click="openLocationPicker">
                <text :class="{'placeholder': !form.caseInfo.location}">{{ form.caseInfo.location || '请选择' }}</text>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
              </view>
            </uni-forms-item>
            <uni-forms-item label="概况信息" name="caseInfo.summary" required label-position="top">
              <uni-easyinput
                type="textarea"
                v-model="form.caseInfo.summary"
                placeholder="请输入概况信息"
                :maxlength="50"
                :showWordLimit="true"
                :autoHeight="true"
              ></uni-easyinput>
            </uni-forms-item>
            <uni-forms-item label="附件" name="caseInfo.attachments" required>
              <view class="upload-wrapper">
                <view class="upload-btn" @click="handleUpload">
                  <text>上传附件</text>
                </view>
              </view>
            </uni-forms-item>
          </view>
        </uni-forms>
      </view>
    </view>

    <view class="submit-button-container">
      <button class="submit-btn" @click="submit">提 交</button>
    </view>

    <uni-datetime-picker
      ref="datePickerRef"
      type="date"
	  v-show="showDatePicker"
      :value="currentDate"
      @confirm="onDateConfirm"
	  @change="onDataChange"
	  @maskClick="onDateColse"
    />
    <uni-data-picker
      ref="addressPickerRef"
      popup-title="请选择地址"
      :localdata="addressData"
      @change="onAddressConfirm"
    ></uni-data-picker>
    <uni-data-picker
      ref="locationPickerRef"
      popup-title="请选择属地"
      :localdata="locationData"
      @change="onLocationConfirm"
    ></uni-data-picker>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 表单数据
const form = reactive({
  applicant: {
    name: '',
    phone: '',
    address: '',
  },
  respondent: {
    type: 0,
    name: '',
    phone: '',
    address: '',
  },
  caseInfo: {
    date: '',
    location: '',
    summary: '',
    attachments: [],
  },
});

// 被申请人类型
const respondentTypes = ref([
  { text: '自然人', value: 0 },
  { text: '法人', value: 1 }
]);

// 日期选择器状态变量
const datePickerRef = ref();
const currentDate = ref('');
const showDatePicker = ref(false);

const openDatePicker = () => {
  currentDate.value = form.caseInfo.date || new Date().toISOString().slice(0, 10);
  datePickerRef.value?.show();
  showDatePicker.value =true
  
}
const onDateConfirm = (e: string) => {
  form.caseInfo.date = e;
  showDatePicker.value = false
};
const onDataChange =() => {
	showDatePicker.value = false
}

// 地址/属地选择器
const addressPickerRef = ref();
const locationPickerRef = ref();
const currentPickerTarget = ref<'applicant' | 'respondent' | null>(null);

const addressData = ref([
  { text: '中国', value: '1', children: [
    { text: '浙江省', value: '1-1', children: [
      { text: '杭州市', value: '1-1-1' },
      { text: '宁波市', value: '1-1-2' },
    ]},
    { text: '江苏省', value: '1-2', children: [
      { text: '南京市', value: '1-2-1' },
    ]}
  ]}
]);
const locationData = ref(addressData.value);
const onDateColse = () => {
	showDatePicker.value = false
}
const openAddressPicker = (target: 'applicant' | 'respondent') => {
  currentPickerTarget.value = target;
  addressPickerRef.value.show();
}
const onAddressConfirm = (e: any) => {
  const address = e.detail.value.map((item: any) => item.text).join(' ');
  if (currentPickerTarget.value === 'applicant') {
    form.applicant.address = address;
  } else if (currentPickerTarget.value === 'respondent') {
    form.respondent.address = address;
  }
};

const openLocationPicker = () => {
  locationPickerRef.value.show();
}
const onLocationConfirm = (e: any) => {
  form.caseInfo.location = e.detail.value.map((item: any) => item.text).join(' ');
};

// 上传附件
const handleUpload = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log('选择的图片:', res.tempFilePaths);
      uni.showToast({
        title: '上传成功',
        icon: 'success'
      })
    }
  })
}

// 提交表单
const submit = () => {
  console.log('表单数据:', form);
  uni.showToast({
    title: '提交成功',
    icon: 'success'
  });
};

onMounted(() => {
  // 页面加载时的初始化逻辑可以在这里添加
});

onLoad(() => {
  // 可以在这里初始化数据
});
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 24rpx;
  padding-bottom: 180rpx;
}

.hint-bar {
  padding: 20rpx;
  background-color: #e6f7ff;
  border-radius: 8rpx;
  font-size: 26rpx;
  color: #1890ff;
  margin-bottom: 24rpx;
}

.form-wrapper {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 0 30rpx;
}

.section-block {
  // No padding-bottom needed here
}

.form-section {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
}

.section-title-bar {
  width: 8rpx;
  height: 32rpx;
  background-color: #3c9cff;
  border-radius: 4rpx;
  margin-right: 16rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
}

.picker-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  .placeholder {
    color: #c0c4cc;
  }

  text {
    color: #303133;
    font-size: 28rpx;
    margin-right: 10rpx;
  }
}

.upload-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.upload-btn {
  background-color: #3c9cff;
  color: #fff;
  padding: 8rpx 24rpx;
  border-radius: 30rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f5;
  padding: 20rpx 24rpx;
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
  z-index: 10;
}

.submit-btn {
  width: 100%;
  background-color: #3c9cff;
  color: #ffffff;
  font-size: 32rpx;
  border-radius: 50rpx;

  &:after {
    border: none;
  }
}

// 完全隐藏日期选择器组件
// .hidden-datetime-picker {
//   position: absolute !important;
//   left: -9999px !important;
//   top: -9999px !important;
//   width: 0 !important;
//   height: 0 !important;
//   opacity: 0 !important;
//   pointer-events: none !important;
//   display: block !important;
//   visibility: hidden !important;
//   z-index: -9999 !important;
// }

::v-deep .uni-forms-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  margin-bottom: 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
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

.radio-group-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

::v-deep .uni-data-checklist .checklist-group .checklist-box {
  margin-right: 0;
  margin-left: 40rpx;
}

::v-deep .uni-forms-item--top {
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid #f0f0f0;

  .uni-forms-item__label {
    padding: 10rpx 0;
  }

  .uni-easyinput__content {
    text-align: left;
  }
}

// 确保日期选择器完全隐藏
// .date-picker-hidden {
//   display: none !important;
// }

// ::v-deep .date-picker-hidden {
//   display: none !important;
//   visibility: hidden !important;
//   opacity: 0 !important;
// }
</style>