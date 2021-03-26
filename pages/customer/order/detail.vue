<template>
	<view class="container" style="padding:20rpx;">
		<view style="padding-bottom: 100rpx;">
			<view class="bg-white">
				<view class="section">
					<!-- store info begin -->
					<list-cell :hover="false">
						<view class="w-100 d-flex align-items-center">
							<view class="d-flex flex-column w-60">
								<view class="w-100 font-size-lg text-color-base text-truncate mb-10">{{ order.store.name }}</view>
								<view class="w-100 d-flex align-items-center overflow-hidden">
									<image src="../../../static/image/order/location.png" class="flex-shrink-0" style="width: 30rpx; height: 30rpx;"></image>
									<view class="text-truncate font-size-sm text-color-assist">{{ order.store.address }}</view>
								</view>
							</view>
							<view class="d-flex justify-content-end align-items-center w-40">
								<image src="../../../static/image/order/mobile.png" style="width: 60rpx; height: 60rpx;margin-right: 30rpx;"></image>
								<image src="../../../static/image/order/navigation.png" style="width: 60rpx; height: 60rpx;"></image>
							</view>
						</view>
					</list-cell>
					<!-- store info end -->
					<!-- goods begin -->
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="flex flex-wrap" style="position: relative;">
							<view class="basis-xl flex flex-column">
								<text class="cuIcon-title" style="color: green;z-index: 51;">湘雅派出所</text>
								<text class="margin-left">北京市通州区宋庄邢各庄路才子艺术幼儿园西100米</text>
							</view>
							<view class="basis-xl flex flex-column margin-top">
								<text class="cuIcon-title" style="color: orange;z-index: 51;">大观城市花园</text>
								<text class="margin-left">北京市通州区凤德路与应寺路交叉路口往西北约100米(应天乐园西北侧约150米)</text>
							</view>
							<view style="position: absolute;height: 140rpx;width: 1px;background-color: rgba(81,81,81,.1);left: 15rpx;top:15rpx;z-index: 50;"></view>
						</view>
					</list-cell>
					<!-- goods end -->
				</view>
				<view class="section">
					<!-- payment and amount begin -->
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="w-100 d-flex flex-column">
							<view class="pay-cell">
								<view>下单时间</view>
								<view class="font-weight-bold">202/01/19 14：20</view>
							</view>
							<view class="pay-cell">
								<view>订单车型</view>
								<view class="font-weight-bold">小面包车</view>
							</view>
							<view class="pay-cell">
								<view>联系电话</view>
								<view class="font-weight-bold">18586318325</view>
							</view>
						</view>
					</list-cell>
					<!-- payment and amount end -->
				</view>
				<view class="section">
					<!-- payment and amount begin -->
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="w-100 d-flex flex-column">
							<view class="pay-cell">
								<view>支付方式</view>
								<view class="font-weight-bold">{{ order.pay_mode }}</view>
							</view>
							<view class="pay-cell">
								<view>金额总计</view>
								<view class="font-weight-bold">￥{{ order.amount }}</view>
							</view>
							<view class="pay-cell">
								<view>订单号</view>
								<view class="font-weight-bold">{{ order.order_no }}</view>
							</view>
						</view>
					</list-cell>
					<!-- payment and amount end -->
				</view>
			</view>
			<view class="position-relative w-100"><image src="../../../static/image/order/bottom.png" mode="widthFix" class="w-100"></image></view>
		</view>
		<view class="btn-box">
			<view class="item" v-if="order.invoice_status > 0"><button class="cu-btn bg-green shadow-blur round">查看发票</button></view>
			<view class="item"><button @tap="review" class="cu-btn bg-blue shadow-blur round">去评价</button></view>
		</view>
	</view>
</template>

<script>
import listCell from '@/components/list-cell/list-cell';
import orders from './orders.js';
export default {
	components: {
		listCell
	},
	data() {
		return {
			order: {}
		};
	},
	onLoad({ id }) {
		var Orders = orders;
		this.order = Orders.find(item => item.id == id);
	},
	methods: {
		review() {
			const date = this.order.completed_time.split(' ')[0];
			uni.navigateTo({
				url: '/pages/review/review?storename=' + this.order.store.name + '&typeCate=' + this.order.typeCate + '&date=' + date
			});
		},
		goToInvoice() {
			uni.navigateTo({
				url: '/pages/invoice/invoice'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '~@/static/style/app.scss';
@mixin arch {
	content: '';
	position: absolute;
	background-color: $bg-color;
	width: 30rpx;
	height: 30rpx;
	bottom: -15rpx;
	z-index: 10;
	border-radius: 100%;
}

.section {
	position: relative;

	&::before {
		@include arch;
		left: -15rpx;
	}

	&::after {
		@include arch;
		right: -15rpx;
	}
}

.pay-cell {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: $font-size-base;
	color: $text-color-base;
	margin-bottom: 40rpx;

	&:nth-last-child(1) {
		margin-bottom: 0;
	}
}

.invote-box {
	position: absolute;
	width: 100%;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;

	image {
		width: 30rpx;
		height: 30rpx;
	}
}

.btn-box {
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 120rpx;
	box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	z-index: 11;

	.item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20rpx 10rpx;
		flex: 1;
		flex-shrink: 0;

		button {
			width: 100%;
			border-radius: 50rem !important;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
		}
	}
}
</style>
