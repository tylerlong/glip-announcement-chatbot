const delay = require('timeout-as-promise')
const gmailSend = require('gmail-send')
const { Service, Bot } = require('ringcentral-chatbot/dist/models')
const Sequelize = require('sequelize')
const glipdown = require('glipdown')

const sendEmail = async () => {
  const services = await Service.findAll({ where: {
    name: 'Announcement',
    createdAt: {
      [Sequelize.Op.lt]: new Date(new Date() - 10 * 60 * 1000)
    }
  } })
  if (services.length === 0) {
    console.log('No email to send')
    return
  }
  for (const service of services) {
    try {
      const bot = await Bot.findOne({ where: { id: service.botId } })
      if (!bot) {
        console.log('no bot')
        continue
      }
      const group = await bot.getGroup(service.groupId)
      if (!group) {
        console.log('no group')
        continue
      }
      let post
      try {
        const r = await bot.rc.get(`/restapi/v1.0/glip/posts/${service.data.message.id}`)
        post = r.data
      } catch (e) {
        if (e.status === 404) {
          console.log('no post')
          continue
        }
        throw e
      }
      const text = post.text.replace(/!\[:Person\]\(\d+\)/, '').trim()
      if (!text.startsWith('ANNOUNCEMENT:')) {
        console.log(text)
        console.log('post is not ANNOUNCEMENT')
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
        html: glipdown.Markdown(text.substring(13).trim()).replace(/\n/g, '\n<br/>')
        // text: text.substring(13).trim()
      })({}, (e, r) => console.log(e, r))
      console.log(emails)
      const r = await bot.rc.post('/restapi/v1.0/glip/groups', {
        type: 'PrivateChat',
        members: [bot.id, service.data.message.creatorId]
      })
      const tempGroup = r.data
      await bot.rc.post('/restapi/v1.0/glip/posts', { groupId: tempGroup.id, text: `Your announcement has been emailed!` })
    } finally {
      await Service.destroy({ where: { id: service.id } })
    }
    await delay(2000) // wait for email sending
  }
}

module.exports = sendEmail
