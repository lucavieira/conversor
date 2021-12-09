import React from 'react'

export default function Resultado(props) {
  return (
    <div>
      <label htmlFor="fValorConvertido">{props.item}</label>
      <input type="text" disabled name="fValorConvertido" value={ Number(props.valor).toFixed(2) } />
    </div>
  )
}
