import { connect, clearDatabase, disconnect } from '../utils/test-db'
import { Beneficiary } from '../../lib/models/beneficiary.model'
import { BeneficiaryStatus } from '../../types/IBeneficiary'

describe('Beneficiaries API', () => {
  beforeAll(async () => {
    await connect()
  })

  afterEach(async () => {
    await clearDatabase()
  })

  afterAll(async () => {
    await disconnect()
  })

  it('should create a new beneficiary', async () => {
    const beneficiary = new Beneficiary({
      name: 'Test Beneficiary',
      email: 'test@example.com',
      needs: 'Medical assistance',
      status: BeneficiaryStatus.ACTIVE,
      phone: '1234567890',
      address: '123 Test St'
    })

    await beneficiary.save()
    const savedBeneficiary = await Beneficiary.findById(beneficiary._id)
    
    expect(savedBeneficiary).toBeTruthy()
    expect(savedBeneficiary?.name).toBe('Test Beneficiary')
    expect(savedBeneficiary?.email).toBe('test@example.com')
    expect(savedBeneficiary?.status).toBe(BeneficiaryStatus.ACTIVE)
  })

  it('should list all beneficiaries', async () => {
    const beneficiaries = [
      {
        name: 'Beneficiary 1',
        email: 'ben1@example.com',
        needs: 'Food assistance',
        status: BeneficiaryStatus.ACTIVE
      },
      {
        name: 'Beneficiary 2',
        email: 'ben2@example.com',
        needs: 'Housing assistance',
        status: BeneficiaryStatus.URGENT
      }
    ]

    await Beneficiary.insertMany(beneficiaries)
    const savedBeneficiaries = await Beneficiary.find()
    expect(savedBeneficiaries).toHaveLength(2)
  })

  it('should get beneficiary by id', async () => {
    const beneficiary = new Beneficiary({
      name: 'Test Beneficiary',
      email: 'test@example.com',
      needs: 'Medical assistance',
      status: BeneficiaryStatus.ACTIVE
    })

    await beneficiary.save()
    const foundBeneficiary = await Beneficiary.findById(beneficiary._id)
    expect(foundBeneficiary?.name).toBe('Test Beneficiary')
  })

  it('should update beneficiary status', async () => {
    const beneficiary = new Beneficiary({
      name: 'Test Beneficiary',
      email: 'test@example.com',
      needs: 'Medical assistance',
      status: BeneficiaryStatus.ACTIVE
    })

    await beneficiary.save()
    
    const updatedBeneficiary = await Beneficiary.findByIdAndUpdate(
      beneficiary._id,
      { status: BeneficiaryStatus.URGENT },
      { new: true }
    )

    expect(updatedBeneficiary?.status).toBe(BeneficiaryStatus.URGENT)
  })

  it('should not create beneficiary without required fields', async () => {
    const invalidBeneficiary = new Beneficiary({
      name: 'Test Beneficiary'
    })

    await expect(invalidBeneficiary.save()).rejects.toThrow()
  })
}) 