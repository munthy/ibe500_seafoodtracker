import React, {useState} from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import {getLotContent} from "../libraries/ibe500sitefunctions.js";

export default function ShowChain() {

  const [LotId, setLotId] = useState('')

  const handleLotIdChange = (event) => {
    setLotId(event.target.value);
  }

  const getChain = async () => {    
    let lotIdString = "01";

    await getLotContent(lotIdString);
    console.info("Chain getted lol")
  }

  return (
    <Box sx={{height:400, width:"50%",outline:"solid"}}>
      <TextField variant="outlined" label="LotId" value={LotId} onChange={handleLotIdChange}/>
    </Box>
  )
}