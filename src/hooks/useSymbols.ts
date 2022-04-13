import axios from 'axios'
import { useEffect, useState } from 'react'
import ExchangeSymbol from '../types/ExchangeSymbol'

export default function useSymbols () {
  const [symbols, setSymbols] = useState<ExchangeSymbol[]>()

  useEffect(() => {
    axios.get(' https://api.binance.com/api/v3/exchangeInfo')
      .then(({ data }) => setSymbols(data.symbols))
  }, [])

  return {
    symbols,
  }
}
