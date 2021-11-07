// we import express to add types to the request/response objects from our controller functions
import express from 'express'

// we import our newly created user services
import productService from '../services/products.service'

// we import the argon2 library for password hashing

class ProductController {
  async createProduct (req: express.Request, res: express.Response) {
    const product = await productService.create(req.body)
    res.status(201).send(product)
  }

  async getProductById (req: express.Request, res: express.Response) {
    const product = await productService.findById(req.body._id)
    res.status(200).send(product)
  }

  async listProducts (req: express.Request, res: express.Response) {
    const products = await productService.list(100, 0)
    res.status(200).send(products)
  }

  // depois retornar o usuário atualizado
  async put (req: express.Request, res: express.Response) {
    const updatedProduct = await productService.putById(req.body._id, req.body)
    res.status(200).send(updatedProduct)
  }

  async removeProduct (req: express.Request, res: express.Response) {
    const removedProduct = await productService.deleteById(req.body._id)
    res.status(200).send(removedProduct)
  }
}

export default new ProductController()
