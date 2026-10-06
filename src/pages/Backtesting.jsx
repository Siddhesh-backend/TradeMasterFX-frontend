import { useState } from 'react';
import Card from '../components/Card/Card';
import Alert from '../components/Alert/Alert';
import BacktestForm from '../components/BacktestForm/BacktestForm';
import BacktestRunList from '../components/BacktestRunList/BacktestRunList';
import { createBacktestRun } from '../services/api/backtestApi';

function Backtesting() {
  const [creating, setCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateBacktest = async (backtestData) => {
    try {
      setCreating(true);
      setSuccessMessage('');
      setApiError('');

      await createBacktestRun(backtestData);

      setSuccessMessage('Backtest run created successfully.');

      setRefreshKey((previous) => previous + 1);
    } catch (error) {
      setApiError(
        error.message || 'Unable to create backtest run.'
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="backtesting-page">
      <h1>Backtesting</h1>

      <p>Run and manage your backtests.</p>

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

      <Card>
        <h2>Create Backtest Run</h2>

        <BacktestForm
          onSubmit={handleCreateBacktest}
          loading={creating}
        />
      </Card>

      <Card>
        <h2>Run History</h2>

        <BacktestRunList key={refreshKey} />
      </Card>
    </div>
  );
}

export default Backtesting;