const path = require('path'); // для того чтобы превратить относительный путь в абсолютный, мы будем использовать пакет path
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'), // точка входа в наше приложение содержит абсолютный путь к index.tsx
    output: {
        path: path.resolve(__dirname, './dist'), // путь, куда будет собираться наш проект
        filename: 'main.js', // имя нашего бандла,
        clean: true, // очистка папки перед сборкой 
    },
    // Нужно помочь вебпаку научиться работать  с jsx- и tsx-файлами, для этого используют ts-loader
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/, // содержит регулярное выражение, которое содержит информацию, какие файлы должны обрабатываться этим loader'ом
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ], // для того чтобы ts-loader корректно отработал, нам нужен tsconfig, его можно создать вручную, а можно создать автоматически
                /** чтобы проинициализировать его автоматически, можно установить пакет typesctipt глобально или использовать npx,
                    выполнив команду npx tsc --init. После создания конфига нужно включить "allowJs": true, чтобы работать не только c typescript,
                    также меняем "jsx": "react", чтобы мы могли работать с react-компонентами, и включаем карту ресурсов "sourceMap": true,
                    пока на этом всё, вернёмся в этот конфиг позже */
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'], // указываем файлы, с которыми будет работать webpack
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3003,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
    ],
};