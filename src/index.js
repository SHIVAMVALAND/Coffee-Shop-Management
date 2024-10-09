import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import AboutPage from './AboutPage';
import GetAllCoffee from './GetAllCoffee';
import DetailCoffees from './DetailCoffees';
import AddCoffees from './AddCoffees';
import UpdateData from './UpdateData';
import ContactPage from './ContactPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navbar />} />
        <Route index element={<Home />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/coffees" element={<GetAllCoffee/>} />
        <Route path="/coffees/:_id" element={<DetailCoffees />} />
        <Route path="/coffees/add" element={<AddCoffees />} />
        <Route path="/coffees/update/:_id" element={<UpdateData />} /> 
        <Route path="/Contact" element={<ContactPage />} /> 
      </Routes>
    </BrowserRouter>
  </>
);
