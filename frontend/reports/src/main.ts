import './styles.css';
import { ReportsPage } from './features/reports/reports-page';

const root = document.getElementById('reports-root');

if (!root) {
  throw new Error('Reports root element not found');
}

document.body.dataset.page = 'reports';

const page = new ReportsPage(root);

void page.start();
