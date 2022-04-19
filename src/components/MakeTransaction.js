import React, {useState} from 'react';
import { TextField, FormControl,Grid,Typography, MenuItem,Paper, Button} from '@mui/material';


export default function MakeTransaction(){

  const [values, setValues] = useState({
    seller:'',
    buyer:'',
    product:'',
    quantity:'',
    txType:'',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitTransaction = () => {
    console.info("Transaction submitted")
  }


  return (
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6}>
      <FormControl noValidate sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
        <TextField id="txType_input" label="txType" select value={values.txType} onChange={handleChange('txType')} variant="outlined">
          <MenuItem value="catch">Catch</MenuItem>
          <MenuItem value="sale">Sale</MenuItem>
          <MenuItem value="purchase">Purchase</MenuItem>
        </TextField>
        <TextField id="seller_input" label="Seller" value={values.seller} onChange={handleChange('seller')} variant="outlined"></TextField>
        <TextField id="buyer_input" label="Buyer" value={values.buyer} onChange={handleChange('buyer')} variant="outlined"></TextField>
        <TextField id="product_input" label="Product" value={values.product} onChange={handleChange('product')} variant="outlined"></TextField>
        <TextField id="quantity_input" label="Quantity" type="number" value={values.quantity} onChange={handleChange('quantity')} variant="outlined"></TextField>
      </FormControl>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={5}>
          <Typography sx={{"whiteSpace": "pre"}}>
            {`{\n txType: "${values.txType}", \n seller: "${values.seller}", \n buyer:" ${values.buyer}", \n product: "${values.product}", \n quantity: "${values.quantity}" \n }`}
          </Typography>
        </Paper>
        <Button variant="outlined" onClick={submitTransaction}>Submit</Button>
      </Grid>
    </Grid>
  )
}