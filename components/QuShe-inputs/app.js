const dateTime = 'picker-dateTime';
const date = 'picker-date';
const time = 'picker-time';

const pickerChoosedType_date = {
	name: 'date',
	value: 'p_date_choosed_'
};
const pickerChoosedType_city = {
	name: 'city',
	value: 'p_city_choosed_'
};
const pickerChoosedType_custom = {
	name: 'custom',
	value: 'p_custom_choosed_'
};
let _app = {
	picker_date_obj: {
		dateTime,
		date,
		time
	},
	pickerChoosedType: {
		pickerChoosedType_date,
		pickerChoosedType_city,
		pickerChoosedType_custom
	},
	interface: {
		upLoadImg: '', // 服务器地址
	},
	showToast(msg) {
		uni.showToast({
			title: msg,
			icon: 'none'
		})
	},
	showLoading(msg, ifmask) {
		uni.showLoading({
			title: msg,
			mask: ifmask || false
		})
	},
	hideLoading() {
		uni.hideLoading();
	},
	UpLoadFile(url, data, name, filePath, scb, fcb) { // 服务器地址， 携带数据， name， 文件路径， 成功回调函数， 失败回调函数
		let _this = this;
		_this.showLoading('上传文件中');
		uni.uploadFile({
			url,
			formData: data,
			name: name,
			filePath,
			success(res) {
				console.log('上传成功')
				_this.hideLoading();
				if (scb && typeof(scb) == 'function') scb(res);
			},
			fail(err) {
				console.log('上传失败')
				_this.hideLoading();
				if (fcb && typeof(fcb) == 'function') fcb(err);
			}
		})
	},
	previewImage(imgPath) {
		if (typeof(imgPath) != 'array')
			imgPath = [imgPath];
		uni.previewImage({
			urls: imgPath
		})
	},
	countDays(Y, M, val, mode) {
		let _this = this;
		const today = new Date();
		const days = [];
		today.setFullYear(Y);
		today.setMonth(M + 1);
		today.setDate(0);
		const daysLen = today.getDate();
		for (let i = 1; i <= daysLen; i++) {
			days.push(i);
		}
		if (mode != time)
			if (val) {
				val[2] = val[2] < days.length - 1 ? val[2] : days.length - 1;
			}
		return {
			days,
			val
		};
	},
	countYears(sy, ey) {
		let _this = this;
		let y = [];
		let c = ey - sy;
		for (let i = 0; i <= c; i++) {
			y.push(sy + i);
		}
		return y;
	}
}
export default _app;
