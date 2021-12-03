import { useState, useEffect } from 'react'

import axios from 'axios';
import './App.css';

export default function App() {
  const [moedas, setMoedas] = useState({
    de: '',
    para: '',
    valor: 1
  });
  const [valorConvertido, setValorConvertido] = useState(0)

  const moedasValidas = ['AFN', 'MGA', 'THB', 'PAB', 'ETB', 'BTC', 'BOB', 'VEF', 'XBR', 'GHS', 'SVC', 'CRC', 'CZK', 'DKK', 'ISK', 'NOK', 'SEK', 'NIO', 'SDR', 'GMD', 'MKD', 'DZD', 'IQD', 'JOD', 'KWD', 'LYD', 'RSD', 'TND', 'BHD', 'MAD', 'AED', 'STD', 'DOGE', 'VND', 'AMD', 'USD', 'AUD', 'CAD', 'JMD', 'NAD', 'NZD', 'TWD', 'ZWL', 'BSD', 'KYD', 'BBD', 'BZD', 'BND', 'SGD', 'FJD', 'HKD', 'TTD', 'XCD', 'CVE', 'ETH', 'EUR', 'HUF', 'BIF', 'XAF', 'XOF', 'XPF', 'KMF', 'RWF', 'CHF', 'CHFRTS', 'GNF', 'DJF', 'HTG', 'PYG', 'ANG', 'UAH', 'JPY', 'JPYRTS', 'PGK', 'LAK', 'HRK', 'MWK', 'ZMK', 'AOA', 'MMK', 'GEL', 'ALL', 'HNL', 'MDL', 'RON', 'BGN', 'EGP', 'GBP', 'LBP', 'SDG', 'SYP', 'SZL', 'LTC', 'LSL', 'AZN', 'BAM', 'MZN', 'MNT', 'NGNPARALLEL', 'NGN', 'NGNI', 'TRY', 'ILS', 'MRO', 'MOP', 'ARS', 'CLP', 'COP', 'CUP', 'DOP', 'PHP', 'MXN', 'UYU', 'BWP', 'GTQ', 'ZAR', 'BRL', 'BRLT', 'QAR', 'IRR', 'OMR', 'KHR', 'MYR', 'YER', 'SAR', 'BYN', 'RUBTOM', 'RUBTOD', 'RUB', 'MVR', 'IDR', 'INR', 'MUR', 'NPR', 'PKR', 'LKR', 'SCR', 'KES', 'SOS', 'TZS', 'UGX', 'PEN', 'KGS', 'UZS', 'TJS', 'TMT', 'BDT', 'KZT', 'VUV', 'KRW', 'XAGG', 'XRP', 'CNY', 'CNH', 'PLN']

  const listaMoedasValidas = moedasValidas.map(moeda => <option value={moeda}>{moeda}</option>)

  const getResponse = () => {
    var infos = axios.get(`https://economia.awesomeapi.com.br/last/${moedas.de}-${moedas.para}`)
    infos.then(
      response => {
        for(let elemento in response.data){
          setValorConvertido(response.data[`${elemento}`].bid * moedas.valor);
        }
      }, () => {
        alert('Error: Essa conversão é inválida')
      }
    );
  }

  const getMoedas = (e) => {
    if(e.target.getAttribute('name') == 'de') {
      setMoedas({'de': e.target.value, 'para': moedas.para, 'valor': moedas.valor})
    }else {
      setMoedas({'de': moedas.de, 'para': e.target.value, 'valor': moedas.valor})
    }
  }

  return (
    <>
      <div className="main">
        <div className='container'>
          <h1>Conversor de Moedas</h1>
          <div className='conversor'>
            <div className='de'>
              <label>DE:</label><br />
              <select values={moedasValidas} name="de" onChange={ (e) => { getMoedas(e) } }>
                {listaMoedasValidas}
              </select>
            </div>
            <div className='para'>
              <label>PARA:</label><br />
              <select values={moedasValidas} name="para" onChange={ (e) => { getMoedas(e) } }>
                {listaMoedasValidas}
              </select>
            </div>
          </div>
          <button className='btn' onClick={ getResponse }>Converter</button>
          <p className='resultado'>
            Valor Convertido: R${ valorConvertido.toFixed(2) }
          </p>
        </div>
      </div>
    </>
  );
}
