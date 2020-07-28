// Based on: https://stackoverflow.com/questions/31768457/idiomatic-way-to-mutate-a-property-with-multiple-events-using-kefir
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kefir'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kefir'));
  } else {
    factory(root.Kefir);
  }
}(typeof self !== 'undefined' ? self : this, function (Kefir) {
  Kefir.update = function (initValue) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var mutations = args
      .reduce(function (mutations, arg) {
        var sources = arg.slice(0, -1)
        var newValue = arg.slice(-1)
        return mutations.concat([Kefir.zip(sources).map(e => ({event: e, mutation: newValue}))])
      }, [])

    return Kefir
      .merge(mutations)
      .scan(function (prev, {event, mutation}) {return mutation.apply(undefined, [prev].concat(event)), initValue});
  }
}));
