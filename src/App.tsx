import MarketDepthTable from './components/MarketDepthTable'
import TradeTable from './components/TradeTable'
import useWebsocket from './hooks/useWebsocket'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useState } from 'react'

export default function App () {
  const [symbol, setSymbol] = useState('btcusdt')
  const { trades, depth } = useWebsocket(symbol)

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <input type="text" value={symbol} onChange={e => setSymbol(e.target.value)} />
        </Grid>

        <Grid item xs={12} md={6}>
          <h2>Market Depth</h2>
          <MarketDepthTable depth={depth} />
        </Grid>

        <Grid item xs={12} md={6}>
          <h2>Trades</h2>
          <TradeTable trades={trades} />
        </Grid>
      </Grid>

    </Container>
  )
}
