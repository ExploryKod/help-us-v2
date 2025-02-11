import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongod: MongoMemoryServer

export const connect = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close()
    }
    
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    await mongoose.connect(uri)
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}

export const disconnect = async () => {
  try {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
  } catch (error) {
    console.error('Database disconnect failed:', error)
    throw error
  }
}

export const clearDatabase = async () => {
  try {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany({})
    }
  } catch (error) {
    console.error('Database clearing failed:', error)
    throw error
  }
}
