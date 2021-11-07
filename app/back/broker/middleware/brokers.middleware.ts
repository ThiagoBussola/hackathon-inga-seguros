import express from 'express'
import brokersService from '../services/brokers.service'

class BrokersMiddleware {
  async validateBrokerExists (req: express.Request, res: express.Response, next: express.NextFunction) {
    const broker = await brokersService.findById(req.params.brokerId)
    if (broker) {
      res.locals.broker = broker
      next()
    } else {
      res.status(404).send({
        errors: [`Broker ${req.params.brokerId} not found`]
      })
    }
  }

  async extractBrokerId (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body._id = req.params.brokerId
    next()
  }
}

export default new BrokersMiddleware()
