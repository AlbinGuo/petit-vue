import { pushTarget, popTarget } from './dep.js'
let id = 0
class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm
    this.callback = callback
    this.options = options
    this.id = id++
    this.getter = exprOrFn   // 获取值的函数：将内部传过来的回调函数放到getter属性上
    this.depsId = new Set()  // 存储dep的id
    this.deps = []           // 存储dep
    this.get()              // 调用get方法，会让watcher执行，渲染watcher
  }

  // watcher中不能放重复的dep,dep中也不能放重复的watcher
  addDep(dep) {
    let id = dep.id
    if(!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      dep.addSub(this)  // dep记住watcher
    }
  }

  // 后续要进行依赖收集
  get() {
    pushTarget(this) // 将当前watcher放入targetStack中
    this.getter() // 渲染watcher的执行
    popTarget() // 将当前watcher从targetStack中移除
  }

  update() {
    console.log('------------------update--------------------')
    this.get()
  }

}

export default Watcher