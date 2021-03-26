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
			<!-- <input style="width: 77%;" class="text-right" type="text" v-model="address.area" placeholder="请选择所在地区" disabled="true" @click="getLocation" />
			<text class="cuIcon-right text-gray"></text> -->
			<uni-data-picker
				placeholder="请选择地址"
				popup-title="请选择城市"
				collection="opendb-city-china"
				field="code as value, name as text"
				orderby="value asc"
				:step-searh="true"
				:self-field="code"
				@change="changeArea"
				parent-field="parent_code"
			></uni-data-picker>
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
import uniDataPicker from '@/components/uni-data-picker/components/uni-data-picker/uni-data-picker.vue';
import _tool from '@/utils/other.js';
export default {
	components: {
		uniDataPicker
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
			type: 0,
			key: ''
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
		submit() {
			var phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
			if (!phoneReg.test(this.address.phone)) {
				uni.showToast({
					title: '手机号格式错误',
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
			let areaArr = e.detail.value;
			this.address.area = areaArr[0].text + areaArr[1].text + areaArr[2].text;
		}
		/*getLocation() {
			console.log(1);
			uni.chooseLocation({
				success: res => {
					this.address.area = res.address;
					this.address.latitude = res.latitude;
					this.address.longitude = res.longitude;
				}
			});
		}*/
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
</style>
