import React, { useState, useRef } from "react";
import axios from "axios";
import './App.css'


function App() {
  const [search, setSearch] = useState('');
  const [stockReturn, setStockReturn] = useState([]);
  const [stockProfile, setStockProfile] = useState([]);
  let stockBar = useRef();

const SearchProfile = (e) => {
  const options = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-profile',
    params: {symbol: stockBar.current.value , region: 'US'},
    headers: {
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
      'X-RapidAPI-Key': '6d1520fabemsh35408884286c9b4p1ea221jsn2264b127eadc'
    }
  };
  
  axios.request(options).then(function (response) {
    setStockProfile(response.data)
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

}
  

  console.log(stockReturn)
  console.log(search)
  return (
    <div onClick={(e)=> setStockReturn('')} className="App">
      <h1>Stock Wallet</h1>
      {/* Search Bar container */}
      <div className="searchBox">

        <label className='searchLabel'>Search for and select desired stock</label>
        <input className='searchBar' type="text" placeHolder="Search ex.'apple' or 'AAPL' " ref={stockBar} onChange={(e) => {
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
                setSearch(stock.symbol)
                stockBar.current.value = stock.symbol
                setStockReturn('')
              }}> <strong>{stock.symbol}:</strong> {stock.shortname}({stock.exchDisp})</li>
            )
            }
          </ul>
        }
        {search ? 
         <button className="searchButton" onClick={(e) => SearchProfile(e)}>Search</button>:
         <button className="searchButton" disabled>Search</button>
        }
      </div>

      



    </div>
  );
}

export default App;
