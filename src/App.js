import React, { useState } from 'react';
import PriceTrends from './components/PriceTrends';
import Volatility from './components/Volatility';
import PerformanceComparison from './components/PerformanceComparison';
import SupportResistance from './components/SupportResistance';
import AnalyticalInsights from './components/AnalyticalInsights';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [selectedCoinId, setSelectedCoinId] = useState('BTC'); // Default to BTC
    const [selectedCoinIds, setSelectedCoinIds] = useState(['BTC', 'ETH']); // Default selected coins for performance comparison
    const [priceTrendsData, setPriceTrendsData] = useState([]);
    const [volatilityData, setVolatilityData] = useState(null);
    const [supportResistanceData, setSupportResistanceData] = useState({});

    const handleCoinChange = (coinId) => {
        setSelectedCoinId(coinId);
    };

    const handlePerformanceCoinChange = (coinIds) => {
        setSelectedCoinIds(coinIds);
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
                    <PriceTrends coinId={selectedCoinId} setPriceTrendsData={setPriceTrendsData} />
                </div>
                <div className="col-md-6">
                    <Volatility coinId={selectedCoinId} setVolatilityData={setVolatilityData} />
                </div>
            </div>
            <div className="mt-4">
                <SupportResistance coinId={selectedCoinId} setSupportResistanceData={setSupportResistanceData} />
            </div>
            <div className="mt-4">
                <AnalyticalInsights 
                    priceTrendsData={priceTrendsData} 
                    volatilityData={volatilityData} 
                    supportResistanceData={supportResistanceData} 
                />
            </div>
            <div className="mt-4">
                <PerformanceComparison coinIds={selectedCoinIds} onCoinIdsChange={handlePerformanceCoinChange} />
            </div>
        </div>
    );
};

export default App;