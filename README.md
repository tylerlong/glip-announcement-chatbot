# Glip email announcement chatbot


## Reference

- [Tutorial for Ping chatbot - express version](https://github.com/tylerlong/glip-ping-chatbot/tree/express)
- [Tutorial for Ping chatbot - lambda version](https://github.com/tylerlong/glip-ping-chatbot/tree/lambda)


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
yarn dev
curl -X PUT -u admin:password https://xxxxx.ngrok.io/admin/setup-database
```

Add the bot to Glip in https://developers.ringcentral.com/.

Talk to the bot to test it.


## Deploy to AWS Lambda

```
cp .env.yml.sample .env.yml
edit .env.yml
```

For `RINGCENTRAL_CHATBOT_SERVER`, use a placeholder value: https://xxxxx.execute-api.us-east-1.amazonaws.com/prod

```
yarn deploy
```

Update `.env.yml` and change `RINGCENTRAL_CHATBOT_SERVER` to the real value.

```
yarn deploy
curl -X PUT -u admin:password https://xxxxx.execute-api.us-east-1.amazonaws.com/prod/admin/setup-database
```
