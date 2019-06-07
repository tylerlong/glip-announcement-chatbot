const createApp = require('ringcentral-chatbot/dist/apps').default
const { Service } = require('ringcentral-chatbot/dist/models')

const handle = async event => {
  const { type, text, group, bot, message } = event
  if (type === 'Message4Bot') {
    if (text === 'ping') {
      await bot.sendMessage(group.id, { text: 'pong' })
    } else if (text === 'about' || text === 'help' || text === '') {
      await bot.sendMessage(group.id, { text: 'Mention me and start your message with "ANNOUNCEMENT:" and I will email the message to all the team members.' })
    } else if (text.startsWith('ANNOUNCEMENT:')) {
      await Service.create({ name: 'Announcement', groupId: group.id, botId: bot.id, data: { message } })
    } else {
      // message is not for the bot, do nothing.
    }
  }
}
const app = createApp(handle)

module.exports = app
