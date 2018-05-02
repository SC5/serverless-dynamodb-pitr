# Serverless DynamoDB Point-in-time Recovery

A Serverless Plugin for the [Serverless Framework](http://www.serverless.com)
to enable/disable PITR (Point-in-time recovery) for one or more DynamoDB tables on deploy.

## Introduction

This plugin uses DynamoDB API to update the PointInTimeRecoverySpecification
of the specified tables right after deployment, allowing to enable or disable point-in-time recovery of the tables.

## Installation and configuration

In your service root, run:

```bash
npm install --save-dev serverless-dynamodb-pitr
```

Add the plugin to `serverless.yml`:

```yml
plugins:
  - serverless-dynamodb-pitr
```

## Usage

You can add items under the `custom.pitr` in `serverless.yml`. Required attributes are `tableName` and `enabled`:

```yml
custom:
  pitr:
    - tableName: someDynamoDBTableName
      enabled: true
    - tableName: someOtherTableName
      enabled: false
```

## TODO

* Add tests

## Release History

* 2018/05/02 - v0.1.0 - Initial version


## License

Copyright (c) 2018 [Nordcloud](https://nordcloud.com/), licensed for users and contributors under MIT license.
https://github.com/SC5/serverless-dynamodb-pitr/blob/master/LICENSE