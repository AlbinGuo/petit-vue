<h1 align="center">
Petit-vue
</h1>
<p align="center">
A small and delicate Vue.
<p>
<p align="center">
  <a href="https://www.npmjs.com/package/petit-vue"><img src="https://img.shields.io/npm/v/petit-vue?color=729B1B&label="></a>
<p>

## Schedule

【Completed】
:white_check_mark: Data monitoring

:white_check_mark: Data hijacking

:white_check_mark: Template compilation

:white_check_mark: Html parser

:white_check_mark: Template convert to AST

:white_check_mark: Code generate

:white_check_mark: generate render function

:white_check_mark: Initialize the rendering process

:white_check_mark: Life cycle merger strategy

:white_check_mark: vue 声明周期的实现原理

:white_check_mark: Mixin 的实现原理

:white_check_mark: Vue 中watcher监听【数据更新&渲染】

:white_check_mark: Vue 中依赖收集实现

:white_check_mark: Vue 中是如何实现异步更新数据的

:white_check_mark: nextTick的实现

【Expected】

:white_medium_square: Vue 的组件系统是如何实现的

:white_medium_square: Watch 的实现原理

:white_medium_square: Vue 中 DOM-DIFF 的原理

:white_medium_square: 实现 Vue 的插件机制: Vue.use / Vue.install

:white_medium_square: VueRouter 和 Vuex

:white_medium_square: Vue 配合 Jest 单元测试

:white_medium_square: 测试覆盖率检测

:white_medium_square: Vue SSR

## Introduction

Petit-vue is a stripped-down version of the VUE framework based on Vue2.6+, removing all edge cases.</br>
The main feature of it is to strip out the core logic in the Vue2.6 source code, leaving only the core logic, with detailed Chinese annotations and complete output to help you quickly understand the framework core operational process.

## Usage

```
npm install petit-vue
```

## Structure

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
