import express from 'express'
import userService from '../services/users.service'

class UsersMiddleware {

  async validateUserExists (req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await userService.findById(req.params.userId)
    if (user) {
      res.locals.user = user
      next()
    } else {
      res.status(404).send({
        errors: [`User ${req.params.userId} not found`]
      })
    }
  }

  async extractUserId (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body._id = req.params.userId
    next()
  }
}

export default new UsersMiddleware()
