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
    queueWatcher(this)
    // this.get()
  }

  run() {
    this.get()
  }

}

let queue = [] // 存放watcher的数组
let has = {}
function queueWatcher(watcher) {
  const id = watcher.id
  if(has[id] == null){
    queue.push(watcher)
    has[id] = true
    setTimeout(() => {
      queue.forEach(watcher => watcher.run())
      queue = []
      has = {}
    }, 0);
  }
}


// 在模板中取值时，会进行依赖收集，再更改数据时会进行对应的watcher调用更新操作，
// dep和watcher是一个多对多的关系，dep里存放着相关的watcher，watcher里存放着相关的dep，是一个观察者模式
export default Watcher