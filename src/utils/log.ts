import chalk from "chalk";

export default function log(title = '[debug]', data: any, type: 'log' | 'error' | 'success' | 'info' | 'warn' = 'log') {
    let color;
    switch (type) {
        case 'log':
            color = chalk.whiteBright;
            break;
        case 'error':
            color = chalk.redBright
            break;
        case 'info':
            color = chalk.cyanBright
            break;
        case 'success':
            color = chalk.greenBright;
            break;
        case 'warn':
            color = chalk.yellowBright;
            break;
        default:
            color = chalk.whiteBright;
            break;
    }

    console.log(color(`>`), color(title), data)
}