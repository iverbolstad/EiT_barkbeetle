import logo from './logo.svg';
import './App.css';
import { DataProvider } from './hooks/fetchData';


import MyMap from './components/Googlemap';

function App() {
  return (
    <div>
      <DataProvider>
        <MyMap />
      </DataProvider>
    </div>
  );
}

export default App;
