/* 
 * 一些公用方法 
 */
import {uploadImg, api} from '../../api/request.js'
import store from '../../store/index.js'
export default {
	getShopCard() {
		return new Promise((resolve, reject) => {
			api({
				url: 'cart/list.php',
				loading: false
			}).then(res => {
				if(res.code) {
					store.commit('setShopCardList', res.data)
					resolve(res.data || [])
				} else {
					resolve(false)
				}
			}).catch(err => {
				console.error(err)
				resolve(false)
			})
		})
	},
	getUserInfo() {
		return new Promise((resolve, reject) => {
			api({
				url: 'user/index.php',
				loading: false
			}).then(res => {
				if(res.code) {
					store.commit('setMyInfo', res.data)
					resolve(res.data || [])
				} else {
					resolve(false)
				}
			}).catch(err => {
				console.error(err)
				resolve(false)
			})
		})
	},
	getAddressList() {
		return new Promise((resolve, reject) => {
			api({
				url: 'user/address/list.php',
				loading: false
			}).then(res => {
				if(res.code) {
					store.commit('setAddressList', res.data)
					resolve(res.data || [])
				} else {
					resolve(false)
				}
			}).catch(err => {
				console.error(err)
				resolve(false)
			})
		})
	},
	toast(msg, Fun) {
		uni.showToast({
			icon: 'none',
			title: msg,
		})
		setTimeout(e => {
			typeof Fun == "function" && Fun();
		}, 1000)

	},
	validate: {
		// 手机号
		isPhone(val) {
			const pre = /^[1]\d{10}$/g
			return pre.test(val)
		},
		// 身份证
		isIdCard(val) {
			const pre = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
			return pre.test(val)
		},
		// 邮箱验证
		isEmail(val) {
			const pre = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
			return pre.test(val)
		},
		// 社会信用代码
		isCreditCode(val) {
			const pre = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
			return pre.test(val)
		},
		isPwd(val) {
			const pre = /^[0-9A-Za-z]{6,}$/
			return pre.test(val)
		},
		isInteger(val) {
			const pre = /(^[0-9]\d*$)/
			return pre.test(val)
		},
		isMoney(val) {
			if (val == 0) {
				return true
			}
			if (val === '') {
				common.toast('请输入金额')
				return false
			}
			if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(val)) {
				common.toast('金额最多两位小数')
				return false
			} 
			return true
		}
	},
	$imgPath(url) {
		const base_url = "https://jiangque.oss-cn-shenzhen.aliyuncs.com"
		const URL = url.charAt(0) === '/' ? url : `/${url}`
		return base_url + URL
	},
	/* 
	   对toast，loading的再封装 
	   $toast: 
	   icon新增fail类型,默认为none
	   duration默认为2s
	   mask默认修改为true
	   success, fail, complete同官方文档
	   $clearToast: 提前清除toast
	 */
	$toast({
		title,
		icon = 'none',
		duration = 2 * 1000,
		mask = true,
		success = function(res) {
			// console.log(res)
		},
		fail = function(err) {
			console.error(err)
		},
		complete = function(e) {
			// console.error(e)
		}
	}) {
		const options = {
			title,
			icon,
			duration,
			mask,
			success,
			fail,
			complete
		}
		if (icon === 'fail') {
			options.image = '/static/images/icon/fail.png'
		}
		uni.showToast(options)
	},
	$clearToast() {
		uni.hideToast()
	},
	/*
	 * 时间格式化函数
	 * fmt:形如yyyy MM dd hh mm ss q S
	 * date: 时间戳，不传默认为new Date()
	 * */
	dateFormat(fmt, date) {
		const d = date ? new Date(date) : new Date()
		const o = {
			'M+': d.getMonth() + 1, // 月
			'd+': d.getDate(), // 日
			'h+': d.getHours(), // 时
			'm+': d.getMinutes(), // 分
			's+': d.getSeconds(), // 秒
			'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
			S: d.getMilliseconds() // 毫秒
		}
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				(d.getFullYear() + '').substr(4 - RegExp.$1.length)
			)
		for (const k in o)
			if (new RegExp('(' + k + ')').test(fmt))
				fmt = fmt.replace(
					RegExp.$1,
					RegExp.$1.length === 1 ?
					o[k] :
					('00' + o[k]).substr(('' + o[k]).length)
				)
		return fmt
	},
	// 深度遍历对象属性，含有一项null、''、undefined则返回false,其余返回true
	isObjectEmpty(a) {
		const arr = []

		function deep(obj) {
			for (const k in obj) {
				if (obj[k] instanceof Object) {
					deep(obj[k])
				} else {
					arr.push(obj[k])
				}
			}
		}
		if (a instanceof Object) {
			deep(a)
		} else {
			arr.push(a)
		}
		const isAllow = arr.find((item) => {
			return item === '' || item === null || item === undefined
		})
		return isAllow === undefined ? 1 : 0
	},
	// 深度遍历2个对象值是否相等，返回true/false
	isObjectValueEqual(a, b) {
		function diff(a, b) {
			const aProps = Object.keys(a)
			const bProps = Object.keys(b)
			if (aProps.length !== bProps.length) {
				return false
			}
			for (let i = 0, len = aProps.length; i < len; i++) {
				const k = aProps[i]
				const a1 = a[k] instanceof Object
				const b1 = b[k] instanceof Object
				if (a1 && b1) {
					return diff(a[k], b[k])
				} else if (a[k] !== b[k]) {
					return false
				}
			}
			return true
		}
		return diff(a, b)
	},
	// 复制文本
	copyText(text) {
		if (typeof text === 'string') {
			uni.setClipboardData({
				data: text,
				success() {
					uni.showToast({
						title: '已复制到粘贴板'
					})
				},
				fail() {
					uni.showToast({
						title: '复制失败，请重试'
					})
				}
			})
		}
	},
	// 图片的选择、压缩、上传
	async uploadImage() {
		/* 图片压缩,返回压缩后的本地图片路径 */
		function imageZIP(file) {
			return new Promise((resolve, reject) => {
				wx.getImageInfo({
					src: file.path,
					success(res) {
						const w = res.width
						const h = res.height
						const toW = 750
						const toH = 750 * h / w
						const ctx = wx.createCanvasContext('upload_image_canvas')
						ctx.drawImage(file.path, 0, 0, w, h, 0, 0, toW, toH)
						ctx.draw(false, function() {
							wx.canvasToTempFilePath({
								canvasId: 'upload_image_canvas',
								fileType: "png",
								x: 0,
								y: 0,
								width: 750,
								height: toH,
								success: function(res) {
									resolve(res.tempFilePath)
								},
								fail(err) {
									console.error(err)
									reject(false)
								}
							}, this)
						})
					},
					fail() {
						console.error('图片压缩失败')
						uni.showToast({
							title: '上传失败,请重试',
							mask: false,
							icon: "none"
						})
						reject(false)
					}
				})
			})
		}
		/* 图片选择，返回经压缩后的本地图片路径 */
		function selectImage() {
			return new Promise((resolve, reject) => {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					async success(res) {
						const file = res.tempFiles[0]
						const path = file.path
						const arr = path.split('.')
						const isImage = arr[arr.length - 1] === 'png' || arr[arr.length - 1] === 'jpg' || arr[arr.length - 1] ===
							'jpeg' || arr[arr.length - 1] === 'PNG' || arr[arr.length - 1] === 'JPG' || arr[arr.length - 1] === 'JPEG' 
						const isSize = file.size < 2 * 1024 * 1024
						if (!isImage) {
							uni.showToast({
								title: '图片格式错误',
								mask: false,
								icon: "none"
							})
							reject(false)
						} else if (!isSize) {
							const toFile = await imageZIP(file)
							resolve(toFile)
						} else {
							resolve(file.path)
						}
					},
					fail(err) {
						console.error(err)
						// uni.showToast({title: '获取图片失败，请重试', mask: false, icon: "none"})
						reject(false)
					}
				})
			})
		}
		return new Promise(async (resolve, reject) => {
			const filePath = await selectImage()
			if (filePath) {
				const path = await uploadImg(filePath)
				resolve(path)
			}
		})
	}
}
