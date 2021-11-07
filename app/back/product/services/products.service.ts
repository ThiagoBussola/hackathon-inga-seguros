import ProductsDao from '../daos/products.dao'
import { CRUD } from '../../common/interfaces/crud.interface'
import { CreateProductDto } from '../dto/create.product.dto'
import { PutProductDto } from '../dto/put.product.dto'
import { PatchProductDto } from '../dto/patch.product.dto'

class ProductService implements CRUD {
  async create (resource: CreateProductDto) {
    return await ProductsDao.addProduct(resource)
  }

  async findById (id: string) {
    return await ProductsDao.getProductById(id)
  }

  async list (limit: number, page: number) {
    return await ProductsDao.getProducts(limit, page)
  }

  async putById (id: string, resource: PutProductDto): Promise<any> {
    return await ProductsDao.updateProductById(id, resource)
  }

  async deleteById (id: string) {
    return await ProductsDao.removeUProductById(id)
  }

}

export default new ProductService()
