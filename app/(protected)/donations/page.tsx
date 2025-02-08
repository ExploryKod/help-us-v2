import React from 'react'
import PageCanvas from '../../PageCanvas'
import TableComponent from '@/components/ui/table'
import { Button } from 'antd'
import BeneficiaryTable from '@/components/ui/BeneficiaryTable'
import DonationTable from '@/components/ui/DonationTable'

const page = () => {
  
  return (
    <PageCanvas title='Donations'>
      <PageCanvas.Content>
        <DonationTable/>
      </PageCanvas.Content>
    </PageCanvas>
  )
}

export default page