import mongoose from 'mongoose'
import debug from 'debug'
import dotenv from 'dotenv'
dotenv.config()

const log: debug.IDebugger = debug('app:mongoose-service')
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'localhost'
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const MONGO_PORT = process.env.MONGO_PORT || 27017
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const MONGO_DB = process.env.MONGO_DB || 'api-db-inga'

const ATLAS_URI = process.env.ATLAS_URI
class MongooseService {
  private count = 0
  private readonly mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  }

  constructor () {
    this.connectWithRetry()
  }

  getMongoose () {
    return mongoose
  }

  connectWithRetry = () => {
    log('Attempting MongoDB connection (will retry if needed)')

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    mongoose.connect(`${ATLAS_URI}`, this.mongooseOptions).then(() => {
      log('MongoDB is connected')
    }).catch((err) => {
      const retrySeconds = 5
      log(
        `MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`,
        err
      )
      setTimeout(this.connectWithRetry, retrySeconds * 1000)
    })
  }
}

export default new MongooseService()
