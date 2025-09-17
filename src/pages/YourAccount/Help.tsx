import {  Container } from '@mui/material'
import { LeftSideForm, RightSideList } from '../../components/Help'

const Help = () => {
  return (
    <Container sx={{ p: { xs: 0.5, sm: 3, md: 0 }, display: 'flex', minHeight: '60vh', gap: 2, flexDirection: { xs: 'column', md: 'row' }}}>
      <LeftSideForm/>
      <RightSideList />
    </Container>
  )
}

export default Help