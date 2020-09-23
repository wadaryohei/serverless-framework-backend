import { Context, APIGatewayProxyResult, Callback } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyResult, context: Context, callback: Callback) => {

  const message = 'Hello World.'

  const response = {
    statusCode: 200,
    'headers': {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      context: context,
      event: event,
      message: message
    })
  }

  callback(null, response);
};
