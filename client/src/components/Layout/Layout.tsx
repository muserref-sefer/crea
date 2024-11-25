import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-50 shadow">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="text-2xl font-bold">
            <a href="/" className="flex items-center space-x-2">
              <img src="https://creainc.us/assets/img/logo.svg" alt="Crea Logo" className='h-8' />
            </a>
          </div>
          <Navbar /> 
        </div>
      </header>
      <main className="flex-grow container mx-auto py-8 px-6">{children}</main>
      <footer className="bg-blue-500 text-white py-4 text-center">
        <p>&copy; 2024 Crea. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
