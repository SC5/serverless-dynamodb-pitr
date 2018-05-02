'use strict';

const AWS = require('aws-sdk')
const Promise = require('bluebird')

class Plugin {
  constructor(serverless, options) {
    this.serverless = serverless
    this.hooks = {
      'after:deploy:deploy': this.afterDeploy.bind(this),
    }
  }

  getRegion() {
    return this.serverless.getProvider('aws').getRegion()
  }

  getPitr() {
    return this.serverless.service.custom && this.serverless.service.custom.pitr || []
  }

  processItem(item) {
    if (!item.tableName) {
      return Promise.reject(new Error('serverless-dynamodb-pitr: "tableName" is missing'))
    }
    if (item.enabled === undefined) {
      return Promise.reject(new Error('serverless-dynamodb-pitr: "enabled" is missing'))
    }
    const params = {
      PointInTimeRecoverySpecification: {
        PointInTimeRecoveryEnabled: !!item.enabled
      },
      TableName: item.tableName
    };
    const dynamodb = new AWS.DynamoDB({ region: this.getRegion()})
    return dynamodb.updateContinuousBackups(params).promise()
      .then(() => {
        this.serverless.cli.log(`Point-in-time recovery ${(item.enabled) ? 'enabled' : 'disabled'} on ${item.tableName}`)
      })
  }

  afterDeploy() {
    Promise.all(
      this.getPitr().map(item => this.processItem(item))
    )
  }
}

module.exports = Plugin;