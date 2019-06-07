const delay = require('timeout-as-promise')
const gmailSend = require('gmail-send')
const { Service, Bot } = require('ringcentral-chatbot/dist/models')

const sendEmail = async () => {
  const services = await Service.findAll({ where: { name: 'Announcement' } })
  if (services.length === 0) {
    return
  }
  for (const service of services) {
    try {
      const bot = await Bot.findOne({ where: { id: service.botId } })
      if (!bot) {
        continue
      }
      const group = await bot.getGroup(service.groupId)
      if (!group) {
        continue
      }
      let post
      try {
        const r = await bot.rc.get(`/restapi/v1.0/glip/posts/${service.data.message.id}`)
        post = r.data
      } catch (e) {
        if (e.status === 404) {
          continue
        }
        throw e
      }
      const text = post.text.trim()
      if (!text.startsWith('ANNOUNCEMENT:')) {
        continue
      }
      const persons = await bot.rc.batchGet('/restapi/v1.0/glip/persons', group.members, 30)
      const emails = persons
        .map(person => person.email)
        .filter(email => !email.endsWith('.bot.glip.net'))
      gmailSend({
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD,
        to: emails,
        subject: 'ANNOUNCEMENT',
        text: text.substring(13).trim()
      })({}, (e, r) => console.log(e, r))
      console.log(emails)
    } finally {
      await Service.destroy({ where: { id: service.id } })
    }
    await delay(2000) // wait for email sending
  }
}

module.exports = sendEmail
