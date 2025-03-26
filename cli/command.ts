import SimpleGit from 'simple-git'
import { checkGitRepository, syncGitRepository } from './git.js'
import Log from './log.js'
import { execa } from 'execa'
import { resolve, getDeployDate } from './util.js'
import Config from './config.js'

function execDeploy() {
  const git = SimpleGit(resolve(Config.gitDir))
  return git
    .init()
    .add('./*')
    .commit('deploy: ' + getDeployDate())
    .branch(['-M', Config.branch])
    .push(['-f', Config.gitUrl, Config.branch])
}

export async function deploy() {
  if (!(await checkGitRepository())) {
    return Log.warn('不允许构建部署')
  }
  await syncGitRepository()
  Log.info('开始代码构建')
  await execa('npm', ['run', 'build'], {
    cwd: resolve(),
    stdio: 'inherit',
  })
  Log.success('代码构建成功')
  Log.info('开始部署代码')
  await execDeploy()
  Log.success('代码部署成功')
}
