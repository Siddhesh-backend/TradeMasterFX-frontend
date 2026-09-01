import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import AppShell from '../layouts/AppShell';
import Strategies from '../pages/Strategies';
import HistoricalData from '../pages/HistoricalData';
import Backtesting from '../pages/Backtesting';
import RiskManagement from '../pages/RiskManagement';
import Analytics from '../pages/Analytics';
import Reports from '../pages/Reports';
import Comparison from '../pages/Comparison';
import Ranking from '../pages/Ranking';
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Application Routes */}
      <Route
        path="/dashboard"
        element={
          <AppShell>
            <Dashboard />
          </AppShell>
        }
      />
      <Route
        path="/strategies"
        element={
          <AppShell>
            <Strategies />
          </AppShell>
        }
      />
      <Route
        path="/historical-data"
        element={
          <AppShell>
            <HistoricalData />
          </AppShell>
        }
      />
      <Route
        path="/backtesting"
        element={
          <AppShell>
            <Backtesting />
          </AppShell>
        }
      />
      <Route
        path="/risk-management"
        element={
          <AppShell>
            <RiskManagement />
          </AppShell>
        }
      />
      <Route
        path="/analytics"
        element={
          <AppShell>
            <Analytics />
          </AppShell>
        }
      />
      <Route
        path="/reports"
        element={
          <AppShell>
            <Reports />
          </AppShell>
        }
      />
      <Route
        path="/comparison"
        element={
          <AppShell>
            <Comparison />
          </AppShell>
        }
      />
      <Route
        path="/ranking"
        element={
          <AppShell>
            <Ranking />
          </AppShell>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>


  );
}

export default AppRoutes;