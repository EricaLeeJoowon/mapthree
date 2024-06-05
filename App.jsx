// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Home from './pages/Home';
// import SubwayPage from './pages/SubwayPage';
// import BusPage from './pages/BusPage';
// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <div className="app-container">
//         <nav className="nav-bar">
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/subway">Subway Page</Link>
//             </li>
//             <li>
//               <Link to="/bus">Bus Page</Link>
//             </li>
//           </ul>
//         </nav>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/subway" element={<SubwayPage />} />
//           <Route path="/bus" element={<BusPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
//App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import MapComponent from './components/MapComponent';
import BusPage from './pages/BusPage'; // 기존 BusPage 경로
import SubwayPage from './pages/SubwayPage'; // 기존 SubwayPage 경로
import './App.css';

const App = () => {
    return (
      <Router>
        <div className="app-container">
          <nav className="nav-bar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/map">Map Page</Link>
              </li>
              <li>
                <Link to="/subway">Subway Page</Link>
              </li>
              <li>
                <Link to="/bus">Bus Page</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapComponent />} />
            <Route path="/subway" element={<SubwayPage />} />
            <Route path="/bus" element={<BusPage />} />
          </Routes>
        </div>
      </Router>
    );
  };

export default App;