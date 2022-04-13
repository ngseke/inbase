import { useEffect, useRef, useState } from 'react'
import Depth from '../types/Depth'
import Trade from '../types/Trade'

export default function useWebsocket (symbol: string) {
  const ws = useRef<WebSocket>()
  const [isWsConnected, setIsWsConnected] = useState(false)

  const [trades, setTrades] = useState<Trade[]>([])
  const [depth, setDepth] = useState<Depth>()

  useEffect(function createWebsocket () {
    ws.current = new WebSocket('wss://stream.binance.com:9443/stream')
    ws.current.onopen = () => setIsWsConnected(true)
    ws.current.onerror = () => setIsWsConnected(false)

    return () => {
      ws.current?.close()
      setIsWsConnected(false)
    }
  }, [])

  useEffect(() => {
    if (!(isWsConnected && ws.current)) return

    const params = [`${symbol}@aggTrade`, `${symbol}@depth10`]

    ws.current.send(JSON.stringify({
      method: 'SUBSCRIBE',
      params,
      id: 1,
    }))

    ws.current.onmessage = (e) => {
      try {
        const { stream, data } = JSON.parse(e.data)
        if (/aggTrade/.test(stream)) {
          const trade: Trade = {
            id: data.a,
            tradeTime: data.T,
            price: data.p,
            quantity: data.q,
          }
          setTrades((trades) => [...trades.slice(-50), trade])
        } else if (/depth/.test(stream)) {
          setDepth(data as Depth)
        }
      } catch (e) {
      }
    }

    return () => {
      ws.current?.send(JSON.stringify({
        method: 'UNSUBSCRIBE',
        params,
        id: 1,
      }))
    }
  }, [symbol, isWsConnected])

  return {
    trades,
    depth,
  }
}
