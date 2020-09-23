import { CognitoUserPoolTriggerEvent, Context, Callback } from 'aws-lambda';

// ------------------------------------------
// ユーザー作成認証する処理
// ------------------------------------------
export const handler = (event: CognitoUserPoolTriggerEvent, context: Context, callback: Callback) => {

  /**
   * 新規登録のとき
   */
  if (event.triggerSource === 'CustomMessage_SignUp') {
    event.response.smsMessage = `あなたのサービス確認コードは${event.request.codeParameter}です`
    event.response.emailSubject = '新規登録の確認コード'
    event.response.emailMessage = `下記URLからユーザー登録を完了してください。\<br\> URL: http://localhost:3000/signup/confirm?email=${encodeURIComponent(event.request.userAttributes.email)}&username=${event.userName}&code=${event.request.codeParameter} \<br\> Code: ${event.request.codeParameter}`
  /**
   * 認証コード再送信
   */
  } else if(event.triggerSource === 'CustomMessage_ResendCode'){
    event.response.smsMessage = `あなたのサービス確認コードは${event.request.codeParameter}です`
    event.response.emailSubject = '【再送信】新規登録の確認コード'
    event.response.emailMessage = `下記URLからユーザー登録を完了してください。\<br\> URL: http://localhost:3000/signup/confirm?email=${encodeURIComponent(event.request.userAttributes.email)}&username=${event.userName}&code=${event.request.codeParameter} \<br\> Code: ${event.request.codeParameter}`

  /**
   * パスワードを忘れたとき
   */
  } else if(event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.smsMessage = `あなたのサービス確認コードは${event.request.codeParameter}です`
    event.response.emailSubject = 'パスワードリセットの確認コード'
    event.response.emailMessage = `下記URLからパスワード再登録を行ってください。\<br\> URL: http://localhost:3000/signup?email=${encodeURIComponent(event.request.userAttributes.email)}&username=${event.userName}&code=${event.request.codeParameter} \<br\> Code: ${event.request.codeParameter}`
  }
  callback(null, event)
}