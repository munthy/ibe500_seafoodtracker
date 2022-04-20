import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';



export default function Datatable(props) {
  //WIP
  let rows = [];
  if (props !== null) {
    const data = props;
    let txIds = data.props.txIds;
    let analysis = data.props.analysis;
    console.log(analysis)
   
    rows = [{
      id: 0,
      link: "-",
      lotId:"-",
      txType: "-",
      seller: "-",
      buyer: "-",
      product: "-",
      quantity: "-"
    }]
  } else {
    rows = [{
      id: 0,
      link: "-",
      lotId:"-",
      txType: "-",
      seller: "-",
      buyer: "-",
      product: "-",
      quantity: "-"
    }]
  }

  return (
    <>
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell>LotId</TableCell>
            <TableCell>txType</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.lotId}</TableCell>
              <TableCell>{row.txType}</TableCell>
              <TableCell>{row.seller}</TableCell>
              <TableCell>{row.buyer}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
