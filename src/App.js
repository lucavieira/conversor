import { useState, useEffect } from 'react'

import Resultado from './components/Resultado'
import axios from 'axios'
import './App.css'

export default function App() {

  const Att = () => {
    useEffect(
    () => { console.log('Pagina carregada') }
  )}

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
    <option key={moeda} value={moeda}>{moeda}</option>
  ))

  // Função onde calcula o valor da conversão para cada moeda
  const getResponse = () => {
    for (let coin of moedasValidas){
      if (coin != moedas.moeda){
        var infos = axios.get(`https://economia.awesomeapi.com.br/last/${moedas.moeda}-${coin}`)

        infos.then(response => {
          localStorage.setItem(`${coin}`, response.data[`${moedas.moeda}${coin}`].bid * moedas.valor)
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

  const getMoedas = e => {
    if (e.target.getAttribute('name') == 'fvalor') {
      setMoedas({ "valor": e.target.value, "moeda": moedas.moeda })
    } else {
      setMoedas({ "valor": moedas.valor, "moeda": e.target.value })
    }
  }

  return (
    <>
      <div className="conversao">
        <p>Informe o valor e a moeda para conversão</p>
        <hr />
        <form>
          <label htmlFor="fvalor">Valor</label>
          <input
            type="text"
            name="fvalor"
            onChange={e => {
              getMoedas(e)
            }}
          />
          <label htmlFor="fmoeda">Moeda</label>
          <select
            values={moedasValidas}
            name="fmoedas"
            id="fmoedas"
            onChange={e => {
              getMoedas(e)
            }}
          >
            {listaMoedasValidas}
          </select>
        </form>
        <button onClick={ getResponse }>Converter</button>
      </div>
      <div className="resultado">
        <hr />
        <p>Resultado da Conversão</p>
        <form>
          <div className="data">
            <label htmlFor="fData">Data da Consulta</label>
            <input
              type="text"
              name="fData"
              id="fData"
              value={new Date().toLocaleString()}
              disabled
            />
          </div>
          {outrasMoedas}
        </form>
      </div>
    </>
  )
}
