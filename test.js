const gmailSend = require('gmail-send')
const glipdown = require('glipdown')

gmailSend({
  user: process.env.GMAIL_ADDRESS,
  pass: process.env.GMAIL_PASSWORD,
  to: ['tyler.liu@ringcentral.com'],
  subject: 'ANNOUNCEMENT',
  html: glipdown.Markdown(`| **When** | 11:30am on Monday |
| **Account** | dan@close.com |
| **From** | Dave Varenos |
| **To** | Dan Foody |
  `)
  // html: `<strong>Hello world</strong><ul><li>list 1</li><li>list 2</li><li>list 3</li></ul>`
  // text: `fdasfda`
})({}, (e, r) => console.log(e, r))
