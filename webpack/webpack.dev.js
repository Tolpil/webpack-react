// Конфигурация для разработки
import { resolve } from 'path'; //для того чтобы превратить относительный путь в абсолютный, мы будем использовать пакет path
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export const mode = 'development';
export const devtool = 'eval-source-map';
export const devServer = {
    // eslint-disable-next-line no-undef
    static: resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика

    // compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
    hot: true,
};
export const plugins = [
    new ReactRefreshWebpackPlugin(),
];