import React, {useState} from 'react';
import { TextField, FormControl, Grid,Typography, MenuItem, Paper, Box, Link} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import {sendTx} from "../libraries/ibe500sitefunctions.js";
import Title from './Title';



export default function MakeTransaction(){

  let defaultValues = {
    lotId:'',
    txType:'',
    seller:'',
    buyer:'',
    product:'',
    quantity:'',
  }

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [txComplete, setTxComplete] = useState(false)
  const [values, setValues] = useState(defaultValues);
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

 const validateForms = () => {
    return (
      values.lotId.length > 0 &&
      values.txType.length > 0 && 
      (values.seller.length > 0 || (values.seller.length >= 0 && values.txType === "catch")) && 
      values.buyer.length > 0 && 
      values.product.length > 0 && 
      values.quantity.length > 0 
    )}
  
    const clearForms = () => {
      setValues(defaultValues)
    }

  
  const submitTransaction = async () => {    
    setLoading(true);
    if (values.txType === "catch"){values.seller = ""};
    await sendTx(values).then((response)=>{
      setLoading(false);
      setTxComplete(true);
      setTxHash(response);
      console.info("Transaction sent.")
    })
  }
  
  return (
    <Box sx={{backgroundColor: "secondary.light",borderRadius:"15px", boxShadow: "rgba(17, 30, 44 0.2) 0px 7px 29px 0px",margin:"5px", p: 2, width:"60%"}}>
      <Title sx={{marginLeft:2, marginTop:1.3}}>Create Transaction</Title>
      <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={4}>
        <FormControl required sx={{'& .MuiTextField-root': {m: 1, width:"17vw"}}}>
          <TextField id="txType_input" label="txType" select value={values.txType} onChange={handleChange('txType')} variant="filled">
            <MenuItem value="catch">Catch</MenuItem>
            <MenuItem value="sale">Sale</MenuItem>
            <MenuItem value="purchase">Purchase</MenuItem>
          </TextField>
          <TextField id="lotId_input" label="Lot ID" value={values.lotId} onChange={handleChange('lotId')} variant="filled"></TextField>
          <TextField id="seller_input" label="Seller" value={values.seller} onChange={handleChange('seller')} variant="filled"></TextField>
          <TextField id="buyer_input" label="Buyer" value={values.buyer} onChange={handleChange('buyer')} variant="filled"></TextField>
          <TextField id="product_input" label="Product" value={values.product} onChange={handleChange('product')} variant="filled"></TextField>
          <TextField id="quantity_input" label="Quantity kg" type="number" value={values.quantity} onChange={handleChange('quantity')} variant="filled"></TextField>
        </FormControl>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2} direction="column" alignContent="stretch"  sx={{p: 2, }}>
            <Grid item xs>
              <Typography sx={{marginLeft:"5px", marginBottom: "5px", fontSize:"large"}}>
                    Trx data preview
              </Typography>
              <Paper elevation={5} sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        width: "100%",
                        overflow:"auto"
                      }}>
                  <Typography sx={{fontFamily:"Courier New",whiteSpace: "pre"}}>
                    {`{\n txType: "${values.txType}", \n lotId: "${values.lotId}", \n seller: "${values.seller}", \n buyer: "${values.buyer}", \n product: "${values.product}", \n quantity: "${values.quantity}" \n}`}
                  </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3}>
                <Typography sx={{marginLeft:"5px", marginBottom: "5px", fontSize:"large"}}>
                  WoC Transaction Link
                </Typography>
                <Paper elevation={5} sx={{p:2, width:"100%"}}>
                  {txComplete ? <Link href={"https://test.whatsonchain.com/tx/"+txHash} target="_blank" rel="noreferrer">{txHash}</Link> : "-"}
                </Paper>
            </Grid>
              <Grid item xs={3}>
                <LoadingButton variant="contained" disabled={!validateForms()} loading={loading} onClick={submitTransaction} endIcon={<SendIcon />} loadingPosition="end" sx={{width:'25ch'}} >Submit</LoadingButton>
                <Button variant="outlined" onClick={() => clearForms()} endIcon={<DeleteIcon/>} sx={{marginLeft:2,width:'13ch'}} >Clear</Button>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}