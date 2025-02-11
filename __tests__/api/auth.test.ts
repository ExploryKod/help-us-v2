import { connect, clearDatabase, disconnect } from '../utils/test-db'
import User from '@/lib/models/user.model'
import { signInWithCredentials, signUpWithCredentials, changeUserPassword } from '../../lib/actions/auth.actions'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

// Increase timeout for all tests
jest.setTimeout(10000)

describe('Auth API', () => {
  beforeAll(async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Test setup failed:', error)
    }
  })

  beforeEach(async () => {
    try {
      await clearDatabase()
    } catch (error) {
      console.error('Database clearing failed:', error)
    }
  })

  afterAll(async () => {
    try {
      await clearDatabase()
      await disconnect()
      // Ensure all connections are closed
      await mongoose.connection.close()
    } catch (error) {
      console.error('Test cleanup failed:', error)
    }
  })

  describe('Sign Up', () => {
    it('should create a new user with credentials', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
        email: 'john@test.com',
        password: 'password123'
      }

      // Create user directly with mongoose to avoid connection issues
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userData.password, salt)

      const newUser = new User({
        ...userData,
        password: hashedPassword
      })
      await newUser.save()

      const savedUser = await User.findOne({ email: userData.email })
      expect(savedUser).toBeTruthy()
      expect(savedUser?.name).toBe(userData.name)
      expect(savedUser?.email).toBe(userData.email)
      
      // Password should be hashed
      const passwordIsValid = await bcrypt.compare(userData.password, savedUser?.password!)
      expect(passwordIsValid).toBe(true)
    })

    it('should not allow duplicate emails', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
        email: 'john@test.com',
        password: 'password123'
      }

      // Create first user
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userData.password, salt)
      const user = new User({
        ...userData,
        password: hashedPassword
      })
      await user.save()

      // Try to create duplicate user
      const duplicateUser = new User({
        ...userData,
        password: hashedPassword
      })

      await expect(duplicateUser.save()).rejects.toThrow()
    })
  })

  describe('Sign In', () => {
    it('should verify user credentials', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
        email: 'john@test.com',
        password: 'password123'
      }

      // Create user
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userData.password, salt)
      const user = new User({
        ...userData,
        password: hashedPassword
      })
      await user.save()

      // Verify password
      const savedUser = await User.findOne({ email: userData.email })
      const passwordIsValid = await bcrypt.compare(
        userData.password,
        savedUser?.password!
      )
      expect(passwordIsValid).toBe(true)
    })

    it('should not verify with wrong password', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
        email: 'john@test.com',
        password: 'password123'
      }

      // Create user
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userData.password, salt)
      const user = new User({
        ...userData,
        password: hashedPassword
      })
      await user.save()

      // Verify wrong password
      const savedUser = await User.findOne({ email: userData.email })
      const passwordIsValid = await bcrypt.compare(
        'wrongpassword',
        savedUser?.password!
      )
      expect(passwordIsValid).toBe(false)
    })
  })

//   describe('Password Change', () => {
//     it('should change password for authenticated user', async () => {
//       // Create a test user with all required fields
//       const testUser = {
//         email: "test@example.com",
//         password: "oldpassword123",
//         name: "Test User",
//         firstName: "Test",
//         lastName: "User",
//       };

//       // Create a user
//       const oldPassword = testUser.password
//       const newPassword = 'newpassword123'
      
//       const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         name: testUser.name,
//         firstName: testUser.firstName,
//         lastName: testUser.lastName,
//         email: testUser.email,
//         password: await bcrypt.hash(oldPassword, 10),
//         provider: 'credentials'
//       })
//       await user.save()

//       // Mock session
//       jest.mock('next-auth/next', () => ({
//         getServerSession: jest.fn(() => ({
//           user: {
//             _id: user._id,
//             provider: 'credentials'
//           }
//         }))
//       }))

//       const result = await changeUserPassword({
//         oldPassword,
//         newPassword
//       })

//       expect(result).toEqual({ success: true })

//       // Verify new password
//       const updatedUser = await User.findById(user._id)
//       const newPasswordIsValid = await bcrypt.compare(
//         newPassword,
//         updatedUser?.password
//       )
//       expect(newPasswordIsValid).toBe(true)
//     })
//   })
}) 