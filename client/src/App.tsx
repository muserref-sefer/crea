import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthGuard from './components/Route/AuthGuard';
import NotFoundRedirect from './components/Route/NotFoundRedirect';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router basename="/">
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AuthGuard />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Route>
            <Route path="*" element={<NotFoundRedirect />} />
          </Routes>
        </Layout>
    </Router>
    </AuthProvider>
  );
};

export default App;