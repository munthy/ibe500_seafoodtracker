import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

export default function Datatable(props) {
  const rows = props.props;
  console.info(rows)

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
            <TableCell>Tx whatsonchain link</TableCell>
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
              <TableCell><Link  href={"https://test.whatsonchain.com/tx/"+row.link} target="_blank" rel="noreferrer">{row.link.slice(0,15)+"..."}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
