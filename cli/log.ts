import chalk, { type ChalkInstance } from 'chalk'

/**
 * @description 打印日志处理函数
 * @param {array<any>} messages 日志信息
 * @param {string} type 数据类型
 * @returns {void}
 */
function handleLogMsg(messages: string[], type: string) {
  const list: string[] = []
  let chalkFun!: ChalkInstance
  let logFun = console.log
  switch (type) {
    case 'debug':
      chalkFun = chalk.blueBright
      list.push(chalkFun('[ DEBUG   ]'))
      break
    case 'warn':
      chalkFun = chalk.yellow
      list.push(chalkFun('[ WARN    ]'))
      logFun = console.warn
      break
    case 'error':
      chalkFun = chalk.redBright
      list.push(chalkFun('[ ERROR   ]'))
      logFun = console.error
      break
    case 'success':
      chalkFun = chalk.greenBright
      list.push(chalkFun('[ SUCCESS ]'))
      break
    default:
      list.push('[ INFO    ]')
      break
  }
  messages.forEach((msg: string) => {
    list.push(chalkFun ? chalkFun(msg) : msg)
  })
  logFun(...list)
}

/**
 * @description 日志对象
 */
export default {
  chalk,
  info(...messages: string[]) {
    handleLogMsg(messages, 'info')
  },
  debug(...messages: string[]) {
    handleLogMsg(messages, 'debug')
  },
  warn(...messages: string[]) {
    handleLogMsg(messages, 'warn')
  },
  error(...messages: string[]) {
    handleLogMsg(messages, 'error')
  },
  success(...messages: string[]) {
    handleLogMsg(messages, 'success')
  },
}
