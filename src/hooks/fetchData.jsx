import React, { useCallback, useContext } from "react";

const QueryContext = React.createContext(undefined);


export const DataProvider = ({children}) => {

  const fetcher = useCallback(async function(query) {
    fetch(query)
      .then(res => res.json())
      .then(json => console.log(json));

}, []);

  return (
          <QueryContext.Provider value={{ fetcher }}>
            {children}
          </QueryContext.Provider>);
};

export const useDataFetcher = () => {
  return useContext(QueryContext);
}