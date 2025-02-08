import React from 'react'
import PageCanvas from '../PageCanvas'
import TableComponent from '@/components/ui/table'
import { Button } from 'antd'

const page = () => {
  return (
    <PageCanvas title='Bénéficiaires'>
            <PageCanvas.Actions>
                <Button type='primary'>Ajouter un bénéficiaire</Button>
            </PageCanvas.Actions>  
            <PageCanvas.Content>
                <TableComponent/>
            </PageCanvas.Content>
    </PageCanvas>
)
}

export default page