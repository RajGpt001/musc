import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { CartDrawer } from '../product/CartDrawer';

export const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <MobileMenu />
      <CartDrawer />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
