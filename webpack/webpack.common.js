import HTMLWebpackPlugins from 'html-webpack-plugin';
 
import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin';
import { resolve as _resolve } from 'path';
import { EnvironmentPlugin } from 'webpack'; //подключаем webpack для использования встроенного плагина EnvironmentPlugin

//в зависимости от того, какой скрипт мы запустили
// переменная production получит либо false, либо true
// eslint-disable-next-line no-undef
const production = process.env.NODE_ENV === 'production'; 

// eslint-disable-next-line no-undef
export const entry = _resolve(__dirname, '..', './src/index.tsx');
export const output = {
    // eslint-disable-next-line no-undef
    path: _resolve(__dirname, '..', './dist'), //путь до папки dist изменился
    filename: production
        ? 'static/scripts/[name].[contenthash].js' // добавляем хеш к имени файла, если запускаем в режиме production
        : 'static/scripts/[name].js',
    publicPath: '/',
    clean: true,
};
export const module = {
    rules: [
        {
            test: /\.[tj]sx?$/,
            use: [
                {
                    loader: 'ts-loader',
                },
            ],
            exclude: /node_modules/,
        },
        {
            test: /\.(png|jpg|gif|webp)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/images/[hash][ext][query]',
            },
        },
        {
            test: /\.(woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/fonts/[hash][ext][query]',
            },
        },
        {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack', 'url-loader'],
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                //в режиме production создаём физический файл в папке dist, в dev режиме добавляем стили в тег style в html-файле
                production ? _loader : 'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            mode: 'local',
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                            namedExport: false,
                            auto: /\.module\.\w+$/i,
                        },
                        importLoaders: 2,
                    },
                },
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        },
    ],
};
export const resolve = {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
};
export const plugins = [
    new HTMLWebpackPlugins({
        // eslint-disable-next-line no-undef
        template: _resolve(__dirname, '..', './public/index.html'), //путь до папки public изменился
    }),
    new MiniCssExtractPlugin({
        filename: 'static/styles/[name].[contenthash].css'
    }),
    //Плагин позволяет установить переменные окружения, можно переопределить переменную из блока script файла package.json
    new EnvironmentPlugin({
        NODE_ENV: 'development', // значение по умолчанию 'development', если переменная process.env.NODE_ENV не передана при вызове сборки
    }),
];