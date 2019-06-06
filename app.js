const createApp = require('ringcentral-chatbot/dist/apps').default
const delay = require('timeout-as-promise')
const gmailSend = require('gmail-send')

const handle = async event => {
  const { type, text, group, bot } = event
  if (type === 'Message4Bot') {
    if (text === 'ping') {
      await bot.sendMessage(group.id, { text: 'pong' })
    } else if (text === 'about' || text === 'help' || text === '') {
      await bot.sendMessage(group.id, { text: 'Mention me and start your message with "ANNOUNCEMENT:" and I will mail the message to all the team members.' })
    } else if (text.startsWith('ANNOUNCEMENT:')) {
      const persons = await bot.rc.batchGet('/restapi/v1.0/glip/persons', group.members, 30)
      const emails = persons
        .map(person => person.email)
        .filter(email => !email.endsWith('.bot.glip.net'))
      await bot.sendMessage(group.id, { text: 'Sending announcement above via email to ' + emails.join(', ') })
      gmailSend({
        user: process.env.GMAIL_ADDRESS, // Your GMail account used to send emails
        pass: process.env.GMAIL_PASSWORD, // Application-specific password
        to: emails, // Send to yourself
        subject: 'ANNOUNCEMENT',
        text: text.substring(13).trim()
      })({})
      await delay(3000)
    } else {
      // message is not for the bot, do nothing.
    }
  }
}
const app = createApp(handle)

module.exports = app
