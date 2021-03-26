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
		var Orders = [
			{
				coupon_name: '',
				receive_at: 0,
				pay_mode: '微信支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1588937139,
				goods_num: 2,
				completed_at: 1588937139,
				created_at: 1588936782,
				invoice_status: 1,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: 0,
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1588936805,
				total_amount: '50.00',
				store: {
					address: '广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺',
					longitude: '113.804601',
					latitude: '22.678654',
					mobile: '075523224859',
					name: '福永同泰时代城店'
				},
				send_status: 0,
				discount: [],
				status: 5,
				completed_time: '2020-05-08 19:25:39',
				amount: '50.00',
				multi_store: '福永同泰时代城店',
				productioned_time: '2020-05-08 19:24:37',
				postscript: '打包',
				sort_num: '8093',
				order_no: 'ABCDEFGHIJKLMN0001',
				id: 1,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '去冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/03/19/630a810c8c7201c112.jpg',
						amount: '28.00',
						name: '霸气葡萄'
					},
					{
						number: 1,
						originAmount: '22.00',
						price: '22.00',
						unit: '件',
						property: '标准冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/03/27/8d4a1edb7c9e2d6554.jpg',
						amount: '28.00',
						name: '霸气葡萄'
					}
				]
			},
			{
				coupon_name: '',
				receive_at: 0,
				pay_mode: '微信支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1588682566,
				goods_num: 3,
				completed_at: 1588682566,
				created_at: 1588682001,
				invoice_status: 0,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: 0,
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1588682014,
				total_amount: '73.00',
				store: {
					address: '广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺',
					longitude: '113.804601',
					latitude: '22.678654',
					mobile: '075523224859',
					name: '福永同泰时代城店'
				},
				send_status: 0,
				discount: [],
				status: 5,
				completed_time: '2020-05-05 20:42:46',
				amount: '73.00',
				multi_store: '福永同泰时代城店',
				productioned_time: '2020-05-05 20:38:49',
				postscript: '打包',
				sort_num: '8145',
				order_no: 'ABCDEFGHIJKLMN0002',
				id: 2,
				typeCate: 2,
				goods: [
					{
						number: 1,
						originAmount: '27.00',
						price: '27.00',
						unit: '件',
						property: '标准,标准（冰沙）,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/79187a01f23e6f1e66.jpg',
						amount: '27.00',
						name: '杨枝甘露宝藏茶'
					},
					{
						number: 1,
						originAmount: '29.00',
						price: '29.00',
						unit: '件',
						property: '标准(芝士),标准冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg',
						amount: '29.00',
						name: '霸气芝士芒果'
					},
					{
						number: 1,
						originAmount: '17.00',
						price: '17.00',
						unit: '件',
						property: '去冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/333b43719bd81f4e00.jpg',
						amount: '17.00',
						name: '霸气绿柠檬'
					}
				]
			},
			{
				coupon_name: '',
				receive_at: 0,
				pay_mode: '微信支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1587818906,
				goods_num: 2,
				completed_at: 1587818906,
				created_at: 1587817016,
				invoice_status: 0,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: 0,
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1587817024,
				total_amount: '43.00',
				store: {
					address: '广东省深圳市宝安区深圳市宝安区西乡街道码头路新湖路海城路合围处宝安大仟里购物中心一楼L111-L112号铺（奈雪的茶）',
					longitude: '113.87243',
					latitude: '22.56995',
					mobile: '18124071450',
					name: '宝安大仟里店'
				},
				send_status: 0,
				discount: [],
				status: 5,
				completed_time: '2020-04-25 20:48:26',
				amount: '43.00',
				multi_store: '福永同泰时代城店',
				productioned_time: '2020-04-25 20:20:16',
				postscript: '打包',
				sort_num: '8025',
				order_no: 'ABCDEFGHIJKLMN0003',
				id: 3,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '22.00',
						price: '22.00',
						unit: '件',
						property: '标准冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/03/27/bac6a6e8b23fd3b30e.jpg',
						amount: '22.00',
						name: '芝士奈雪金色山脉'
					},
					{
						number: 1,
						originAmount: '21.00',
						price: '21.00',
						unit: '件',
						property: '去冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/03/27/369520a40d39e0ac11.jpg',
						amount: '21.00',
						name: '芝士茉莉初雪'
					}
				]
			},
			{
				coupon_name: '优惠券：省28元',
				receive_at: 0,
				pay_mode: '微信支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1585055587,
				goods_num: 3,
				completed_at: 1585055587,
				created_at: 1585055310,
				invoice_status: 0,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: '28.00',
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1587817024,
				total_amount: '84.00',
				store: {
					address: '广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺',
					longitude: '113.804601',
					latitude: '22.678654',
					mobile: '075523224859',
					name: '福永同泰时代城店'
				},
				send_status: 0,
				discount: [
					{
						summary: '优惠券：省28.00元，茶饮满二赠一券',
						amount: '28.00',
						method: 'coupon',
						order_no: 'D5E7A064EA50054115',
						name: '茶饮满二赠一券',
						data_id: '420000007885550000'
					}
				],
				status: 5,
				completed_time: '2020-03-24 21:13:07',
				amount: '56.00',
				multi_store: '福永同泰时代城店',
				productioned_time: '2020-03-24 21:12:13',
				postscript: '打包',
				sort_num: '8106',
				order_no: 'ABCDEFGHIJKLMN0004',
				id: 4,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '标准(芝士),去冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg',
						amount: '28.00',
						name: '霸气芝士芒果'
					},
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '标准(芝士),冰沙,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg',
						amount: '28.00',
						name: '霸气芝士芒果'
					},
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '标准(芝士),冰沙,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/1cb88e6cd2fbcefb2a.jpg',
						amount: '28.00',
						name: '霸气芝士草莓'
					}
				]
			},
			{
				coupon_name: '',
				receive_at: 0,
				pay_mode: '标记支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1581962231,
				goods_num: 2,
				completed_at: 1571556377,
				created_at: 1571555358,
				invoice_status: 0,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: 0,
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1571555358,
				total_amount: '48.00',
				store: {
					address: '广东省深圳市宝安区深圳市宝安区新安街道宝安中心区新湖路99号壹方城B1层017、019号商铺',
					longitude: '113.886497',
					latitude: '22.55278',
					mobile: '17881400084',
					name: '壹方城店'
				},
				send_status: 0,
				discount: [],
				status: 5,
				completed_time: '2019-10-20 15:26:17',
				amount: '48.00',
				productioned_time: '2019-10-20 15:17:54',
				postscript: '打包',
				sort_num: '50347',
				order_no: 'ABCDEFGHIJKLMN0005',
				id: 5,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '20.00',
						price: '20.00',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/28/94d8440ab7b4fed802.jpg',
						amount: '20.00',
						name: '草莓魔法棒'
					},
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						image: 'https://img-shop.qmimg.cn/s23107/2019/09/04/d34eb836a41b6bb856.jpg',
						amount: '28.00',
						name: '报款红石榴'
					}
				]
			},
			{
				coupon_name: '优惠券：省28元',
				receive_at: 0,
				pay_mode: '微信支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1585055587,
				goods_num: 3,
				completed_at: 1585055587,
				created_at: 1585055310,
				invoice_status: 0,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: '28.00',
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1587817024,
				total_amount: '84.00',
				store: {
					address: '广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺',
					longitude: '113.804601',
					latitude: '22.678654',
					mobile: '075523224859',
					name: '福永同泰时代城店'
				},
				send_status: 0,
				discount: [
					{
						summary: '优惠券：省28.00元，茶饮满二赠一券',
						amount: '28.00',
						method: 'coupon',
						order_no: 'D5E7A064EA50054115',
						name: '茶饮满二赠一券',
						data_id: '420000007885550000'
					}
				],
				status: 5,
				completed_time: '2020-03-24 21:13:07',
				amount: '56.00',
				multi_store: '福永同泰时代城店',
				productioned_time: '2020-03-24 21:12:13',
				postscript: '打包',
				sort_num: '8106',
				order_no: 'ABCDEFGHIJKLMN0006',
				id: 6,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '标准(芝士),去冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg',
						amount: '28.00',
						name: '霸气芝士芒果'
					},
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '标准(芝士),冰沙,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg',
						amount: '28.00',
						name: '霸气芝士芒果'
					},
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '标准(芝士),冰沙,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/1cb88e6cd2fbcefb2a.jpg',
						amount: '28.00',
						name: '霸气芝士草莓'
					}
				]
			},
			{
				coupon_name: '',
				receive_at: 0,
				pay_mode: '微信支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1587818906,
				goods_num: 2,
				completed_at: 1587818906,
				created_at: 1587817016,
				invoice_status: 0,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: 0,
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1587817024,
				total_amount: 43,
				store: {
					address: '广东省深圳市宝安区深圳市宝安区西乡街道码头路新湖路海城路合围处宝安大仟里购物中心一楼L111-L112号铺（奈雪的茶）',
					longitude: '113.87243',
					latitude: '22.56995',
					mobile: '18124071450',
					name: '宝安大仟里店'
				},
				send_status: 0,
				discount: [],
				status: 5,
				completed_time: '2020-04-25 20:48:26',
				amount: 43,
				multi_store: '福永同泰时代城店',
				productioned_time: '2020-04-25 20:20:16',
				postscript: '打包',
				sort_num: '8025',
				order_no: 'ABCDEFGHIJKLMN0007',
				id: 7,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '22.00',
						price: '22.00',
						unit: '件',
						property: '标准冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/03/27/bac6a6e8b23fd3b30e.jpg',
						amount: '22.00',
						name: '芝士奈雪金色山脉'
					},
					{
						number: 1,
						originAmount: '21.00',
						price: '21.00',
						unit: '件',
						property: '去冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/03/27/369520a40d39e0ac11.jpg',
						amount: '21.00',
						name: '芝士茉莉初雪'
					}
				]
			},
			{
				coupon_name: '',
				receive_at: 0,
				pay_mode: '微信支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1588682566,
				goods_num: 3,
				completed_at: 1588682566,
				created_at: 1588682001,
				invoice_status: 0,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: 0,
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1588682014,
				total_amount: 73,
				store: {
					address: '广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺',
					longitude: '113.804601',
					latitude: '22.678654',
					mobile: '075523224859',
					name: '福永同泰时代城店'
				},
				send_status: 0,
				discount: [],
				status: 5,
				completed_time: '2020-05-05 20:42:46',
				amount: 73,
				multi_store: '福永同泰时代城店',
				productioned_time: '2020-05-05 20:38:49',
				postscript: '打包',
				sort_num: '8145',
				order_no: 'ABCDEFGHIJKLMN0008',
				id: 8,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '27.00',
						price: '27.00',
						unit: '件',
						property: '标准,标准（冰沙）,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/79187a01f23e6f1e66.jpg',
						amount: '27.00',
						name: '杨枝甘露宝藏茶'
					},
					{
						number: 1,
						originAmount: '29.00',
						price: '29.00',
						unit: '件',
						property: '标准(芝士),标准冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg',
						amount: '29.00',
						name: '霸气芝士芒果'
					},
					{
						number: 1,
						originAmount: '17.00',
						price: '17.00',
						unit: '件',
						property: '去冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/333b43719bd81f4e00.jpg',
						amount: '17.00',
						name: '霸气绿柠檬'
					}
				]
			},
			{
				coupon_name: '',
				receive_at: 0,
				pay_mode: '标记支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1581962231,
				goods_num: 2,
				completed_at: 1571556377,
				created_at: 1571555358,
				invoice_status: 0,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: 0,
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1571555358,
				total_amount: '48.00',
				store: {
					address: '广东省深圳市宝安区深圳市宝安区新安街道宝安中心区新湖路99号壹方城B1层017、019号商铺',
					longitude: '113.886497',
					latitude: '22.55278',
					mobile: '17881400084',
					name: '壹方城店'
				},
				send_status: 0,
				discount: [],
				status: 5,
				completed_time: '2019-10-20 15:26:17',
				amount: '48.00',
				productioned_time: '2019-10-20 15:17:54',
				postscript: '打包',
				sort_num: '50347',
				order_no: 'ABCDEFGHIJKLMN0009',
				id: 9,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '20.00',
						price: '20.00',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/28/94d8440ab7b4fed802.jpg',
						amount: '20.00',
						name: '草莓魔法棒'
					},
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						image: 'https://img-shop.qmimg.cn/s23107/2019/09/04/d34eb836a41b6bb856.jpg',
						amount: '28.00',
						name: '报款红石榴'
					}
				]
			},
			{
				coupon_name: '',
				receive_at: 0,
				pay_mode: '微信支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1588937139,
				goods_num: 2,
				completed_at: 1588937139,
				created_at: 1588936782,
				invoice_status: 1,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: 0,
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1588936805,
				total_amount: 50,
				store: {
					address: '广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺',
					longitude: '113.804601',
					latitude: '22.678654',
					mobile: '075523224859',
					name: '福永同泰时代城店'
				},
				send_status: 0,
				discount: [],
				status: 5,
				completed_time: '2020-05-08 19:25:39',
				amount: 50,
				multi_store: '福永同泰时代城店',
				productioned_time: '2020-05-08 19:24:37',
				postscript: '打包',
				sort_num: '8093',
				order_no: 'ABCDEFGHIJKLMN0010',
				id: 10,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '去冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/03/19/630a810c8c7201c112.jpg',
						amount: '28.00',
						name: '霸气葡萄'
					},
					{
						number: 1,
						originAmount: '22.00',
						price: '22.00',
						unit: '件',
						property: '标准冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/03/27/8d4a1edb7c9e2d6554.jpg',
						amount: '28.00',
						name: '霸气葡萄'
					}
				]
			},
			{
				coupon_name: '',
				receive_at: 0,
				pay_mode: '微信支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1587818906,
				goods_num: 2,
				completed_at: 1587818906,
				created_at: 1587817016,
				invoice_status: 0,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: 0,
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1587817024,
				total_amount: 43,
				store: {
					address: '广东省深圳市宝安区深圳市宝安区西乡街道码头路新湖路海城路合围处宝安大仟里购物中心一楼L111-L112号铺（奈雪的茶）',
					longitude: '113.87243',
					latitude: '22.56995',
					mobile: '18124071450',
					name: '宝安大仟里店'
				},
				send_status: 0,
				discount: [],
				status: 5,
				completed_time: '2020-04-25 20:48:26',
				amount: 43,
				multi_store: '福永同泰时代城店',
				productioned_time: '2020-04-25 20:20:16',
				postscript: '打包',
				sort_num: '8025',
				order_no: 'ABCDEFGHIJKLMN0011',
				id: 11,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '22.00',
						price: '22.00',
						unit: '件',
						property: '标准冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/03/27/bac6a6e8b23fd3b30e.jpg',
						amount: '22.00',
						name: '芝士奈雪金色山脉'
					},
					{
						number: 1,
						originAmount: '21.00',
						price: '21.00',
						unit: '件',
						property: '去冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2020/03/27/369520a40d39e0ac11.jpg',
						amount: '21.00',
						name: '芝士茉莉初雪'
					}
				]
			},
			{
				coupon_name: '优惠券：省28元',
				receive_at: 0,
				pay_mode: '微信支付',
				pay_user_name: 'tinypuppet',
				updated_at: 1585055587,
				goods_num: 3,
				completed_at: 1585055587,
				created_at: 1585055310,
				invoice_status: 0,
				sended_time: 0,
				status_text: '已完成',
				remark: '',
				coupon_amount: '28.00',
				mobile: '18666600000',
				user_name: 'tinypuppet',
				payed_at: 1587817024,
				total_amount: '84.00',
				store: {
					address: '广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺',
					longitude: '113.804601',
					latitude: '22.678654',
					mobile: '075523224859',
					name: '福永同泰时代城店'
				},
				send_status: 0,
				discount: [
					{
						summary: '优惠券：省28.00元，茶饮满二赠一券',
						amount: '28.00',
						method: 'coupon',
						order_no: 'D5E7A064EA50054115',
						name: '茶饮满二赠一券',
						data_id: '420000007885550000'
					}
				],
				status: 5,
				completed_time: '2020-03-24 21:13:07',
				amount: '56.00',
				multi_store: '福永同泰时代城店',
				productioned_time: '2020-03-24 21:12:13',
				postscript: '打包',
				sort_num: '8106',
				order_no: 'ABCDEFGHIJKLMN0012',
				id: 12,
				typeCate: 1,
				goods: [
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '标准(芝士),去冰,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg',
						amount: '28.00',
						name: '霸气芝士芒果'
					},
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '标准(芝士),冰沙,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg',
						amount: '28.00',
						name: '霸气芝士芒果'
					},
					{
						number: 1,
						originAmount: '28.00',
						price: '28.00',
						unit: '件',
						property: '标准(芝士),冰沙,标准糖',
						image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/1cb88e6cd2fbcefb2a.jpg',
						amount: '28.00',
						name: '霸气芝士草莓'
					}
				]
			}
		];
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
