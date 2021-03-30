Component({
	properties: {
		selected: {
			type: Number,
			value: 0
		},
		color: {
			type: String,
			value: '#989898'
		},
		selectedColor: {
			type: String,
			value: '#61B9E7'
		},
		fontSize: {
			type: Number,
			value: 26
		},
		borderStyle: {
			type: String,
			value: '#F8F7F8'
		},
		backgroundColor: {
			type: String,
			value: '#FFFEFF'
		},
		list: {
			type: Array,
			value: [{
				"pagePath": "/pages/customer/customer",
				"text": "首页",
				"iconPath": "/static/image/tabber/home.png",
				"selectedIconPath": "/static/image/tabber/home1.png"
			}, {
				"pagePath": "/pages/support/index",
				"text": "客服",
				"iconPath": "/static/image/tabber/kefu.png",
				"selectedIconPath": "/static/image/tabber/kefu1.png"
			}, {
				"pagePath": "/pages/user/user",
				"text": "我的",
				"iconPath": "/static/image/tabber/my.png",
				"selectedIconPath": "/static/image/tabber/my1.png"
			}]
		}
	},
	attached: function() {
		let temp = []
		switch (parseInt(wx.getStorageSync('role'))) {
			case 0:
				temp = [{
					"pagePath": "/pages/customer/customer",
					"text": "首页",
					"iconPath": "/static/image/tabber/home.png",
					"selectedIconPath": "/static/image/tabber/home1.png"
				}];
				break;
			case 1:
				temp = [{
					"pagePath": "/pages/driver/driver",
					"text": "司机",
					"iconPath": "/static/image/tabber/home.png",
					"selectedIconPath": "/static/image/tabber/home1.png"
				}];
				break;
			case 2:
				temp = [{
					"pagePath": "/pages/business/bill",
					"text": "账单检验",
					"iconPath": "/static/image/tabber/home.png",
					"selectedIconPath": "/static/image/tabber/home1.png"
				}, {
					"pagePath": "/pages/business/power",
					"text": "权限管理",
					"iconPath": "/static/image/tabber/home.png",
					"selectedIconPath": "/static/image/tabber/home1.png"
				}];
				break;
			case 3:
				temp = [{
					"pagePath": "/pages/inspect/inspect",
					"text": "通知",
					"iconPath": "/static/image/tabber/home.png",
					"selectedIconPath": "/static/image/tabber/home1.png"
				}];
				break;
			default:
				temp = [{
					"pagePath": "/pages/customer/customer",
					"text": "首页",
					"iconPath": "/static/image/tabber/home.png",
					"selectedIconPath": "/static/image/tabber/home1.png"
				}];
				break;
		}
		this.setData({
			list: [...temp, {
				"pagePath": "/pages/support/index",
				"text": "客服",
				"iconPath": "/static/image/tabber/kefu.png",
				"selectedIconPath": "/static/image/tabber/kefu1.png"
			}, {
				"pagePath": "/pages/user/user",
				"text": "我的",
				"iconPath": "/static/image/tabber/my.png",
				"selectedIconPath": "/static/image/tabber/my1.png"
			}]
		})
	},
	data: {
		statusBarHeight: getApp().globalData.statusBarHeight
	},
	observers: {
		list: function(val) {

		},
	},
	methods: {
		switchTab(e) {
			console.log(this.data.list);
			const {
				index,
				path
			} = e.currentTarget.dataset
			if (index === this.properties.selected) return
			wx.reLaunch({
				url: path
			})
			this.showItem(index, path)
		},
		showItem(idx, path) {
			this.setData({
				selected: idx
			});
			const detail = {
				idx,
				path
			};
			const option = {
				bubbles: true,
				composed: true
			};
			this.triggerEvent('onTap', detail, option);
		}
	}
})
