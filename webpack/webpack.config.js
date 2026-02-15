// Объединенный конфиг webpack
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';

export default (envVars) => {
    const { env } = envVars; //переменную env мы будем передавать при запуске скрипта со значением dev или prod
    // eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
    const envConfig = require(`./webpack.${env}.js`)
    const config = merge(commonConfig, envConfig)
    return config
}