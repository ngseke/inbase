import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Trade from '../types/Trade'
import dayjs from 'dayjs'

interface TradeTableProps {
  trades: Trade[],
}

export default function TradeTable ({ trades }: TradeTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...trades].reverse().map(({ id, tradeTime, price, quantity }) => (
            <TableRow key={id}>
              <TableCell>{dayjs(tradeTime).format('HH:mm:ss')}</TableCell>
              <TableCell align="right">{price}</TableCell>
              <TableCell align="right">{quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
