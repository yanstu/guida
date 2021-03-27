<template>
	<view style="position: relative;height: 100%;">
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">新增地址</block>
			<block slot="right"><text class="text-orange">保存</text></block>
		</bar-title> -->

		<view class="info-card cu-card shadow-warp">
			<!--表单-->
			<view class="cu-form-group">
				发/收货人
				<input style="width: 77%;" class="text-right" placeholder="请输入您的姓名" v-model="address.name" />
				<text class="cuIcon-right text-gray"></text>
			</view>
			<view class="cu-form-group">
				手机号码
				<input style="width: 77%;" class="text-right" placeholder="请输入您的手机号" v-model="address.phone" />
				<text class="cuIcon-right text-gray"></text>
			</view>
			<view class="cu-form-group">
				所在地区
				<view class="flex">
					<pickers @address="changeArea" :defaultAddress="defaultAddress">{{ !address.area ? '请选择地址' : address.area }}</pickers>
					<text class="cuIcon-right text-gray" style="font-size: 35rpx;font-weight: 500;"></text>
				</view>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">详细地址</view>
				<textarea maxlength="-1" v-model="address.detail" placeholder="请选择所在地区"></textarea>
			</view>
		</view>

		<view class="info-card cu-card shadow-warp">
			<view class="cu-form-group align-start">
				<view class="title">粘贴识别</view>
				<textarea
					maxlength="-1"
					show-confirm-bar="true"
					confirm-type="done"
					@blur="parseAddress"
					placeholder="智能识别, 如 溥仪,18512345456,北京市北京市西城区后海北沿44号(近后海北沿西段)"
				></textarea>
			</view>
		</view>

		<view v-if="pageType == 1" class="info-card cu-card shadow-warp">
			<view class="cu-list menu">
				<view class="cu-item">
					<view @click="delAdress" class="content" style="color: red;">
						<text class="cuIcon-deletefill"></text>
						<text>删除地址</text>
					</view>
				</view>
			</view>
		</view>

		<view style="position: absolute;bottom: 0;height: 160rpx;width: 100%;border-radius: 20rpx 20rpx 0 0;" class="flex flex-direction bg-white align-center">
			<button style="width: 93%;" class="cu-btn bg-blue shadow-blur round lg margin-top-sm" @click="submit">确认</button>
		</view>
	</view>
</template>

<script>
//import uniDataPicker from '@/components/uni-data-picker/components/uni-data-picker/uni-data-picker.vue';
import pickers from '@/components/ming-picker/ming-picker.vue';
import _tool from '@/utils/other.js';
import AddressParse from 'address-parse';
export default {
	components: {
		//uniDataPicker
		pickers
	},
	data() {
		return {
			address: {
				name: '',
				phone: '',
				area: '',
				detail: ''
				/*latitude: '',
				longitude: ''*/
			},
			pageType: 0,
			type: 0,
			key: '',
			defaultAddress: ['贵州省', '贵阳市', '观山湖区']
		};
	},
	onLoad(option) {
		if (option.pageType) {
			this.pageType = option.pageType;
			this.address = uni.getStorageSync('addressInfo');
			uni.removeStorageSync('addressInfo');
			uni.setNavigationBarTitle({
				title: '编辑地址'
			});
		}
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
		parseAddress(e) {
			let value = e.detail.value;
			if (value != '') {
				let result = AddressParse.parse(value);
				this.address.name = result[0].name;
				this.address.phone = result[0].mobile;
				this.address.detail = result[0].details;
				this.address.area = result[0].province + result[0].city + result[0].area;
			}
		},
		submit() {
			var phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
			if (!phoneReg.test(this.address.phone)) {
				uni.showToast({
					title: '手机号格式错误',
					icon: 'none'
				});
				return;
			}
			if (!this.address.area) {
				uni.showToast({
					title: '请选择所在地区',
					icon: 'none'
				});
				return;
			}
			if (!this.address.name) {
				uni.showToast({
					title: '请输入您的姓名',
					icon: 'none'
				});
				return;
			}
			let pages = getCurrentPages(); //获取所有页面栈实例列表
			let nowPage = pages[pages.length - 1]; //当前页页面实例
			let prevPage = pages[pages.length - 2]; //上一页页面实例
			switch (parseInt(this.type)) {
				case 0:
					break;
				case 1:
					prevPage.$vm.address = this.address;
					console.log(prevPage.$vm);
					uni.navigateBack({
						delta: 1
					});
					break;
				case 2:
					prevPage.$vm[this.key] = this.address;
					console.log(prevPage.$vm);
					uni.navigateBack({
						delta: 1
					});
					break;
			}
		},
		changeArea(e) {
			let areaArr = e.value;
			this.address.area = areaArr[0] + areaArr[1] + areaArr[2];
		},
		delAdress() {
			uni.showModal({
				title: '提示',
				content: '确定要删除“ ' + this.address.area + ' ' + this.address.detail + ' ”这个地址吗？',
				success: res => {
					uni.showToast({
						title: '删除成功',
						icon: 'success'
					});
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
.input-value-border {
	border: none !important;
}
.input-arrow {
	margin-left: 10px !important;
	top: -2px !important;
	border-left: 2px solid #999 !important;
	border-bottom: 2px solid #999 !important;
}
.info-card {
	width: 93%;
	margin: 0 auto;
	margin-top: 25rpx;
	border-radius: 25rpx;
}
.cu-form-group picker {
	padding-right: 20rpx;
}
</style>
