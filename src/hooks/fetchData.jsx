import React, { useCallback, useContext } from "react";

const QueryContext = React.createContext(undefined);


export const DataProvider = ({children}) => {

  const fetcher = useCallback(async function(query) {

      const test = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Token': process.env.REACT_APP_SPAN_API_TOKEN // token
        },
    });

    const data = await test.json();
    return data;
}, []);

  return (
          <QueryContext.Provider value={{ fetcher }}>
            {children}
          </QueryContext.Provider>);
};

export const useDataFetcher = () => {
  return useContext(QueryContext);
}