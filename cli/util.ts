import { URL } from 'url'
import path from 'path'

const __dirname = new URL('.', import.meta.url).pathname

// 以项目根目录查找文件路径
export function resolve(dir = './') {
  return path.resolve(__dirname, '..', dir)
}

/**
 * @description 获取当前时间
 */
export function getDeployDate() {
  const now = new Date()
  return (
    '' +
    now.getFullYear() +
    ('00' + (now.getMonth() + 1)).slice(-2) +
    ('00' + now.getDate()).slice(-2) +
    ('00' + now.getHours()).slice(-2) +
    ('00' + now.getMinutes()).slice(-2)
  )
}
