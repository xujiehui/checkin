const moment = require('moment-timezone')

module.exports = {
  log: (msg = '') => console.log(msg),
  getCurrent: (timezone = '') => {
    const localTime = moment.utc().tz(timezone).format('YYYY/MM/DD HH:mm:ss')
    const serverTimezone = moment.tz.guess(true)

    return {
      localTime,
      serverTimezone,
    }
  },
}