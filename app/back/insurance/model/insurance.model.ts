import mongooseService from '../../common/services/mongoose.service'

class InsuranceModel {
  Schema = mongooseService.getMongoose().Schema

  insuranceSchema = new this.Schema({
    _id: String,
    fantasyName: String,
    cnpj: String,
    socialName: String,
    adress: String,
    activityAreas: Array,
    operationTime: Number,
    products: String
  },
  { id: false, timestamps: true })

  Insurance = mongooseService.getMongoose().model('Insurances', this.insuranceSchema)
}

export default new InsuranceModel()
