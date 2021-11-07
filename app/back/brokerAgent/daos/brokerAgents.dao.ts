import { CreateBrokerAgentDto } from '../dto/create.brokerAgents.dto'
import { PutBrokerAgentDto } from '../dto/put.brokerAgents.dto'
import BrokerAgentModel from '../model/brokerAgent.model'

import { v4 as uuid4 } from 'uuid'
import debug from 'debug'

const log: debug.IDebugger = debug('app:in-memory-dao')
class BrokerAgentsDao {
  constructor () {
    log('Created new instance of BrokerAgentDao')
  }

  async addBrokerAgent (brokerAgentFields: CreateBrokerAgentDto) {
    const brokerAgentId = uuid4()
    const brokerAgent = await BrokerAgentModel.BrokerAgent.create({
      _id: brokerAgentId,
      ...brokerAgentFields
    })

    const findNewBrokerAgent = await this.getBrokerAgentById(brokerAgent._id)

    return findNewBrokerAgent
  }

  async getBrokerAgentsByEmail (email: string) {
    return BrokerAgentModel.BrokerAgent .findOne({ email: email }).exec()
  }

  // this function is necessary to have the password as we are inhibiting the user from searching the password in any route
  // through mongoose and filters in searches.
  async getBrokerAgentsByEmailWithPassword (email: string) {
    return BrokerAgentModel.BrokerAgent.findOne({ email: email }).select('_id email +password')
  }

  async getBrokerAgentById (brokerAgentId: string) {
    return BrokerAgentModel.BrokerAgent.findById({ _id: brokerAgentId }).exec()
  }

  async getBrokerAgents (limit = 25, page = 0) {
    return BrokerAgentModel.BrokerAgent.find()
      .limit(limit)
      .skip(limit * page)
      .exec()
  }

  async updateBrokerAgentById (brokerAgentId: string, brokerAgentFields: PutBrokerAgentDto) {
    const existingUser = BrokerAgentModel.BrokerAgent.findByIdAndUpdate(brokerAgentId,
      { $set: brokerAgentFields },
      { new: true }
    ).exec()

    return existingUser
  }


  async removeBrokerAgentsById (brokerAgentId: string) {
    return BrokerAgentModel.BrokerAgent.findByIdAndDelete(brokerAgentId).select('-password').exec()
  }
}

export default new BrokerAgentsDao()
