import { CommonRoutesConfig } from '../common/common.routes.config'
import ProductsController from './controllers/products.controller'
import ProductsMiddleware from './middleware/products.middleware'
import jwtMiddleware from '../auth/middleware/jwt.middleware'
import permissionMiddleware from '../common/middleware/common.permission.middleware'
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware'
import { body } from 'express-validator'

import express from 'express'

export class ProductsRoutes extends CommonRoutesConfig {
  constructor (app: express.Application) {
    super(app, 'ProductsRoutes')
  }

  configureRoutes (): express.Application {
    this.app.route('/products')
      .get(
        // adding jwt validation, only authenticated users can list users
        jwtMiddleware.validJWTNeeded,
        ProductsController.listProducts
      )
      .post(
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        ProductsController.createProduct
      )

    this.app.param('userId', ProductsMiddleware.extractProductId)
    this.app.route('/users/:userId')
      .all(
        // for all routes that include a userId, we want only that same user or an admin to have access
        ProductsMiddleware.validateProductExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction
      )
      .get(ProductsController.getProductById)
      .delete(ProductsController.removeProduct)

    this.app.put('/users/:userId', [
      body('name').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      ProductsController.put
    ])

    return this.app
  }
}
