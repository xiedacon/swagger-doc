'use strict'

module.exports = function promisify (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.apply(this, args.slice(0, fn.length - 1).concat((err, data) => {
        if (err) reject(err)
        else resolve(data)
      }))
    })
  }
}
