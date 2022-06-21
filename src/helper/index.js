const Api = require('./api')
const msg = require('./msg')
const { log, getCurrent } = require('./utils')

const REQUEST_REJECTED = 'rejected'
const REQUEST_RFULFILLED = 'fulfilled'
const DEFAULT_TIMEZONE = 'Asia/Shanghai'

class Helper {
  constructor(options = {}) {
    const { cookie = '', timezone = DEFAULT_TIMEZONE } = options

    Object.assign(this, {
      cookie,
      timezone,
      api: new Api({ cookie }),
    })
  }

  // 系统提示
  async systemTips() {
    const { localTime, serverTimezone } = getCurrent(this.timezone)

    log(msg.systemTips(localTime, serverTimezone))
  }

  // 小贴士
  async dailyTips() {
    try {
      const { data = {} } = await this.api.getDailyCounts()
      const { cont_count: count = 0, sum_count: sum = 0 } = data

      log((msg.dailyTips.success(count, sum)))
    } catch (err) {
      log(msg.dailyTips.fail(err))
    }
  }

  // 签到
  async checkIn() {
    try {
      const { data = {} } = await this.api.checkIn()
      const { incr_point: incr = 0, sum_point: sum = 0 } = data

      log(msg.checkIn.success(incr, sum))
    } catch (err) {
      log(msg.checkIn.fail(err))
    }
  }

  // 沾一沾
  async dipLuckcy() {
    try {
      const { data = {} } = await this.api.getLotteryHistory()
      const lotteries = data.lotteries || []

      log(msg.dipLuckcy.info)

      if (lotteries.length) {
        const [firstLottery] = lotteries
        const { data = {} } = await this.api.dipLuckcy({ lottery_history_id: firstLottery.history_id })
        const { dip_value: dip = 0, total_value: total = 0 } = data

        log(msg.dipLuckcy.success(dip, total))
      }
    } catch (err) {
      log(msg.dipLuckcy.fail(err))
    }
  }

  // 免费抽奖
  async drawLottery() {
    try {
      const { data = {} } = await this.api.getFreeCount()
      const { free_count: n = 0 } = data

      log(msg.drawLottery.info(n))

      if (n) {
        const { data = {} } = await this.api.drawLottery()
        const { lottery_name: lottery = '' } = data

        log(msg.drawLottery.success(lottery))
      }
    } catch (err) {
      log(msg.drawLottery.fail(err))
    }
  }

  // BugFix
  async bugFix() {
    try {
      const { data = [] } = await this.api.getBug()

      log(msg.bugFix.info(data.length))

      if (data.length) {
        const requests = data.map(item => this.api.bugFix(item))
        const result = await Promise.allSettled(requests)
        const fulfilled = result.filter(item => item.status === REQUEST_RFULFILLED)
        const rejected = result.filter(item => item.status === REQUEST_REJECTED)

        log(msg.bugFix.success(fulfilled.length, rejected.length))
      }
    } catch (err) {
      log(msg.bugFix.fail(err))
    }
  }
}

module.exports = Helper