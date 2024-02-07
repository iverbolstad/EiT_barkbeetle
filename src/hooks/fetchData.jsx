import React, { useCallback, useContext } from "react";

const QueryContext = React.createContext(undefined);


export const DataProvider = () => {

  const fetcher = useCallback(async function() {

    // const response = await fetch('/proxy/adt/query?api-version=2020-10-31', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         query
    //     })
    // });

    fetch('https://dummyjson.com/products/1')
      .then(res => res.json())
      .then(json => console.log(json));

    // Get the data from the response
    // const data = await response.json();
    // return data;
}, []);
  return (
          <QueryContext.Provider value={{ fetcher }}>
          </QueryContext.Provider>);
};

export const useFetcher = () => {
  return useContext(QueryContext);
}

// export default DataProvider;