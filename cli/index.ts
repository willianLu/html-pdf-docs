import { program } from 'commander'
import * as Command from './command.js'
import Log from './log.js'

console.log(
  '\n\
     ██          ███████         ███████\n\
   ██  ██        ██     ██     ██\n\
  ██ ▄▄ ██       ███████       ██\n\
 ██      ██      ██     ██     ██\n\
██        ██     ███████         ███████ \n\
'
)
program
  .command('deploy')
  .description('项目自动化部署命令')
  .action(Command.deploy)

program.configureOutput({
  // 将错误高亮显示
  outputError: str => Log.error(str)
})

program.parse(process.argv)
