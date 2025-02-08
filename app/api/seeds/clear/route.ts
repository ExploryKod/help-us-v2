// app/api/cleanup/route.ts
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function POST(request: Request) {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://amauryfranssen:password900@cluster0.n8h2o.mongodb.net/helpus', {
      ssl: true,
      authSource: 'admin',
      dbName: 'helpus'
    })

    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray()
        
    // Delete each collection
    for (const collection of collections) {
      if (collection.name !== 'system.indexes') {
        await mongoose.connection.db.collection(collection.name).deleteMany({})
        console.log(`✨ Cleared collection: ${collection.name}`)
      }
    }

    // Disconnect
    await mongoose.disconnect()

    return NextResponse.json({
      success: true,
      message: 'All collections have been cleared'
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors du nettoyage de la base de données." },
      { status: 500 }
    )
  }
}