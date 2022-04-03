import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Buy from "./Components/Buy/index";
import Sell from './Components/Sell/index'
import './App.css'


function App() {
  const [search, setSearch] = useState(false);
  const [stockReturn, setStockReturn] = useState([])
  const [boughtStocks, setBoughtStocks] = useState([]);
  const [soldStocks, setSoldStocks] = useState([]);
  const [stockProfile, setStockProfile] = useState('');
  const [stockValue, setStockValue] = useState(0);
  let stockBar = useRef();
  let stockAmount = useRef();
  

  const getStocks = () => {
    axios.get('/api/buy')
        .then(res => {
          setBoughtStocks(res.data)
        }

        )
        .catch(err => setBoughtStocks([err]));
    axios.get('/api/sell')
    .then(res=> setSoldStocks(res.data))
    .catch(err=> setSoldStocks([err]));
}



// main stock profile search for saving info
  const SearchProfile = (symbol) => {
    const options = {
      method: 'GET',
      url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-profile',
      params: { symbol: symbol, region: 'US' },
      headers: {
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
        'X-RapidAPI-Key': '6d1520fabemsh35408884286c9b4p1ea221jsn2264b127eadc'
      }
    };

    axios.request(options).then(function (response) {
      setStockProfile(response.data)
    }).catch(function (error) {
      console.error(error);
    });

  }
// Buy stock api call
  const buyStock = () => {

    axios.post('/api/buy',
    {
      'name': stockProfile.quoteType.shortName,
      'symbol': stockProfile.symbol,
      'price': stockProfile.price.regularMarketPrice.raw,
      'exchange': stockProfile.price.exchangeName,
      'amount': stockAmount.current.value,
      'total': stockProfile.price.regularMarketPrice.raw * stockAmount.current.value
      
    }).then(res=>{
      getStocks()
      setStockProfile('')
      stockBar.current.value=''
      setStockValue(0)
    })
      
  }

  useEffect(() => {
    if (boughtStocks.length === 0)
        getStocks()
        

}, [])

  return (
    <div onClick={(e) => setStockReturn('')} className="App">
      <h1 className="header">Stock Wallet</h1>
      {/* Search Bar container */}
      <div className="searchBox">

        <label className='searchLabel'>Search for and select desired stock</label>
        <input className='searchBar' type="text" placeholder="Search ex.'apple' or 'AAPL' " ref={stockBar} onChange={(e) => {
          setSearch(true)
          if (stockBar.current.value == "") {
            setStockReturn('');
          }
          const options = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/auto-complete',
            params: { q: stockBar.current.value, region: 'US' },
            headers: {
              'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
              'X-RapidAPI-Key': '6d1520fabemsh35408884286c9b4p1ea221jsn2264b127eadc'
            }
          };

          axios.request(options).then(function (response) {

            setStockReturn(response.data.quotes)
          }).catch(function (error) {
            console.error(error);
          });
        }} />
        {/* Search Button */}



        {stockReturn &&
          <ul className='searchResponse'>
            {stockReturn.map((stock, i) =>

              <li className="searchListItem" key={i} onClick={(e) => {
                
                stockBar.current.value = stock.symbol
                setStockReturn('')
              }}> <strong>{stock.symbol}:</strong> {stock.shortname}({stock.exchDisp})</li>
            )
            }
          </ul>
        }
        {search ?
          <button className="searchButton" onClick={(e) => {
            SearchProfile(stockBar.current.value)
            stockBar.current.value = ''
            setSearch(false);
          }}>Search</button> :
          <button className="searchButtonDis" disabled>Search</button>
        }
      </div>

      {/* display the searched stock profile */}

      {stockProfile &&
        <div className="stockProfileDisp">
          <h1>{stockProfile.symbol}<span> ({stockProfile.quoteType.shortName})</span> </h1>

          <h3>Exchange</h3>
          <p>{stockProfile.price.exchangeName}</p>

          <h3>Reg Market Price:</h3>
          <p>${stockProfile.price.regularMarketPrice.raw.toFixed(2)}</p>

          <h3>Stock amount</h3>
          <div className="amountDiv">

            <div>
              <input id='stockAmount' ref={stockAmount} onChange={(e) => {
               
                setStockValue(stockAmount.current.value * stockProfile.price.regularMarketPrice.raw)
              }} className="stockAmount" min='1' type="number" />
                <p className="totalValue"> Total: ${stockValue.toFixed(2)}</p>
              
            </div>
          </div>
          {stockValue ? 
          <button onClick={(e)=> {
            buyStock()
          }} className="buyStockButton">BUY</button>:
          <button disabled className="buyStockButtonDis">Buy</button>
          }
          


        </div>

      }

{boughtStocks  && 
  <Buy getStocks={getStocks} setBoughtStocks={setBoughtStocks} boughtStocks={boughtStocks}/>
}

{soldStocks &&
  <Sell getStocks={getStocks} soldStocks={soldStocks}/>
}



    </div>
  );
}

export default App;
