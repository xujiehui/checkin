const axios = require('axios')

const SUCCESS_CODE = 0

class Axios {
  constructor({ baseURL, cookie }) {
    const instance = axios.create({
      baseURL,
      headers: { cookie },
    })

    instance.interceptors.response.use(response => {
      const { data = {} } = response

      return data.err_no === SUCCESS_CODE ? Promise.resolve(data) : Promise.reject(data)
    })

    return instance
  }
}

module.exports = Axios