## Serverless Framework Architecture - BackEnd -

Serverless FrameworkでAWS環境を構築する。

※予めRootにsrcディレクトリを作成してください。

> AppSync / DynamoDB / Amplify / Cognito / Lambda

before deploy

```
serverless config credentials --provider aws --key xxxx --secret xxxx
```

deploy serverless objects

```
yarn install
yarn deploy
```

remove serverless objects

```
yarn destroy
```