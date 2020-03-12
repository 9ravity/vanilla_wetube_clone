const path = require("path"); // import path from "path" 와 동일
const autoprefixer = require("autoprefixer"); // import path from "path" 와 동일
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); // path 경로 설정
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  mode: MODE.replace(/\s/g, ""),
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract(
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugin() {
                return [autoprefixer({ browser: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        )
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]"
  },
  plugins: [new ExtractCSS("styles.css")]
};
module.exports = config;
