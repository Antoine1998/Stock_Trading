import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";



function StockChart({ chartData, symbol }) {
  const [dateFormat, setDateFormat] = useState("24h");
  const { day, week, year } = chartData;

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day
      case "7d":
        return week
      case "1y":
        return year
      default:
        return day
    }
  }
  

  const options = {
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animation: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
    },
    //add more details of the time on hover
    tooltip: {
      x: { format: "MMM dd HH:mm" },
    },
  };

  const series = [{ name:symbol, data: determineTimeFormat()}];

  //styling of active button
  const renderButtonSelect = (button) => {
    const classes = "btn m-2 ";
    if (button === dateFormat) {
      return classes + "btn-primary";
    } else {
      return classes + "btn-outline-primary";
    }
  };
  return (
    <div className="mt-2 p-4 bg-white shadow-sm">
      <Chart options={options} series={series} type="area" width="100%" />
      <div className="buttonsTime">
        <button
          className={renderButtonSelect("24h")}
          onClick={() => setDateFormat("24h")}
        >
          24h
        </button>
        <button
          className={renderButtonSelect("7d")}
          onClick={() => setDateFormat("7d")}
        >
          7d
        </button>
        <button
          className={renderButtonSelect("1y")}
          onClick={() => setDateFormat("1y")}
        >
          1y
        </button>
      </div>
    </div>
  );
}

export default StockChart;
