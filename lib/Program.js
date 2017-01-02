/**
 * Abstracted Program object.
 * @param {String} channel  Channel name.
 * @param {String} name     Program name.
 * @param {Date} start      Time it starts.
 */
const Program = ({ channel, name, start }) => ({
  channel,
  name,
  start,
})

module.exports = Program
