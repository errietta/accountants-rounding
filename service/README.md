# Offline use

I recommend the dynamodb offline server for offline use.

Run the following in the dynamodb offline shell:

```
var params = {
TableName: 'accountants-rounding-service-dev',
KeySchema: [
    {
        AttributeName: 'id',
        KeyType: 'HASH',
    },
],
AttributeDefinitions: [
    {
        AttributeName: 'id',
        AttributeType: 'S',
    },
],
ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2,
},
};

dynamodb.createTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response

});
```

```
DYNAMODB_TABLE=accountants-rounding-service-dev \
DDB_ENDPOINT=http://localhost:8000 \
serverless offline
```
