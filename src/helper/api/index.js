const Axios = require('./axios')

const BASE_URL = 'https://api.juejin.cn'

class Api {
  constructor({ cookie }) {
    this.axios = new Axios({
      baseURL: BASE_URL,
      cookie,
    })
  }

  getDailyCounts() {
    return this.axios({
      method: 'get',
      url: '/growth_api/v1/get_counts',
    })
  }

  checkIn() {
    return this.axios({
      method: 'post',
      url: '/growth_api/v1/check_in',
    })
  }

  getLotteryHistory() {
    return this.axios({
      method: 'post',
      url: '/growth_api/v1/lottery_history/global_big',
    })
  }

  dipLuckcy(data) {
    return this.axios({
      data,
      method: 'post',
      url: '/growth_api/v1/lottery_lucky/dip_lucky',
    })
  }

  getFreeCount() {
    return this.axios({
      method: 'get',
      url: '/growth_api/v1/lottery_config/get',
    })
  }

  drawLottery() {
    return this.axios({
      method: 'post',
      url: '/growth_api/v1/lottery/draw',
    })
  }

  getBug() {
    return this.axios({
      method: 'post',
      url: '/user_api/v1/bugfix/not_collect',
    })
  }

  bugFix(data) {
    return this.axios({
      data,
      method: 'post',
      url: '/user_api/v1/bugfix/collect',
    })
  }
}

module.exports = Api