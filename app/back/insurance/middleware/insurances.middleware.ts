import express from 'express'
import insurancesService from '../services/insurances.service'

class InsurancesMiddleware {
  async validateInsuranceExists (req: express.Request, res: express.Response, next: express.NextFunction) {
    const insurance = await insurancesService.findById(req.params.insuranceId)
    if (insurance) {
      res.locals.insurance = insurance
      next()
    } else {
      res.status(404).send({
        errors: [`Insurance ${req.params.insuranceId} not found`]
      })
    }
  }

  async extractInsuranceId (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body._id = req.params.insuranceId
    next()
  }
}

export default new InsurancesMiddleware()
