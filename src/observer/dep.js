import Watcher from "./watcher"

let id = 0
class Dep {
  constructor() {
    this.id = id++
    this.subs = []  // wathcer栈
  }

  addSub(watcher) {
    this.subs.push(watcher)
  }

  depend() {
    // 让这个wathcer记住当前的dep
    Dep.target.addDep(this)
    // this.subs.push(Dep.target)
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