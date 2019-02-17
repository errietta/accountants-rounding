'use strict';

const randomString = require('random-string');
const bcrypt = require('bcrypt');

const awsArgs = {
  region: process.env.REGION,
  endpoint: null || process.env.DDB_ENDPOINT,
}

const ddbWrapper = require('./lib/wrappers/ddb-wrapper')(awsArgs)(process.env.DYNAMODB_TABLE);

// eslint-disable-next-line no-unused-vars
module.exports.getApiKey = async (event, context) => {
  const body = JSON.parse(event.body);
  const { email, password } = body;

  if (!email || !password) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 422,
      body: JSON.stringify({
        error: 'Email and password required',
        errorCode: 1,
      }),
    }
  }

  try {
    const data = await ddbWrapper.getItem({
      id: email
    });

    if (!data || !data.Item) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const apiKey = randomString({ length: 32 });

      await ddbWrapper.addToTable({
        id: email,
        password: hashedPassword,
        apiKey: apiKey,
      });

      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        statusCode: 200,
        body: JSON.stringify({
          apiKey,
          newAccount: true,
        }),
      }
    }

    if (
      !await bcrypt.compare(password, data.Item.password)
    ) {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        statusCode: 422,
        body: JSON.stringify({
          error: 'Could not verify password',
          errorCode: 2,
        }),
      }
    }

    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 200,
      body: JSON.stringify({
        apiKey: data.Item.apiKey,
        newAccount: false,
      }),
    };
  } catch (e) {
    console.error(e);
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 500,
      body: JSON.stringify({ 'error': 'Something went wrong' }),
    };
  }
};

// eslint-disable-next-line no-unused-vars
module.exports.resetApiKey = async (event, context) => {
  const body = JSON.parse(event.body);
  const { email, password } = body;

  if (!email || !password) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 422,
      body: JSON.stringify({
        error: 'Email and password required',
        errorCode: 1,
      }),
    }
  }

  try {
    const data = await ddbWrapper.getItem({
      id: email
    });

    if (
      !data ||
      !data.Item ||
      !await bcrypt.compare(password, data.Item.password)
    ) {
      return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
        statusCode: 422,
        body: JSON.stringify({
          error: 'Could not verify email or password',
          errorCode: 2,
        }),
      }
    }

    const newApiKey = randomString({ length: 32 });

    await ddbWrapper.addToTable({
      id: data.Item.id,
      password: data.Item.password,
      apiKey: newApiKey,
    });

    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 200,
      body: JSON.stringify({
        apiKey: newApiKey,
      }),
    };
  } catch (e) {
    console.error(e);
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 500,
      body: JSON.stringify({ 'error': 'Something went wrong' }),
    };
  }
};
