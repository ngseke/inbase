import { useMemo } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Depth from '../types/Depth'
import MarketDepthRow from './MarketDepthRow'

interface MarketDepthTableProps {
  depth?: Depth,
}

function getSortedDepthList (list: Depth['asks'] | Depth['bids']) {
  return [...list]
    .map(([price, quantity]) => ({ price: +price, quantity: +quantity }))
    .sort((a, b) => b.price - a.price)
}

const limit = 10

export default function MarketDepthTable ({ depth }: MarketDepthTableProps) {
  const asks = useMemo(() => {
    if (!depth) return []
    return getSortedDepthList(depth.asks).slice(0, limit)
  }, [depth])

  const bids = useMemo(() => {
    if (!depth) return []
    return getSortedDepthList(depth.bids).slice(-limit)
  }, [depth])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {[...asks].map((ask, index, { length }) => (
              <MarketDepthRow
                key={index}
                showAskLabel={index === length - 1}
                {...ask}
              />
            ))}
            <TableRow>
              <TableCell colSpan={3} />
            </TableRow>
            {[...bids].map((bid, index) => (
              <MarketDepthRow
                key={index}
                showBidLabel={!index}
                {...bid}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
