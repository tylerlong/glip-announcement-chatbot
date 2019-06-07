const { createAsyncProxy } = require('ringcentral-chatbot/dist/lambda')
const serverlessHTTP = require('serverless-http')
const app = require('./app')
const axios = require('axios')

module.exports.app = serverlessHTTP(app)
module.exports.proxy = createAsyncProxy('app')
module.exports.maintain = async () => axios.put(`${process.env.RINGCENTRAL_CHATBOT_SERVER}/admin/maintain`, undefined, { auth: {
  username: process.env.RINGCENTRAL_CHATBOT_ADMIN_USERNAME,
  password: process.env.RINGCENTRAL_CHATBOT_ADMIN_PASSWORD
} })
