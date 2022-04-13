export function observe(data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return val;
    },
    set: function(newVal) {
      if (val === newVal) return;
      val = newVal;
      // 更新视图
      let app = document.getElementById("app");
      app.innerHTML = val;
      console.log("更新视图完成");
    }
  });
}
