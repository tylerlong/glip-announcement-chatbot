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
      const r = await bot.rc.post('/restapi/v1.0/glip/groups', {
        type: 'PrivateChat',
        members: [bot.id, message.creatorId]
      })
      const tempGroup = r.data
      await bot.rc.post('/restapi/v1.0/glip/posts', { groupId: tempGroup.id, text: `You've posted an announcement in Glip. You have 10 minutes to edit or delete it before it will be emailed to all members in that conversation.` })
    } else {
      // message is not for the bot, do nothing.
    }
  }
}
const app = createApp(handle)

module.exports = app
