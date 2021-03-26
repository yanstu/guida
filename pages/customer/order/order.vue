<template>
	<view class="container">
		<view class="tabbar">
			<view class="item" :class="{ active: !tabIndex }" @tap="switchTab(0)">当前订单</view>
			<view class="item" :class="{ active: tabIndex }" @tap="switchTab(1)">历史订单</view>
		</view>
		<swiper :current="tabIndex" :duration="300" class="swiper" :show-scrollbar="false">
			<!-- 当前订单 begin -->
			<swiper-item @touchmove.stop="handleSwiperItemChange">
				<view class="no-order-content">
					<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1566729243,2352067513&fm=26&gp=0.jpg"></image>
					<view class="tips"><view>您今天还没有下单</view></view>
					<button class="cu-btn bg-blue">去下单</button>
				</view>
			</swiper-item>
			<!-- 当前订单 end -->
			<!-- 历史订单 begin -->
			<swiper-item @touchmove.stop="handleSwiperItemChange">
				<view class="history-order">
					<!-- <view class="">
						<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
							<view class="flex-fill flex justify-start" v-for="(tab, index) in tabs">
								<view class="item" :class="TabCur == index && 'active'" @tap="TabCur(index)">{{ tab }}</view>
							</view>
						</scroll-view>
					</view> -->
					<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
						<view class="cu-item" :class="index == TabCur ? 'text-blue cur ' : ''" v-for="(tab, index) in tabs" :key="index" @tap="tabSelect" :data-id="index">
							{{ tab }}
						</view>
					</scroll-view>
					<swiper :current="TabCur" :duration="300" :show-scrollbar="false" class="history-order-swiper">
						<!-- 门店订单 begin -->
						<swiper-item @touchmove.stop="handleSwiperItemChange">
							<scroll-view scroll-y="true" class="orders-scroll">
								<view class="wrapper">
									<view class="order-list">
										<!-- <navigator class="order" v-for="(order, index) in orders" :key="index" open-type="navigate" :url="'detail?id=' + order.id">
											<view class="header">
												<view class="flex-fill font-size-medium">{{ order.shop.name }}</view>
												<view class="status">
													<view>已完成</view>
													<image src="../../../static/image/order/black_arrow_right.png"></image>
												</view>
											</view>
											<scroll-view scroll-x>
												<view class="images"><image :src="item.image" v-for="(item, index) in order.items" :key="index"></image></view>
											</scroll-view>
											<view class="info">
												<view class="left">
													<view>订单编号：{{ order.no }}</view>
													<view>下单时间：{{ order.created_at }}</view>
												</view>
												<view class="right">￥{{ order.total_fee }}</view>
											</view>
											<view class="action"><button type="default" hover-class="none">开发票</button></view>
										</navigator> -->
										<view class="order-item" v-for="(item, index) in orders" :key="index" style="margin-bottom: 30rpx;" @tap="detail(item.id)">
											<list-cell :hover="false">
												<view class="w-100 d-flex align-items-center">
													<view class="flex-fill d-flex flex-column">
														<view class="font-size-lg text-color-base" style="margin-bottom: 20rpx;">{{ item.store.name }}</view>
														<view class="font-size-sm text-color-assist">订单编号：{{ item.order_no }}</view>
													</view>
													<view class="font-size-lg text-green">{{ item.status_text }}</view>
												</view>
											</list-cell>
											<list-cell :hover="false" last>
												<view class="w-100 d-flex flex-column">
													<view class="w-100 text-truncate font-size-lg text-color-base" style="margin-bottom: 20rpx;">
														{{ orderGoodsName(item.goods) }}
													</view>
													<view class="d-flex justify-content-between align-items-center" style="margin-bottom: 30rpx;">
														<view class="font-size-sm text-color-assist">{{ $tool.formatDateTime(item.created_at) }}</view>
														<view class="d-flex font-size-sm text-color-base align-items-center">
															<view style="margin-right: 10rpx;">共{{ item.goods_num }}件商品，实付</view>
															<view class="font-size-lg">￥{{ item.amount }}</view>
														</view>
													</view>
													<view class="d-flex align-items-center justify-content-end">
														<view style="margin-right: 10rpx;">
															<button class="cu-btn lines-blue" v-if="item.invoice_status > 0">查看发票</button>
															<button class="cu-btn lines-blue" v-else @tap.stop="goToInvoice">开发票</button>
														</view>
														<view><button class="cu-btn lines-blue" @tap.stop="review(item)">去评价</button></view>
													</view>
												</view>
											</list-cell>
										</view>
									</view>
								</view>
							</scroll-view>
						</swiper-item>
						<!-- 门店订单 end -->
						<!-- 百货订单 begin -->
						<swiper-item @touchmove.stop="handleSwiperItemChange">
							<view class="store-order-wrapper">
								<image src="../../../static/image/order/default_img_order.png"></image>
								<view>您还没有下单</view>
								<view>快去百货商城逛逛吧</view>
							</view>
						</swiper-item>
						<!-- 百货订单 end -->
					</swiper>
				</view>
			</swiper-item>
			<!-- 历史订单 end -->
		</swiper>
		<!-- <image src="https://go.cdn.heytea.com/storage/ad/2020/05/20/1a389117c2fb44d5bcad4a910a68246c.jpg"></image> -->
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
			tabIndex: 0,
			orders: [],
			storeOrders: [],
			tabs: ['全部', '待付款', '待发车', '待收车', '评价', '已完成'],
			TabCur: 0,
			scrollLeft: 0
		};
	},
	computed: {
		orderGoodsName() {
			return goods => {
				let arr = [];
				goods.forEach(good => arr.push(good.name + '*' + good.number));
				return arr.join('，');
			};
		}
	},
	methods: {
		goToInvoice() {
			uni.navigateTo({
				url: 'invoice/invoice'
			});
		},
		review(order) {
			uni.navigateTo({
				url: 'appraise/appraise'
			});
		},
		async tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			if (this.TabCur == 1) {
				await this.getOrders();
			}
		},
		detail(id) {
			uni.navigateTo({
				url: 'detail?id=' + id
			});
		},
		async switchTab(index) {
			if (this.tabIndex === index) return;
			this.tabIndex = index;
			if (this.tabIndex) {
				await this.getOrders();
			}
		},
		handleSwiperItemChange() {
			//禁止手动滑动
			return true;
		},
		async getOrders() {
			if (!this.TabCur) {
				this.orders = orders;
			} else {
				this.storeOrders = [];
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '~@/static/style/app.scss';
page {
	background-color: #f6f6f6;
}
.cu-btn[class*='line']::after {
	border-radius: 25rpx;
}
.container {
	height: 100%;
}
.navbar {
	height: calc(44px + var(--status-bar-height));
	/* #ifdef H5 */
	height: 44px;
	/* #endif */
	display: flex;
	background-color: #ffffff;
}

.talk-btn {
	height: 32px;
	margin-left: 10px;
	margin-top: 26px;
	/* #ifdef H5 */
	margin-top: 6px;
	/* #endif */
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: $font-size-sm !important;
	padding: 0 20rpx;
	border-radius: 50rem !important;

	image {
		width: 40rpx;
		height: 40rpx;
		margin-right: $spacing-row-sm;
	}
}

.tabbar {
	height: 100rpx;
	background-color: $bg-color-white;
	display: flex;
	align-items: center;
	justify-content: space-around;

	.item {
		height: 100%;
		font-size: $font-size-lg;
		color: $text-color-assist;
		font-weight: 400 !important;
		display: flex;
		align-items: center;

		&.active {
			color: $text-color-base;
			border-bottom: 4rpx solid $text-color-base;
		}
	}
}

.swiper {
	width: 100%;
	height: 100%;
}

.no-order-content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	image {
		width: 300rpx;
		height: 300rpx;
		margin-bottom: 50rpx;
	}

	.tips {
		color: $text-color-assist;
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 1.2rem !important;
		margin-bottom: 70rpx;
	}

	button {
		width: 50%;
	}
}

.history-order {
	width: 100%;
	height: 100%;
	position: relative;

	.menu {
		padding: 18rpx 30rpx;
		display: flex;
		align-items: center;
		font-size: $font-size-base;
		color: $text-color-grey;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;

		.item {
			padding: 14rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}

			&.active {
				color: $color-primary;
				background-color: $bg-color-white;
			}
		}
	}

	.history-order-swiper {
		width: 100%;
		height: 100%;
	}
}

.store-order-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: $font-size-base;
	color: $text-color-assist;
	line-height: 1.3rem !important;

	image {
		width: 400rpx;
		height: 333rpx;
		margin-bottom: 40rpx;
	}
}

.orders-scroll {
	width: 100%;
	height: 100%;
	padding-top: 30rpx;
}

.order-list {
	display: flex;
	width: 100%;
	flex-direction: column;

	.order {
		background-color: $bg-color-white;
		padding: 30rpx 40rpx;
		margin-bottom: 18rpx;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.status {
				font-size: $font-size-base;
				color: $text-color-grey;
				display: flex;
				align-items: center;
				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: $spacing-row-sm;
				}
			}
		}

		.images {
			display: flex;
			padding: 30rpx 0;
			image {
				flex-shrink: 0;
				width: 150rpx;
				height: 112.5rpx;
			}
		}

		.info {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			.left {
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: $font-size-base;
				color: $text-color-grey;
			}

			.right {
				font-size: $font-size-lg;
				color: $text-color-base;
			}
		}

		.action {
			display: flex;
			justify-content: flex-end;
			align-items: center;

			button {
				margin-left: 30rpx;
				font-size: $font-size-sm;
			}
		}
	}
}
</style>
