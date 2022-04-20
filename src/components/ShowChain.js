import React, {useState} from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Title from './Title';
import Datatable from './Datatable';
import {getLotContent} from "../libraries/ibe500sitefunctions.js";


export default function ShowChain() {

  const [LotId, setLotId] = useState('')
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLotIdChange = (event) => {
    setLotId(event.target.value);
  }

  const getChain = async () => {  
    setLoading(true);
    await getLotContent(LotId).then(response => {
      setData(response);
      setLoading(false);
    })
  }

  return (
    <Box sx={{backgroundColor: "#252525",borderRadius:"15px", boxShadow:"0px 0px 10px #151515",margin:"5px", p: 2, width:"50%"}}>
      <Title>Lot History</Title>
      <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
        <Grid item>
          <TextField variant="outlined" label="LotId" value={LotId} onChange={handleLotIdChange}/>
          <Button onClick={getChain} variant="contained" sx={{p:2,marginLeft:1}}>{loading ? <CircularProgress size="1.5rem" /> : "Submit"}</Button>
        </Grid>
        <Grid item>
          <Datatable props={data} />
        </Grid>
      </Grid>
    </Box>
  )
}