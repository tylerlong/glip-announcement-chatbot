const app = require('./app')
const sendEmail = require('./crontab')

app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT)

setInterval(() => sendEmail(), 60000)
