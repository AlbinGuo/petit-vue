let queue = [] // 存放watcher的数组
let has = {}
export function queueWatcher(watcher) {
  const id = watcher.id
  if(has[id] == null){
    queue.push(watcher)

    // 宏任务  和  微任务 （Vue.nextTick）
    // nextTick执行方式依次降级，先执行宏任务，再执行微任务[ 浏览器不兼容的话就会一次降级执行 ]
    // Vue.nextTick = promise > mutationObserver > setImmediate > setTimeout
    has[id] = true
    setTimeout(() => {
      queue.forEach(watcher => watcher.run())
      queue = []
      has = {}
    }, 0);
  }
}