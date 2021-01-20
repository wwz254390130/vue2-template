/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validUsername1(str) {
  const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
  console.log(reg.test(str))
  return reg.test(str)
}

// 必须为数字
export const isNumber = (rule, value, callback) => {
  if (isNaN(value)) {
    callback(new Error('必须为数字！'))
  } else {
    callback()
  }
}

// 必须 > 0
export const mustGreaterthanZero = (rule, value, callback) => {
  if (value <= 0) {
    callback(new Error('必须大于0！'))
  } else {
    callback()
  }
}
// 必须为整数
export const mustInteger = (rule, value, callback) => {
  value = '' + value
  if (value.indexOf('.') != -1) {
    callback(new Error('必须为整数！'))
  } else {
    callback()
  }
}
// 判断是否是小数点六位
export const checkIsSixPointNumber = (rule, value, callback) => {
  const exp = /(^[0](\.[0-9]{1,6})?$)/
  if (exp.test(value)) {
    const number = '' + value
    if (number.indexOf('.') != -1) {
      const arr = number.split('.')
      const str = arr[1]
      if (str.length > 6) {
        callback(new Error('小数点只能保留后六位！'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  } else {
    callback(new Error('必须是小数 列如(0.1 代表 10%)'))
  }
}
