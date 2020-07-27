(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kefir'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kefir'));
  } else {
    root.returnExports = factory(root.Kefir);
  }
}(typeof self !== 'undefined' ? self : this, function (Kefir) {
  return function () {
    var initValue = arguments.slice(0, 1)
    var args = arguments.slice(1)
    var mutations = [];
    args.reduce(function (mutations, arg) {
      var sources = arg.slice(0, -1)
      var newValue = arg.slice(-1)
      return mutations.append(Kefir.zip(sources).map(e => ({event: e, mutation: newValue})))
    }, [])

    return kefir
      .merge(mutations)
      .scan
      (function (prev, {event, mutation}) {return mutation.apply(undefined, [prev].append(event)), initValue});
  }
}));
