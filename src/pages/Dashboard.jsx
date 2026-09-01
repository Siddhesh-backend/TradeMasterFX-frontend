import Card from '../components/Card/Card';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>TradeMasterFX Dashboard</p>
      </div>

      <div className="dashboard-metrics">
        <Card>
          <h2>Total Backtests</h2>
          <p className="metric-value">0</p>
        </Card>

        <Card>
          <h2>Win Rate</h2>
          <p className="metric-value">0%</p>
        </Card>

        <Card>
          <h2>Profit Factor</h2>
          <p className="metric-value">0.00</p>
        </Card>

        <Card>
          <h2>Max Drawdown</h2>
          <p className="metric-value">0%</p>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;