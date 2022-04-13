import MarketDepthTable from './components/MarketDepthTable'
import TradeTable from './components/TradeTable'
import useWebsocket from './hooks/useWebsocket'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import SymbolAutocomplete from './components/SymbolAutocomplete'

export default function App () {
  const [symbol, setSymbol] = useState('btcusdt')
  const { trades, depth } = useWebsocket(symbol)

  return (
    <Container>
      <Box py={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SymbolAutocomplete value={symbol} onChange={setSymbol} />
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
      </Box>
    </Container>
  )
}
