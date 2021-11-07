import mongooseService from '../../common/services/mongoose.service'

class ProductModel {
  Schema = mongooseService.getMongoose().Schema

  productSchema = new this.Schema({
    _id: String,
    email: {
      type: String,
      require: true
    },
    password: { 
      type: String, 
      select: false,
      require: true
    },
    name: {
      type: String,
      require:true
    },
    cellPhone: {
      type: String
    },
    cpf: Number,
    cep: Number,
    address: String,
    productsInterest: [{
      name: String
    }],
  },
  { id: false, timestamps: true })

  Product = mongooseService.getMongoose().model('Products', this.productSchema)
}

export default new ProductModel()
