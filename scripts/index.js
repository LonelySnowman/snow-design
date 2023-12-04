const { create } = require('./command/create');
const packageJson = require('../package.json');

function runCommand (argv) {
    const args = argv.slice(2);
    const command = args[0];
    const cName = args[1];

    if (!command || !cName) {
        console.log('请输入正确的指令形式：');
        console.log('npm run gen <ComponentName>', '新增组件');
        console.log('npm run del <ComponentName>', '删除组件');
        return;
    }

    if (command === 'gen') {
        create(cName, packageJson.name);
    } else {
        console.log('未知指令');
    }
}

runCommand(process.argv);
