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
				<view>发</view>
				<input
					style="border-bottom: 1px solid rgba(81,81,81,.1);height: 85rpx;"
					type="text"
					v-model="send"
					placeholder="请选择收车人信息"
					disabled="true"
					@click="getLocation(1)"
				/>
			</view>
			<view>
				<view>收</view>
				<input type="text" style="height: 65rpx;" v-model="take" placeholder="请选择发车人信息" disabled="true" @click="getLocation(2)" />
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
				普通选择
				<picker @change="PickerChange" :value="index" :range="payType">
					<view class="picker">{{ payTypeIndex > -1 ? payType[payTypeIndex] : '现结/到付/月结' }}</view>
				</picker>
			</view>
			<view class="reading">
				<view style="justify-content: left;" class="cu-form-group">
					<view @click="readAgreement" :class="'margin-right ' + (readState ? 'cuIcon-roundcheckfill text-yellow' : 'cuIcon-round')"></view>
					我已阅读并同意
					<navigator class="text-yellow" url="../../user/rule">《用车规则》</navigator>
				</view>
			</view>
		</view>

		<view class="btn">
			<view style="text-align: left;margin-left: 20rpx;">
				￥
				<text class="text-yellow">{{ price }}</text>
			</view>
			<view>
				<view style="background-color: #454454;" @click="toOrder(0)">现在用车</view>
				<view style="background-color: #FA893B;" @click="toOrder(1)">
					<text class="iconfont icon-yuyue"></text>
					<text>预约</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			additionalType: 0,
			carType: 0,
			car: {
				load: '',
				size: '',
				volume: ''
			},
			send: '',
			take: '',
			isShow: true,
			location: {
				startLong: '',
				startLat: '',
				endLong: '',
				endLat: ''
			},
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
		getLocation(type) {
			let _this = this;
			uni.chooseLocation({
				success: function(res) {
					if (type === 1) {
						_this.send = res.address;
						_this.location.startLong = res.longitude;
						_this.location.startLat = res.latitude;
					} else {
						_this.take = res.address;
						_this.location.endLong = res.longitude;
						_this.location.endLat = res.latitude;
					}
					_this.isUse();
				}
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
		 * 判断是否调用计算价格
		 */
		isUse() {
			if (this.location.startLong && this.location.startLat && this.location.endLong && this.location.endLat) {
				this.countPrice(this.location);
			}
		},
		/*
		 * 去订单页面
		 */
		toOrder(e) {
			if (this.send === '') {
				return uni.showToast({
					title: '请选择发货地',
					icon: 'none'
				});
			}
			if (this.take === '') {
				return uni.showToast({
					title: '请选择收货地',
					icon: 'none'
				});
			}
			let params = {
				transportId: this.car.transportId,
				startPlace: this.send,
				startLong: this.location.startLong,
				startLat: this.location.startLat,
				endPlace: this.take,
				endLong: this.location.endLong,
				endLat: this.location.endLat,
				type: e,
				price: this.price,
				distance: this.distance
			};
			if (this.carType === 0) {
				params.additionalType = this.additionalType;
			}
			uni.navigateTo({
				url: '/pages/confirmOrder/confirmOrder?params=' + JSON.stringify(params)
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

			> view {
				color: white;
				border-radius: 100upx;
				width: 50upx;
				height: 45upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: $font-size-sm;
			}

			> input {
				margin-left: 20upx;
				width: 100%;
			}
		}

		> view:nth-of-type(1) {
			padding-bottom: 20upx;

			> view {
				background: #222836;
			}
		}

		> view:nth-of-type(2) {
			> view {
				background: #ff6600;
			}
		}
	}

	.agreement {
		color: $text-a;
	}

	.btn {
		position: absolute;
		width: 96%;
		margin: 2%;
		bottom: 0;

		> view:nth-of-type(1) {
			text-align: center;
			padding: 20upx 0;
			color: $text-color;
			font-size: $font-size-sm;

			> text {
				font-size: 40upx;
			}
		}

		> view:nth-of-type(2) {
			display: flex;
			align-items: center;
			height: 100upx;
			color: white;
			font-size: $font-size-lg;

			> view:nth-of-type(1) {
				width: 500upx;
				background: $bg-color;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			> view:nth-of-type(2) {
				width: calc(100% - 500upx);
				background: $bg-color-orange;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;

				> text:nth-of-type(1) {
					padding-top: 5upx;
				}

				> text:nth-of-type(2) {
					padding-left: 10upx;
				}
			}
		}
	}
}
</style>
