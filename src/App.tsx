import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Navbar from './components/shared/Navbar';
import { NavLinks } from './providers/RouterProvider';

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Router>
        <Navbar />
        <Routes>
          {NavLinks.map((link) => (
            <Route key={link.label} path={link.href} element={link.element} />
          ))}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

