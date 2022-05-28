<h1 align="center">
Petit-vue
</h1>
<p align="center">
A small and delicate Vue.
<p>
<p align="center">
  <a href="https://www.npmjs.com/package/petit-vue"><img src="https://img.shields.io/npm/v/petit-vue?color=729B1B&label="></a>
<p>

## Flag

> Petit-Vue 每一行都有详细的注释，可以帮你快速的精通 Vue.

## Brief Introduction（简述）

> Petit-vue 是一个剔除了边缘 case 的小巧型 Vue，每行都添加了完善的注释，实现了 Vue2.+绝大多数功能；结构和 Vue 源码结构完全相同。


## 功能

### :lemon: Completed

:white_check_mark: Data monitoring（数据监听）

:white_check_mark: Data hijacking（数据劫持）

:white_check_mark: Template compilation（模板编译）

:white_check_mark: Html parser（HTML 解析）

:white_check_mark: Template convert to AST（模板转换为 AST 抽象语法树）

:white_check_mark: generate render function（生成渲染函数）

:white_check_mark: Life cycle merger strategy（生命周期合并策略）

:white_check_mark: vue 声明周期的实现原理

:white_check_mark: Mixin 的实现原理

:white_check_mark: Vue 中 watcher 监听【数据更新&渲染】

:white_check_mark: Vue 中依赖收集实现

:white_check_mark: Vue 中是如何实现异步更新数据的

:white_check_mark: nextTick 的实现

### :rocket: Expected

:white_medium_square: Vue 的组件系统是如何实现的

:white_medium_square: Watch 的实现原理

:white_medium_square: Vue 中 DOM-DIFF 的原理

:white_medium_square: 实现 Vue 的插件机制: Vue.use / Vue.install

:white_medium_square: VueRouter 和 Vuex

:white_medium_square: Vue 配合 Jest 单元测试

:white_medium_square: 测试覆盖率检测

:white_medium_square: Vue SSR

## Introduction （介绍）

Petit-vue is a stripped-down version of the VUE framework based on Vue2.6+, removing all edge cases.</br>
The main feature of it is to strip out the core logic in the Vue2.6 source code, leaving only the core logic, with detailed Chinese annotations and complete output to help you quickly understand the framework core operational process.

## Usage（用法）

```
npm install petit-vue
```

## Structure（源码结构）

> The directory structure refers to the source code of Vue2.\*, which is consistent with the source code structure of Vue

```

src
|-- index.js
|-- init.js
|-- lifecycle.js
|-- render.js
|-- state.js
|
|-- compiler
    |-- index.js
    |-- parser-html.js
|-- observer
    |-- array.js
    |-- index.js
    |-- watcher.js
|-- util
    |-- index.js
|-- vdom
    |-- create-element.js
    |-- patch.js
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2021-present, GuoNan
