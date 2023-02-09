import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finnHub from "../Apis/finnHub";
import StockChart from "../components/StockChart";
import StockData from "../components/StockData";

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      //change the value of time from milliseconds to seconds
      x: el * 1000,
      y: Math.floor(data.c[index]),
    };
  });
};

function StockDetailPage() {
  const [chartData, setChartData] = useState({});
  const { symbol } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      //get the current day (today)
      const date = new Date();
      //get the currnet time (in seconds) from the date variable
      const currentTimeSeconds = Math.floor(date.getTime() / 1000);

      let oneDay;
      //on Saturday request data for the previous two days
      if (date.getDay() === 6) {
        oneDay = currentTimeSeconds - 24 * 60 * 60 * 2;
      } else if (date.getDay() === 0) {
        //on Sunday request data for the previous three days
        oneDay = currentTimeSeconds - 24 * 60 * 60 * 3;
      } else {
        oneDay = currentTimeSeconds - 24 * 60 * 60;
      }
      // request data for the duration of a week
      const oneWeek = currentTimeSeconds - 24 * 60 * 60 * 7;
      // request data for the duration of a year
      const oneYear = currentTimeSeconds - 24 * 60 * 60 * 365;

      try {
        const responses = await Promise.all([finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneDay,
            to: currentTimeSeconds,
            resolution: 30
          }
        }), finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneWeek,
            to: currentTimeSeconds,
            resolution: 60
          }
        }), finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneYear,
            to: currentTimeSeconds,
            resolution: "W"
          }
        })])
        console.log(responses)

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })
      } catch (err) {
        console.log(err)
      }




    }
    fetchData()
  }, [symbol])
  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData  symbol={symbol} />
        </div>
      )}
    </div>
  );
}

export default StockDetailPage;
