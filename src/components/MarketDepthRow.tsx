import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

interface MarketDepthRowProps {
  price: number,
  quantity: number,
  showAskLabel?: boolean,
  showBidLabel?: boolean,
}

export default function MarketDepthRow ({
  price,
  quantity,
  showAskLabel,
  showBidLabel,
}: MarketDepthRowProps) {
  return (
    <TableRow>
      <TableCell align="right">{price.toFixed(2)}</TableCell>
      <TableCell align="right">{quantity}</TableCell>
      {showAskLabel && <TableCell>Ask</TableCell>}
      {showBidLabel && <TableCell>Bid</TableCell>}
    </TableRow>
  )
}
