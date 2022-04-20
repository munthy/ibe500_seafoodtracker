import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



export default function Datatable(props) {
  //rows = props;
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
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </>
  );
}
