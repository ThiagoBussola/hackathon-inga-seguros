// we import express to add types to the request/response objects from our controller functions
import express from 'express'

// we import our newly created user services
import brokerAgentsService from '../services/brokerAgents.service'

// we import the argon2 library for password hashing
import argon2 from 'argon2'

class BrokerAgentController {
  async createBrokerAgent (req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password)
    const brokerAgent = await brokerAgentsService.create(req.body)
    res.status(201).send(brokerAgent)
  }

  async getBrokerAgentById (req: express.Request, res: express.Response) {
    const brokerAgent = await brokerAgentsService.findById(req.body._id)
    res.status(200).send(brokerAgent)
  }

  async listBrokerAgents (req: express.Request, res: express.Response) {
    const brokerAgents = await brokerAgentsService.list(100, 0)
    res.status(200).send(brokerAgents)
  }

  // depois retornar o usuário atualizado
  async put (req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password)
    const updatedBrokenAgent = await brokerAgentsService.putById(req.body._id, req.body)
    res.status(200).send(updatedBrokenAgent)
  }

  async removeBrokerAgent (req: express.Request, res: express.Response) {
    const removedBrokenAgent = await brokerAgentsService.deleteById(req.body._id)
    res.status(200).send(removedBrokenAgent)
  }
}

export default new BrokerAgentController()
