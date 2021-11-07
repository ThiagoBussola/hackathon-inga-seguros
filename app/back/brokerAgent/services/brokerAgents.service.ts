import BrokerAgentsDao from '../daos/brokerAgents.dao'
import { CRUD } from '../../common/interfaces/crud.interface'
import { CreateBrokerAgentDto } from '../dto/create.brokerAgents.dto'
import { PutBrokerAgentDto } from '../dto/put.brokerAgents.dto'

class UsersService implements CRUD {
  async create (resource: CreateBrokerAgentDto) {
    return await BrokerAgentsDao.addBrokerAgent(resource)
  }

  async findById (id: string) {
    return await BrokerAgentsDao.getBrokerAgentById(id)
  }

  async list (limit: number, page: number) {
    return await BrokerAgentsDao.getBrokerAgents(limit, page)
  }

  async putById (id: string, resource: PutBrokerAgentDto): Promise<any> {
    return await BrokerAgentsDao.updateBrokerAgentById(id, resource)
  }

  async deleteById (id: string) {
    return await BrokerAgentsDao.removeBrokerAgentsById(id)
  }

  async getBrokerAgentByEmail (email: string) {
    return await BrokerAgentsDao.getBrokerAgentsByEmail(email)
  }

  async getBrokerAgentByEmailWithPassword (email: string) {
    return await BrokerAgentsDao.getBrokerAgentsByEmailWithPassword(email)
  }
}

export default new UsersService()
