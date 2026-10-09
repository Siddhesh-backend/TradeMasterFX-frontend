import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import Alert from '../components/Alert/Alert';
import { getPerformanceSummary } from '../services/api/analyticsApi';
import Card from '../components/Card/Card';
import './Analytics.css';
import EquityCurve from '../components/EquityCurve/EquityCurve';

function Analytics() {
  const [searchParams] = useSearchParams();
  const runId = searchParams.get('runId');

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!runId) {
      setError('No backtest run selected.');
      return;
    }

    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getPerformanceSummary(runId);

        setAnalytics(data);
      } catch (error) {
        setError(
          error.message || 'Unable to load performance analytics.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [runId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <h1>Analytics</h1>
        <p>TradeMasterFX Performance Analytics</p>

        <Alert type="error" message={error} />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div>
        <h1>Analytics</h1>
        <p>TradeMasterFX Performance Analytics</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Analytics</h1>
      <p>TradeMasterFX Performance Analytics</p>

      <div>
        <h2>Performance Summary</h2>

        <div className="analytics-page">
          <Card>
            <h3>Total Trades</h3>
            <p>{analytics.totalTrades}</p>
          </Card>

          <Card>
            <h3>Winning Trades</h3>
            <p>{analytics.winningTrades}</p>
          </Card>

          <Card>
            <h3>Losing Trades</h3>
            <p>{analytics.losingTrades}</p>
          </Card>

          <Card>
            <h3>Breakeven Trades</h3>
            <p>{analytics.breakevenTrades}</p>
          </Card>

          <Card>
            <h3>Win Rate</h3>
            <p>{analytics.winRate}</p>
          </Card>

          <Card>
            <h3>Loss Rate</h3>
            <p>{analytics.lossRate}</p>
          </Card>

          <Card>
            <h3>Net Profit</h3>
            <p>{analytics.netProfit}</p>
          </Card>

          <Card>
            <h3>Net Loss</h3>
            <p>{analytics.netLoss}</p>
          </Card>

          <Card>
            <h3>Average Profit</h3>
            <p>{analytics.averageProfit}</p>
          </Card>

          <Card>
            <h3>Average Loss</h3>
            <p>{analytics.averageLoss}</p>
          </Card>

          <Card>
            <h3>Gross Profit</h3>
            <p>{analytics.grossProfit}</p>
          </Card>

          <Card>
            <h3>Gross Loss</h3>
            <p>{analytics.grossLoss}</p>
          </Card>

          <Card>
            <h3>Profit Factor</h3>
            <p>{analytics.profitFactor}</p>
          </Card>

          <Card>
            <h3>Maximum Drawdown</h3>
            <p>{analytics.maximumDrawdown}</p>
          </Card>

          <Card>
            <h3>Average Risk Reward Ratio</h3>
            <p>{analytics.averageRiskRewardRatio}</p>
          </Card>

          <div>
            <h2>Equity Curve</h2>

            <EquityCurve data={analytics.equityCurve} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;