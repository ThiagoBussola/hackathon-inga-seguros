import { CommonRoutesConfig } from '../common/common.routes.config'
import BrokerController from './controllers/brokers.controller'
import  BrokersMiddleware from './middleware/brokers.middleware'
import jwtMiddleware from '../auth/middleware/jwt.middleware'

import express from 'express'

export class BrokersRoutes extends CommonRoutesConfig {
  constructor (app: express.Application) {
    super(app, 'BrokersRoutes')
  }

  // only authenticated users can use as features of developer routes
  configureRoutes (): express.Application {
    this.app.route('/brokers')
      .get(
        jwtMiddleware.validJWTNeeded,
        BrokerController.listBrokers
      )
      .post(
        jwtMiddleware.validJWTNeeded,
        BrokerController.createBroker
      )

    this.app.param('brokerId', BrokersMiddleware.extractBrokerId)
    this.app.route('/brokers/:brokerId')
      .all(
        BrokersMiddleware.validateBrokerExists,
        jwtMiddleware.validJWTNeeded
      )
      .get(BrokerController.getBrokerById)
      .delete(BrokerController.removeBroker)

    this.app.put('/brokers/:brokerId', [
      BrokerController.putBroker
    ])
    return this.app
  }
}
