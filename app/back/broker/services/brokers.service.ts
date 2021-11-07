import BrokersDao from '../daos/brokers.dao'
import { CRUD } from '../../common/interfaces/crud.interface'
import { CreateBrokerDto } from '../dto/create.broker.dto'
import { PutBrokerDto } from '../dto/put.broker.dto'

class BrokersService implements CRUD {
  async create (resource: CreateBrokerDto) {
    return await BrokersDao.addDBroker(resource)
  }

  async findById (id: string) {
    return await BrokersDao.getBrokerById(id)
  }

  // we are accepting number as a string as it will be passed by the request parameter
  async listBrokers (limit: number, page: number) {
    return await BrokersDao.getBrokers(limit, page)
  }

  async putById (id: string, resource: PutBrokerDto): Promise<any> {
    return await BrokersDao.updateBrokerById(id, resource)
  }

  async deleteById (id: string) {
    return await BrokersDao.removeBrokerById(id)
  }
}

export default new BrokersService()
