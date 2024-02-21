import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <>
     <Box sx={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        height: '100vh', // Take up the full height of the viewport
      }}>
      <CircularProgress />
    </Box>
    </>
  )
}

export default Loading
