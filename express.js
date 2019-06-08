const axios = require('axios')
const app = require('./app')
const sendEmail = require('./crontab')

app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT)

setInterval(() => sendEmail(), 60 * 1000)
setInterval(async () => axios.put(`${process.env.RINGCENTRAL_CHATBOT_SERVER}/admin/maintain`, undefined, { auth: {
  username: process.env.RINGCENTRAL_CHATBOT_ADMIN_USERNAME,
  password: process.env.RINGCENTRAL_CHATBOT_ADMIN_PASSWORD
} })
, 24 * 60 * 60 * 1000)
