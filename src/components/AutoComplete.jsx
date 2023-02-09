import React from "react";
import { useState, useEffect, useContext } from "react";
import finnHub from "../Apis/finnHub";
import { WatchListContext } from "../Context/watchListContextProvider";

function AutoComplete() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock } = useContext(WatchListContext);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (err) {}
    };
    //only fetch the symbol lookup when the search value is not emty ""
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [search]);

  const showDropdown = () => {
    return (
      <ul className="dropdown-menu show">
        {results.map((result) => {
          // the on Click create a call back function for the addStock and passes the ticker to the function
          // then reset to search value to close the dropdown menu
          const addStockOnClick = () => {
            console.log(result);
            addStock(result.symbol);
            setSearch("");
          };
          return (
            <li
              onClick={addStockOnClick}
              key={result.symbol}
              className="dropDown-item"
            >
              {result.description}{" "}
              <p>
                <span style={{ color: "lightgreen" }}>Ticker: </span>
                {result.symbol}
              </p>
            </li>
          );
        })}
      </ul>
    );
  };

  const hideDropdown = () => {
    return (
      <ul className="dropdown-menu">
        <li>Stock1</li>
      </ul>
    );
  };

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <img class="stock__market--logo" src="/Stock-trends-Up-and-Down.svg" />
      <div className="form-floating dropdown">
        <input
          className="form-control"
          placeholder="Search"
          style={{ background: "rgb(145,158,171,0.4)" }}
          id="search"
          type="text"
          autoComplete="off"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        ></input>
        <label htmlFor="search">Search</label>
        {!!search ? showDropdown() : null}
      </div>
    </div>
  );
}

export default AutoComplete;
