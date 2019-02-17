'use strict';

const awsArgs = {
  region: process.env.REGION,
  endpoint: null || process.env.DDB_ENDPOINT,
}


const ddbWrapper = require('./lib/wrappers/ddb-wrapper')(awsArgs)(process.env.DYNAMODB_TABLE);

// eslint-disable-next-line no-unused-vars
module.exports.doRound = async (event, context) => {
  const body = JSON.parse(event.body);

  const apiKey = body.apiKey;
  const numsToRound = body.numbers || [0];

  let numDecimals = body.decimals;

  if (!numDecimals || isNaN(numDecimals) || numDecimals < 0) {
    numDecimals = 2;
  }

  if (!apiKey) {
    return {
      statusCode: 403,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'no api key provided',
        statusCode: 3,
      })
    }
  }

  const user = await ddbWrapper.findByApiKey(apiKey);

  if (!user || !user.Items || user.Items.length === 0) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 403,
      body: JSON.stringify({
        message: 'invalid api key',
        statusCode: 3,
      }),
    };
  }

  let numUse = user.Items[0].numUse || 0;
  let result = [];

  for (let num of numsToRound) {
    if (numUse % 2) {
      result.push(Math.ceil(num * Math.pow(10, numDecimals)) / Math.pow(10, numDecimals));
    } else {
      result.push(Math.floor(num * Math.pow(10, numDecimals)) / Math.pow(10, numDecimals));
    }

    numUse++;
  }

  ddbWrapper.addToTable({
    id: user.Items[0].id,
    password: user.Items[0].password,
    apiKey: user.Items[0].apiKey,
    numUse,
  });

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    statusCode: 200,
    body: JSON.stringify({
      result,
    }),
  };
};
