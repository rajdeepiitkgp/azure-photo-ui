import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UploadPhoto from './components/UploadPhoto';
import PhotoGallery from './components/PhotoGallery';
import SearchPage from './components/SearchPage';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to='/'>Upload Photo</Link>
          </li>
          <li>
            <Link to='/gallery'>Photo Gallery</Link>
          </li>
          <li>
            <Link to='/search'>Photo Search</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<UploadPhoto />} />
        <Route path='/gallery' element={<PhotoGallery />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;

