<script>
export default {
	globalData: {
		statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
		message: ''
	},
	onLaunch: function(options) {
		uni.loadFontFace({
			family: 'pingfang',
			source: 'url("https://kshht.gzmsdw.cn/imge_zsyy/html/font/PingFang.ttf")'
		});
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function(res) {
			if (res.hasUpdate) {
				updateManager.onUpdateReady(function(result) {
					uni.showModal({
						title: '更新提示',
						content: '发现新版本，是否重启应用?',
						cancelColor: '#eeeeee',
						confirmColor: '#FF0000',
						success(result) {
							if (result.confirm) {
								updateManager.applyUpdate();
							} else {
								updateManager.applyUpdate();
							}
						}
					});
				});
			}
		});
		updateManager.onUpdateFailed(function(res) {
			uni.showModal({
				title: '提示',
				content: '检查到有新版本，但下载失败，请检查网络设置',
				success(res) {
					if (res.confirm) {
						updateManager.applyUpdate();
					}
				}
			});
		});
	}
};
</script>

<style>
@import '/wxcomponents/vant/common/index.wxss';
/*每个页面公共css */
@import 'colorui/main.css';
@import 'colorui/icon.css';

/*每个页面公共css */
page {
	height: 100%;
	font-family: pingfang, Avenir, Helvetica, Arial, sans-serif;
}

.content {
	height: 100%;
}

.uList {
	padding: 0rpx;
	display: block;
	margin-top: 5upx;
}

.uList .uniListItem {
	color: #1c1c1c;
	font-size: 30px;
	/*font-weight: 600;*/
}
</style>
