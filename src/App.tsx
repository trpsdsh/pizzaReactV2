import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';

import './scss/app.scss';

const FullPizza = React.lazy(() => import('./components/FullPizza/FullPizza'));
const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='pizza/:id' element={<FullPizza />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
    </Suspense>
  );
}

export default App;
