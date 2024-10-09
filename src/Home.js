import React from "react";
import Navbar from "./Navbar";
import { FaCoffee, FaHome, FaUtensils } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // <-- Initialize useNavigate

  const services = [
    { icon: <FaCoffee />, title: "Quality Coffee", description: "Enjoy our premium, locally roasted coffee beans." },
    { icon: <FaHome />, title: "Cozy Atmosphere", description: "Relax in our warm and inviting space." },
    { icon: <FaUtensils />, title: "Delicious Treats", description: "Savor our freshly baked pastries and snacks." },
  ];

  const featuredProducts = [
    { name: "Espresso", description: "Rich and bold", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Cappuccino", description: "Creamy and frothy", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Latte", description: "Smooth and velvety", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  ];

  const handleExploreClick = () => {
    navigate("/Coffees"); // <-- Navigate to the /Coffees route on button click
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <header className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Coffee Shop Ambiance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="group">
            <h1 className="text-5xl font-bold mb-4 transition-transform duration-300 ease-in-out transform group-hover:translate-x-4">
              Welcome to Our
            </h1>
            <h1 className="text-5xl font-bold mb-4 text-amber-600 transition-transform duration-300 ease-in-out transform group-hover:-translate-x-4">
              Coffee Haven
            </h1>
          </div>
          <button
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 mx-4 mt-5 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleExploreClick} // <-- Add onClick event handler
          >
            Explore Coffee Dashboard
          </button>
        </div>
      </header>

      <section className="py-16 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2"
            >
              <div className="text-4xl text-amber-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-300">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-10 px-6 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-start">
          <div className="w-full md:w-1/3 mb-8 md:mb-0 flex flex-col items-start p-4">
            <h3 className="text-3xl font-bold mb-3 text-amber-600 text-left">Coffee Haven</h3>
            <p className="mb-5 text-left">Brewing happiness, one cup at a time.</p>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0 flex flex-col items-start p-4">
            <h4 className="text-xl font-semibold mb-3 text-amber-600 text-left">Contact Info</h4>
            <div className="flex items-center mb-3 justify-start">
              <FiPhone className="mr-2 text-amber-400" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center justify-start">
              <FiMail className="mr-2 text-amber-400" />
              <span>info@coffeehaven.com</span>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p>&copy; 2023 Coffee Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
