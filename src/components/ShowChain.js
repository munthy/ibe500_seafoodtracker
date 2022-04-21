import React, {useState} from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Title from './Title';
import Datatable from './Datatable';
import {getLotData} from "../libraries/ibe500sitefunctions.js";


export default function ShowChain() {

  const [LotId, setLotId] = useState('')
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([{
    id: 0,
    link: "-",
    lotId:"-",
    txType: "-",
    seller: "-",
    buyer: "-",
    product: "-",
    quantity: "-"
  }]);

  const handleLotIdChange = (event) => {
    setLotId(event.target.value);
  }

  const updateData = (newData) => {
    let updatedData = [];
    let counter = 0;
    
    for (let item of newData) {
      let txData = JSON.parse(item.txData)
      let newObject = {
        id: counter++,
        link: item.txid,
        lotId: txData.lotId,
        txType: txData.txType,
        seller: txData.txType === "catch" ? "The Ocean" : txData.seller,
        buyer: txData.buyer,
        product: txData.product,
        quantity: txData.quantity
      }
      updatedData.push(newObject)
    }
    setData(updatedData)
    console.info(updatedData)
  }

  const getChain = async () => {  
    setLoading(true);
    await getLotData(LotId).then(response => {
      updateData(response);
      setLoading(false);
    })
  }

  return (
    <Box sx={{backgroundColor: "#252525",borderRadius:"15px", boxShadow:"0px 0px 10px #151515",margin:"5px", p: 2, width:"50%"}}>
      <Title>Lot History</Title>
      <Grid container spacing={2} direction="column"  alignItems="center" >
        <Grid item xs={2} >
          <TextField variant="outlined" label="LotId" value={LotId} onChange={handleLotIdChange}/>
          {/* <LoadingButton variant="contained" loading={loading} onClick={getChain} endIcon={<SendIcon />} loadingPosition="end" sx={{width:'25ch'}} >Submit</LoadingButton> */}
          <Button onClick={getChain} variant="contained" sx={{p:2,marginLeft:1}}>{loading ? <CircularProgress size="1.5rem" /> : "Submit"}</Button>
        </Grid>
        <Grid item xs={10} sx={{marginBottom:"30px"}}>
          <Datatable props={data} />
        </Grid>
      </Grid>
    </Box>
  )
}