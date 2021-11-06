import { CreateUserDto } from '../dto/create.product.dto'
import { PatchUserDto } from '../dto/patch.user.dto'
import { PutUserDto } from '../dto/put.product.dto'
import ProductModel from '../model/product.model'

import { v4 as uuid4 } from 'uuid'
import debug from 'debug'

const log: debug.IDebugger = debug('app:in-memory-dao')

class ProductsDao {
  constructor () {
    log('Created new instance of ProductssDao')
  }

  async addProduct (productFields: CreateUserDto) {
    const productId = uuid4()
    const product = await ProductModel.Product.create({
      _id: productId,
      ...productFields
    })

    const findNewProduct = await this.getProductById(product._id)

    return findNewProduct
  }

  async getProductById (productId: string) {
    return ProductModel.Product.findById({ _id: productId }).exec()
  }

  async getProducts (limit = 25, page = 0) {
    return ProductModel.Product.find()
      .limit(limit)
      .skip(limit * page)
      .exec()
  }

  // AJUSTAR PATCH USER DTO
  async updateProductById (productId: string, productFields: PatchUserDto | PutUserDto) {
    const existingUser = ProductModel.Product.findByIdAndUpdate(productId,
      { $set: productFields },
      { new: true }
    ).exec()

    return existingUser
  }

  async removeUProductById (productId: string) {
    return ProductModel.Product.findByIdAndDelete(productId).exec()
  }
}

export default new ProductsDao()
