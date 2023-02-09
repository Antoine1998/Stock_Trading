import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import finnHub from '../Apis/finnHub'
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { WatchListContext } from '../Context/watchListContextProvider';

function StockList() {
    const [stock, setStock] = useState([]);
    const { watchList, deleteStock } = useContext(WatchListContext)
    const navigate = useNavigate();

    

    // the dependency array is set as empty array, to only fetch data from source on mount
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                // NOTE: intead of requesting each stock data one after the other
                // const response1 = await finnHub.get("/quote", {
                //     params: {
                //         symbol:"GOOGL"
                //     }
                // })
                // responses.push(response1)

                // const response2 = await finnHub.get("/quote", {
                //     params: {
                //         symbol:"AMZN"
                //     }
                // })
                // responses.push(response2)

                // const response3 = await finnHub.get("/quote", {
                //     params: {
                //         symbol:"AAPL"
                //     }
                // })
                // responses.push(response3)


                //NOTE2: All requests can be sent at once through a Promise
                //  const promises = Promise.all(finnHub.get("/quote", {
                //           params: {
                //               symbol:"AMZN"
                //           }
                //       }), finnHub.get("/quote", {
                //          params: {
                //              symbol:"AAPL"
                //          }
                //      }), finnHub.get("/quote", {
                //          params: {
                //              symbol:"GOOGL"
                //          }
                //      }) )

                //Note3: To make stock mapping dynamic
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnHub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))

                console.log(responses)

                //To fetch only the data and the stock ticker from the response
                // destructre the respnse property
                const data = responses.map((response) => {
                    return {
                        //returns the stock object with data and ticker only
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                    
                })

                if (isMounted){
                setStock(data)
                console.log(data)
                }
                
            } catch (err) {

            }
        }
        fetchData()

        return () => (isMounted = false)
    }, [watchList])

    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`)
    }


  return (
    <div className='container'>
        <table className='table hover mt-5'>
        <thead style={{color: "rgb(255,255,255"}}>
            <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Last</th>
                <th scope='col'>Chg</th>
                <th scope='col'>Chg%</th>
                <th scope='col'>High</th>
                <th scope='col'>Low</th>
                <th scope='col'>Open</th>
                <th scope='col'>Close</th>
            </tr>
        </thead>
        <tbody>
            {stock.map((stockData) => {
                return (
                    <tr className='table-row'  key={stockData.symbol}>
                        <th scope='row' onClick={() => handleStockSelect(stockData.symbol)} className="table__ticker--symbol">{stockData.symbol}</th>
                        <td className='table_rows--color'>{stockData.data.c}</td>
                        {stockData.data.d > 0 ? <td className='text-success'><BsFillCaretUpFill/>{stockData.data.d}</td>: <td className='text-danger'><BsFillCaretDownFill/>{parseFloat(stockData.data.d).toFixed(2)}</td>}
                        {stockData.data.dp > 0 ? <td className='text-success'><BsFillCaretUpFill/>{stockData.data.dp}%</td>: <td className='text-danger'><BsFillCaretDownFill/>{parseFloat(stockData.data.dp).toFixed(2)}%</td>}
                        <td className='table_rows--color'>{stockData.data.h}</td>
                        <td className='table_rows--color'>{stockData.data.l}</td>
                        <td className='table_rows--color'>{stockData.data.o}</td>
                        <td className='table_rows--color'>{stockData.data.pc}<button className='btn btn-danger btn-sm ml-5 d-inline-block delete-button' onClick={() => {
                            deleteStock(stockData.symbol)
                        }}>Remove</button></td>
                    </tr>
                )
            })}
        </tbody>
        </table>
    </div>
  )
}

export default StockList