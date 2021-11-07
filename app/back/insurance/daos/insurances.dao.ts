import { CreateInsuranceDto } from '../dto/create.insurance.dto'
import { PutInsuranceDto } from '../dto/put.insurance.dto'
import InsuranceModel from '../model/insurance.model'
import { v4 as uuid4 } from 'uuid'
import debug from 'debug'

const log: debug.IDebugger = debug('app:in-memory-dao')

class InsurancesDao {
  constructor () {
    log('Created new instance of InsurancesDao')
  }

  async addDInsurance (insuranceFields: CreateInsuranceDto) {
    const insuranceId = uuid4()
    const insurance = await InsuranceModel.Insurance.create({
      _id: insuranceId,
      ...insuranceFields
    })

    return insurance.save()
  }

  async getInsuranceById (insuranceId: string) {
    return InsuranceModel.Insurance.findById({ _id: insuranceId }).exec()
  }

  async getInsurances (limit = 25, page = 0) {
   
    return InsuranceModel.Insurance.find()
      .limit(limit)
      .skip(limit * page)
      .exec()
  }

  async updateInsuranceById (insuranceId: string, insuranceFields: PutInsuranceDto) {
    const existingInsurance = await InsuranceModel.Insurance.findByIdAndUpdate(insuranceId,
      { $set: insuranceFields },
      { new: true }
    ).exec()

    return existingInsurance
  }

  async removeInsuranceById (insuranceId: string) {
    return InsuranceModel.Insurance.findByIdAndDelete(insuranceId).exec()
  }
}

export default new InsurancesDao()
