import React from 'react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import CarPage from './CarPage';

function App() {
  return (
    <BrowserRouter basename="/subapp-2">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cars/:id" element={<CarPage />} />
        <Route
          path="/test"
          element={<h2 style={{ color: 'pink' }}>Hello World!!</h2>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
