import { useState } from 'react'

import Resultado from './components/Resultado'
import axios from 'axios'

import Title from './styled_components/Title'
import Descricao from './styled_components/Descricao'
import Label from './styled_components/Label'
import Input from './styled_components/Input'
import Option from './styled_components/Option'
import Select from './styled_components/Select'
import Form from './styled_components/Form'
import Button from './styled_components/Button'
import Painel from './styled_components/Painel'
import Container from './styled_components/Container'

function App() {
  const data = new Date().getDate() + ' / ' + new Date().getMonth() + ' / ' + new Date().getFullYear()
  // Lista de moedas válidas / List of valid currencies
  const moedasValidas = ['USD', 'EUR', 'BRL']

  // Valor e moeda escolhidos pelo usuario / Value and currency chosen by the user
  const [moedas, setMoedas] = useState({
    "valor": '',
    "moeda": moedasValidas[0]
  })

  // Armazena o valor convertido de acordo com o valor da cotação
  const [valorConvertido, setValorConvertido] = useState({
    "USD": '',
    "EUR": '',
    "BRL": ''
  })

  // Gera um novo componente para cada moeda que não estiver selecionada para converter
  const outrasMoedas = moedasValidas.map(item => (
    <>{item != moedas.moeda ? <Resultado item={item} valor={valorConvertido[`${item}`] } /> : <></>}</>
  ))

  // Preenche a lista de moedas válidas no select
  const listaMoedasValidas = moedasValidas.map(moeda => (
    <Option key={moeda} value={moeda}>{moeda}</Option>
  ))

  // Função onde calcula o valor da conversão para cada moeda
  const getResponse = () => {
    for (let coin of moedasValidas){
      if (coin != moedas.moeda){
        var infos = axios.get(`https://economia.awesomeapi.com.br/last/${moedas.moeda}-${coin}`)
        
        infos.then(response => {
          localStorage.setItem(`${coin}`, response.data[`${moedas.moeda}`].bid * moedas.valor)
          if(moedas.moeda == "USD") {
            setValorConvertido({"USD": valorConvertido.USD, "EUR": localStorage.getItem("EUR"), "BRL": localStorage.getItem("BRL")})
          } else if(moedas.moeda == "EUR") {
            setValorConvertido({"USD": localStorage.getItem("USD"), "EUR": valorConvertido.EUR, "BRL": localStorage.getItem("BRL")})
          }else {
            setValorConvertido({"USD": localStorage.getItem("USD"), "EUR": localStorage.getItem("EUR"), "BRL": valorConvertido.BRL})
          }
        })
      }
    }
  }

  // Função que captura o valor digitado pelo usuario e a moeda escolhida
  const getMoedas = e => {
    if (e.target.getAttribute('name') == 'fvalor') {
      setMoedas({ "valor": e.target.value.replace(',', '.'), "moeda": moedas.moeda })
    } else {
      setMoedas({ "valor": moedas.valor, "moeda": e.target.value })
    }
  }

  return (
    <>
      <Painel>
        <Title>Conversor</Title>
        <Descricao>Informe o valor e a moeda para conversão</Descricao>
        <hr />
        <Form>
          <Container>
            <Label htmlFor="fvalor">Valor</Label>
            <Input
              type="text"
              name="fvalor"
              onChange={e => {
                getMoedas(e)
              }}
            />
          </Container>
          <Container>
            <Label htmlFor="fmoeda">Moeda</Label>
            <Select
              values={moedasValidas}
              name="fmoedas"
              id="fmoedas"
              onChange={e => {
                getMoedas(e)
              }}
            >
              {listaMoedasValidas}
            </Select>
          </Container>
        </Form>
        <Button onClick={ getResponse }>Converter</Button>
        <Descricao>Resultado da Conversão</Descricao>
        <hr />
        <Form>
          {outrasMoedas}
        </Form>
        <Descricao>Última consulta: {data}</Descricao>
      </Painel>
    </>
  )
}

export default App