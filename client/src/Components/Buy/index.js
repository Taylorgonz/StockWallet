import React from "react"
import "./style.css"
import axios from 'axios'

const Buy = ({ getStocks, boughtStocks }) => {



    const sellStocks = (i) => {
        console.log(boughtStocks[i])
        axios.post('/api/sell',
            {
                'name': boughtStocks[i].name,
                'symbol': boughtStocks[i].symbol,
                'price': boughtStocks[i].price,
                'exchange': boughtStocks[i].exchange,
                'amount': boughtStocks[i].amount,
                'total': boughtStocks[i].amount * boughtStocks[i].price
            }).then(res =>
                axios.delete(`/api/buy/${boughtStocks[i].id}`)
                    .then(res =>
                        getStocks()
                    )

            ).
            catch((err) => console.log(err))

    }







    return (
        <div className="buyDiv">
            {boughtStocks &&
                <>
                    <h1 className="ownedStocks">Your Stocks</h1>
                    <div className="ownedContainer">
                        {boughtStocks.map((stock, i) =>


                            <div className="boughtDisplay" key={i}>
                                <h1>{stock.symbol}({stock.name})</h1>
                                <div className="boughtTable">
                                    <div>
                                        <h3>Exchange</h3>
                                        <p>{stock.exchange}</p>

                                        <h3>Bought Price</h3>
                                        <p>${stock.price}</p>
                                    </div>
                                    <div>
                                        <h3>Amount</h3>
                                        <p>{stock.amount}</p>

                                        <h3>Total </h3>
                                        <p>${stock.total}</p>
                                    </div>

                                </div>
                   
                                <button onClick={(e) => sellStocks(i)} className="sellButton">sell</button>


                            </div>

                        )}
                    </div>
                </>
            }



        </div>
    )
}

export default Buy;
