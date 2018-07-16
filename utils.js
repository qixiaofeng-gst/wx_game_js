/**
 * 对于ES6中Symbol的极简兼容
 * 方便模拟私有变量
 */
if (!window.Symbol) {
  let idCounter = 0
  window.Symbol = (() => {
    const s = key => `__${key}_${Math.floor(Math.random() * 1e9)}_${++idCounter}__`
    s.iterator = s('Symbol.iterator')
    return s
  })()
}

function custom_require(modules, exported, export_ids) {
  function include(module_id) {
    if (!exported[module_id]) {
      var exporting = exported[module_id] = {
        exports: {}
      };
      modules[module_id][0].call(
        exporting.exports,
        required => include(modules[module_id][1][required] || required),
        exporting,
        exporting.exports,
        custom_require,
        modules,
        exported,
        export_ids
      )
    }
    return exported[module_id].exports
  }
  for (const id of export_ids) include(id);
  return include
}

const read_file = (() => {
  const fs = wx.getFileSystemManager()
  return path => fs.readFileSync(path, 'utf8')
})()

export { custom_require, read_file }
