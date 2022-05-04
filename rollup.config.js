import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";

export default {
  input: "./src/index.js",   // 以哪个文件作为打包的入口
  output: {
    file: "dist/umd/petit-vue.js",    // 出口路径
    name: "Vue",            // 全局变量名
    format: "umd",          // 打包格式
    sourcemap: true         // 是否生成sourcemap
  },
  plugins: [
    babel({
      exclude: "node_modules/**" // 只编译我们的源代码
    }),
    process.env.ENV === 'development' ? serve({
      open: true,                     // 自动打开网页
      openPage: "/public/index.html", // 打开的网页
      port: 3000,                     // 端口
      contentBase: "",          // 在哪个目录下启动服务
    }):null
  ]
}