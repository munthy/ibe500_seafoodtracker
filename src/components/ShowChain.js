import React, {useState} from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Title from './Title';
import Datatable from './Datatable';
import {getLotData, DataAnalysis} from "../libraries/ibe500sitefunctions.js";
import { Typography } from '@mui/material';


export default function ShowChain() {

  const [LotId, setLotId] = useState('')
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState([])
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
  }

  const massBalance = (inData) => {
    let dataArray = inData.map(item => JSON.parse(item.txData));
    let analysisList = DataAnalysis.ReturnCompanyStats(dataArray);
    let outList = [];
    for (let key of Object.keys(analysisList)) {
      let clone = analysisList[key]
      clone.companyname = key;
      outList.push(clone)
    }
    setAnalysis(outList)
  }

  const getChain = async () => {  
    setLoading(true);
    await getLotData(LotId).then(response => {
      updateData(response);
      massBalance(response);
      setLoading(false);
    })
  }

  return (
    <Box sx={{backgroundColor: "secondary.light",borderRadius:"15px",boxShadow: "rgba(17, 30, 44 0.2) 0px 7px 29px 0px",margin:"5px", p: 2, width:"60%"}}>
      <Grid container spacing={2} direction="column" sx={{p:3}} >
      <Title sx={{marginLeft:2}}>Lot History</Title>
        <Grid item xs={2} >
          <TextField variant="filled" label="LotId" value={LotId} onChange={handleLotIdChange}/>
          <LoadingButton variant="contained" loading={loading} onClick={getChain} endIcon={<SendIcon />} loadingPosition="end" sx={{p:2,marginLeft:1}} >Submit</LoadingButton>
        </Grid>
        <Grid item xs={10} sx={{marginBottom:"30px"}}>
          <Datatable props={data} />
        </Grid>
        <Grid item>
          <Title> Mass Balance</Title>
          <Grid container spacing={2} direction="row">
              {analysis.map(row => (
                <Grid item>
                  <Paper elevation={5} sx={{p:2}}>
                  <Typography sx={{fontSize:"large", fontWeight:"bold"}}>{row.companyname}</Typography>
                  <Typography>{row.purchasedFrom === undefined ? "Caught: " : "Purchased: "}{row.purchased}</Typography>
                  <Typography>Sold: {row.sold === undefined ? "0" : row.sold}</Typography>
                  <Typography sx={{marginTop:1, marginBottom:-1}}>{row.sold > row.purchased ? <DoNotDisturbIcon sx={{color:"#e65c5c"}}/> : <CheckCircleIcon sx={{color:"#5ce65c"}}/> }</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}