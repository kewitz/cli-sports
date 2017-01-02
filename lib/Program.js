/**
 * Abstracted Program object.
 * @param {String} channel  Channel name.
 * @param {String} name     Program name.
 * @param {Date} start      Time it starts.
 */
const Program = ({ channel, live = false, name, start }) => ({
  channel,
  live,
  name,
  start,
})

module.exports = Program
