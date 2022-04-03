import React from "react";
import "./style.css"


const Sell = ({ soldStocks }) => {



   




    return (
        <div >
            {soldStocks &&
                <div className="sellDiv">
                    <h1 className="soldStocks">Sold Stocks</h1>
                    <div className="soldContainer">
                        {soldStocks.map((stock, i) =>


                            <div className="soldDisplay" key={i}>
                                <h1>{stock.symbol}({stock.name})</h1>
                                <div className="soldTable">
                                    <div>
                                        <h3>Exchange</h3>
                                        <p>{stock.exchange}</p>

                                        <h3>Sold Price</h3>
                                        <p>${stock.price}</p>
                                    </div>
                                    <div>
                                        <h3>Amount</h3>
                                        <p>{stock.amount}</p>

                                        <h3>Total </h3>
                                        <p>${stock.total}</p>
                                    </div>

                                </div>
                            </div>

                        )}
                    </div>
                </div>
            }



        </div>
    )
}

export default Sell;
