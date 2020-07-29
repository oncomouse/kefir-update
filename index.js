const Kefir = require('kefir')

const asFunction = f => (typeof f === 'function') ? f : () => f
const isArray = xs => xs instanceof Array
const isRawPattern = xs => isArray(xs[0])
function extractPattern(pattern) {
  if(!isArray(pattern)) {
    return Kefir.never
  }
  if(isRawPattern(pattern)) {
    return pattern
  }
  return [pattern.slice(0,-1), asFunction(pattern.slice(-1)[0])]
}
const append = (...args) => [...args]
Kefir.update = function(initValue, ...patterns) {
  return Kefir.merge(patterns
    .map(extractPattern)
    .map(([sources, f]) => Kefir.combine(sources, append).map(e => ({
      event: e,
      mutation: f
    })))
  )
  .scan(
    (prev, {event, mutation}) => mutation.apply(undefined, [prev].concat(event)),
    initValue
  )
}
