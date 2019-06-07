const gmailSend = require('gmail-send')
const glipdown = require('glipdown')

// console.log(glipdown.Markdown(`Text **after** edit

// **Multiple lines support**

// [Glipdown Support](https://github.com/jstrinko/glipdown)
//   `).replace(/\n/g, '\n<br/>'))

gmailSend({
  user: process.env.GMAIL_ADDRESS,
  pass: process.env.GMAIL_PASSWORD,
  to: ['tyler.liu@ringcentral.com'],
  subject: 'ANNOUNCEMENT',
  html: glipdown.Markdown(`Text **after** edit

**Multiple lines support**

[Glipdown Support](https://github.com/jstrinko/glipdown)
  `).replace(/\n/g, '\n<br/>')
  // html: `<strong>Hello world</strong><ul><li>list 1</li><li>list 2</li><li>list 3</li></ul>`
  // text: `fdasfda`
})({}, (e, r) => console.log(e, r))
