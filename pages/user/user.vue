<template>
	<view>
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg">
				<view class="cu-avatar xl round box-headImg" @click="goMyInfo" v-if="userInfo" :style="{ backgroundImage: 'url(' + userInfo.avatarUrl + ')' }"></view>
				<view class="cu-avatar xl round box-headImg" style="background-image: url(https://kshht.gzmsdw.cn/imge_zsyy/html/my/mine_def_touxiang_3x.png);" v-else></view>
				<view class="box-login" v-if="userInfo" @click="goMyInfo">{{ userInfo.nickname }}</view>
				<view class="box-login" @tap="login" v-else>未登录</view>
				<image v-if="role == 1 || role == '1'" src="https://kshht.gzmsdw.cn/imge_zsyy/html/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>
			<view v-if="role == 1 || role == '1'" class="padding flex text-center text-grey bg-white shadow-warp">
				<view @tap="goMyBalance" class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-orange">1230</view>
					<view class="margin-top-sm">接单数量</view>
				</view>
				<view @tap="goMyCoupon" class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-blue">12小时</view>
					<view class="margin-top-sm">今日工时</view>
				</view>
				<view @tap="goMyMonth" class="flex flex-sub flex-direction">
					<view class="text-xxl text-green">365小时</view>
					<view class="margin-top-sm">累计工时</view>
				</view>
			</view>
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				<view class="cu-item arrow">
					<!-- #ifdef MP-ALIPAY -->
					<view class="content" style="display: flex;" @click="goMyOrder">
						<view class="aliView"><image src="../../static/image/user/dingdan.png" class="png" mode="aspectFit"></image></view>
						<text class="text-grey">我的订单</text>
					</view>
					<!-- #endif -->

					<!-- #ifdef MP-WEIXIN -->
					<navigator class="content" @click="goMyOrder" hover-class="none">
						<image src="../../static/image/user/dingdan.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">我的订单</text>
					</navigator>
					<!-- #endif -->
				</view>
			</view>

			<!-- #ifdef  MP-ALIPAY -->
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				<view class="cu-item arrow" v-for="(item, index) of menuList" :key="index">
					<view class="content" style="display: flex;" @click="goLowerlevel(item.name)" hover-class="none">
						<view class="aliView"><image :src="item.imgUrl" class="png" mode="widthFix"></image></view>
						<!-- <text class="cuIcon-github text-grey"></text> -->
						<text class="text-grey">{{ item.name }}</text>
					</view>
				</view>
			</view>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				<view class="cu-item arrow" v-for="(item, index) of menuList" :key="index">
					<navigator class="content" @click="goLowerlevel(item.name)" hover-class="none">
						<image :src="item.imgUrl" class="png" mode="aspectFit"></image>
						<!-- <text class="cuIcon-github text-grey"></text> -->
						<text class="text-grey">{{ item.name }}</text>
					</navigator>
				</view>
			</view>

			<!-- #endif -->

			<view class="cu-tabbar-height"></view>
			<van-dialog show-cancel-button use-slot title="请选择切换的身份" @close="closeDialog" :show="dialogShow" @confirm="switchRole">
				<view style="margin: 20rpx 0;" class="cu-form-group">
					<view class="title">当前身份：</view>
					<picker @change="pickerChange" :value="index" :range="roles">
						<view class="picker">{{ roles[role] }}</view>
					</picker>
				</view>
			</van-dialog>
		</scroll-view>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
// #ifdef MP-WEIXIN
import vanDialog from '@/wxcomponents/vant/dialog/index';
// #endif
// #ifdef MP-ALIPAY
import vanDialog from '@/components/vant/dialog/index';
// #endif
export default {
	components: {
		uniNavBar,
		vanDialog
	},
	data() {
		return {
			statusID: false,
			userInfo: {},
			status: false,
			balance: 0,
			token: '',
			couponNum: 0,
			isMyMonth: 0,
			dialogShow: false,
			unit: null,
			item: null,
			role: 0,
			roles: ['用户', '司机', '商家', '验车员'],
			menuList: [
				{
					name: '地址管理',
					imgUrl: '../../static/image/user/dizhi.png'
				},
				{
					name: '切换身份',
					imgUrl: '../../static/image/user/shenfen.png'
				},
				/*{
						name: '我的物业',
						imgUrl: 'https://kshht.gzmsdw.cn/imge_zsyy/html/我的物业.png'
					},
				{
					name: '我的审核',
					imgUrl: 'https://kshht.gzmsdw.cn/imge_zsyy/html/我的审核.png'
				},*/
				{
					name: '发票申请',
					imgUrl: '../../static/image/user/fapiao.png'
				},
				/*{
						name: '无感支付',
						imgUrl: 'https://kshht.gzmsdw.cn/imge_zsyy/html/无感支付.png'
					},*/
				{
					name: '问题帮助',
					imgUrl: '../../static/image/user/wenti.png'
				},
				{
					name: '关于我们',
					imgUrl: '../../static/image/user/guanyu.png'
				},
				{
					name: '设置',
					imgUrl: '../../static/image/user/shezhi.png'
				}
			]
		};
	},
	onShow() {
		this.setTabBarIndex(2);
		this.userInfo = uni.getStorageSync('userInfo');
		this.role = uni.getStorageSync('role');
	},
	methods: {
		pickerChange(e) {
			this.role = e.detail.value;
		},
		closeDialog() {
			this.dialogShow = false;
		},
		switchRole() {
			wx.setStorageSync('role', this.role);
			uni.reLaunch({
				url: '/pages/user/user'
			});
			uni.showToast({
				icon: 'success',
				title: '更换成功'
			});
			this.dialogShow = false;
		},
		/* 跳转到我的信息 */
		goMyInfo() {
			uni.navigateTo({
				url: 'myInfo'
			});
		},
		goLowerlevel(name) {
			switch (name) {
				case '地址管理':
					uni.navigateTo({
						url: 'address/address'
					});
					/*if (this.isLogin()) {
						uni.navigateTo({
							url: '../../pagesB/user/info/vehicleBinding/cardList'
						});
					}*/
					break;
				case '关于我们':
					uni.navigateTo({
						url: 'about'
					});
					/*if (this.isLogin()) {
						uni.navigateTo({
							url: '../pay/payArray'
						});
					}*/
					break;
				case '我的审核':
					if (this.isLogin()) {
						uni.navigateTo({
							url: '../proper/myAudit'
						});
					}
					break;
				case '发票申请':
					if (this.isLogin()) {
						uni.navigateTo({
							url: '../../pagesA/home/home-nextPage/invoice'
						});
					}
					break;
				case '我的消息':
					if (this.isLogin()) {
						uni.navigateTo({
							url: '../../pagesB/user/msg/msg'
						});
					}
					break;
				case '切换身份':
					this.dialogShow = true;
					this.role = uni.getStorageSync('role') ? parseInt(uni.getStorageSync('role')) : 0;
					break;
				case '我的物业':
					if (this.isLogin()) {
						uni.navigateTo({
							url: '../../pagesB/user/info/proper'
						});
					}
					break;
				case '问题帮助':
					uni.navigateTo({
						url: 'help/help-center'
					});
					break;
				case '设置':
					uni.navigateTo({
						url: './setting/index'
					});
					break;
			}
		},
		/* 跳转到我的订单 */
		goMyOrder() {
			uni.navigateTo({
				url: '../customer/order/order'
			});
			/*if (this.isLogin()) {
				uni.navigateTo({
					url: '../../pagesB/user/myServices'
				});
			}*/
		},
		/* 跳转到我的包月 */
		goMyMonth() {
			if (this.isLogin()) {
				if (this.isMyMonth == 0) {
					uni.showToast({
						title: '你还没有开通任何包月服务,赶紧去开通吧~~',
						icon: 'none'
					});
				} else {
					uni.navigateTo({
						url: '../../pagesB/user/myMonth/myMonth'
					});
				}
			}
		},
		//获取用户包月信息
		getMyMonthInfo() {
			this.$req.request({
				url: 'api/ticket/findMyMonthTicketList',
				method: 'get',
				data: {
					parkCode: ''
				},
				success: res => {
					if (res.data.code == 200) {
						if (res.data.data.length > 0) {
							this.isMyMonth = 1;
						} else {
							this.isMyMonth = 0;
						}
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				},
				complete: data => {}
			});
		},
		/* 去我的优惠券 */
		goMyCoupon() {
			if (this.isLogin()) {
				uni.navigateTo({
					url: '../../pagesB/user/coupons/coupons'
				});
			}
		},
		/* 优惠券 未使用 */
		getUserCoupon() {
			this.$req.request({
				url: 'api/coupon/getUserCoupons',
				data: {
					status: 1
				},
				success: res => {
					if (res.data.code == 200) {
						this.couponNum = res.data.data.length;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				},
				complete: data => {}
			});
		},
		/* 查询余额 */
		getMyBlance() {
			this.$req.request({
				url: 'api/user/getUserBalance',
				method: 'get',
				success: res => {
					if (res.data.code == 200) {
						this.balance = res.data.data;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				},
				complete: data => {
					uni.hideLoading();
				}
			});
		},
		/* 跳转到我的余额 */
		goMyBalance() {
			if (this.isLogin()) {
				uni.navigateTo({
					url: '../../pagesB/user/info/balance?balance=' + this.balance
				});
			}
		},
		login() {
			if (this.statusID) {
				var SuserInfo = uni.getStorageSync('userList');
				this.token = SuserInfo.accessToken;
				this.$req.request({
					url: 'api/user/logout',
					success: data => {
						if (data.data.code == 200) {
							uni.removeStorageSync('userInfo');
							uni.clearStorageSync();
							uni.showToast({
								title: '退出成功',
								icon: 'none',
								success: data => {
									this.statusID = false;
								}
							});
						} else {
							uni.showToast({
								title: data.data.msg,
								icon: 'none'
							});
						}
					},
					complete: data => {}
				});
			} else {
				uni.navigateTo({
					url: './login/login'
				});
			}
		}
	},
	filters: {
		numFilter(value) {
			// 截取当前数据到小数点后两位
			let realVal = parseFloat(value).toFixed(2);
			return realVal;
		}
	}
};
</script>
<style>
/* #ifdef  MP-ALIPAY */
page {
	overflow: auto;
}

.aliView {
	width: 50rpx;
	height: 50rpx;
	margin-right: 10rpx;
}

/* #endif */

.UCenter-bg {
	background-image: url('https://kshht.gzmsdw.cn/imge_zsyy/html/my/mine_bg_3x.png');
	background-size: cover;
	height: 400rpx;
	display: flex;
	justify-content: center;
	padding-top: 40rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.content image {
	vertical-align: middle;
}

.box-login {
	width: 200rpx;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
}

.UCenter-bg text {
	opacity: 0.8;
}

.UCenter-bg image {
	width: 200rpx;
	height: 200rpx;
}

.UCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

map,
.mapBox {
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

map,
.mapBox {
	width: 750rpx;
	height: 300rpx;
}
</style>
