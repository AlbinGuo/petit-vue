export function stateMixin() {}

export function initState(vm) {
  const opt = vm.$options;
  if (opt.props) initProps(vm);
  if (opt.methods) initMethods(vm);
  if (opt.data) initData(vm);
  if (opt.computed) initComputed(vm);
  if (opt.watch) initWatch(vm);
}

function initProps(vm) {}

function initMethods(vm) {}

function initData(vm) {
  console.log("vm.$options:", vm.$options.data);
}

function initComputed(vm) {}

function initWatch(vm) {}
