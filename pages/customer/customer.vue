<template>
	<view class="container">
		<view class="banner">
			<image src="../../static/image/home/bg.jpeg" mode="" class="bg"></image>
			<view class="intro">
				<view class="greet">您好，{{ isLogin ? member.nickname : '游客' }}</view>
				<view class="note">贵达物流从“心”出发，值得托付。</view>
			</view>
		</view>
		<view class="content">
			<view class="entrance">
				<navigator url="service/index" class="item">
					<image src="../../static/image/home/xiadan.png" class="icon"></image>
					<view class="title">下单</view>
				</navigator>
				<view class="contact-btn item">
					<view class="contact-list"><contact-button v-for="i in 30" size="30"></contact-button></view>
					<image src="../../static/image/home/kefu.png" class="icon"></image>
					<view class="title">客服</view>
				</view>
			</view>
			<view class="info">
				<view class="integral_section" @tap="integrals">
					<view class="top">
						<text class="title">我的订单</text>
						<text class="value">411</text>
					</view>
					<view class="bottom">
						伽师的歌哈市的就爱是觉得很纠结
						<view class="iconfont iconarrow-right"></view>
					</view>
				</view>
				<view class="qrcode_section" @tap="memberCode">
					<image src="/static/images/index/qrcode.png"></image>
					<text>会员码</text>
				</view>
			</view>
			<!-- <view class="navigators">
				<view class="left">
					<view class="grid flex-column just-content-center">
						<view class="flex align-items-center">
							<image src="/static/images/index/csc.png" class="mark-img"></image>
							<view class="font-size-sm text-color-base">奈雪的茶商城</view>
						</view>
						<view class="text-color-assist" style="margin-left: 40rpx; font-size: 20rpx;">优质茶礼盒，网红零食</view>
					</view>
					<view class="grid justify-content-end align-items-end"><image src="/static/images/index/yzclh.png" class="yzclh-img" mode="heightFix"></image></view>
				</view>
				<view class="right">
					<view class="tea-activity" @tap="invite">
						<image src="/static/images/index/mcsb.png" class="mark-img"></image>
						<view>买茶送包</view>
						<view class="right-img"><image src="/static/images/index/mcsb_bg.png" mode="widthFix"></image></view>
					</view>
					<view class="member-gifts" @tap="packages">
						<image src="/static/images/index/hyjb.png" class="mark-img"></image>
						<view>会员劵包</view>
						<view class="right-img"><image src="/static/images/index/hyjb_bg.png" mode="widthFix"></image></view>
					</view>
				</view>
			</view> -->
			<view class="member-news">
				<view class="header">
					<view class="title">推荐内容</view>
					<view class="iconfont iconRightbutton"></view>
				</view>
				<!-- <view class="list">
					<view class="item">
						<image src="../../static/image/home/ind_bg.jpg"></image>
						<view class="title">贵达牛逼</view>
					</view>
				</view> -->
				<view class="swiper-container">
					<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
						<swiper-item v-for="(item, index) in swiperList" :key="index">
							<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
							<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
	onShow() {
		this.setTabBarIndex(0);
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
/* #ifdef H5 */
page {
	height: auto;
	min-height: 100%;
}
/* #endif */

.swiper-container {
	width: 100%;
	margin: 0 auto;
	border-radius: 10rpx;
	overflow: hidden;
	height: 250rpx;
}

.screen-swiper {
	min-height: 250rpx;
	max-height: 250rpx;
}

.contact-btn {
	height: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.contact-list {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	overflow: hidden;
	opacity: 0;
}

.banner {
	position: relative;
	width: 100%;
	height: 600rpx;

	.bg {
		width: 100%;
		height: 600rpx;
	}

	.intro {
		position: absolute;
		top: calc(50rpx + var(--status-bar-height));
		left: 40rpx;
		color: #ffffff;
		display: flex;
		flex-direction: column;

		.greet {
			font-size: $font-size-lg;
			margin-bottom: 10rpx;
		}

		.note {
			font-size: $font-size-sm;
		}
	}
}

.content {
	padding: 0 30rpx;
}

.entrance {
	position: relative;
	margin-top: -80rpx;
	margin-bottom: 30rpx;
	border-radius: 10rpx;
	background-color: #ffffff;
	box-shadow: $box-shadow;
	padding: 30rpx 0;
	display: flex;
	align-items: center;
	justify-content: center;

	.item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;

		&:nth-child(1):after {
			content: '';
			position: absolute;
			width: 1rpx;
			background-color: #ddd;
			right: 0;
			height: 100%;
			transform: scaleX(0.5) scaleY(0.8);
		}

		.icon {
			width: 84rpx;
			height: 84rpx;
			margin: 20rpx;
		}

		.title {
			font-size: 30rpx;
			color: $text-color-base;
			font-weight: 600;
		}
	}
}

.info {
	position: relative;
	margin-bottom: 30rpx;
	border-radius: 10rpx;
	background-color: #ffffff;
	box-shadow: $box-shadow;
	padding: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;

	.integral_section {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.top {
			display: flex;
			align-items: center;

			.title {
				color: $text-color-base;
				font-size: $font-size-base;
				margin-right: 10rpx;
			}
			.value {
				font-size: 44rpx;
				font-weight: bold;
			}
		}

		.bottom {
			font-size: $font-size-sm;
			color: $text-color-assist;
			display: flex;
			align-items: center;
		}
	}

	.qrcode_section {
		color: $color-primary;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-size-sm;

		image {
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 10rpx;
		}
	}
}

.navigators {
	width: 100%;
	margin-bottom: 20rpx;
	border-radius: 10rpx;
	background-color: #ffffff;
	box-shadow: $box-shadow;
	padding: 20rpx;
	display: flex;
	align-items: stretch;

	.left {
		width: 340rpx;
		margin-right: 20rpx;
		display: flex;
		padding: 0 20rpx;
		flex-direction: column;
		font-size: $font-size-sm;
		color: $text-color-base;
		background-color: #f2f2e6;

		.grid {
			height: 50%;
			display: flex;
		}
	}

	.right {
		width: 290rpx;
		display: flex;
		flex-direction: column;

		.tea-activity,
		.member-gifts {
			width: 100%;
			display: flex;
			padding: 20rpx;
			font-size: $font-size-sm;
			color: $text-color-base;
			align-items: center;
			position: relative;
		}

		.tea-activity {
			background-color: #fdf3f2;
			margin-bottom: 20rpx;
		}

		.member-gifts {
			background-color: #fcf6d4;
		}

		.right-img {
			flex: 1;
			position: relative;
			margin-left: 20rpx;
			margin-right: -20rpx;
			margin-bottom: -20rpx;
			display: flex;
			align-items: flex-end;

			image {
				width: 100%;
			}
		}
	}

	.mark-img {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.yzclh-img {
		height: 122.96rpx;
		width: 214.86rpx;
	}
}

.member-news {
	width: 100%;
	margin-bottom: 30rpx;
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;

		.title {
			font-size: $font-size-lg;
			font-weight: bold;
		}

		.iconfont {
			font-size: 52rpx;
			color: $text-color-assist;
		}
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;

		.item {
			width: 100%;
			height: 240rpx;
			position: relative;

			image {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}

			.title {
				position: relative;
				font-size: 32rpx;
				font-weight: 500;
				width: 100%;
				top: -70rpx;
				left: 16rpx;
				color: #ffffff;
			}
		}
	}
}
</style>
