import axios from 'axios'
import { useEffect, useState } from 'react'
import ExchangeSymbol from '../types/ExchangeSymbol'

export default function useSymbols () {
  const [symbols, setSymbols] = useState<ExchangeSymbol[]>()

  async function fetchSymbols () {
    const { data } = await axios.get(' https://api.binance.com/api/v3/exchangeInfo')
    setSymbols(data.symbols)
  }

  useEffect(() => {
    fetchSymbols()
  }, [])

  return {
    symbols,
  }
}
