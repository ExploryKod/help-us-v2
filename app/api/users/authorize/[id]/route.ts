// app/api/user/authorize/route.ts
import { NextResponse, NextRequest } from 'next/server'
import mongoose from 'mongoose'

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://amauryfranssen:password900@cluster0.n8h2o.mongodb.net/helpus', {
      ssl: true,
      authSource: 'admin',
      dbName: 'helpus'
    })

    // Get the user ID from URL parameters
    const id = request.nextUrl.pathname.split('/').pop()

    // Import model
    const UserModel = mongoose.models.User || 
      mongoose.model('User', new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String },
        image: { type: String },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        provider: { type: String, default: 'credentials' }
      }, { timestamps: true }))

    // Update the user's role
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { role: 'admin' },
      { new: true }
    )

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      )
    }

    // Disconnect
    await mongoose.disconnect()

    return NextResponse.redirect(new URL('/signin', request.url)

    )

  } catch (error) {
    console.error('Error updating user role:', error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour du rôle" },
      { status: 500 }
    )
  }
}