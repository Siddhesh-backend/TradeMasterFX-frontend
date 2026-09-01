import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/strategies">Strategies</NavLink>
        <NavLink to="/historical-data">Historical Data</NavLink>
        <NavLink to="/backtesting">Backtesting</NavLink>
        <NavLink to="/risk-management">Risk Management</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/comparison">Comparison</NavLink>
        <NavLink to="/ranking">Ranking</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;