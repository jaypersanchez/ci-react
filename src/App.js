   // src/App.js
   import React, { useState } from 'react';
   import PriceTrends from './components/PriceTrends';
   import Volatility from './components/Volatility';
   import 'bootstrap/dist/css/bootstrap.min.css';

   const App = () => {
       const [selectedCoinId, setSelectedCoinId] = useState('BTC'); // Default to BTC

       const handleCoinChange = (coinId) => {
           setSelectedCoinId(coinId);
       };

       return (
           <div className="container mt-5">
               <h1 className="text-center mb-4">Crypto Price Trends and Volatility</h1>
               <div className="form-group">
                   <label htmlFor="coinSelect">Select Cryptocurrency:</label>
                   <select
                       id="coinSelect"
                       className="form-control"
                       value={selectedCoinId}
                       onChange={(e) => handleCoinChange(e.target.value)}
                   >
                       <option value="BTC">Bitcoin (BTC)</option>
                       <option value="ETH">Ethereum (ETH)</option>
                       <option value="XRP">Ripple (XRP)</option>
                       <option value="SOL">Solana (SOL)</option>
                   </select>
               </div>
               <div className="row mt-4">
                   <div className="col-md-6">
                       <PriceTrends coinId={selectedCoinId} />
                   </div>
                   <div className="col-md-6">
                       <Volatility coinId={selectedCoinId} />
                   </div>
               </div>
           </div>
       );
   };

   export default App;