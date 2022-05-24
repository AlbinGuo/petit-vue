let callbacks = []

let waiting = false

function flushCallback() {
  callbacks.forEach(cb => cb())
  waiting = false
}

// 多个nextTick依次执行
export function nextTick(cb) {
  callbacks.push(cb)
  if(!waiting){
    setTimeout(flushCallback, 0)
    waiting = true
  }
  
}