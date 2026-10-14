
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card/Card';
import Alert from '../components/Alert/Alert';
import Loading from '../components/Loading/Loading';
import EmptyState from '../components/EmptyState/EmptyState';
import Button from '../components/Button/Button';
import {
  getReports,
  exportReport,
} from '../services/api/reportApi';
import './Reports.css';

function Reports() {
  const location = useLocation();
  const generatedReport = location.state?.generatedReport;

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to load reports.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleExport = async (reportId, format) => {
    const key = `${reportId}-${format}`;
    setExporting(key);
    setError('');

    try {
      await exportReport(reportId, format);
    } catch (err) {
      setError(err.message || `Failed to export ${format} report.`);
    } finally {
      setExporting('');
    }
  };

  const exportButtons = (reportId) => (
    <div className="report-actions">
      {[
        { format: 'pdf', label: 'PDF', icon: '↓' },
        { format: 'excel', label: 'Excel', icon: '↓' },
        { format: 'csv', label: 'CSV', icon: '↓' },
      ].map(({ format, label, icon }) => (
        <Button
          key={format}
          type="button"
          variant="secondary"
          disabled={Boolean(exporting)}
          onClick={() => handleExport(reportId, format)}
        >
          {exporting === `${reportId}-${format}`
            ? 'Downloading...'
            : `${icon} ${label}`}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="reports-page">
      <div className="reports-heading">
        <div>
          <h1>Reports</h1>
          <p>Review backtest performance and export your reports.</p>
        </div>
        <span className="reports-count">
          {reports.length} {reports.length === 1 ? 'Report' : 'Reports'}
        </span>
      </div>

      {error && <Alert type="error" message={error} />}

      {generatedReport && (
        <Card>
          <div className="generated-report">
            <span className="report-eyebrow">LATEST GENERATION</span>
            <h2>{generatedReport.backtestName || 'Backtest Report'}</h2>
            <p>{generatedReport.strategyName}</p>

            <div className="report-metrics">
              <div>
                <span>Performance Grade</span>
                <strong>{generatedReport.performanceGrade ?? 'N/A'}</strong>
              </div>
              <div>
                <span>Risk Level</span>
                <strong>{generatedReport.riskLevel ?? 'N/A'}</strong>
              </div>
              <div>
                <span>Net Profit</span>
                <strong>{generatedReport.netProfit ?? 'N/A'}</strong>
              </div>
              <div>
                <span>Profit Factor</span>
                <strong>{generatedReport.profitFactor ?? 'N/A'}</strong>
              </div>
            </div>

            {generatedReport.remarks && (
              <p className="report-remarks">{generatedReport.remarks}</p>
            )}
          </div>
        </Card>
      )}

      {loading ? (
        <Loading />
      ) : reports.length === 0 ? (
        <EmptyState
          title="No reports yet"
          message="Complete a backtest and generate a report to see it here."
        />
      ) : (
        <div className="reports-grid">
          {reports.map((report) => (
            <Card key={report.reportId}>
              <div className="report-card">
                <div className="report-card-top">
                  <div className="report-file-icon">
                    <span>R</span>
                  </div>
                  <span className="report-id">#{report.reportId}</span>
                </div>

                <h2>{report.backtestName || 'Backtest Report'}</h2>
                <p className="report-strategy">{report.strategyName}</p>

                <div className="report-tags">
                  <span className="report-grade">
                    Grade: {report.performanceGrade ?? 'N/A'}
                  </span>
                  <span className="report-risk">
                    Risk: {report.riskLevel ?? 'N/A'}
                  </span>
                </div>

                <p className="report-date">
                  Generated{' '}
                  {report.generatedAt
                    ? new Date(report.generatedAt).toLocaleString()
                    : 'Date unavailable'}
                </p>

                <div className="report-card-divider" />
                <p className="export-label">DOWNLOAD REPORT</p>
                {exportButtons(report.reportId)}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reports;
