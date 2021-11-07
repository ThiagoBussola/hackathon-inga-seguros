import InsurancesDao from '../daos/insurances.dao'
import { CRUD } from '../../common/interfaces/crud.interface'
import { CreateInsuranceDto } from '../dto/create.insurance.dto'
import { PutInsuranceDto } from '../dto/put.insurance.dto'

class InsurancesService implements CRUD {
  async create (resource: CreateInsuranceDto) {
    return await InsurancesDao.addDInsurance(resource)
  }

  async findById (id: string) {
    return await InsurancesDao.getInsuranceById(id)
  }

  // we are accepting number as a string as it will be passed by the request parameter
  async listInsurances (limit: number, page: number) {
    return await InsurancesDao.getInsurances(limit, page)
  }

  async putById (id: string, resource: PutInsuranceDto): Promise<any> {
    return await InsurancesDao.updateInsuranceById(id, resource)
  }

  async deleteById (id: string) {
    return await InsurancesDao.removeInsuranceById(id)
  }
}

export default new InsurancesService()
