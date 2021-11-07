import { CommonRoutesConfig } from '../common/common.routes.config'
import BrokerAgentsController from './controllers/brokerAgents.controller'
import UsersMiddleware from './middleware/brokerAgents.middleware'
import jwtMiddleware from '../auth/middleware/jwt.middleware'
import permissionMiddleware from '../common/middleware/common.permission.middleware'
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware'
import { body } from 'express-validator'

import express from 'express'

export class BrokerAgentssRoutes extends CommonRoutesConfig {
  constructor (app: express.Application) {
    super(app, 'BrokerAgentssRoutes')
  }

  configureRoutes (): express.Application {
    this.app.route('/broker-agents')
      .get(
        // adding jwt validation, only authenticated users can list users
        jwtMiddleware.validJWTNeeded,
        BrokerAgentsController.listBrokerAgents
      )
      .post(
        body('email').isEmail(),
        body('password')
          .isLength({ min: 5 })
          .withMessage('Must include password (5+ characters)'),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validateSameEmailDoesntExist,
        BrokerAgentsController.createBrokerAgent
      )

    this.app.param('brokerAgentId', UsersMiddleware.extractBrokerAgentId)
    this.app.route('/broker-agents/:brokerAgentId')
      .all(
        // for all routes that include a brokerAgentId, we want only that same user or an admin to have access
        UsersMiddleware.validateBrokerAgentExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction
      )
      .get(BrokerAgentsController.getBrokerAgentById)
      .delete(BrokerAgentsController.removeBrokerAgent)

    this.app.put('/broker-agents/:brokerAgentId', [
      body('email').isEmail(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Must include password (5+ characters)'),
      body('name').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      BrokerAgentsController.put
    ])

    return this.app
  }
}
