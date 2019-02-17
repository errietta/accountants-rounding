const AWS = require('aws-sdk');

const wrapper = callback => (
  (config) => {
    AWS.config.update(config);
    return callback;
  }
);

module.exports = wrapper;
