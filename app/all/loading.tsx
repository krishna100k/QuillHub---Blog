import React from 'react'
import { CircularProgress } from '@mui/material'

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

const loading = () => {
  return (
    <div style={styles}>
    <CircularProgress />
    </div>
  )
}

export default loading