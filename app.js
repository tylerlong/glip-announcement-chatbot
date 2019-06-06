const createApp = require('ringcentral-chatbot/dist/apps').default

const handle = async event => {
  const { type, text, group, bot } = event
  if (type === 'Message4Bot') {
    if (text === 'ping') {
      await bot.sendMessage(group.id, { text: 'pong' })
    } else if (text === 'about' || text === 'help' || text === '') {
      await bot.sendMessage(group.id, { text: 'Mention me and start your message with "ANNOUNCEMENT:" and I will mail the message to all the team members.' })
    } else if (text.startsWith('ANNOUNCEMENT:')) {
      const persons = await bot.rc.batchGet('/restapi/v1.0/glip/persons', group.members, 30)
      await bot.sendMessage(group.id, { text: 'Sending announcement email to ' + persons
        .map(person => person.email)
        .filter(email => !email.endsWith('.bot.glip.net'))
        .join(', ') + '. Email body is: ' + text }
      )
    } else {
      // message is not for the bot, do nothing.
    }
  }
}
const app = createApp(handle)

module.exports = app
