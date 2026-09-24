import { useNavigate } from 'react-router-dom';
import Card from '../components/Card/Card';
import MetricCard from '../components/MetricCard/MetricCard';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import { getAllBacktestRuns } from '../services/api/backtestApi';
import Loading from '../components/Loading/Loading';
import Alert from '../components/Alert/Alert';
import EmptyState from '../components/EmptyState/EmptyState';

function Dashboard() {
  const navigate = useNavigate();
  const [backtests, setBacktests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const loadBacktests = async () => {
      try {
        setLoading(true);
        setApiError('');

        const data = await getAllBacktestRuns();
        setBacktests(Array.isArray(data) ? data : []);
      } catch (error) {
        setApiError('Unable to load recent backtests.');
      } finally {
        setLoading(false);
      }
    };

    loadBacktests();
  }, []);

  return (
    <div className="dashboard">

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>TradeMasterFX Dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-metrics">
        <MetricCard
          title="Total Backtests"
          value={loading ? '...' : backtests.length}
        />
        <MetricCard
          title="Win Rate"
          value="0%"
        />

        <MetricCard
          title="Profit Factor"
          value="0.00"
        />

        <MetricCard
          title="Max Drawdown"
          value="0%"
        />
      </div>

      {/* Performance Overview */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Performance Overview</h2>
          <p>Your overall backtesting performance</p>
        </div>

        <Card>
          <div className="performance-placeholder">
            <p>Performance data will appear here.</p>
          </div>
        </Card>
      </div>

      {/* Recent Backtests */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Backtests</h2>
          <p>Your latest backtesting activity</p>
        </div>

        <Card>
          {loading && <Loading />}

          {!loading && apiError && (
            <Alert type="error" message={apiError} />
          )}
          {!loading && !apiError && backtests.length === 0 && (
            <EmptyState message="No recent backtests available." />
          )}

          {!loading && !apiError && backtests.length > 0 && (
            <div className="recent-backtests-list">
              {backtests.slice(0, 5).map((backtest) => (
                <div key={backtest.id} className="recent-backtest-item">
                  <strong>{backtest.runName}</strong>
                  <span>{backtest.strategyName}</span>
                  <span>{backtest.symbol}</span>
                  <span>{backtest.status}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Quick Actions</h2>
          <p>Start a common TradeMasterFX workflow</p>
        </div>

        <Card>
          <div className="quick-actions">
            <button
              type="button"
              onClick={() => navigate('/strategies')}
            >
              Create Strategy
            </button>

            <button
              type="button"
              onClick={() => navigate('/historical-data')}
            >
              Upload Historical Data
            </button>

            <button
              type="button"
              onClick={() => navigate('/backtesting')}
            >
              Run Backtest
            </button>
          </div>
        </Card>
      </div>

    </div>
  );
}

export default Dashboard;