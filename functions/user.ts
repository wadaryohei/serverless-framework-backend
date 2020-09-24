import AWS from 'aws-sdk';
import { CognitoUserPoolEvent, Context, Callback } from 'aws-lambda';

// ------------------------------------------
// User作成完了時ユーザー情報をUserテーブルに書き込む
// ------------------------------------------
export const handler = (event: CognitoUserPoolEvent, _context: Context, callback: Callback) => {

  // DynamoDBを初期化
  const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: "ap-northeast-1"
  });

  // DBに保存する値
  const params = {
    TableName: 'my-serverless-backend-dev-User',
    Item: {
      'userId': event.userName,
      'username': event.userName,
      'email': event.request.userAttributes.email
    }
  }

  // DBに保存
  dynamoDB.put(params).promise().then(() => {
    callback(null, event)
  }).catch((error) => {
    callback(new Error(`${error} Couldn\'t create the todo item.`), event)
  })
}