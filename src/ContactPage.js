import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const ContactUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white overflow-x-hidden"> {/* Prevent horizontal overflow */}
      <Navbar />
      <motion.div
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-amber-600 text-center">
          Contact Us
        </h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="text-xl mb-4">
            We'd love to hear from you! Whether you have a question about our coffee, want to share your feedback, or are interested in collaborating, don't hesitate to reach out.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaPhone className="mr-4 text-yellow-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-4 text-yellow-500" />
                <span>hello@coffeeshop.com</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-4 text-yellow-500" />
                <span>123 Coffee Street, Brew City, BC 12345</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
              alt="Coffee shop interior"
              className="w-full h-full object-cover"
              style={{ maxHeight: '250px' }} // Limit height for better layout
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-2xl font-semibold text-center px-4">
                Visit us for a cup of our finest brew!
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-semibold mb-6">Our Hours</h2>
          <p className="text-xl">
            Monday - Friday: 7:00 AM - 8:00 PM
            <br />
            Saturday - Sunday: 8:00 AM - 6:00 PM
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-lg italic">
            "Coffee is our passion. We can't wait to share it with you!"
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
