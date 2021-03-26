<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack><block slot="content">我的地址</block></bar-title> -->

		<!--列表-->
		<view @click="sendMsg(address)" v-for="(address, index) in addresss" class="bg-white zaiui-address-card-view">
			<view class="flex text-black text-lg">
				<view class="flex-sub text-left">{{ address.name }}</view>
				<view class="flex-sub text-right">{{ address.phone }}</view>
			</view>
			<view class="text-gray margin-top margin-bottom">{{ address.area + address.detail }}</view>
			<view class="zaiui-line-view" />
			<view class="zaiui-right-view">
				<text class="cuIcon-write text-blue" @tap.stop="editAddressTap">编辑</text>
				<text class="cuIcon-delete text-red">删除</text>
			</view>
		</view>

		<!--按钮-->
		<view class="wecanui-footer-fixed foot-pb">
			<view class="flex flex-direction"><button class="cu-btn bg-blue shadow-blur round" @tap="AddAddressTap">添加新地址</button></view>
		</view>
	</view>
</template>

<script>
import barTitle from '@/components/zaiui-common/basics/bar-title';
import _tool from '@/utils/other.js'; //工具函数
export default {
	components: {
		barTitle
	},
	data() {
		return {
			type: 0,
			key: '',
			addresss: [
				{
					name: '孙笑川',
					phone: '1858318325',
					area: '贵州省贵阳市观山湖区下坝山路6',
					detail: 'G27大数据创客空间'
				}
			]
		};
	},
	onLoad(option) {
		if (option.type) {
			this.type = option.type;
			this.key = option.key;
			uni.setNavigationBarTitle({
				title: '选择地址'
			});
		}
	},
	onReady() {
		_tool.setBarColor(true);
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 0
		});
	},
	methods: {
		sendMsg(item) {
			let pages = getCurrentPages(); //获取所有页面栈实例列表
			let nowPage = pages[pages.length - 1]; //当前页页面实例
			let prevPage = pages[pages.length - 2]; //上一页页面实例
			switch (parseInt(this.type)) {
				case 0:
					break;
				case 1:
					prevPage.$vm.address = item;
					console.log(prevPage.$vm);
					uni.navigateBack({
						delta: 1
					});
					break;
				case 2:
					prevPage.$vm[this.key] = item;
					console.log(prevPage.$vm);
					uni.navigateBack({
						delta: 1
					});
					break;
			}
		},
		editAddressTap() {
			console.log(1);
			uni.navigateTo({
				url: 'edit-address'
			});
		},
		AddAddressTap() {
			uni.navigateTo({
				url: 'add-address'
			});
		}
	}
};
</script>

<style lang="scss">
.zaiui-address-card-view {
	position: relative;
	margin: 36.36rpx 27.27rpx;
	border-radius: 10.9rpx;
	padding: 18.18rpx;
	.zaiui-line-view {
		position: relative;
		background: #f9f9f9;
		margin-bottom: 20rpx;
		height: 2rpx;
	}
	.zaiui-right-view {
		position: relative;
		text-align: right;
		text {
			&:before {
				margin-right: 5px;
			}
		}
		text + text {
			margin-left: 20px;
		}
	}
}
.wecanui-footer-fixed .flex-direction {
	padding: 18.18rpx;
}
</style>
