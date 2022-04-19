import React, {useState} from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'


export default function ShowChain() {

  const [LotId, setLotId] = useState('')

  const handleLotIdChange = (event) => {
    setLotId(event.target.value);
  }

  return (
    <Box sx={{height:400, width:"50%",outline:"solid"}}>
      <TextField variant="outlined" label="LotId" value={LotId} onChange={handleLotIdChange}/>
    </Box>
  )
}