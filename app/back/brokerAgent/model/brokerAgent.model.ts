import mongooseService from '../../common/services/mongoose.service'

class BorkerAgentModel {
  Schema = mongooseService.getMongoose().Schema

  brokerAgentSchema = new this.Schema({
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
    broker: {
      type: this.Schema.Types.ObjectId,
      ref: 'Brokers',
      require: true
    },
    cellPhone: {
      type: String
    },
    cpf: Number,
    cep: Number,
    address: String,
  },
  { id: false, timestamps: true })

  BrokerAgent = mongooseService.getMongoose().model('BrokerAgents', this.brokerAgentSchema)
}

export default new BorkerAgentModel()
