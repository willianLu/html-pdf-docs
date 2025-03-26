// 基本数据枚举
enum DataType {
  UNDEFINED = 'undefined',
  NULL = 'NULL',
  STRING = 'string',
  NUMBER = 'number',
  ARRAY = 'array',
  OBJECT = 'object',
  FUNCTION = 'function',
  PROMISE = 'promise',
  ERROR = 'error',
}

/**
 * @description 判断数据是否定义
 * @param {unknown} data
 * @returns {boolea}
 */
export function isDef(data: unknown): boolean {
  return data !== undefined && data != null
}

/**
 * @description 判断数据类型是否是传入的类型
 * @param {unknown} data 传入数据
 * @param {dataType} type 对比的数据类型
 * @returns {boolean} true | false
 */
function judgeDataType<T>(data: unknown, type: DataType): data is T {
  return Object.prototype.toString.call(data).toLocaleLowerCase() === `[object ${type}]`
}

/**
 * @description 判断数据类型是否是对象
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isObject<T extends object>(data: unknown): data is T {
  return judgeDataType<object>(data, DataType.OBJECT)
}

/**
 * @description 判断数据类型是否是函数
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isFunction(data: unknown): data is (...args: unknown[]) => unknown {
  return judgeDataType(data, DataType.FUNCTION)
}

/**
 * @description 判断数据类型是否是promise函数
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isPromise<T>(data: unknown): data is Promise<T> {
  return judgeDataType<Promise<T>>(data, DataType.PROMISE)
}

/**
 * @description 判断数据类型是否是Error类型
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isError(data: unknown): data is Error {
  return judgeDataType<Error>(data, DataType.ERROR)
}

/**
 * @description 判断数据类型是否是数字
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isNumber(data: unknown): data is number {
  return judgeDataType<number>(data, DataType.NUMBER) && !window.isNaN(<number>data)
}

/**
 * @description 判断数据类型是否是字符串
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isString(data: unknown): data is string {
  return judgeDataType<string>(data, DataType.STRING)
}

/**
 * @description 是否是空对象
 * @param {unknown} data
 * @returns {boolean}
 */
export function isEmptyObject(data: unknown): data is object {
  return isObject(data) && JSON.stringify(data) === '{}'
}
/**
 * @description 延迟函数
 * @param {undefuned | number} duration
 * @param {unknown} data
 * @returns {promise<T | undefined>}
 */
export function delay<T>(duration?: number, data?: T): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, duration || 1000)
  })
}
/**
 * @description 将 JSON 转化为 query 字符串
 * @param {object} data JSON 数据
 * @returns {string} query 字符串
 */
export function stringifyQuery(data: Record<string | number, unknown>) {
  if (!isObject(data)) return ''
  return Object.keys(data)
    .map((key: string | number) => {
      let str: string | number = ''
      if (isDef(data[key])) {
        if (!isString(data[key]) && !isNumber(data[key])) {
          str = JSON.stringify(data[key])
        } else {
          str = data[key]
        }
      }
      return `${key}=${str}`
    })
    .join('&')
}
