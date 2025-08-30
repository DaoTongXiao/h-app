<template>
	<view class="chat-container">
		<!-- 聊天消息区域 -->
		<scroll-view class="message-scroll-view" :scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true">
			<view v-for="message in messages" :key="message.id" class="message-item">
				<!-- 机器人消息 -->
				<view v-if="message.sender === 'bot'" class="bot-message-row">
					<image class="avatar" :src="message.avatar" />
					<view class="message-content">
						<text class="bot-name">在线纠纷多元化解平台智能机器人为你服务...</text>
						<view class="message-bubble bot-bubble">
							<text>{{ message.content }}</text>
						</view>
					</view>
				</view>
				<!-- 用户消息 -->
				<view v-else class="user-message-row">
					<view class="message-bubble user-bubble">
						<text>{{ message.content }}</text>
					</view>
					<image class="avatar" :src="message.avatar" />
				</view>
			</view>
		</scroll-view>

		<!-- 底部输入区域 -->
		<view class="input-footer">
			<view class="hot-topics">
				<text class="hot-topics-label">热门主题:</text>
				<text v-for="topic in hotTopics" :key="topic" class="topic-tag"
					@click="selectTopic(topic)">{{ topic }}</text>
			</view>
			<view class="input-area">
				<input class="chat-input" type="text" v-model="inputValue" placeholder="请输入内容" @confirm="sendMessage" />
				<button class="send-button" @click="sendMessage">发送</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, nextTick } from 'vue';

	// 消息接口定义
	interface Message {
		id : number;
		sender : 'bot' | 'user';
		avatar : string;
		content : string;
	}

	const inputValue = ref('');
	const scrollTop = ref(0);
	const messages = reactive<Message[]>([
		{
			id: 1,
			sender: 'bot',
			avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDM5YmU1IiBkPSJNMTEuMjUgNC4yN2E3LjUgNy41IDAgMCAxIDcuNSAzLjIxbDEuOTMyLTEuMTA0QTYuMDMgNi4wMyAwIDAgMSAxMy41IDEuNUgyNGExIDEgMCAwIDEgMSAxdjguNmMwIDMuMS0xLjE2IDUuMy0yLjYyIDYuNDdBNi4yMiA2LjIyIDAgMCAxIDE4IDIxLjg5VjIySDZjMCAuMDctLjAzLjE0LS4wMy4yMWE1LjUgNS41IDAgMSAxIDAtMTAuNDNoNy4yOGEuNSAuNSAwIDAgMCAuNS0uNWEyLjUgMi41IDAgMCAwLTUtMGEuNS41IDAgMCAwIC41LjVoMi4yN2MuOTMgMCAxLjUtMS4wMyAxLjUtMi4yN2E0LjUgNC41IDAgMCAwLTktMGEuNS41IDAgMCAwIC41LjVoMS40MmE0LjQ4IDQuNDggMCAwIDEgMy41OC0yLjAxWiIvPjxwYXRoIGZpbGw9IiM2NGI1ZWYiIGQ9Ik0zIDExLjU3YzAtMS43MyAxLjA4LTMuMjMgMi42Ni0zLjkxYy0xLjU1LS42NC0yLjY2LTIuMDYtMi42Ni0zLjY2YzAgLjA3LS4wMy4xNC0uMDMuMjFBNTUgNS41IDAgMSAxIDMgMTEuNTdaIi8+PC9zdmc+',
			content: '你好！我是纠纷多元化解平台智能机器人。你想了解的都可以向我提问，我会尽力帮你查找答案！',
		},
	]);

	const hotTopics = ref(['信访事项', '社会力量', '四书一报告']);
	const userAvatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjOGE4YThhIiBkPSJNMTIgMTJDOS4yNCAxMiA3IDE0LjI0IDcgMTd2Mmgydi0yYzAtMS42NiAxLjM0LTMgMy0zaDMuOThjLjk1IDAgMS44MS4zNCAyLjU0LjkxYTMuNSAzLjUgMCAwIDEgMi4xMyAyLjc1VjE5aDJ2LTIuMDEyQTMuOTkgMy45OSAwIDAgMSAxNy45ODggMTJoLTUuOTg4Wm0wLThhMy41IDMuNSAwIDEgMC0uMDAxIDcgMy41IDMuNSAwIDAgMCAuMDAxLTdaIi8+PC9zdmc+';

	// 发送消息
	const sendMessage = () => {
		if (inputValue.value.trim() === '') return;

		// 添加用户消息
		messages.push({
			id: Date.now(),
			sender: 'user',
			avatar: userAvatar,
			content: inputValue.value,
		});

		const userMessage = inputValue.value;
		inputValue.value = '';
		scrollToBottom();

		// 模拟机器人回复
		setTimeout(() => {
			messages.push({
				id: Date.now() + 1,
				sender: 'bot',
				avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDM5YmU1IiBkPSJNMTEuMjUgNC4yN2E3LjUgNy41IDAgMCAxIDcuNSAzLjIxbDEuOTMyLTEuMTA0QTYuMDMgNi4wMyAwIDAgMSAxMy41IDEuNUgyNGExIDEgMCAwIDEgMSAxdjguNmMwIDMuMS0xLjE2IDUuMy0yLjYyIDYuNDdBNi4yMiA2LjIyIDAgMCAxIDE4IDIxLjg5VjIySDZjMCAuMDctLjAzLjE0LS4wMy4yMWE1LjUgNS41IDAgMSAxIDAtMTAuNDNoNy4yOGEuNSAuNSAwIDAgMCAuNS0uNWEyLjUgMi41IDAgMCAwLTUtMGEuNS41IDAgMCAwIC41LjVoMi4yN2MuOTMgMCAxLjUtMS4wMyAxLjUtMi4yN2E0LjUgNC41IDAgMCAwLTktMGEuNS41IDAgMCAwIC41LjVoMS40MmE0LjQ4IDQuNDggMCAwIDEgMy41OC0yLjAxWiIvPjxwYXRoIGZpbGw9IiM2NGI1ZWYiIGQ9Ik0zIDExLjU3YzAtMS43MyAxLjA4LTMuMjMgMi42Ni0zLjkxYy0xLjU1LS42NC0yLjY2LTIuMDYtMi42Ni0zLjY2YzAgLjA3LS4wMy4xNC0uMDMuMjFBNTUgNS41IDAgMSAxIDMgMTEuNTdaIi8+PC9zdmc+',
				content: `关于“${userMessage}”的问题，我正在努力查找答案，请稍候...`,
			});
			scrollToBottom();
		}, 1000);
	};

	// 选择热门主题
	const selectTopic = (topic : string) => {
		inputValue.value = topic;
	};

	// 滚动到底部
	const scrollToBottom = () => {
		nextTick(() => {
			// 一个比较大的值，确保能滚动到底部
			scrollTop.value = messages.length * 300;
		});
	};
</script>

<style scoped>
	/* 整体容器 */
	.chat-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #f4f4f4;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	}

	/* 消息滚动区域 */
	.message-scroll-view {
		flex: 1;
		padding: 20rpx;
		box-sizing: border-box;
		padding-bottom: 240rpx;
		/* 为底部输入区域留出空间 */
	}

	.message-item {
		margin-bottom: 30rpx;
	}

	/* 机器人消息行 */
	.bot-message-row {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	/* 用户消息行 */
	.user-message-row {
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
	}

	.avatar {
		width:60rpx;
		height: 60rpx;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.bot-message-row .avatar {
		margin-right: 20rpx;
	}

	.user-message-row .avatar {
		margin-left: 20rpx;
	}


	.message-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		max-width: calc(100% - 100rpx);
	}

	.bot-name {
		font-size: 24rpx;
		color: #999;
		margin-bottom: 8rpx;
		padding-left: 10rpx;
	}

	.message-bubble {
		padding: 20rpx 25rpx;
		border-radius: 20rpx;
		word-wrap: break-word;
		word-break: break-all;
		font-size: 28rpx;
		line-height: 1.5;
		max-width: 100%;
	}

	.bot-bubble {
		background-color: #ffffff;
		color: #333;
		border-top-left-radius: 0;
	}

	.user-bubble {
		background-color: #409eff;
		color: #ffffff;
		border-top-right-radius: 0;
	}

	/* 底部输入区域 */
	.input-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #f4f4f4;
		padding: 20rpx;
		padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		border-top: 1rpx solid #e0e0e0;
		display: flex;
		flex-direction: column;
		z-index: 100;
	}

	.hot-topics {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		flex-wrap: wrap;
	}

	.hot-topics-label {
		font-size: 26rpx;
		color: #666;
		margin-right: 15rpx;
	}

	.topic-tag {
		background-color: #ffffff;
		border: 1rpx solid #e0e0e0;
		color: #555;
		padding: 8rpx 20rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		margin-right: 15rpx;
		margin-bottom: 10rpx;
		cursor: pointer;
	}

	.input-area {
		display: flex;
		align-items: center;
	}

	.chat-input {
		flex: 1;
		height: 80rpx;
		background-color: #ffffff;
		border-radius: 40rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
	}

	.send-button {
		width: 140rpx;
		height: 80rpx;
		margin-left: 20rpx;
		background-color: #409eff;
		color: white;
		border: none;
		border-radius: 40rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}
</style>