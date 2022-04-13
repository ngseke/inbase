import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import useSymbols from '../hooks/useSymbols'
import { useMemo } from 'react'

interface SymbolAutocompleteProps {
  value: string,
  onChange (value: string): void,
}

export default function SymbolAutocomplete ({ value, onChange }: SymbolAutocompleteProps) {
  const { symbols } = useSymbols()

  const options = useMemo(() => (
    symbols?.map(item => item.symbol.toLowerCase()) ?? []
  ), [symbols])

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Symbol" />}
      value={value}
      onChange={(_, value) => {
        if (value) onChange(value)
      }}
      disabled={!symbols}
      disableClearable
    />
  )
}
