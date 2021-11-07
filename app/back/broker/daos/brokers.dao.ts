import { CreateBrokerDto } from '../dto/create.broker.dto'
import { PutBrokerDto } from '../dto/put.broker.dto'
import BrokerModel from '../model/broker.model'
import { v4 as uuid4 } from 'uuid'
import debug from 'debug'

const log: debug.IDebugger = debug('app:in-memory-dao')

class BrokersDao {
  constructor () {
    log('Created new instance of BrokersDao')
  }

  async addDBroker (brokerFields: CreateBrokerDto) {
    const brokerId = uuid4()
    const insurance = await BrokerModel.Broker.create({
      _id: brokerId,
      ...brokerFields
    })

    return insurance.save()
  }

  async getBrokerById (brokerId: string) {
    return BrokerModel.Broker.findById({ _id: brokerId }).exec()
  }

  async getBrokers (limit = 25, page = 0) {
   
    return BrokerModel.Broker.find()
      .limit(limit)
      .skip(limit * page)
      .exec()
  }

  async updateBrokerById (brokerId: string, brokerFields: PutBrokerDto) {
    const existingInsurance = await BrokerModel.Broker.findByIdAndUpdate(brokerId,
      { $set: brokerFields },
      { new: true }
    ).exec()

    return existingInsurance
  }

  async removeBrokerById (brokerId: string) {
    return BrokerModel.Broker.findByIdAndDelete(brokerId).exec()
  }
}

export default new BrokersDao()
