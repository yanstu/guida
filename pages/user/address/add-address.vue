<template>
	<view style="position: relative;height: 100%;">
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">新增地址</block>
			<block slot="right"><text class="text-orange">保存</text></block>
		</bar-title> -->

		<!--表单-->
		<view class="cu-form-group margin-top">
			发/收货人
			<input style="width: 77%;" class="text-right" placeholder="您的姓名" v-model="address.name" />
			<text class="cuIcon-right text-gray"></text>
		</view>
		<view class="cu-form-group">
			手机号码
			<input style="width: 77%;" class="text-right" placeholder="卖家和快递员联系您的方式" v-model="address.phone" />
			<text class="cuIcon-right text-gray"></text>
		</view>
		<view class="cu-form-group">
			所在地区
			<input style="width: 77%;" class="text-right" type="text" v-model="address.region" placeholder="请选择所在地区" disabled="true" @click="getLocation" />
			<text class="cuIcon-right text-gray"></text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">详细地址</view>
			<textarea maxlength="-1" v-model="address.detail" placeholder="请输入详细地址"></textarea>
		</view>
		<view style="position: absolute;bottom: 0;height: 160rpx;width: 100%;border-radius: 20rpx 20rpx 0 0;" class="flex flex-direction bg-white align-center">
			<button style="width: 93%;" class="cu-btn bg-blue lg margin-top-sm" @click="submit">确认</button>
		</view>
	</view>
</template>

<script>
import barTitle from '@/components/zaiui-common/basics/bar-title';
import _tool from '@/utils/other.js';
export default {
	components: {
		barTitle
	},
	data() {
		return {
			address: {
				name: '',
				phone: '',
				region: '',
				detail: '',
				latitude: '',
				longitude: ''
			},
			pageType: 0
		};
	},
	onLoad(option) {
		if (option.pageType) {
			this.pageType = option.pageType;
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
		submit() {
			var phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
			if (!phoneReg.test(this.address.phone)) {
				uni.showToast({
					title: '手机号格式错误',
					icon: 'none'
				});
			}
			console.log(this.address);
		},
		getLocation() {
			console.log(1);
			uni.chooseLocation({
				success: res => {
					this.address.region = res.address;
					this.address.latitude = res.latitude;
					this.address.longitude = res.longitude;
				}
			});
		}
	}
};
</script>

<style lang="scss">
/* #ifdef APP-PLUS */
@import '../../static/colorui/main.css';
@import '../../static/colorui/icon.css';
@import '../../static/zaiui/style/app.scss';
/* #endif */
.wecanui-footer-fixed .flex-direction {
	padding: 18.18rpx;
}
</style>
