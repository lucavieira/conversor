import React from 'react'
import Container from '../styled_components/Container'
import Input from '../styled_components/Input'
import Label from '../styled_components/Label'

function Resultado(props) {
  return (
    <>
      <Container>
        <Label htmlFor="fValorConvertido">{props.item}</Label>
        <Input type="text" disabled name="fValorConvertido" value={ Number(props.valor).toFixed(2) } />
      </Container>
    </>
  )
}

export default Resultado