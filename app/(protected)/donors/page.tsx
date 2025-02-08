import { Button } from 'antd'
import PageCanvas from '../../PageCanvas'
import DonorTable from '@/components/ui/DonorTable'

const page = () => {
  
  return (
    <PageCanvas title='Donateurs'>
      <PageCanvas.Actions>
        <Button type='primary'>Ajouter un donateur</Button>
      </PageCanvas.Actions>  
      <PageCanvas.Content>
      <DonorTable />
      </PageCanvas.Content>
    </PageCanvas>
  )
}

export default page