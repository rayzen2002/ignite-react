import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { TransactionTable } from './components/TransactionTable';
import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <TransactionTable />
      <GlobalStyle />
    </>
  );
}
