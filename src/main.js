const Helper = require('./helper')
const { cookie, timezone } = require('./config')

const helper = new Helper({
  cookie,
  timezone,
})

const main = async () => {
  await helper.systemTips()
  await helper.dailyTips()
  await helper.checkIn()
  await helper.dipLuckcy()
  await helper.drawLottery()
  await helper.bugFix()
}

main()