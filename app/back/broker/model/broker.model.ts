import mongooseService from '../../common/services/mongoose.service'

class BrokerModel {
  Schema = mongooseService.getMongoose().Schema

  brokerSchema = new this.Schema({
    _id: String,
    fantasyName: String,
    cnpj: String,
    socialName: String,
    adress: String,
    susepCode: String,
    insurance: {
      type: this.Schema.Types.ObjectId,
      ref: 'Insurances'
    },
    activityAreas: Array
  },
  { id: false, timestamps: true })

  Broker = mongooseService.getMongoose().model('Brokers', this.brokerSchema)
}

export default new BrokerModel()
