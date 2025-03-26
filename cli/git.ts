import SimpleGit from 'simple-git'
import { resolve } from './util.js'
import Log from './log.js'
import Config from './config.js'

const Git = SimpleGit(resolve())

// 检测Git仓库
export async function checkGitRepository() {
  Log.info('获取Git本地仓库状态')
  const res = await Git.status()
  if (res.files.length) {
    Log.warn('Git暂存区存在改动文件未提交，不允许部署')
    return false
  }
  const deployBranchRules = Config.deployBranchRules || ['master']
  Log.info('当前分支：', res.current as string)
  Log.info('发布可用分支：', ...deployBranchRules)
  if (!deployBranchRules.find((item) => item === res.current)) {
    Log.warn('该分支不允许部署')
    return false
  }
  return true
}
// 同步远程Git仓库
export async function syncGitRepository() {
  Log.info('同步远程仓库')
  await Git.pull()
  await Git.push()
  Log.success('远程仓库同步成功')
}
