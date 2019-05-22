const createApp = require('ringcentral-chatbot/dist/apps').default

const handle = async event => {
  const { type, text, group, bot } = event
  if (type === 'Message4Bot' && text === 'ping') {
    await bot.sendMessage(group.id, { text: 'pong' })
  }
}
const app = createApp(handle)
app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT)
