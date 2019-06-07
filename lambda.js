const { createAsyncProxy } = require('ringcentral-chatbot/dist/lambda')
const serverlessHTTP = require('serverless-http')
const axios = require('axios')

const app = require('./app')
const sendEmail = require('./crontab')

module.exports.app = serverlessHTTP(app)
module.exports.proxy = createAsyncProxy('app')
module.exports.maintain = async () => axios.put(`${process.env.RINGCENTRAL_CHATBOT_SERVER}/admin/maintain`, undefined, { auth: {
  username: process.env.RINGCENTRAL_CHATBOT_ADMIN_USERNAME,
  password: process.env.RINGCENTRAL_CHATBOT_ADMIN_PASSWORD
} })
module.exports.sendEmail = async () => {
  await sendEmail()
}
