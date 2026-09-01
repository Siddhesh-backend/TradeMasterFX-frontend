import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import './AppShell.css';

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <div className="app-header">
        <Header />
      </div>

      <div className="app-body">
        <aside className="app-sidebar">
          <Sidebar />
        </aside>

        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppShell;