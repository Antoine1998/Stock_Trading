import React from 'react'
import AutoComplete from '../components/AutoComplete'
import StockList from '../components/StockList'
import "../App.css";


function StockOverViewPage() {
  return (

    <div className='area'>   
            <AutoComplete/><StockList/>            
    </div >
      
  )
}

export default StockOverViewPage