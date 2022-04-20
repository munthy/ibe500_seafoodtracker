import React, {useState} from 'react';
import { TextField, FormControl, Grid,Typography, MenuItem, Paper, Button, Box, CircularProgress, Link} from '@mui/material';
import {sendTx} from "../libraries/ibe500sitefunctions.js";
import Title from './Title';


export default function MakeTransaction(){
  
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [txComplete, setTxComplete] = useState(false)
  const [values, setValues] = useState({
    lotId:'',
    txType:'',
    seller:'',
    buyer:'',
    product:'',
    quantity:'',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitTransaction = async () => {    
    setLoading(true);
     await sendTx(values).then((response)=>{
       setLoading(false);
       setTxComplete(true);
       setTxHash(response);
       console.info("Transaction sent.")
       console.log(values)
     })
  }

  return (
    <Box sx={{backgroundColor: "#252525",borderRadius:"20px", boxShadow:"0px 0px 10px #151515",margin:"50px", p: 2, width:"50%"}}>
      <Title>Create Transaction</Title>
      <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={6}>
        <FormControl required sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}>
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
        <Grid item xs={6}>
          <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{p: 2, }}>
            <Grid item xs>
              <Typography sx={{marginLeft:"5px", marginBottom: "5px", fontSize:"large"}}>
                    Trx preview
              </Typography>
              <Paper elevation={5} sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        width: 300,
                        overflow:"auto"
                      }}>
              
                  <Typography sx={{fontFamily:"Courier New",whiteSpace: "pre"}}>
                    {`{\n txType: "${values.txType}", \n lotId: "${values.lotId}", \n seller: "${values.seller}", \n buyer: "${values.buyer}", \n product: "${values.product}", \n quantity: "${values.quantity}" \n}`}
                  </Typography>
              </Paper>
            </Grid>
              <Grid item xs>
                <Button variant="contained" onClick={submitTransaction} sx={{width:'25ch'}} >{loading ? <CircularProgress size="1.5rem" /> : "Submit"}</Button>
              </Grid>
              <Grid item xs>
                {txComplete ? <Link href={"https://test.whatsonchain.com/tx/"+txHash}>Link to transaction on WoC</Link> : "-"}
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}