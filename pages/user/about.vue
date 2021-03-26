<template>
	<view class="">
		<map class="box" id="myMap" :markers="marker" :longitude="location.longitude" :latitude="location.latitude" scale="16" show-location></map>
		<view class="content">
			<view style="text-align: left;" class="cu-bar">
				<view class="action sub-title ">
					<text class="text-xl text-bold text-green">关于我们</text>
					<text class="bg-green" style="width:2rem"></text>
				</view>
			</view>
			<view @click="phoneCall('17785763600')" style="justify-content: left;" class="cu-form-group">
				物流咨询：
				<text class="text-blue">17785763600</text>
				（陈）
			</view>
			<view @click="phoneCall('17099056666')" style="justify-content: left;" class="cu-form-group">
				维权投诉：
				<text class="text-blue">17099056666</text>
				（何）
			</view>
			<view @click="phoneCall('15692719976')" style="justify-content: left;" class="cu-form-group">
				汽车资源：
				<text class="text-blue">15692719976</text>
				（赵）
			</view>
			<view @click="phoneCall('17585152751')" style="justify-content: left;" class="cu-form-group">
				在途查询：
				<text class="text-blue">17585152751</text>
				（杨）
			</view>
			<view @click="phoneCall('0851-88236927')" style="justify-content: left;" class="cu-form-group">
				金融咨询：
				<text class="text-blue">0851-88236927</text>
			</view>
			<view class="cu-form-group">公司地址：贵阳市白云区云环东路与同城南路交叉路口往东南约100米(贵州融鹰塑业科技有限公司南侧)</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			location: {
				longitude: '106.687694',
				latitude: '26.696929'
			},
			marker: [
				{
					title: '贵达物流',
					id: 0,
					latitude: '26.696929',
					longitude: '106.687694',
					iconPath: '../../static/image/user/address.png',
					width: 20,
					height: 25,
					callout: {
						content: '贵达物流',
						display: 'ALWAYS'
					}
				}
			]
		};
	},
	methods: {
		phoneCall(num) {
			uni.makePhoneCall({
				phoneNumber: num
			});
		}
	}
};
</script>

<style>
page {
	background-color: #ffffff;
}
.box {
	height: 400rpx;
	width: 100%;
}
</style>
