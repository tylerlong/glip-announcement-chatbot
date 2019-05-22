# Glip email announcement chatbot


## Reference

[Tutorial for Ping chatbot - express version](https://github.com/tylerlong/glip-ping-chatbot/tree/express)
[Tutorial for Ping chatbot - lambda version](https://github.com/tylerlong/glip-ping-chatbot/tree/lambda)


## Setup for dev

```
yarn install
npx ngrok http 3000
```

Create a pubic bot app in https://developers.ringcentral.com/. Redirect uri should be `https://xxxxx.ngrok.io/bot/oauth`
Permissions required: `ReadAccounts`, `EditPermissions`, `Glip`, `WebHook Subscriptions`.


```
cp .env.sample .env
edit .env
node -r dotenv/config express.js
curl -X PUT -u admin:password https://xxxxx.ngrok.io/admin/setup-database
```

Add the bot to Glip in https://developers.ringcentral.com/.

Talk to the bot to test it.
