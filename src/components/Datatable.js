import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

export default function Datatable(props) {
  const rows = props.props;

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
            <TableCell>Transaction on whatsonchain</TableCell>
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
              <TableCell><Link  href={"https://test.whatsonchain.com/tx/"+row.link} target="_blank" rel="noreferrer">{row.link.slice(0,20)+"..."}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
