/**
 * @file guid.js
 *
 * Unique ID for an element or function
 * @type {Number}
 * @private
 */
let _guid = 1

function guid () {
  return _guid++
}
/**
 * Get the next unique ID
 *
 * @return {String}
 * @function newGUID
 */
export default guid
