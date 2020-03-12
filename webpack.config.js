const path = require("path"); // import path from "path" 와 동일
const autoprefixer = require("autoprefixer"); // import path from "path" 와 동일
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader" // css를 가져옴
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ Browserslist: "cover 99.5%" })]; // 특정 플러그인 css 실행
              }
            }
          },
          {
            loader: "sass-loader" // sass를 css로 옮겨줌
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
};

// 웹팩, entry가 있고, mode(dev,production)가 있고, rules(loader들)가 있고, output
module.exports = config;
