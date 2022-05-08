class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm
    this.callback = callback
    this.options = options

    this.getter = exprOrFn
    this.get()
  }

  // 后续要进行依赖收集
  get() {
    this.getter()
  }


}

export default Watcher