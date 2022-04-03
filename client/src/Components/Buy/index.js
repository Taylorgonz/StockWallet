import React, { useState, useEffect, useRef } from "react"
import "./style.css"

import axios from 'axios';

const Buy = () => {
    const [boughtStocks, setBoughtStocks] = useState([]);


    const getStocks = () => {
        axios.get('/api/buy')
        .then(res => setBoughtStocks(res.data))
        .catch(err => setBoughtStocks([err]));
    }


    useEffect(()=> {
        if(boughtStocks) {
            getStocks()
        }
    }, boughtStocks)


    console.log(boughtStocks)

}

export default Buy;
