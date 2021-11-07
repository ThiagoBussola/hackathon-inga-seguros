import express from 'express'

import insurancesService from '../services/insurances.service'

class InsuranceController {
  async createInsurance (req: express.Request, res: express.Response) {
    const insurance = await insurancesService.create(req.body)
    res.status(201).send(insurance)
  }

  async getInsuranceById (req: express.Request, res: express.Response) {
    const insurance = await insurancesService.findById(req.body._id)
    res.status(200).send(insurance)
  }

  async listInsurances (req: express.Request, res: express.Response) {
    try {
      const nome = req.query.nome as string
      const sexo = req.query.sexo as string
      // we are accepting number as a string as it will be passed by the request parameter
      const idade = req.query.idade as string
      const hobby = req.query.hobby as string

      const insurances = await insurancesService.listInsurances(100, 0)
      res.status(200).send(insurances)
    } catch (err) {

    }
  }

  async putInsurance (req: express.Request, res: express.Response) {
    const updatedInsurance = await insurancesService.putById(req.body._id, req.body)
    res.status(200).send(updatedInsurance)
  }

  async removeInsurance (req: express.Request, res: express.Response) {
    const removedInsurance = await insurancesService.deleteById(req.body._id)
    res.status(204).send(removedInsurance)
  }
}

export default new InsuranceController()
