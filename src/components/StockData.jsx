import React from 'react'
import { useState, useEffect } from 'react'
import finnHub from '../Apis/finnHub'


function StockData({symbol}) {
    const [stockDetails, setStockDetails] = useState()

    useEffect(() => {

        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/stock/profile2", {
                    params: {
                        symbol
                    }
                })
                //console.log(response)
                if (isMounted) {
                    setStockDetails(response.data)
                    console.log(stockDetails)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
        return () => (isMounted = false);
    }, [symbol])

  return (
    <div>{ stockDetails && ( 
        <div className='row border bg-white rounded shadow-sm p-4 mt-5'>
            <div className="col">
                <div>
                    <span className='fw-bold'>name: </span>
                    {stockDetails.name}
                </div>
                <div>
                    <span className='fw-bold'>country: </span>
                    {stockDetails.country}
                </div>
                <div>
                    <span className='fw-bold'>ticker: </span>
                    {stockDetails.ticker}
                </div>
            </div>
            <div className="col">
                <div>
                    <span className='fw-bold'>Exhange: </span>
                    {stockDetails.exchange}
                </div>
                <div>
                    <span className='fw-bold'>Industry: </span>
                    {stockDetails.finnhubIndustry}
                </div>
                <div>
                    <span className='fw-bold'>IPO Date: </span>
                    {stockDetails.ipo}
                </div>
            </div>
            <div className="col">
                <div>
                    <span className='fw-bold'>Market cap: </span>
                    {stockDetails.marketCapitalization}
                </div>
                <div>
                    <span className='fw-bold'>Shares outstanding: </span>
                    {stockDetails.shareOutstanding}
                </div>
                <div>
                    <span className='fw-bold'>URL: </span><a href={stockDetails.weburl} target="_blank">{stockDetails.weburl}</a>
                    
                </div>
            </div>
        </div>
    )}</div>
  )
}

export default StockData