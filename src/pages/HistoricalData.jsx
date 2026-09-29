import { useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import FileUpload from '../components/FileUpload/FileUpload';
import Alert from '../components/Alert/Alert';
import Loading from '../components/Loading/Loading';
import EmptyState from '../components/EmptyState/EmptyState';

import {
  uploadHistoricalData,
  getAllSymbols,
  getMarketDataBySymbol,
} from '../services/api/historicalDataApi';

import './HistoricalData.css';

function HistoricalData() {
  const [symbol, setSymbol] = useState('');
  const [market, setMarket] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [file, setFile] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  const [symbols, setSymbols] = useState([]);
  const [symbolsLoading, setSymbolsLoading] = useState(true);
  const [symbolsError, setSymbolsError] = useState('');

  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [marketData, setMarketData] = useState([]);
  const [marketDataLoading, setMarketDataLoading] = useState(false);
  const [marketDataError, setMarketDataError] = useState('');

  const loadSymbols = async () => {
    try {
      setSymbolsLoading(true);
      setSymbolsError('');

      const data = await getAllSymbols();

      setSymbols(Array.isArray(data) ? data : []);
    } catch (error) {
      setSymbolsError(
        error.message || 'Unable to load symbols.'
      );
    } finally {
      setSymbolsLoading(false);
    }
  };

  useEffect(() => {
    loadSymbols();
  }, []);

  const loadMarketData = async (selectedSymbolValue) => {
    if (!selectedSymbolValue) {
      setMarketData([]);
      return;
    }

    try {
      setMarketDataLoading(true);
      setMarketDataError('');

      const data = await getMarketDataBySymbol(selectedSymbolValue);

      setMarketData(Array.isArray(data) ? data : []);
    } catch (error) {
      setMarketDataError(
        error.message || 'Unable to load market data.'
      );
      setMarketData([]);
    } finally {
      setMarketDataLoading(false);
    }
  };

  const handleSymbolChange = async (event) => {
    const selectedValue = event.target.value;

    setSelectedSymbol(selectedValue);
    await loadMarketData(selectedValue);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;

    setSuccessMessage('');
    setApiError('');

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
      setFile(null);
      window.alert('Please select a CSV file.');
      event.target.value = '';
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    setSuccessMessage('');
    setApiError('');

    if (!symbol.trim()) {
      setApiError('Symbol is required.');
      return;
    }

    if (!file) {
      setApiError('CSV file is required.');
      return;
    }

    try {
      setUploading(true);

      const response = await uploadHistoricalData({
        symbol: symbol.trim(),
        market,
        timeframe,
        file,
      });

      setSuccessMessage(
        response?.message ||
        'Historical data uploaded successfully.'
      );

      setFile(null);
      setSymbol('');
      setMarket('');
      setTimeframe('');

      await loadSymbols();
    } catch (error) {
      setApiError(
        error.message ||
        'Unable to upload historical data.'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="historical-data-page">
      <h1>Historical Market Data</h1>

      <p>
        Upload and view historical market data.
      </p>

      {/* Upload Section */}
      <Card>
        <h2>Upload Historical Data</h2>

        {successMessage && (
          <Alert
            type="success"
            message={successMessage}
          />
        )}

        {apiError && (
          <Alert
            type="error"
            message={apiError}
          />
        )}

        <div className="historical-data-form">
          <div className="historical-data-field">
            <label htmlFor="symbol">
              Symbol
            </label>

            <input
              id="symbol"
              type="text"
              value={symbol}
              onChange={(event) =>
                setSymbol(event.target.value)
              }
              placeholder="e.g. XAUUSD"
              disabled={uploading}
            />
          </div>

          <div className="historical-data-field">
            <label htmlFor="market">
              Market
            </label>

            <select
              id="market"
              value={market}
              onChange={(event) =>
                setMarket(event.target.value)
              }
              disabled={uploading}
            >
              <option value="">
                Select market
              </option>

              <option value="FOREX">FOREX</option>
              <option value="STOCKS">STOCKS</option>
              <option value="CRYPTO">CRYPTO</option>
              <option value="COMMODITY">
                COMMODITY
              </option>
            </select>
          </div>

          <div className="historical-data-field">
            <label htmlFor="timeframe">
              Timeframe
            </label>

            <select
              id="timeframe"
              value={timeframe}
              onChange={(event) =>
                setTimeframe(event.target.value)
              }
              disabled={uploading}
            >
              <option value="">
                Select timeframe
              </option>

              <option value="M1">M1</option>
              <option value="M5">M5</option>
              <option value="M15">M15</option>
              <option value="M30">M30</option>
              <option value="H1">H1</option>
              <option value="H4">H4</option>
              <option value="D1">D1</option>
              <option value="W1">W1</option>
            </select>
          </div>
        </div>

        <FileUpload
          file={file}
          onChange={handleFileChange}
          onUpload={handleUpload}
          loading={uploading}
        />
      </Card>

      {/* Symbol Selection */}
      <Card>
        <h2>View Historical Data</h2>

        {symbolsLoading && <Loading />}

        {!symbolsLoading && symbolsError && (
          <Alert
            type="error"
            message={symbolsError}
          />
        )}

        {!symbolsLoading &&
          !symbolsError &&
          symbols.length === 0 && (
            <EmptyState
              title="No historical data"
              message="Upload CSV data to view historical market records."
            />
          )}

        {!symbolsLoading &&
          !symbolsError &&
          symbols.length > 0 && (
            <div className="historical-data-selector">
              <label htmlFor="historical-symbol">
                Select Symbol
              </label>

              <select
                id="historical-symbol"
                value={selectedSymbol}
                onChange={handleSymbolChange}
              >
                <option value="">
                  Select symbol
                </option>

                {symbols.map((symbolName) => (
                  <option
                    key={symbolName}
                    value={symbolName}
                  >
                    {symbolName}
                  </option>
                ))}
              </select>
            </div>
          )}
      </Card>

      {/* Historical Data */}
      {selectedSymbol && (
        <Card>
          <h2>
            {selectedSymbol} Historical Data
          </h2>

          {marketDataLoading && <Loading />}

          {!marketDataLoading &&
            marketDataError && (
              <Alert
                type="error"
                message={marketDataError}
              />
            )}

          {!marketDataLoading &&
            !marketDataError &&
            marketData.length === 0 && (
              <EmptyState
                title="No market data"
                message="No historical records found for this symbol."
              />
            )}

          {!marketDataLoading &&
            !marketDataError &&
            marketData.length > 0 && (
              <div className="historical-data-table-wrapper">
                <table className="historical-data-table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Open</th>
                      <th>High</th>
                      <th>Low</th>
                      <th>Close</th>
                      <th>Volume</th>
                    </tr>
                  </thead>

                  <tbody>
                    {marketData.map((data) => (
                      <tr key={data.id}>
                        <td>{data.dateTime}</td>
                        <td>{data.openPrice}</td>
                        <td>{data.highPrice}</td>
                        <td>{data.lowPrice}</td>
                        <td>{data.closePrice}</td>
                        <td>{data.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </Card>
      )}
    </div>
  );
}

export default HistoricalData;