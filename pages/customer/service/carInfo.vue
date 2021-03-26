<template>
	<view style="position: relative;width: 100%;height: 100%;">
		<view class="info-card cu-card shadow-warp">
			<view class="cu-form-group">
				品牌
				<input class="text-right" placeholder="可选择垫付比例" name="input" />
				<text class="cuIcon-right text-gray"></text>
			</view>
			<view class="cu-form-group">
				车牌号
				<input class="text-right" placeholder="车辆车牌号" name="input" />
				<text class="cuIcon-right text-gray"></text>
			</view>
			<view class="cu-form-group">
				<view class="action">颜色</view>
				<view class="action">
					<view class="padding-sm flex flex-wrap">
						<view class="padding-xs" v-for="(item, index) in colorTypes" :key="index" v-if="item.name != 'gray'">
							<view @click="chooseColor(item, index)" class="cu-tag" :class="'bg-' + item.name + ' ' + (colorIndex == index && 'color')">{{ item.title }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="info-card cu-card shadow-warp">
			<view class="cu-form-group align-start">
				<view class="title">粘贴识别</view>
				<textarea maxlength="-1" :disabled="modalName != null" @input="textareaBInput" placeholder="智能识别"></textarea>
			</view>
		</view>
		<view class="info-card cu-card shadow-warp">
			<view class="cu-form-group" @click="choose">
				<view class="">
					<text class="cuIcon-camerafill text-blue margin-right-xs"></text>
					粘贴识别
				</view>
				<text class="cuIcon-right text-gray"></text>
			</view>
		</view>
		<view style="position: absolute;bottom: 0;height: 160rpx;width: 100%;border-radius: 20rpx 20rpx 0 0;" class="flex flex-direction bg-white align-center">
			<button style="width: 93%;" class="cu-btn bg-blue lg margin-top-sm" @click="submit">保存</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			colorType: {},
			colorIndex: -1,
			colorTypes: [
				{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				}
			]
		};
	},
	methods: {
		chooseColor(item, index) {
			this.colorType = item;
			this.colorIndex = index;
		},
		submit() {
			console.log(this.colorType);
		},
		choose() {
			uni.chooseImage({
				count: 6, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					console.log(JSON.stringify(res.tempFilePaths));
				}
			});
		}
	}
};
</script>

<style>
.info-card {
	width: 93%;
	margin: 0 auto;
	margin-top: 25rpx;
	border-radius: 25rpx;
}
.color {
	border: 2px solid red;
}
</style>
