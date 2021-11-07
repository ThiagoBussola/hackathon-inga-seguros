import { CommonRoutesConfig } from '../common/common.routes.config'
import InsuranceController from './controllers/insurances.controller'
import  InsurancesMiddleware from './middleware/insurances.middleware'
import jwtMiddleware from '../auth/middleware/jwt.middleware'

import express from 'express'
import insurancesController from './controllers/insurances.controller'

export class InsurancesRoutes extends CommonRoutesConfig {
  constructor (app: express.Application) {
    super(app, 'InsurancesRoutes')
  }

  // only authenticated users can use as features of developer routes
  configureRoutes (): express.Application {
    this.app.route('/insurances')
      .get(
        jwtMiddleware.validJWTNeeded,
        InsuranceController.listInsurances
      )
      .post(
        jwtMiddleware.validJWTNeeded,
        InsuranceController.createInsurance
      )

    this.app.param('insuranceId', InsurancesMiddleware.extractInsuranceId)
    this.app.route('/insurances/:insuranceId')
      .all(
        InsurancesMiddleware.validateInsuranceExists,
        jwtMiddleware.validJWTNeeded
      )
      .get(InsuranceController.getInsuranceById)
      .delete(InsuranceController.removeInsurance)

    this.app.put('/insurances/:insuranceId', [
      InsuranceController.putInsurance
    ])
    return this.app
  }
}
