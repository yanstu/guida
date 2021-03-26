const baseurl = 'http://95rkch.natappfree.cc/'

// 请求封装
function request(obj, api) {
	let accessToken = uni.getStorageSync('userInfo').accessToken
	let url = baseurl + api; //地址
	let data = obj.data || {};
	let success = obj.success;
	let fail = obj.fail || console.log;
	let complete = obj.complete;
	let method = obj.method || 'GET';
	let content = obj.header == 'json' ? 'application/json; charset=UTF-8' :
		'application/x-www-form-urlencoded; charset=UTF-8'
	uni.request({
		url,
		data,
		method,
		header: {
			accessToken,
			'Content-Type': content,
		},
		success: (res) => {
			success(res)
		},
		fail: err => {
			fail(err)
		},
		complete: (data) => {
			complete(data)
		}
	})
}

function synchro(obj, api) {
	return new Promise((resolve, reject) => {
		request({
			success: (res) => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
			complete: (data) => {}
		}, api);
	});
}

export default {
	request: request,
	synchro: synchro
};
