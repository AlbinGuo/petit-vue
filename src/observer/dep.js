import Watcher from "./watcher"

let id = 0
class Dep {
  constructor() {
    this.id = id++
    this.subs = []  // wathcer栈
  }

  depend() {
    this.subs.push(Dep.target)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

// watcher栈【可能会存在多个watcher】
let stack = []

// 渲染watcher
export function pushTarget(watcher) {
  Dep.target = watcher
  stack.push(watcher)
}

// 移除watcher
export function popTarget() {
  stack.pop()
  Dep.target = stack[stack.length - 1] // 获取栈顶的watcher
}

export default Dep