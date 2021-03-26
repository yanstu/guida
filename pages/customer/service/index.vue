<template>
	<view id="freight">
		<view class="swiper-container">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<view class="address shadow-warp">
			<view>
				<view style="background: #222836;">发</view>
				<view class="address-fa">
					<text v-if="address_fa" class="address-detail">
						<text class="text-bold">{{ address_fa.name }} {{ address_fa.phone }}</text>
						<text style="font-size: 22rpx;">{{ address_fa.area + address_fa.detail }}</text>
					</text>
					<input v-else style="height: 85rpx;width: 90%;" type="text" placeholder="请填写发车人信息" disabled="true" @click="fillAddress(2, 'address_fa')" />
					<text @click="autoFill(2, 'address_fa')" class="cuIcon-addressbook" style="font-size: 40rpx;"></text>
				</view>
			</view>
			<view>
				<view style="background: #ff6600;">收</view>
				<view class="address-fa" style="border: 0;">
					<text v-if="address_shou" class="address-detail">
						<text class="text-bold">{{ address_shou.name }} {{ address_shou.phone }}</text>
						<text style="font-size: 22rpx;">{{ address_shou.area + address_shou.detail }}</text>
					</text>
					<input v-else style="height: 85rpx;width: 90%;" type="text" placeholder="请填写收车人信息" disabled="true" @click="fillAddress(2, 'address_shou')" />
					<text @click="autoFill(2, 'address_shou')" class="cuIcon-addressbook" style="font-size: 40rpx;"></text>
				</view>
			</view>
		</view>
		<view class="info-card cu-card shadow-warp">
			<view class="cu-form-group">
				增值服务
				<input class="text-right" placeholder="可选择垫付比例" name="input" />
				<text class="cuIcon-right text-gray"></text>
			</view>
			<view class="cu-form-group">
				车辆信息
				<navigator style="width: 77%;" class="text-right" url="./carInfo">品牌/颜色/车架号</navigator>
				<text class="cuIcon-right text-gray"></text>
			</view>
			<view class="cu-form-group">
				付款方式
				<picker @change="PickerChange" :value="index" :range="payType">
					<view class="picker">{{ payTypeIndex > -1 ? payType[payTypeIndex] : '现结/到付/月结' }}</view>
				</picker>
			</view>
			<view class="reading">
				<view style="justify-content: left;" class="cu-form-group">
					<view @click="readAgreement" :class="'margin-right ' + (readState ? 'cuIcon-roundcheckfill text-yellow' : 'cuIcon-round')"></view>
					阅读并同意
					<navigator class="text-blue" url="../../user/rule">《用车规则》</navigator>
				</view>
			</view>
		</view>

		<view class="foot">
			<view class="margin-left foot-left flex align-center">
				预估
				<text class="text-yellow text-bold margin-right-xs">￥--</text>
				<text class="margin-right-xs" style="color: rgba(81,81,81,.3);">|</text>
				<view class="">
					明细
					<text class="cuIcon-fold text-bold margin-left-xs"></text>
				</view>
			</view>
			<view class="foot-right margin-right">
				<button @click="toOrder" class="cu-btn bg-red shadow-blur round">立即用车</button>
				<button @click="subscribe" class="cu-btn bg-orange shadow-blur round margin-top-sm">预约用车</button>
			</view>
		</view>

		<!-- 
		rangeStartTime每天的开始时间
		rangeEndTime每天的结束时间
		-->
		<hTimeAlert
			title="预约时间"
			subhead="请选择预约发车时间"
			intervalTime="10"
			rangeDay="4"
			disabled="2"
			isNow="true"
			:isShow="showTimeAlert"
			@closeAlert="closeTimeAlert"
		></hTimeAlert>
	</view>
</template>

<script>
import hTimeAlert from '@/components/h-time-alert/h-time-alert.vue';
export default {
	components: { hTimeAlert },
	data() {
		return {
			goTime: '',
			showTimeAlert: false,
			address_fa: null,
			address_shou: null,
			car: {
				load: '',
				size: '',
				volume: ''
			},
			isShow: true,
			carInfo: null,
			price: 0,
			distance: 0,
			readState: false,
			payTypeIndex: -1,
			payType: ['现结', '到付', '月结'],
			swiperList: [
				{
					id: 0,
					type: 'image',
					url:
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d56b5542d8bc0000019ae98da289.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619226781&t=10cc016fdca6e7ba7d83ac0021383f16'
				},
				{
					id: 1,
					type: 'image',
					url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1241842266,669455961&fm=26&gp=0.jpg'
				},
				{
					id: 2,
					type: 'image',
					url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1369634064,652964048&fm=26&gp=0.jpg'
				},
				{
					id: 3,
					type: 'image',
					url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3335646070,4261447541&fm=26&gp=0.jpg'
				},
				{
					id: 4,
					type: 'image',
					url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2378233189,3549362871&fm=26&gp=0.jpg'
				}
			]
		};
	},
	onLoad() {
		this.getCar('面包车');
	},
	methods: {
		closeTimeAlert(e) {
			this.showTimeAlert = false;
			if (e) {
				this.goTime = e.date;
				this.toOrder();
			}
		},
		subscribe() {
			this.showTimeAlert = true;
		},
		readAgreement() {
			this.readState = !this.readState;
			if (this.readState) {
				uni.navigateTo({
					url: '../../user/rule'
				});
			}
		},
		PickerChange(e) {
			this.payTypeIndex = e.detail.value;
		},
		/*
		 * 获取位置详情
		 */
		fillAddress(type, key) {
			uni.navigateTo({
				url: `../../user/address/add-address?type=${type}&key=${key}`
			});
		},
		autoFill(type, key) {
			uni.navigateTo({
				url: `../../user/address/address?type=${type}&key=${key}`
			});
		},
		/*
		 * 获取上方车辆信息
		 */
		getCar(name) {
			let _this = this;
			// _this.request({
			// 	url: _this.http.getTransportList,
			// 	data: {
			// 		pageNum: '1',
			// 		pageSize: '1',
			// 		transportName: name
			// 	},
			// 	success: res => {
			// 		if (res.code === '0') {
			// 			_this.car = res.result[0];
			// 			_this.isUse();
			// 		}
			// 	}
			// });
		},
		/*
		 * 计算价格
		 */
		countPrice(data) {
			let _this = this;
			_this.request({
				url: _this.http.priceBudget,
				data: {
					orderType: '1',
					transportId: _this.car.transportId,
					startLong: data.startLong,
					startLat: data.startLat,
					endLong: data.endLong,
					endLat: data.endLat
				},
				success: res => {
					if (res.code === '0') {
						_this.price = res.result.price;
						_this.distance = res.result.distance;
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				}
			});
		},
		/*
		 * 去订单页面
		 */
		toOrder() {
			if (!this.goTime) {
				this.goTime = new Date();
			}
			/*if (!this.address_fa) {
				return uni.showToast({
					title: '请填写发货信息',
					icon: 'none'
				});
			}
			if (!this.address_shou) {
				return uni.showToast({
					title: '请填写发货信息',
					icon: 'none'
				});
			}
			if (!readState) {
				return uni.showToast({
					title: '请先同意《用车规则》',
					icon: 'none'
				});
			}
			if (this.address_fa.detail.trim() == this.address_shou.detail.trim()) {
				return uni.showToast({
					title: '发货地址不能和收货地址相同',
					icon: 'none'
				});
			}*/
			uni.navigateTo({
				url: '../order/confirmOrder'
			});
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}

.swiper-container {
	width: 93%;
	margin: 0 auto;
	border-radius: 25rpx;
	overflow: hidden;
	height: 250rpx;
}

.screen-swiper {
	min-height: 250rpx;
	max-height: 250rpx;
}

.info-card {
	width: 93%;
	margin: 0 auto;
	margin-top: 25rpx;
	border-radius: 25rpx;
}

#freight {
	background: $bg-color-F9F9F9;
	height: 100%;
	position: relative;

	.address {
		background: white;
		width: 86%;
		margin: 0 auto;
		margin-top: 25rpx;
		padding: 30upx;
		border-radius: 25rpx;

		> view {
			display: flex;
			align-items: center;
			font-size: $font-size-base;
			color: $text-color;

			> view:nth-of-type(1) {
				color: white;
				border-radius: 100upx;
				width: 50upx;
				height: 45upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: $font-size-sm;
			}
		}
		> view:nth-of-type(1) {
			padding-bottom: 20upx;
		}
		.address-fa {
			border-bottom: 1px solid rgba(81, 81, 81, 0.1);
			padding-bottom: 20rpx;
			margin-left: 20upx;
			width: 100%;
			display: flex;
			align-items: center;
			.address-detail {
				display: flex;
				flex: 1;
				flex-direction: column;
				text {
					display: block;
				}
			}
		}
	}

	.agreement {
		color: $text-a;
	}

	.foot {
		position: absolute;
		width: 100%;
		bottom: 0;
		background-color: #ffffff;
		height: 180rpx;
		display: flex;
		.foot-left {
			flex: 7;
		}
		.foot-right {
			flex: 3;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}
}
</style>
