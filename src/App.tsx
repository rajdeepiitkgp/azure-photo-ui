import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPhoto from '@/components/UploadPhoto';
import PhotoGallery from '@/components/PhotoGallery';
import SearchPage from '@/components/SearchPage';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Navbar from './components/shared/Navbar';

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<UploadPhoto />} />
          <Route path='/gallery' element={<PhotoGallery />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

