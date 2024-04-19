import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
 return (
    <>
      <Header />
      <Outlet /> {/* This is where child routes will be rendered */}
      <Footer />
    </>
 );
}

export default Layout;
