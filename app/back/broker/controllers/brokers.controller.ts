import express from 'express'

import brokersService from '../services/brokers.service'

class BrokerController {
  async createBroker (req: express.Request, res: express.Response) {
    const broker = await brokersService.create(req.body)
    res.status(201).send(broker)
  }

  async getBrokerById (req: express.Request, res: express.Response) {
    const broker = await brokersService.findById(req.body._id)
    res.status(200).send(broker)
  }

  async listBrokers (req: express.Request, res: express.Response) {
    try {

      const brokers = await brokersService.listBrokers(100, 0)
      res.status(200).send(brokers)
    } catch (err) {

    }
  }

  async putBroker (req: express.Request, res: express.Response) {
    const updatedBroker = await brokersService.putById(req.body._id, req.body)
    res.status(200).send(updatedBroker)
  }

  async removeBroker (req: express.Request, res: express.Response) {
    const removedBroker = await brokersService.deleteById(req.body._id)
    res.status(204).send(removedBroker)
  }
}

export default new BrokerController()
