/* 
  http请求封装
  使用wx.request
 */
import common from '../assets/js/common.js'
import store from '../store/index.js'
const baseUrl = 'https://app.dmk99.com'
/* 
一般请求接口
参数： {
	  url->api名称,首字符'/'自动补全
	  data->参数对象
	  loading->只有传false时取消loading样式
	  loadingStr->请求时的提示文字，默认为'加载中...'
	  method->请求方式，默认为'POST'
  } 
 */
const api = ({
	url,
	data,
	loading,
	loadingStr,
	method
}) => {
	const URL = url.charAt(0) === '/' ? url : `/${url}`
	if (loading !== false) {
		wx.showLoading({
			title: loadingStr || '加载中...',
			mask: true
		})
	}
	return new Promise((resolve, reject) => {
		wx.request({
			url: baseUrl + URL,
			method: method || 'POST',
			timeout: 15 * 1000,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				...data,
				myID: store.state.userInfo ? store.state.userInfo.myID : '',
				appTruePass: store.state.userInfo ? store.state.userInfo.appTruePass : ''
			},
			success: (res) => {
				wx.hideLoading()
				const {
					statusCode,
					data
				} = res
				if (statusCode !== 200) {
					common.$toast({
						title: '网络加载失败，请检查网络'
					})
				} else if (data.code === 200 || data.code === 100) {
					resolve(data)
				} else if (data.code === 502) {
					store.state.userInfo = ''
					// 重定向到登录页
					common.$toast({
						title: '登录已失效，请重新登录',
						icon: 'fail',
						duration: 1.5 * 1000,
						complete: () => {
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/login/index'
								})
							}, 1.5 * 1000)
						}
					})
					reject(false)
				} else {
					common.$toast({
						title: data.msg
					})
					resolve(false)
				}
			},
			fail: (err) => {
				wx.hideLoading()
				console.error(err)
				common.$toast({
					title: '网络加载失败，请检查网络'
				})
				reject(false)
			}
		})
	})
}

const uploadImg = (path) => {
	wx.showLoading({
		title: '图片上传中...',
		mask: true
	})
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseUrl + '/app/common/uploadImg',
			filePath: path,
			name: 'file',
			fileType: 'image',
			success(res) {
				wx.hideLoading()
				const {
					code,
					msg,
					data
				} = JSON.parse(res.data)
				if (code) {
					uni.showToast({
						title: msg,
						icon: 'success'
					})
					resolve(data.url)
				} else {
					uni.showToast({
						title: msg
					})
					reject(false)
				}
			},
			fail(err) {
				wx.hideLoading()
				console.error(err)
				uni.showToast({
					title: '图片上传失败，请重试'
				})
				reject(false)
			}
		})
	})
}

export {
	api,
	uploadImg
}
