import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Navbar from './components/shared/Navbar';
import { NavLinks } from './providers/RouterProvider';
import { Toaster } from 'sonner';

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
      <Toaster richColors closeButton />
    </ThemeProvider>
  );
};

export default App;

