const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStylesFinal = (withModules = false) => {
  return isProd
    ? [MiniCssExtractPlugin.loader, ...getSettingsForStyles(withModules)]
    : ['style-loader', ...getSettingsForStyles(withModules)];
};

const getSettingsForStyles = (withModules = false) => {
  return [
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
            }
          }
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer']
        }
      }
    },
    'sass-loader'
  ];
};

module.exports = {
  // entry: path.resolve(__dirname, './index.js'),
  entry: path.join(srcPath, 'index.tsx'),
  target: !isProd ? 'web' : 'browserslist',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStylesFinal(true)
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStylesFinal()
      },
      // {
      //     // если файл заканчивается на .css,  то вебпак должен обрабатывать его с помощью двух лоадеров, при это очень важна последовательность применяемых лоадеров сначала применяется css-loader, чтобы обработать все импортируемые стили и потом style-loader, который вставит указанные стили в тег style
      //     test: /\.css/,
      //     use: ['style-loader','css-loader']
      // },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(publicPath, 'index.html')
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css'
    }),
    new TsCheckerPlugin()
  ].filter(Boolean),
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@img': path.resolve(__dirname, 'src/img/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@config': path.resolve(__dirname, 'src/config/')
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    hot: true,
    historyApiFallback: true
  }
};
