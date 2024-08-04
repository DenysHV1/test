const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, "src"),  //для работы спапкой src/ дальше можем не прописывать пути
  entry: "./index.js",

  //? путь до файда с которого начинаеться приложение (работает только с JS входом)
  //? entry: { (((если нужно две+ точки входа))) index: './index.js', another: 'путь к другой точке'}, 
  //? но при этом делаем  filename: '[name].[contenthash].js', что бы избежать конфликтов. После чего поправляем пути входа в index.html

  output: {
    filename: "bundle.js", //название файла сборки
    path: path.resolve(__dirname, "dist"), // Путь к папке с собранными файлами
    clean: true, //для очистки папки
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|jpeg|bmp|svg)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
	new CopyWebpackPlugin({
	  patterns: [
		{from: path.resolve(__dirname,'./src/img/favicon.ico'),to: path.resolve(__dirname, 'dist')},
	  ],
	}),
	// Інші плагіни...
	new HtmlWebpackPlugin({ template: "./index.html" }),
	new CleanWebpackPlugin()
  ],

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  devServer: {
    port: 2336,
    open: true,
  },
};

