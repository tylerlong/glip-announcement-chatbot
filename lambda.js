const { createAsyncProxy } = require('ringcentral-chatbot/dist/lambda')
const serverlessHTTP = require('serverless-http')
const app = require('./app')

module.exports.app = serverlessHTTP(app)
module.exports.proxy = createAsyncProxy('app')
