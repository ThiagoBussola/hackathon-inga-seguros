import express from 'express'
import productService from '../services/products.service'

class ProductsMiddleware {

  async validateProductExists (req: express.Request, res: express.Response, next: express.NextFunction) {
    const product = await productService.findById(req.params.productId)
    if (product) {
      res.locals.user = product
      next()
    } else {
      res.status(404).send({
        errors: [`Product ${req.params.productId} not found`]
      })
    }
  }

  async extractProductId (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body._id = req.params.productId
    next()
  }
}

export default new ProductsMiddleware()
