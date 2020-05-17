export default  {
  // 过滤出价格的数字部分
  priceNumber: (val) => {
    return String(val).replace(/[\u4E00-\u9FA5]*$/g, '')
  },
  // 过滤出价格的单位部分
  priceUnit: (val) => {
    const price = String(val).replace(/[\u4E00-\u9FA5]*$/g, '')
    return String(val).replace(price, '')
  },
  marketPriceFilter(val) {
	  return parseInt(val)
  }
}