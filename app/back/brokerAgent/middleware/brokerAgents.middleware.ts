import express from 'express'
import brokerAgentService from '../services/brokerAgents.service'

class BrokerAgentsMiddleware {
  async validateSameEmailDoesntExist (req: express.Request, res: express.Response, next: express.NextFunction) {
    const brokerAgent = await brokerAgentService.getBrokerAgentByEmail(req.body.email)
    if (brokerAgent) {
      res.status(400).send({ errors: ['User email already exists'] })
    } else {
      next()
    }
  }

  async validateSameEmailBelongToSameUser (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (res.locals.brokerAgent._id === req.params.brokerAgentId) {
      next()
    } else {
      res.status(400).send({ errors: ['Invalid email'] })
    }
  }

  // Here we need to use an arrow function to bind `this` correctly
  validatePatchEmail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.body.email) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.validateSameEmailBelongToSameUser(req, res, next)
    } else {
      next()
    }
  }

  async validateBrokerAgentExists (req: express.Request, res: express.Response, next: express.NextFunction) {
    const brokerAgent = await brokerAgentService.findById(req.params.brokerAgentId)
    if (brokerAgent) {
      res.locals.brokerAgent = brokerAgent
      next()
    } else {
      res.status(404).send({
        errors: [`User ${req.params.userId} not found`]
      })
    }
  }

  async extractBrokerAgentId (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body._id = req.params.brokerAgentId
    next()
  }
}

export default new BrokerAgentsMiddleware()
